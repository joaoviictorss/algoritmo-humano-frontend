import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookie = {
  name: "token",
  options: {
    httpOnly: false,
    sameSite: "lax" as const,
    path: "/",
  },
  duration: 24 * 60 * 60 * 1000 * 2, // 2 days
} as const;

export async function createSession(token: string) {
  const expires = new Date(Date.now() + cookie.duration);
  const cookieStore = await cookies();

  cookieStore.set(cookie.name, token, {
    ...cookie.options,
    expires,
    maxAge: cookie.duration / 1000,
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  return cookieStore.get(cookie.name)?.value;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookie.name);
}

export async function verifySession() {
  const token = await getSession();

  if (!token) {
    redirect("/");
  }

  try {
    return { isAuth: true, token };
  } catch {
    await deleteSession();
    redirect("/");
  }
}
