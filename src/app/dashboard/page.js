"use client";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const sid = Cookies.get("sid");
    
    if (!sid) {
      router.push("/auth-login"); // Redirect to login if no session exists
    }
  }, [router]);

  return (
    <div className="container text-center mt-5">
      <h1>مرحبًا بك في لوحة التحكم</h1>
      <button
        className="btn btn-danger mt-3"
        onClick={() => {
          Cookies.remove("sid"); // Logout
          router.push("/auth-login"); // Redirect to login
        }}
      >
        تسجيل الخروج
      </button>
    </div>
  );
}
