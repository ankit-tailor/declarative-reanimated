import Animated, { Easing, useSharedValue } from "react-native-reanimated";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAnimations } from "../core/useAnimations";
import { Link } from "expo-router";

export default function Box() {
  const isMounted = useSharedValue(false);

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

  const animatedStyles = useAnimations({
    initial: {
      opacity: 0,
      transform: [{ translateY: 200 }],
    },
    animate: {
      opacity: 1,
      transform: [{ translateY: 100 }],
      rotateX: "180deg",
    },
    transition: {
      type: "timing",
      duration: 1000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    },
    // isMounted,
  });

  // React.useEffect(() => {
  //   // isMounted.value = true;
  // }, [isMounted]);

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Pressable
        onPress={() => {
          isMounted.value = isMounted.value ? false : true;
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
      <Animated.View style={[styles.box, animatedStyles]} />
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
