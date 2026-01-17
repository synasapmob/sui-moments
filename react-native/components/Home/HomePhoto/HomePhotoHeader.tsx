import { Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomePhotoHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="w-full h-20 flex-row items-center gap-4 absolute z-[2] px-5"
      style={{
        paddingTop: insets.top + 12,
      }}
    >
      <Image
        src="https://picsum.photos/414/728"
        className="size-11 rounded-full"
        resizeMode="cover"
      />

      <View>
        <Text className="text-white font-black">wanderer</Text>

        <Text className="text-[#BC9898] text-xs font-medium">1day ago</Text>
      </View>
    </View>
  );
}
