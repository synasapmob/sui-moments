import { useState } from "react";
import {
  Image,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import CloseLineSVG from "@/assets/line/close.svg";

interface HomeCameraReleaseProps {
  setPhotoUri: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function HomeCameraRelease({
  setPhotoUri,
}: HomeCameraReleaseProps) {
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <TextInput
          placeholder="Add a caption"
          placeholderTextColor="rgba(255, 255, 255, 0.3)"
          className="bg-white/10 border border-white/15 w-full h-14 rounded-full px-4 text-white font-semibold"
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
      </TouchableWithoutFeedback>

      <View
        className="flex-row items-center justify-between mt-4"
        style={{
          display: isInputFocused ? "none" : "flex",
        }}
      >
        <Pressable
          onPress={() => setPhotoUri(undefined)}
          className="bg-white/10 border border-white/15 rounded-full size-12 items-center justify-center"
        >
          <CloseLineSVG width={24} height={24} />
        </Pressable>

        <View className="bg-white rounded-full items-center justify-center h-14 gap-2 w-[80%]">
          <Text className="uppercase text-xs font-black">send to people</Text>
        </View>
      </View>
    </>
  );
}
