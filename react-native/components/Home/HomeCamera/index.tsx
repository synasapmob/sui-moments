import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import { CameraType, CameraView } from "expo-camera";
import { useRef, useState } from "react";
import HomeCameraTake from "./HomeCameraTake";
import HomeCameraAuthorize from "./HomeCameraAuthorize";
import HomeCameraRelease from "./HomeCameraRelease";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeCamera() {
  const cameraRef = useRef<CameraView>(null);

  const [flip, setFlip] = useState<CameraType>("front");
  const [photoUri, setPhotoUri] = useState<string>();

  const { width: SCREEN_WIDTH } = Dimensions.get("screen");

  return (
    <SafeAreaView>
      <HomeCameraAuthorize>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={58}
        >
          <View
            className="overflow-hidden rounded-[2rem] mb-12"
            style={{
              width: SCREEN_WIDTH - 40,
              height: 345,
            }}
          >
            {photoUri?.length ? (
              <Image src={photoUri} style={{ flex: 1 }} />
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

          {photoUri?.length ? (
            <View>
              <HomeCameraRelease setPhotoUri={setPhotoUri} />
            </View>
          ) : (
            <View className="flex-row justify-between items-center">
              <HomeCameraTake
                cameraRef={cameraRef}
                setPhotoUri={setPhotoUri}
                setFlip={setFlip}
              />
            </View>
          )}
        </KeyboardAvoidingView>

        {!photoUri?.length ? (
          <View className="gap-2 opacity-30 items-center">
            <Text className="text-white text-sm uppercase font-black">
              Scroll for Moments
            </Text>

            <Image
              source={require("@/assets/icons/btn-arrow.png")}
              className="size-6"
            />
          </View>
        ) : null}
      </HomeCameraAuthorize>
    </SafeAreaView>
  );
}
