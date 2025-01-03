import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const cookieStore = cookies();
  const sid = cookieStore.get('sid')?.value; // Get the value of the sid cookie

  // If no sid cookie is found, redirect to login
  if (!sid) {
    redirect('/auth-login');
    return null;
  }

  try {
    // Construct the full Frappe API URL
    const frappeApiUrl = `${process.env.FRAPPE_URL}/api/method/frappe.auth.get_logged_user`;

    // Validate the sid with Frappe backend
    const response = await fetch(frappeApiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `sid=${sid}`, // Send sid in the request header as a cookie
      },
    });

    if (!response.ok) {
      // If validation fails, redirect to login
      redirect('/auth-login');
      return null;
    }

    const userData = await response.json(); // Optionally, get user data for the dashboard
    console.log('User Data:', userData);

    // At this point, the sid is valid, and the user is authenticated
    return (
      <section
        className="bg-half-170 d-table w-100"
        style={{ backgroundImage: "url('/images/bg/03.jpg')" }}
      >
        <div className="bg-overlay bg-gradient-overlay-2"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <p className="text-white-50 para-desc mx-auto mb-0">عرض</p>
                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">
                  القائمة
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error validating session:', error);
    redirect('/auth-login');
    return null;
  }
}
