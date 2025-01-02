// app/dashboard/page.js
import { cookies } from 'next/headers'; // Import cookies utility
import { redirect } from 'next/navigation'; // Redirect utility

export default function Dashboard() {
  const cookieStore = cookies(); // Access cookies on the server-side
  const sid = cookieStore.get('sid'); // Get the sid cookie

  if (sid) {
    // If the sid cookie is not found, redirect to login page
    redirect('/auth-login');
  }

  return (
    <div className="container text-center mt-5">
      <h1>مرحبًا بك في لوحة التحكم</h1>
      <button
        className="btn btn-danger mt-3"
        onClick={() => {
          // Simulate logging out by removing the sid cookie on the backend
          redirect('/auth-login'); // Redirect to login page after logout
        }}
      >
        تسجيل الخروج
      </button>
    </div>
  );
}
