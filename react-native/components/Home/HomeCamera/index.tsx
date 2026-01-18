import { Dimensions, Image, Text, View } from "react-native";
import { CameraType, CameraView } from "expo-camera";
import React, { useRef, useState } from "react";
import HomeCameraTake from "./HomeCameraTake";
import HomeCameraAuthorize from "./HomeCameraAuthorize";
import HomeCameraRelease from "./HomeCameraRelease";
import ChevronLineSVG from "@/assets/line/chevron.svg";
import HomeCameraCaptions from "./HomeCameraCaptions";

interface HomeCameraProps {
  scrollEnabled: boolean;
  setScrollEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HomeCamera({
  scrollEnabled,
  setScrollEnabled,
}: HomeCameraProps) {
  const cameraRef = useRef<CameraView>(null);

  const [flip, setFlip] = useState<CameraType>("front");
  const [captions, setCaptions] = useState<string[]>();
  const [photoUri, setPhotoUri] = useState<string>();

  const { width: SCREEN_WIDTH } = Dimensions.get("screen");

  return (
    <HomeCameraAuthorize>
      <View
        className="relative overflow-hidden rounded-[2rem]"
        style={{
          width: SCREEN_WIDTH - 40,
          height: 345,
        }}
      >
        {photoUri?.length ? (
          <>
            <HomeCameraCaptions captions={captions} setCaptions={setCaptions} />

            <Image
              src={photoUri}
              style={{
                flex: 1,
              }}
            />
          </>
        ) : (
          <CameraView
            ref={cameraRef}
            mirror={true}
            facing={flip}
            style={{
              flex: 1,
            }}
          />
        )}
      </View>

      <View className="w-full px-5 flex-row justify-between items-center">
        {photoUri?.length ? (
          <HomeCameraRelease
            setPhotoUri={setPhotoUri}
            setCaptions={setCaptions}
            setScrollEnabled={setScrollEnabled}
          />
        ) : (
          <HomeCameraTake
            cameraRef={cameraRef}
            setPhotoUri={setPhotoUri}
            setFlip={setFlip}
          />
        )}
      </View>

      {!photoUri?.length ? (
        <View className="gap-2 opacity-30 items-center">
          <Text className="text-white text-sm uppercase font-black">
            Scroll for Moments
          </Text>

          <ChevronLineSVG width={24} height={24} />
        </View>
      ) : null}
    </HomeCameraAuthorize>
  );
}
