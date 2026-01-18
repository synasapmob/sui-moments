import { Pressable, Text, View } from "react-native";

import CloseLineSVG from "@/assets/line/close.svg";
import HomeCameraAddText from "./HomeCameraAddText";
import { useEffect } from "react";

interface HomeCameraReleaseProps {
  setPhotoUri: React.Dispatch<React.SetStateAction<string | undefined>>;
  setCaptions: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  setScrollEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HomeCameraRelease({
  setPhotoUri,
  setCaptions,
  setScrollEnabled,
}: HomeCameraReleaseProps) {
  useEffect(() => {
    setScrollEnabled(false);

    return () => {
      setScrollEnabled(true);
    };
  }, [setScrollEnabled]);

  return (
    <>
      <Pressable
        className="bg-white/10 border border-white/15 rounded-full size-12 items-center justify-center"
        onPress={() => setPhotoUri(undefined)}
      >
        <CloseLineSVG width={24} height={24} />
      </Pressable>

      <View className="bg-white rounded-full items-center justify-center w-2/3 h-14">
        <Text className="uppercase text-xs font-black">send to people</Text>
      </View>

      <HomeCameraAddText setCaptions={setCaptions} />
    </>
  );
}
