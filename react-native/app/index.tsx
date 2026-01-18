import HomeAuthenticate from "@/components/Home/HomeAuthenticate";
import HomePhoto from "@/components/Home/HomePhoto";
import { useState } from "react";
import { View } from "react-native";

export default function Home() {
  const [account, setAccount] = useState(false);

  // if (!account) {
  //   return <HomeAuthenticate setAccount={setAccount} />;
  // }

  return (
    <View className="flex-1">
      <HomePhoto />
    </View>
  );
}
