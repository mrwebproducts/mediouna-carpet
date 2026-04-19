const SESSION_KEY = "mediona_admin";

export function adminLogin(username: string, password: string): boolean {
  if (username === "admin" && password === "password") {
    sessionStorage.setItem(SESSION_KEY, "1");
    return true;
  }
  return false;
}

export function adminLogout(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isAdminLoggedIn(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === "1";
}
