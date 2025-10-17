export interface Auth {
  docNumber: number;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
  };
}