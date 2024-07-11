import Config from 'react-native-config';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUser = async (): Promise<User | ApiError> => {
  const DeviceUUID = await AsyncStorage.getItem('DeviceUUID');
  const token =
    (await Keychain.getGenericPassword()) as Keychain.UserCredentials;

  console.log(token);

  const response = await fetch(`${Config.API_URL}/user/info`, {
    headers: {
      Authorization: `Bearer ${token.password}`,
      'Device-UUID': DeviceUUID || '',
    },
  });

  console.log(response.status);

  if (response.ok) {
    const data = (await response.json()) as User;
    return data;
  }

  const error = (await response.json()) as ApiError;

  return error;
};
