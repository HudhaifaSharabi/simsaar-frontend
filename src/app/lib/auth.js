import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function validateSession() {
 const cookieStore = cookies();
  const sid = cookieStore.get('sid')?.value;

  if (!sid) {
    redirect('/auth-login');
    return null;
  }

  const frappeApiUrl = `${process.env.FRAPPE_URL}/api/method/frappe.auth.get_logged_user`;

  try {
    const response = await fetch(frappeApiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `sid=${sid}`,
      },
    });

    if (!response.ok) {
      redirect('/auth-login');
      return null;
    }

    return await response.json(); // Return user data if needed
  } catch (error) {
    console.error('Session validation error:', error);
    redirect('/auth-login');
    return null;
  }
}
