import {useEffect, useRef} from 'react';
import {View, Animated} from 'react-native';
import {dotsLoaderStyles} from '../../styles/ui/DotsLoader.styles';

interface DotsLoaderProps {
  color?: string;
}

export const DotsLoader = ({color = 'grey'}: DotsLoaderProps) => {
  const dotOne = useRef(new Animated.Value(0)).current;
  const dotTwo = useRef(new Animated.Value(0)).current;
  const dotThree = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(dotOne, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dotTwo, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(dotThree, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dotOne, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(dotTwo, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dotThree, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <View style={dotsLoaderStyles.container}>
      <Animated.View
        style={[
          dotsLoaderStyles.dot,
          {
            backgroundColor: color,
            opacity: dotOne,
          },
        ]}
      />
      <Animated.View
        style={[
          dotsLoaderStyles.dot,
          {
            backgroundColor: color,
            opacity: dotTwo,
          },
        ]}
      />
      <Animated.View
        style={[
          dotsLoaderStyles.dot,
          {
            backgroundColor: color,
            opacity: dotThree,
          },
        ]}
      />
    </View>
  );
};
