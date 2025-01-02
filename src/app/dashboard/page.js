// app/dashboard/page.js
import { cookies } from 'next/headers'; // Import cookies utility
import { redirect } from 'next/navigation'; // Redirect utility

export default function Dashboard() {
  const cookieStore = cookies(); // Access cookies on the server-side
  const sid = cookieStore.get('sid'); // Get the sid cookie

  if (!sid) {
    // If the sid cookie is not found, redirect to login page
    redirect('/auth-login');
  }

  return (
    <section className="bg-half-170 d-table w-100" style={{ backgroundImage: "url('/images/bg/03.jpg')" }}>
                <div className="bg-overlay bg-gradient-overlay-2"></div>
                <div className="container">
                    <div className="row mt-5 justify-content-center">
                        <div className="col-12">
                            <div className="title-heading text-center">
                                <p className="text-white-50 para-desc mx-auto mb-0">عرض</p>
                                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">القائمة</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
  );
}
