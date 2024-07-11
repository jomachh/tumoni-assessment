import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerDevice = async (params: DeviceRegisterData) => {
  const response = await fetch(`${Config.API_URL}/device/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (response.ok) {
    const data = (await response.json()) as DeviceRegisterResponse;
    await AsyncStorage.setItem('DeviceUUID', data.uuid);
    return data;
  }

  const error = (await response.json()) as ApiError;
  return error;
};
