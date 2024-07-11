import {NavigationContainer as NavContainer} from '@react-navigation/native';
import {useEffect, useMemo, useState} from 'react';
import Toast from 'react-native-toast-message';
import {AuthContext} from '../context/AuthContext';
import {signIn, signOut, signUp} from '../services/auth';
import {StackNavigator} from './routes/stack';
import {useOpenApp} from '../hooks/useOpenApp';
import {Splash} from '../screens/Splash';

export const NavigationContainer = () => {
  const [user, setUser] = useState<User | null>(null);
  const {loading, error} = useOpenApp({setUser});

  const authContext = useMemo<AuthContextData>(
    () => ({
      user,
      signIn,
      signOut,
      signUp,
      updateUser: (user: User | null) => setUser(user),
    }),
    [user],
  );

  useEffect(() => {
    if (error?.message) {
      Toast.show({
        type: 'error',
        text1:
          error?.status === 401 ? "You're session has expired" : error.message,
        position: 'bottom',
      });
    }
  }, [error]);

  if (loading) {
    return <Splash />;
  }

  return (
    <NavContainer>
      <AuthContext.Provider value={authContext}>
        <StackNavigator user={user} />
      </AuthContext.Provider>
    </NavContainer>
  );
};
