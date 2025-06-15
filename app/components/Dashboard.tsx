"use client";

import { useState, useEffect } from "react";
import { FaFileAlt, FaComments, FaUser, FaHistory, FaSignOutAlt, FaDownload } from "react-icons/fa";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import "@/app/styles/dashboard.css";

interface Consultation {
  id: string;
  question: string;
  category: string;
  date: string;
  status: "pending" | "answered";
  answer?: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  downloadUrl: string;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("consultations");
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setConsultations([
        {
          id: "1",
          question: "ما هي متطلبات إنهاء عقد الإيجار في المغرب؟",
          category: "قانون الملكية",
          date: "2023-05-15",
          status: "answered",
          answer: "في المغرب، يمكن إنهاء عقود الإيجار عادةً...",
        },
        {
          id: "2",
          question: "كيف يمكن تسجيل شركة في الدار البيضاء؟",
          category: "قانون الأعمال",
          date: "2023-06-02",
          status: "pending",
        },
      ]);

      setDocuments([
        {
          id: "1",
          name: "عقد_إيجار_2023-04-10.pdf",
          type: "عقد إيجار",
          date: "2023-04-10",
          downloadUrl: "#",
        },
        {
          id: "2",
          name: "عقد_عمل_2023-05-22.pdf",
          type: "عقد عمل",
          date: "2023-05-22",
          downloadUrl: "#",
        },
      ]);

      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSignOut = async () => {
    try {
      await logout();
      // Redirect will be handled by the AuthContext
    } catch (error) {
      console.error("Logout error:", error);
      // Fallback redirect
      router.push("/");
    }
  };

  return (
    <div className="dashboard-container" dir="rtl">
      <h1 className="dashboard-title">لوحة التحكم</h1>

      <div className="dashboard-layout">
        {/* Sidebar */}
        <div className="dashboard-sidebar">
          <div className="user-profile">
            <div className="user-avatar">
              <FaUser />
            </div>
            <div>
              <div className="user-name">{user?.name || 'المستخدم'}</div>
              <div className="user-email">{user?.email || ''}</div>
            </div>
          </div>

          <nav className="sidebar-nav">
            <button
              onClick={() => setActiveTab("consultations")}
              className={`nav-button ${activeTab === "consultations" ? "active" : ""}`}
            >
              <FaComments />
              <span>استشاراتي</span>
            </button>
            <button
              onClick={() => setActiveTab("documents")}
              className={`nav-button ${activeTab === "documents" ? "active" : ""}`}
            >
              <FaFileAlt />
              <span>مستنداتي</span>
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`nav-button ${activeTab === "history" ? "active" : ""}`}
            >
              <FaHistory />
              <span>السجل</span>
            </button>
            <button
              onClick={handleSignOut}
              className="nav-button signout"
            >
              <FaSignOutAlt />
              <span>تسجيل الخروج</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="dashboard-content">
          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : activeTab === "consultations" ? (
            <div>
              <h2 className="content-title">استشاراتي</h2>
              {consultations.length === 0 ? (
                <div className="empty-state">
                  <p className="empty-text">لم تقم بإرسال أي استشارات بعد.</p>
                  <a
                    href="/consult"
                    className="primary-button"
                  >
                    طرح سؤال قانوني
                  </a>
                </div>
              ) : (
                <div className="consultations-list">
                  {consultations.map((consultation) => (
                    <div
                      key={consultation.id}
                      className="consultation-card"
                    >
                      <div className="consultation-header">
                        <div>
                          <h3 className="consultation-question">{consultation.question}</h3>
                          <div className="consultation-meta">
                            {consultation.category} • {consultation.date}
                          </div>
                        </div>
                        <span
                          className={`status-badge ${
                            consultation.status === "answered" ? "answered" : "pending"
                          }`}
                        >
                          {consultation.status === "answered" ? "تم الرد" : "قيد الانتظار"}
                        </span>
                      </div>
                      {consultation.answer && (
                        <div className="consultation-answer">
                          <h4 className="answer-title">الجواب:</h4>
                          <p>{consultation.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : activeTab === "documents" ? (
            <div>
              <h2 className="content-title">مستنداتي</h2>
              {documents.length === 0 ? (
                <div className="empty-state">
                  <p className="empty-text">لم تقم بإنشاء أي مستندات بعد.</p>
                  <a
                    href="/generate-document"
                    className="primary-button"
                  >
                    إنشاء مستند
                  </a>
                </div>
              ) : (
                <div className="documents-table-container">
                  <table className="documents-table">
                    <thead>
                      <tr>
                        <th>اسم المستند</th>
                        <th>النوع</th>
                        <th>التاريخ</th>
                        <th>الإجراء</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map((document) => (
                        <tr key={document.id}>
                          <td>{document.name}</td>
                          <td>{document.type}</td>
                          <td>{document.date}</td>
                          <td>
                            <a
                              href={document.downloadUrl}
                              download
                              className="download-link"
                            >
                              <FaDownload /> تنزيل
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 className="content-title">سجل الحساب</h2>
              <div className="empty-history">
                <p className="empty-text">سوف تظهر نشاطات حسابك هنا.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}