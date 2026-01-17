import { Dimensions, Image, Pressable, ScrollView, View } from "react-native";
import HomePhotoHeader from "./HomePhotoHeader";
import HomePhotoReply from "./HomePhotoReply";
import HomePhotoContent from "./HomePhotoContent";
import { useRef } from "react";
import HomePhotoActivity from "./HomePhotoActivity";
import HomeCamera from "../HomeCamera";

export default function HomePhoto() {
  const scrollViewRef = useRef<ScrollView>(null);

  const { height: SCREEN_HEIGHT } = Dimensions.get("screen");

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal={false}
      pagingEnabled={true}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ height: SCREEN_HEIGHT }}>
        <HomeCamera />
      </View>

      {[...Array(10)].map((_, index) => {
        return (
          <View key={index} style={{ height: SCREEN_HEIGHT }}>
            <HomePhotoContent />

            <HomePhotoHeader />

            {Math.ceil(Math.random() * 2) === 1 ? (
              <HomePhotoReply />
            ) : (
              <HomePhotoActivity />
            )}

            <View className="w-full absolute bottom-0 z-[2] pb-6 items-center">
              <Pressable
                onPress={() => {
                  scrollViewRef.current?.scrollTo({ x: 0, y: 0 });
                }}
              >
                <Image
                  source={require("@/assets/icons/btn-camera.png")}
                  className="size-14"
                />
              </Pressable>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
