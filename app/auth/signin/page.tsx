"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSignInAlt, FaSpinner, FaGoogle, FaFacebook } from "react-icons/fa";
import { useAuth } from "@/app/context/AuthContext";
import { createSupabaseClient } from "@/app/lib/supabase";
import "@/app/styles/signin.css";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isLoading, error, isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createSupabaseClient();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = searchParams.get('redirectTo') || '/dashboard';
      router.push(redirectTo);
    }
  }, [isAuthenticated, router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await login(email, password);
      // Redirect will be handled by the AuthContext
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error(`${provider} login error:`, error);
      }
    } catch (err) {
      console.error(`${provider} login error:`, err);
    }
  };

  return (
    <div className="signin-container" dir="rtl">
      <h1 className="signin-title">تسجيل الدخول</h1>

      {error && (
        <div className="error-message">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="signin-form">
        <div className="form-group">
          <label htmlFor="email">البريد الإلكتروني</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">كلمة المرور</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-options">
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">تذكرني</label>
          </div>
          <Link href="/auth/forgot-password" className="forgot-password">
            نسيت كلمة المرور؟
          </Link>
        </div>

        <button type="submit" disabled={isLoading || isSubmitting} className="submit-button">
          {(isLoading || isSubmitting) ? (
            <>
              <FaSpinner className="spinner-icon" />
              جاري تسجيل الدخول...
            </>
          ) : (
            <>
              <FaSignInAlt />
              تسجيل الدخول
            </>
          )}
        </button>
      </form>

      <div className="social-divider">
        <span>أو متابعة باستخدام</span>
      </div>

      <div className="social-buttons">
        <button
          type="button"
          className="social-button google"
          onClick={() => handleSocialLogin('google')}
        >
          <FaGoogle />
          <span>جوجل</span>
        </button>
        <button
          type="button"
          className="social-button facebook"
          onClick={() => handleSocialLogin('facebook')}
        >
          <FaFacebook />
          <span>فيسبوك</span>
        </button>
      </div>

      <div className="signup-link">
        ليس لديك حساب؟{" "}
        <Link href="/auth/signup">إنشاء حساب</Link>
      </div>
    </div>
  );
}