"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import OtpVerificationForm from "../../components/OtpVerificationForm";

export default function OtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(null);

  // Sử dụng useEffect để xử lý email từ searchParams
  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleOtpSubmit = async (otp) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);  // Nếu thành công, hiển thị thông báo thành công
        router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
      } else {
        alert(data.message);  // Nếu có lỗi, hiển thị thông báo lỗi
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

 
  return (
    <div>
      {email ? (
        <OtpVerificationForm onSubmit={handleOtpSubmit} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
