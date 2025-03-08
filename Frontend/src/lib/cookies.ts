import Cookies from 'js-cookie';

// Cookie options
const cookieOptions = {
  expires: 7, // 7 days
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
};

function setCookie(name: string, value: string, options = {}) {
  Cookies.set(name, value, {
    ...cookieOptions,
    ...options,
  });
}

function getCookie(name: string): string | undefined {
  return Cookies.get(name);
}

function deleteCookie(name: string) {
  Cookies.remove(name);
}

function clearAllCookies() {
  Object.keys(Cookies.get()).forEach(cookieName => {
    deleteCookie(cookieName);
  });
}

// Helper function to parse HttpOnly cookies from server-side
function parseHttpOnlyCookies(cookieString?: string): Record<string, string> {
  if (!cookieString) return {};

  return cookieString
    .split(';')
    .reduce((cookies: Record<string, string>, cookie) => {
      const [name, value] = cookie.split('=').map(c => c.trim());
      if (name && value) cookies[name] = value;
      return cookies;
    }, {});
}

const cookieUtils = {
  set: setCookie,
  get: getCookie,
  remove: deleteCookie,
  clearAll: clearAllCookies,
  parseHttpOnly: parseHttpOnlyCookies,
};

export default cookieUtils;

export function getClientCookie(name: string): string | undefined {
  return Cookies.get(name);
}

export function setClientCookie(name: string, value: string, options = {}) {
  Cookies.set(name, value, options);
}

export function removeClientCookie(name: string) {
  Cookies.remove(name);
}
