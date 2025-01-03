"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Signup() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !gender || !phone || !email || !password) {
      setError("All fields are required.");
      return;
    }

    // Clear messages and set loading state
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:88/api/method/simsaar.api.signup?email=${email}&name=${name}&password=${password}&gender=${gender}&phone=${phone}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
       
      });

      const data = await response.json();

      if (response.ok) {
        document.cookie = `sid=${data.sid}; path=/;`;
        setSuccessMessage(data.message);
        setError('');
        
        // Redirect to the last visited page or default
        const lastPage = localStorage.getItem('lastPage') || '/';
        window.location.href = lastPage;
      } else {
        setError(data.message || "Error occurred. Please try again.");
        setSuccessMessage('');
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setSuccessMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-home zoom-image d-flex align-items-center">
      <div className="bg-overlay image-wrap" style={{ backgroundImage: "url('/images/bg/01.webp')", backgroundPosition: 'center' }}></div>
      <div className="bg-overlay bg-gradient-overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="p-4 bg-white rounded-3 shadow-md mx-auto w-100 text-start rtl" style={{ maxWidth: '400px' }}>
              <form onSubmit={handleSubmit}>
                <Link href="/">
                  <Image src='/images/logo2.png' width={180} height={180} className="mb-4 d-block mx-auto" alt="" />
                </Link>
                <h5 className="mb-3">إنشاء حساب</h5>

                <div className="form-floating mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="الاسم"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label>الاسم</label>
                </div>

                <div className="form-floating mb-2">
                  <select
                    className="form-control"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="male">ذكر</option>
                    <option value="انثى">أنثى</option>
                  </select>
                  <label>الجنس</label>
                </div>

                <div className="form-floating mb-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="رقم الهاتف"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <label>رقم الهاتف</label>
                </div>

                <div className="form-floating mb-2">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="البريد الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label>البريد الإلكتروني</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="كلمة المرور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label>كلمة المرور</label>
                </div>

                <button className="btn btn-primary w-100" type="submit" disabled={isLoading}>
                  {isLoading ? "جاري التسجيل..." : "تسجيل"}
                </button>

                {error && <div className="text-danger mt-3">{error}</div>}
                {successMessage && <div className="text-success mt-3">{successMessage}</div>}

                <div className="col-12 text-center mt-3">
                  <span>
                    <span className="text-muted me-2">لديك حساب بالفعل؟</span>
                    <Link href="/auth-login" className="text-dark fw-medium">تسجيل الدخول</Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
