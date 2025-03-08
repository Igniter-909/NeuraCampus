import { cookies } from 'next/headers';
import { type RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export async function getServerCookie(name: string): Promise<RequestCookie | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(name);
}

export async function setServerCookie(name: string, value: string, options = {}) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, options);
}

export async function deleteServerCookie(name: string) {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}

const serverCookieUtils = {
  get: getServerCookie,
  set: setServerCookie,
  delete: deleteServerCookie,
};

export default serverCookieUtils; 