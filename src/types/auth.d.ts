interface User {
  id: string;
  username: string;
  email: string;
}

interface SignInData {
  username: string;
  password: string;
}

interface SignInResponse {
  token: string;
}

interface SignUpData {
  username: string;
  email: string;
  password: string;
}

interface SignUpResponse {}

interface AuthContextData {
  user: User | null;
  signIn: (data: SignInData) => Promise<SignInResponse | ApiError>;
  signUp: (data: SignUpData) => Promise<SignUpResponse | ApiError>;
  signOut: () => Promise<void>;
  updateUser: (user: User | null) => void;
}
