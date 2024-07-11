import Config from 'react-native-config';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {z} from 'zod';

const signInSchema = z.object({
  username: z
    .string()
    .min(3, {message: 'Username must be at least 3 characters'})
    .max(20, {message: 'Username must not exceed 20 characters'}),
  password: z
    .string()
    .min(5, {message: 'Password must be at least 5 characters'}),
});

const signUpSchema = z.object({
  email: z
    .string()
    .min(6, {message: 'Email must be at least 6 characters'})
    .max(64, {message: 'Email must not exceed 64 characters'})
    .email('Invalid email address'),
  password: z
    .string()
    .min(5, {
      message: 'Your password must have minimum 5 characters',
    })
    .max(32, {message: 'Password must not exceed 32 characters'}),
  username: z
    .string()
    .min(3, {message: 'Username must be at least 3 characters'})
    .max(20, {message: 'Username must not exceed 20 characters'})
    .regex(/^[a-zA-Z][a-zA-Z0-9]/, {
      message: 'Username must not include special characters',
    }),
});

export const signIn = async (
  params: SignInData,
): Promise<SignInResponse | ApiError> => {
  try {
    signInSchema.parse(params);
  } catch (error: any) {
    return {
      status: 400,
      message: error.errors[0].message,
    };
  }

  const DeviceUUID = await AsyncStorage.getItem('DeviceUUID');
  console.log('DeviceUUID', DeviceUUID);
  const response = await fetch(`${Config.API_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Device-UUID': DeviceUUID || '',
    },
    body: JSON.stringify(params),
  });

  if (response.ok) {
    const data = (await response.json()) as SignInResponse;
    await Keychain.setGenericPassword(params.username, data.token);
    return data;
  }

  const error = (await response.json()) as ApiError;

  return error;
};

export const signUp = async (
  params: SignUpData,
): Promise<SignUpResponse | ApiError> => {
  try {
    signUpSchema.parse(params);
  } catch (error: any) {
    return {
      status: 400,
      message: error.errors[0].message,
    };
  }

  const DeviceUUID = await AsyncStorage.getItem('DeviceUUID');

  const response = await fetch(`${Config.API_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Device-UUID': DeviceUUID || '',
    },
    body: JSON.stringify(params),
  });

  if (response.ok) {
    const data = (await response.json()) as SignUpResponse;
    return data;
  }

  const error = (await response.json()) as ApiError;

  return error;
};

export const signOut = async (): Promise<void> => {
  await Keychain.resetGenericPassword();
};
