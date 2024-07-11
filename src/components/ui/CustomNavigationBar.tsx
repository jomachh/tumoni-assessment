import {Appbar, useTheme} from 'react-native-paper';
import {getHeaderTitle} from '@react-navigation/elements';

export default function CustomNavigationBar({
  back,
  route,
  options,
  navigation,
}: any) {
  const theme = useTheme();
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header style={{backgroundColor: theme.colors.primary}}>
      {back ? (
        <Appbar.BackAction color="white" onPress={navigation.goBack} />
      ) : null}
      <Appbar.Content
        color="white"
        title={title}
        titleStyle={{fontWeight: 'bold'}}
      />
    </Appbar.Header>
  );
}
