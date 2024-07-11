import {useEffect, useState} from 'react';
import {View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import * as Keychain from 'react-native-keychain';
import {signInStyles} from '../styles/screens/SignIn.styles';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/react-navigation';
import {SCREENS} from '../constants/screens';
import {useAuth} from '../hooks/useAuth';
import {isApiError} from '../utils/isApiError';
import {getUser} from '../services/user';

type Props = NativeStackScreenProps<RootStackParamList, SCREENS.SIGNUP>;

export const SignUp = ({navigation}: Props) => {
  const {signUp, signIn, updateUser} = useAuth();

  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async () => {
    const signUpRes = await signUp({
      email,
      username,
      password,
    });

    if (isApiError(signUpRes)) {
      setError(signUpRes.message);
      return;
    }

    const signInRes = await signIn({
      username,
      password,
    });

    if (isApiError(signInRes)) {
      setError(signInRes.message);
      return;
    }

    const user = await getUser();

    if (isApiError(user)) {
      await Keychain.resetGenericPassword();
      setError(user.message);
      return;
    }

    updateUser(user);
    navigation.replace(SCREENS.HOME);
  };

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: error,
        onHide: () => setError(''),
        position: 'bottom',
      });
    }
  }, [error]);

  return (
    <View style={signInStyles.container}>
      <TextInput
        label="Username"
        value={username}
        autoCapitalize="none"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        label="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={toggleShowPassword}
          />
        }
      />
      <Button mode="contained" onPress={handleSubmit}>
        Continue
      </Button>
      <Button onPress={() => navigation.replace(SCREENS.SIGNIN)}>
        Already have an account? Sign In
      </Button>
    </View>
  );
};
