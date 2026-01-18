import { useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  View,
  TextInput,
  LayoutChangeEvent,
} from "react-native";

import TextSquareFillSVG from "@/assets/fill/text-square.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HomeCameraAddTextProps {
  setCaptions: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}

export default function HomeCameraAddText({
  setCaptions,
}: HomeCameraAddTextProps) {
  const PLACEHOLDER = "Add a caption";

  const insets = useSafeAreaInsets();

  const [isModal, setIsModal] = useState(false);
  const [value, setValue] = useState("");
  const [inputWidth, setInputWidth] = useState(0);

  const handleTextChange = (text: string) => {
    setValue(text);
  };

  const handleTextLayout = (e: LayoutChangeEvent) => {
    const textWidth = e.nativeEvent.layout.width + 32; // padding px-4
    const clampedWidth = Math.min(textWidth, 356);

    setInputWidth(clampedWidth);
  };

  const handleonClose = () => {
    setIsModal(false);

    // add captions
    if (value?.length) {
      setCaptions((prev) => [...(prev || []), value]);
    }

    // fix choppy layout
    setTimeout(() => {
      setInputWidth(0);
      setValue("");
    }, 200);
  };

  return (
    <>
      <Pressable
        className="size-12 items-center justify-center"
        onPress={() => setIsModal(true)}
      >
        <TextSquareFillSVG width={28} height={28} />
      </Pressable>

      <Modal
        visible={isModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleonClose}
      >
        <Pressable
          onPress={handleonClose}
          className="size-full absolute bg-black/45"
        />

        <Pressable onPress={handleonClose}>
          <Text
            className="text-white font-black text-right mr-4 mt-4"
            style={{
              paddingTop: insets.top,
            }}
          >
            Done
          </Text>
        </Pressable>

        <View className="size-full absolute items-center justify-center">
          {/* Hidden text for measuring width */}
          <Text
            className="absolute opacity-0 font-semibold"
            onLayout={handleTextLayout}
            numberOfLines={1}
          >
            {value || PLACEHOLDER}
          </Text>

          <TextInput
            value={value}
            onChangeText={handleTextChange}
            placeholder={PLACEHOLDER}
            autoFocus={true}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            className="backdrop-blur-2xl bg-white/10 border border-white/45 rounded-full px-4 h-10 text-white font-bold"
            style={{
              width: inputWidth,
            }}
          />
        </View>
      </Modal>
    </>
  );
}
