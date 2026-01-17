import { SafeAreaView } from "react-native-safe-area-context";

import Home from "./index";

import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#000",
      }}
    >
      <Home />
    </SafeAreaView>
  );
}
