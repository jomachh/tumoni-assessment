import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS} from '../../constants/screens';
import {Home} from '../../screens/Home';
import CustomNavigationBar from '../../components/ui/CustomNavigationBar';
import {SignIn} from '../../screens/SignIn';
import {SignUp} from '../../screens/SignUp';

const Stack = createNativeStackNavigator();

interface StackNavigatorProps {
  user: User | null;
}

export const StackNavigator = ({user}: StackNavigatorProps) => (
  <Stack.Navigator
    initialRouteName={user ? SCREENS.HOME : SCREENS.SIGNIN}
    screenOptions={{
      header: props => <CustomNavigationBar {...props} />,
    }}>
    <Stack.Screen name={SCREENS.HOME} component={Home} />
    <Stack.Screen name={SCREENS.SIGNIN} component={SignIn} />
    <Stack.Screen name={SCREENS.SIGNUP} component={SignUp} />
  </Stack.Navigator>
);
