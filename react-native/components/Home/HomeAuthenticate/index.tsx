import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface HomeAuthenticateProps {
  setAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HomeAuthenticate({
  setAccount,
}: HomeAuthenticateProps) {
  return (
    <SafeAreaView>
      <View className="gap-8 p-10 h-full justify-between">
        <View className="gap-8 items-center">
          <View className="bg-[#F0B100] size-24 rounded-3xl shadow-[0px_25px_50px_-12px_#F0B10033]" />

          <View className="items-center">
            <Text className="text-[#F0B100] text-5xl font-black">
              Sui-moments
            </Text>

            <Text className="text-white/40 text-sm font-bold">
              Live moments for your inner circle
            </Text>
          </View>
        </View>

        <View className="gap-6">
          <View className="gap-3">
            <Pressable
              className="bg-white rounded-2xl h-12 items-center justify-center flex-row gap-3"
              onPress={() => setAccount(true)}
            >
              <Image
                source={require("@/assets/icons/google.png")}
                style={{
                  width: 24,
                  height: 24,
                }}
              />

              <Text className="text-black font-black">
                Continue with Google
              </Text>
            </Pressable>

            <Pressable
              className="bg-[#1877F2] rounded-2xl h-12 items-center justify-center flex-row gap-3"
              onPress={() => setAccount(true)}
            >
              <Image
                source={require("@/assets/icons/facebook.png")}
                style={{
                  width: 24,
                  height: 24,
                }}
              />

              <Text className="text-white font-black">
                Continue with Google
              </Text>
            </Pressable>
          </View>

          <Text className="text-white/25 uppercase text-center font-bold text-xs">
            {`By continuing, you agree to share your real
          moments with people who actually care.`}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
