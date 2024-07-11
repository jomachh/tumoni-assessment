import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import {getBrand, getModel} from 'react-native-device-info';
import {registerDevice} from '../services/device';
import {getUser} from '../services/user';
import {isApiError} from '../utils/isApiError';

interface useOpenAppProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const useOpenApp = ({setUser}: useOpenAppProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const verifySession = async () => {
    const DeviceUUID = await AsyncStorage.getItem('DeviceUUID');

    if (!DeviceUUID) {
      await registerDevice({
        brand: getBrand(),
        model: getModel(),
      });
      return;
    }

    const user = await Keychain.getGenericPassword();

    if (!user) {
      return;
    }

    const data = await getUser();

    if (isApiError(data)) {
      await Keychain.resetGenericPassword();
      setError(data);
      return;
    }

    setUser(data);
  };

  useEffect(() => {
    verifySession().finally(() => setLoading(false));
  }, []);

  return {loading, error};
};
