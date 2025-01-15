"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function AuthLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();
    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("/api/method/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // تمكين الكوكيز
                body: JSON.stringify({
                    usr: username,
                    pwd: password,
                }),
            });
    
            if (response.ok) {
                const sid = Cookies.get("sid");
                console.log(sid);
                setMessage("تم تسجيل الدخول بنجاح!");
                console.log("تم تسجيل الدخول.");
                router.back()
            } else {
                const error = await response.json();
                setMessage(`فشل تسجيل الدخول: ${error.message}`);
            }
        } catch (error) {
            setMessage(`خطأ: ${error.message}`);
        }
        console.log(Cookies.get());
    };
    return (
        <section className="bg-home zoom-image d-flex align-items-center ">
            <div className="bg-overlay image-wrap" style={{ backgroundImage: "url('/images/bg/08.jpg')", backgroundPosition: 'center' }}></div>
            <div className="bg-overlay bg-gradient-overlay"></div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="p-4 bg-white rounded-3 shadow-md mx-auto w-100 justify-content-start text-center" style={{ maxWidth: '400px' }}>
                            <form onSubmit={handleLogin}>
                                <Link href="/"><Image src='/images/logo2.png' width={180} height={180} className="mb-4 d-block mx-auto" alt="" /></Link>
                                <h5 className="mb-3">تسجيل الدخول</h5>

                                <div className="form-floating mb-2 rtl">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="اسم المستخدم"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <label htmlFor="floatingInput" className="text-end">اسم المستخدم</label>
                                </div>
                                <div className="form-floating mb-2 rtl" style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="floatingPassword"
                                        placeholder="كلمة السر"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label htmlFor="floatingPassword" className="text-end">كلمة السر</label>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <div className="mb-3 rtl">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label text-muted" htmlFor="flexCheckDefault">تذكرني </label>
                                        </div>
                                    </div>
                                    <span className="forgot-pass text-muted mb-0"><Link href="/auth-reset-password" className="text-muted">نسيت كلمة السر ؟ </Link></span>
                                </div>

                                <button className="btn btn-primary w-100" type="submit">تسجيل دخول</button>

                                {message && <p className="mt-3 text-danger">{message}</p>}

                                <div className="col-12 text-center mt-3">
                                    <span><span className="text-muted me-2">لا يوجد لديك حساب </span> <Link href="/auth-signup" className="text-dark fw-medium"> انشاء حساب</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
