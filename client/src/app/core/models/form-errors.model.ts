export interface RegisterFormErrors {
  email: string;
  password: string;
  displayName: string;
}

export interface ProfileFormErrors {
  displayName: string;
  currentPassword: string;
  newPassword: string;
}

export interface LoginFormErrors {
  password: string;
  email: string;
}
