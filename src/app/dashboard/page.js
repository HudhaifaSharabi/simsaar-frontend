"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Utility function to get a cookie by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

export default function Dashboard() {
  const [username, setUsername] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const sid = getCookie("sid");

    // Check if user is logged in by checking the sid cookie
    if (!sid) {
      router.push("/auth-login"); // Redirect to login page if not logged in
    } else {
      const storedUsername = getCookie("username");
      if (storedUsername) {
        setUsername(storedUsername); // Set the username from the cookie
      }
    }
  }, [router]);

  return (
    <div>
      <h1>Dashboard</h1>
      {username ? (
        <p>Welcome, {username}!</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
