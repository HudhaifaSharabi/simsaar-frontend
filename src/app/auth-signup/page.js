"use client"
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send
    const formData = {
      name,
      gender,
      phone,
      email,
      password
    };

    try {
      const response = await fetch('/api/method/simsaar.api.signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok ) {
        // Save session cookie
        document.cookie = `sid=${data.sid}; path=/;`;
        setSuccessMessage(data.message);
        setError('');
      } else {
        setError('Error occurred. Please try again.');
        setSuccessMessage('');
      }
    } catch (err) {
      setError('Error occurred. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <>
      <section className="bg-home zoom-image d-flex align-items-center">
        <div className="bg-overlay image-wrap" style={{ backgroundImage: "url('/images/bg/01.webp')", backgroundPosition: 'center' }}></div>
        <div className="bg-overlay bg-gradient-overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="p-4 bg-white rounded-3 shadow-md mx-auto w-100 text-start rtl" style={{maxWidth:'400px'}}>
                <form onSubmit={handleSubmit}>
                  <Link href="/">
                    <Image src='/images/logo2.png' width={180} height={180} className="mb-4 d-block mx-auto" alt="" />
                  </Link>
                  <h5 className="mb-3">انشاء حساب</h5>

                  <div className="form-floating mb-2">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Harry"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="floatingInput">الاسم </label>
                  </div>

                  <div className="form-floating mb-2">
                    <select
                      className="form-control"
                      id="typeSelectDefault"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value=""></option>
                      <option value="ذكر">ذكر</option>
                      <option value="انثى">انثى</option>
                    </select>
                    <label className="form-check-label text-muted" htmlFor="typeSelectDefault">الجنس </label>
                  </div>

                  <div className="form-floating mb-2">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Harry"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <label htmlFor="floatingInput">رقم الهاتف </label>
                  </div>

                  <div className="form-floating mb-2">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingEmail"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="floatingEmail">الايميل</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="floatingPassword">كلمة السر</label>
                  </div>

                  <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label className="form-check-label text-muted" htmlFor="flexCheckDefault">
                      I Accept <Link href="#" className="text-primary">Terms And Condition</Link>
                    </label>
                  </div>

                  <button className="btn btn-primary w-100" type="submit">Register</button>

                  {error && <div className="text-danger mt-3">{error}</div>}
                  {successMessage && <div className="text-success mt-3">{successMessage}</div>}

                  <div className="col-12 text-center mt-3">
                    <span>
                      <span className="text-muted me-2">Already have an account? </span>
                      <Link href="/auth-login" className="text-dark fw-medium">Sign in</Link>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
