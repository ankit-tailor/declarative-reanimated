import { Link } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SafeAreaView />
      <Link href="/demo-screen">
        <View
          style={{
            backgroundColor: "red",
            padding: 16,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            Navigate to demo screen
          </Text>
        </View>
      </Link>
    </View>
  );
}
