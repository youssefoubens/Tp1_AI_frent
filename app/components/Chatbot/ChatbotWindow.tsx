import { useEffect } from "react";
import { createChat } from "@n8n/chat";
import "@n8n/chat/style.css";
import { GoogleDriveFile } from "../types";
import { FaTimes } from "react-icons/fa";

interface ChatbotWindowProps {
  isOpen: boolean;
  onClose: () => void;
  files: GoogleDriveFile[];
  onDocumentRecommended: (docId: string) => void;
}

export default function ChatbotWindow({
  isOpen,
  onClose,
  files,
  onDocumentRecommended,
}: ChatbotWindowProps) {
  const containerId = "n8n-chat-container";

  useEffect(() => {
    if (isOpen) {
      const chat = createChat({
        webhookUrl: "https://benzaid.app.n8n.cloud/webhook/232f677d-6df9-403c-b53b-57ca7542d831/chat",
        target: `#${containerId}`,
        theme: {
          primaryColor: "#10B981",
          headerColor: "#10B981",
          headerTextColor: "#FFFFFF",
        },
      
        
      });

      return () => {
        chat.unmount();
      };
    }
  }, [isOpen, files, onDocumentRecommended]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
      <div className="bg-green-600 text-white p-3 rounded-t-lg flex justify-between items-center">
        <h3 className="font-bold">مساعد المستندات القانونية</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <FaTimes />
        </button>
      </div>
      <div id={containerId} className="h-96"></div>
    </div>
  );
}
