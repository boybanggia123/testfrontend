"use client"
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import PasswordResetForm from "../../components/PasswordResetForm";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handlePasswordSubmit = async (newPassword) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);  // Nếu thành công, hiển thị thông báo thành công
        router.push("/"); // Điều hướng tới trang đăng nhập
      } else {
        alert(data.message);  // Nếu có lỗi, hiển thị thông báo lỗi
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return email ? <PasswordResetForm onSubmit={handlePasswordSubmit} /> : <p>Loading...</p>;
}
