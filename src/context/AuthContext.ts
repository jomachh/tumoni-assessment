import {createContext} from 'react';

export const AuthContext = createContext<AuthContextData>({
  user: null,
  signIn: async (_: SignInData): Promise<SignInResponse | ApiError> => {
    return Promise.reject();
  },
  signOut: async () => {},
  signUp: async (_: SignUpData): Promise<SignUpResponse | ApiError> => {
    return Promise.reject();
  },
  updateUser: () => {},
});
