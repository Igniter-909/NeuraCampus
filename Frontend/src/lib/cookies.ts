import Cookies from 'js-cookie';

interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  maxAge?: number;
}

// Cookie options
const cookieOptions: CookieOptions = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/'
};

function setCookie(name: string, value: string, options: CookieOptions = {}) {
  // Convert maxAge to expires if provided
  if (options.maxAge) {
    options.expires = new Date(Date.now() + options.maxAge * 1000);
    delete options.maxAge;
  }
  
  Cookies.set(name, value, {
    ...cookieOptions,
    ...options,
  });
}

function getCookie(name: string): string | undefined {
  return Cookies.get(name);
}

function deleteCookie(name: string) {
  Cookies.remove(name, { path: '/' });
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
