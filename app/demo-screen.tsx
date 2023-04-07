import Animated, { Easing, useSharedValue } from "react-native-reanimated";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAnimations } from "../core/useAnimations";
import { Link } from "expo-router";
import React from "react";

function Shape() {
  const animatedStyles = useAnimations({
    initial: {
      opacity: 0,
      transform: [{ translateY: 200 }],
    },
    animate: {
      opacity: 1,
      transform: [{ translateY: 100 }],
    },
    exit: {
      opacity: 0,
      scale: 0.5,
    },
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 50,
    },
    // isMounted,
  });

  return <Animated.View style={[styles.box, animatedStyles]} />;
}

export default function Box() {
  const isMounted = useSharedValue(false);
  const [trigger, setTrigger] = React.useState(true);

  // const animatedStyles = useAnimatedStyle(() => {
  //   if (isMounted.value) {
  //     return {
  //       opacity: withTiming(1),
  //       transform: [{ scale: withTiming(1) }],
  //     };
  //   } else {
  //     return {
  //       opacity: withTiming(0),
  //       transform: [
  //         {
  //           scale: withTiming(0),
  //         },
  //       ],
  //     };
  //   }
  // });

  // React.useEffect(() => {
  //   // isMounted.value = true;
  // }, [isMounted]);

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Pressable
        onPress={() => {
          isMounted.value = true;
          setTrigger(!trigger);
          console.log("isMounted.value", isMounted.value);
        }}
        style={{
          backgroundColor: "red",
          padding: 16,
          borderRadius: 8,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Click me</Text>
      </Pressable>
      {trigger && <Shape />}
      <Link href="/">Go to home screen</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 150,
    width: 150,
    backgroundColor: "purple",
    borderRadius: 8,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
});
