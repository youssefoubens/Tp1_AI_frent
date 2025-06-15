"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/app/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();
  const supabase = createSupabaseClient();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Auth callback error:", error);
          router.push("/auth/signin?error=callback_error");
          return;
        }

        if (data.session) {
          // Successfully authenticated, redirect to dashboard
          router.push("/dashboard");
        } else {
          // No session, redirect to signin
          router.push("/auth/signin");
        }
      } catch (err) {
        console.error("Unexpected error in auth callback:", err);
        router.push("/auth/signin?error=unexpected_error");
      }
    };

    handleAuthCallback();
  }, [router, supabase.auth]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">جاري تسجيل الدخول...</p>
      </div>
    </div>
  );
}
