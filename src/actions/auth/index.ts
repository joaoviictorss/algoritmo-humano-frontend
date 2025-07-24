"use server";

import { createSession, deleteSession } from "@/utils/auth/session";

export async function signInAction(token: string) {
  await createSession(token);
}

export async function logoutAction() {
  await deleteSession();
}
