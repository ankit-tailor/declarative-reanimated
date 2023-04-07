import React from "react";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const transitionConfig = (transition: any, _key: any) => {
  "worklet";

  const { type, duration, delay, easing } = transition;

  let config = {} as any;

  let animationFn = (...props: any) => props;

  if (type === "timing") {
    animationFn = withTiming;
  } else if (type === "spring") {
    animationFn = withSpring;
  } else if (type === "delay") {
    animationFn = withDelay;
  } else {
    animationFn = withTiming;
  }

  config.duration = duration ?? 0;
  config.delay = delay ?? 0;
  config.easing = easing ?? Easing.linear;

  return {
    animationFn,
    config,
  };
};

export const useAnimations = (props: any) => {
  const isMounted = useSharedValue(false);

  const { initial, animate, exit, transition } = props;

  const finalStyles = useAnimatedStyle(() => {
    let animatedStyles = {} as any;

    let finalAnimatedStyles = {} as any;

    if (!isMounted.value) {
      animatedStyles = initial;
    } else {
      animatedStyles = Object.assign({}, initial, animate);
    }

    const { animationFn, config: animationConfiguration } = transitionConfig(
      transition,
      ""
    );

    Object.keys(animatedStyles).forEach((key) => {
      if (Array.isArray(animatedStyles?.[key])) {
        finalAnimatedStyles[key] = animatedStyles?.[key].map((item: any) => {
          const transformCurrentObject = {} as any;
          Object.keys(item).map((key) => {
            transformCurrentObject[key] = animationFn(
              item?.[key],
              animationConfiguration
            );
          });
          return transformCurrentObject;
        });
      } else {
        finalAnimatedStyles[key] = animationFn(
          animatedStyles?.[key],
          animationConfiguration
        );
      }
    });

    return finalAnimatedStyles;
  }, [props, isMounted]);

  React.useEffect(() => {
    isMounted.value = true;
    () => {
      console.log("unmounting");
    };
  }, [isMounted]);

  return finalStyles;
};
