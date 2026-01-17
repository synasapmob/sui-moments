import { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Emoji from "react-native-emoji";

export default function HomePhotoReply() {
  const [inputValue, setInputValue] = useState("");

  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <>
      {/* Overlay background when keyboard is open */}
      {isInputFocused && (
        <View className="size-full absolute z-[1] bg-black/60" />
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 px-5"
        keyboardVerticalOffset={-80}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="size-full justify-end pb-[calc(48px+24px+20px)] z-[2]">
            <View className="bg-black/40 rounded-3xl border border-white/10 shadow-[0px_25px_50px_12px_#00000040]">
              <View className="w-full flex-row items-center gap-2 p-1.5">
                <View className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-full">
                  <TextInput
                    className="text-white font-semibold"
                    placeholder="Reply..."
                    placeholderTextColor="rgba(255, 255, 255, 0.3)"
                    value={inputValue}
                    onChangeText={setInputValue}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                  />
                </View>

                <View className="flex-row gap-1">
                  {["cry", "joy", "heart_eyes"].map((meta) => (
                    <Emoji key={meta} name={meta} className="text-[1.5rem]" />
                  ))}

                  <Image
                    source={require("@/assets/icons/btn-more.png")}
                    className="size-7"
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}
