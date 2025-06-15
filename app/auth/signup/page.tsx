"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUserPlus, FaSpinner } from "react-icons/fa";
import { useAuth } from "@/app/context/AuthContext";
import "@/app/styles/signup.css";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register, isLoading, error, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await register(formData.name, formData.email, formData.password);

      // If registration is successful and no error about email confirmation
      if (!error || !error.includes("email")) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      console.error("Registration error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="success-container">
        <h1 className="success-title">تم التسجيل بنجاح!</h1>
        <p className="success-message">
          {error && error.includes("email")
            ? "تم إنشاء حسابك بنجاح. يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب قبل تسجيل الدخول."
            : "تم إنشاء حسابك بنجاح"
          }
        </p>
        <Link
          href="/auth/signin"
          className="success-button"
        >
          تسجيل الدخول الآن
        </Link>
      </div>
    );
  }

  return (
    <div className="signup-container" dir="rtl">
      <h1 className="signup-title">إنشاء حساب جديد</h1>

      {error && (
        <div className="error-message">{error}</div>
      )}

      {formData.password !== formData.confirmPassword && formData.confirmPassword && (
        <div className="error-message">كلمات المرور غير متطابقة</div>
      )}

      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="name">الاسم الكامل</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">البريد الإلكتروني</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">كلمة المرور</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
          <p className="password-hint">على الأقل 6 أحرف</p>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="terms-agreement">
          <input
            type="checkbox"
            id="terms"
            required
          />
          <label htmlFor="terms">
            أوافق على{" "}
            <Link href="/terms" className="terms-link">
              شروط الخدمة
            </Link>{" "}
            و{" "}
            <Link href="/privacy" className="terms-link">
              سياسة الخصوصية
            </Link>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isLoading || formData.password !== formData.confirmPassword}
          className="submit-button"
        >
          {(isSubmitting || isLoading) ? (
            <>
              <FaSpinner className="spinner-icon" />
              جاري إنشاء الحساب...
            </>
          ) : (
            <>
              <FaUserPlus />
              تسجيل جديد
            </>
          )}
        </button>
      </form>

      <div className="login-redirect">
        <p>
          لديك حساب بالفعل؟{" "}
          <Link
            href="/auth/signin"
            className="login-link"
          >
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}