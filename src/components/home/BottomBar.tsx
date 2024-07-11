import {View} from 'react-native';
import {Icon, Text, useTheme, TouchableRipple} from 'react-native-paper';
import {bottomBarStyles} from '../../styles/components/BottomBar.styles';

interface BottomBarProps {
  signOut: () => void;
  refresh: () => Promise<void>;
}

export const BottomBar = ({signOut, refresh}: BottomBarProps) => {
  const theme = useTheme();
  return (
    <View
      style={[
        bottomBarStyles.container,
        {backgroundColor: theme.colors.primary},
      ]}>
      <TouchableRipple
        style={bottomBarStyles.touchable}
        onPress={signOut}
        rippleColor="rgba(0, 0, 0, .32)">
        <View style={bottomBarStyles.item}>
          <Icon size={32} source="account-arrow-left" color="white" />
          <Text style={bottomBarStyles.itemText}>Sign out</Text>
        </View>
      </TouchableRipple>
      <TouchableRipple
        style={bottomBarStyles.touchable}
        onPress={() => refresh()}
        rippleColor="rgba(0, 0, 0, .32)">
        <View style={bottomBarStyles.item}>
          <Icon size={32} source="reload" color="white" />
          <Text style={bottomBarStyles.itemText}>Refresh</Text>
        </View>
      </TouchableRipple>
    </View>
  );
};
