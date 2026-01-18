import { useState } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import Emoji from "react-native-emoji";
import MessageLineSVG from "@/assets/line/message.svg";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function HomePhotoActivity() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(SCREEN_HEIGHT));

  const openDrawer = () => {
    setDrawerVisible(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      damping: 20,
      stiffness: 100,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setDrawerVisible(false);
    });
  };

  return (
    <>
      <View className="size-full justify-end pb-[calc(48px+24px+20px)] z-[2]">
        <View className="px-5">
          <TouchableOpacity onPress={openDrawer} activeOpacity={0.8}>
            <View className="p-3 bg-black/40 border border-white/10 rounded-3xl shadow-[0px_25px_50px_12px_#00000040]">
              <Text className="text-white/50 text-sm font-black">
                Post Activity
              </Text>

              <View className="bg-white/10 border border-white/10 rounded-3xl px-3 py-2.5 mt-3">
                <View className="gap-1.5 flex-row items-center">
                  {[...Array(3)].map((_, index) => (
                    <Image
                      key={index}
                      src="https://media.daily.dev/image/upload/f_auto,q_auto/v1/posts/5596b63ef353c31d117e88e927b8cbe1?_a=AQAEulh"
                      resizeMode="cover"
                      className="rounded-full"
                      style={{
                        width: 32,
                        height: 32,
                      }}
                    />
                  ))}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={drawerVisible}
        transparent
        animationType="none"
        onRequestClose={closeDrawer}
      >
        <TouchableWithoutFeedback onPress={closeDrawer}>
          <View className="flex-1 bg-black/50">
            <TouchableWithoutFeedback>
              <Animated.View
                className="absolute bottom-0 left-0 right-0 bg-[#09090B] rounded-t-[2rem]"
                style={{
                  transform: [{ translateY: slideAnim }],
                }}
              >
                <View className="px-5 py-6 gap-10">
                  <ScrollView
                    style={{
                      maxHeight: 420,
                      minHeight: 280,
                    }}
                  >
                    <View className="gap-3">
                      {[...Array(5)].map((_, index) => (
                        <View
                          key={index}
                          className="flex-row items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3"
                        >
                          <View className="flex-row gap-4">
                            <Image
                              src="https://media.daily.dev/image/upload/f_auto,q_auto/v1/posts/5596b63ef353c31d117e88e927b8cbe1?_a=AQAEulh"
                              resizeMode="cover"
                              className="rounded-full"
                              style={{
                                width: 40,
                                height: 40,
                              }}
                            />

                            <View>
                              <Text className="text-sm text-white font-bold">
                                alex_j
                              </Text>

                              <Text className="text-xs text-white/20 font-bold">
                                Reacted • 2m ago
                              </Text>
                            </View>
                          </View>

                          <View className="flex-row items-center gap-4">
                            <Emoji name="heart" className="text-2xl" />

                            <View className="w-[0.0625rem] h-6 bg-white/10" />

                            <View className="bg-[#F0B1001A] items-center justify-center size-8 rounded-xl">
                              <MessageLineSVG width={16} height={16} />
                            </View>
                          </View>
                        </View>
                      ))}
                    </View>
                  </ScrollView>

                  <TouchableOpacity
                    className="bg-white w-full h-11 items-center justify-center rounded-2xl"
                    onPress={closeDrawer}
                  >
                    <Text className="text-black font-black">Close</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
