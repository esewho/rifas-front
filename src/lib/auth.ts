
import type { User } from "../types/user";
import httpService from "./http";

interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
  accessToken?: string;
}

export async function loginService(
  email: string,
  password: string
): Promise<AuthResponse> {
  const response = await httpService.post<AuthResponse>("/auth/login", { email, password });
  return response.data;  
}

export async function registerService(
  email: string,
  password: string,
  username: string,
  role: string
): Promise<AuthResponse> {
  const response = await httpService.post<AuthResponse>("/auth/register", {
    email,
    password,
    username,
    role,
  });
  return response.data;
}

export function logout() {
  localStorage.removeItem("raffle_user");
}
