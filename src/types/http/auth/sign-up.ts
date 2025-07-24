export interface ISignUpRequest {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

export interface ISignUpResponse {
  message: string;
  displayMessage: string;
}
