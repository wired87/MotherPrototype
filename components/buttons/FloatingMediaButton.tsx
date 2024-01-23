

import { Entypo } from '@expo/vector-icons';
import React, {memo, useCallback, useContext, useState} from 'react';
import {Pressable, StyleSheet, View, ViewProps} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate, StyleProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {MediaContext, ThemeContext} from "../../screens/Context";
import CameraView from "../container/CameraView";

interface FloatingButtonProps extends ViewProps {
}

const FloatingMediaButton:React.FC<FloatingButtonProps> = (
  {
     ...rest
   }
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const animation = useSharedValue(0);
  const { customTheme } = useContext(ThemeContext);
  const { cameraClicked, closeCam } = useContext(MediaContext);


  const iconColor:string = customTheme.text


  const rotationAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withSpring(isOpen ? '45deg' : '0deg'),
        },
      ],
    };
  });


  const customButtonStyles: StyleProps[] = [
    styles.button, {
      backgroundColor: "transparent",
      shadowColor: customTheme.text,
    }, rotationAnimatedStyle];


  const pinAnimatedStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      animation.value,
      [0, 1],
      [0, -20],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        {
          scale: withSpring(animation.value),
        },
        {
          translateY: withSpring(translateYAnimation),
        },
      ],
    };
  });


  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      animation.value,
      [0, 1],
      [0, -30],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        {
          scale: withSpring(animation.value),
        },
        {
          translateY: withSpring(translateYAnimation),
        },
      ],
    };
  });


  const heartAnimatedStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      animation.value,
      [0, 1],
      [0, -40],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        {
          scale: withSpring(animation.value),
        },
        {
          translateY: withSpring(translateYAnimation),
        },
      ],
    };
  });


  const opacityAnimatedStyle = useAnimatedStyle(() => {
    const opacityAnimation = interpolate(
      animation.value,
      [0, 0.5, 1],
      [0, 0, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity: withSpring(opacityAnimation),
    };
  });


  function onPress() {
    setModalOpen((curr) => !curr);
  }


  function toggleMenu() {
    onPress();
    setIsOpen((current) => {
      animation.value = current ? 0 : 1;
      return !current;
    });
  }





  return (
    <View style={[styles.container]} {...rest}>
      <Pressable>
        <Animated.View
          style={[
            styles.button,
            styles.secondary,
            heartAnimatedStyle,
            opacityAnimatedStyle,
          ]}
        >
          <Entypo name="document" size={24} color={iconColor} />
        </Animated.View>
      </Pressable>

      <Pressable>
        <Animated.View
          style={[
            styles.button,
            styles.secondary,
            thumbAnimatedStyle,
            opacityAnimatedStyle,
          ]}
        >
          <Entypo name="image" size={24} color={iconColor} />
        </Animated.View>
      </Pressable>

      <Pressable onPress={closeCam}>
        <Animated.View
          style={[
            styles.button,
            styles.secondary,
            pinAnimatedStyle,
            opacityAnimatedStyle,
          ]}
        >
          <Entypo name="camera" size={24} color={iconColor} />
        </Animated.View>
      </Pressable>

      <Pressable onPress={toggleMenu}>
        <Animated.View style={customButtonStyles}>
          <Entypo name="plus" size={24} color={customTheme.text} />
        </Animated.View>
      </Pressable>
    </View>
  );
}

export default memo(FloatingMediaButton);


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding:0,
    position: "absolute",
    left: 0,
    bottom: 5,
    width:40
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    color: "black",
  },

  secondary: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
});


/*
SHADOW
 shadowOpacity: 0.3,
    shadowOffset: { height: 10, width: 10 },
    elevation: 10,
    shadowRadius: 10,
 */