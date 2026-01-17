import { useCameraPermissions } from "expo-camera";
import { PropsWithChildren, useEffect } from "react";
import { Pressable, Text, View } from "react-native";

export default function HomeCameraAuthorize({ children }: PropsWithChildren) {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission) return;

    if (!permission.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  // ⏳ still loading permission state
  if (!permission) {
    return <View className="flex-1 bg-black" />;
  }

  // 🚫 permission denied
  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white mb-4">Camera permission required</Text>

        <Pressable onPress={requestPermission}>
          <Text className="text-blue-400 font-bold">Grant permission</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="size-full justify-center items-center gap-10 bg-black">
      {children}
    </View>
  );
}
