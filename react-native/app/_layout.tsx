import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import "../global.css";
import Home from "./index";

export default function RootLayout() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
      }}
    >
      <SafeAreaView>
        <Home />
      </SafeAreaView>
    </View>
  );
}
