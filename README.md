# useAnimations

## 🚀 How to use

```jsx
import Animated, { Easing, useSharedValue } from "react-native-reanimated";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAnimations } from "../core/useAnimations";
import { Link } from "expo-router";

export default function Box() {
  const isMounted = useSharedValue(false);

  const animatedStyles = useAnimations({
    initial: {
      opacity: 0,
      transform: [{ translateY: 200 }],
    },
    animate: {
      opacity: 1,
      transform: [{ translateY: 100 }],
    },
    transition: {
      type: "timing",
      duration: 1000,
    },
  });

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
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
      <Animated.View style={[animatedStyles]} />
      <Link href="/">Go to home screen</Link>
    </View>
  );
}
```
