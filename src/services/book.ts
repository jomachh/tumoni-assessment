import Config from 'react-native-config';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getBookList = async (): Promise<BookList | ApiError> => {
  const DeviceUUID = await AsyncStorage.getItem('DeviceUUID');
  const token =
    (await Keychain.getGenericPassword()) as Keychain.UserCredentials;

  const response = await fetch(`${Config.API_URL}/book/list`, {
    headers: {
      Authorization: `Bearer ${token.password}`,
      'Device-UUID': DeviceUUID || '',
    },
  });

  if (response.ok) {
    const data = (await response.json()) as BookList;
    return data;
  }

  const error = (await response.json()) as ApiError;

  return error;
};
