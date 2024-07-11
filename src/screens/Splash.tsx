import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {DotsLoader} from '../components/ui/DotsLoader';
import {splashStyles} from '../styles/screens/Splash.styles';

export const Splash = () => {
  const theme = useTheme();

  return (
    <View
      style={[splashStyles.container, {backgroundColor: theme.colors.primary}]}>
      <DotsLoader color="white" />
    </View>
  );
};
