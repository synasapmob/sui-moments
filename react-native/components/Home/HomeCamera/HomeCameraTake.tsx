import { CameraType, CameraView } from "expo-camera";
import { Animated, Pressable, View, ActivityIndicator } from "react-native";
import CameraFillSVG from "@/assets/fill/camera.svg";
import RotateLineSVG from "@/assets/line/rotate.svg";
import ImageLineSVG from "@/assets/line/image.svg";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";

interface HomeCameraTakeProps {
  cameraRef: React.RefObject<CameraView | null>;
  setPhotoUri: React.Dispatch<React.SetStateAction<string | undefined>>;
  setFlip: React.Dispatch<React.SetStateAction<CameraType>>;
}

export default function HomeCameraTake({
  cameraRef,
  setPhotoUri,
  setFlip,
}: HomeCameraTakeProps) {
  const [loading, setLoading] = useState<string>();

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleFadeAnimate = (toValue: number) => {
    Animated.timing(fadeAnim, {
      toValue,
      duration: 20,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <Pressable
        className="relative size-20 items-center justify-center"
        disabled={!!loading?.length}
        onPress={async () => {
          try {
            setLoading("upload");

            // https://docs.expo.dev/versions/latest/sdk/imagepicker/
            // No permissions request is necessary for launching the image library.
            // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
            // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
            // so the app users aren't surprised by a system dialog after picking a video.
            // See "Invoke permissions for videos" sub section for more details.
            const permissionResult =
              await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permissionResult.granted) {
              alert("Permission to access the media library is required.");

              return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ["images", "videos"],
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            if (!result.canceled) {
              setPhotoUri(result.assets[0].uri);
            }
          } finally {
            setLoading(undefined);
          }
        }}
      >
        {loading === "upload" ? (
          <View className="size-14 absolute items-center justify-center">
            <ActivityIndicator color="white" />
          </View>
        ) : null}

        <ImageLineSVG
          width={56}
          height={56}
          style={{
            opacity: loading === "upload" ? 0.6 : undefined,
          }}
        />
      </Pressable>

      <Animated.View style={{ opacity: fadeAnim }}>
        <Pressable
          disabled={!!loading?.length}
          onPress={async () => {
            try {
              if (!cameraRef?.current) return;

              // Fade out when taking photo
              handleFadeAnimate(0.7);

              setLoading("take");

              const photo = await cameraRef.current.takePictureAsync({
                quality: 0.8,
                skipProcessing: true,
                exif: false,
                base64: false,
                imageType: "jpg",
              });

              setPhotoUri(photo.uri);
            } finally {
              // Fade back in when done
              handleFadeAnimate(1);

              setLoading(undefined);
            }
          }}
        >
          <CameraFillSVG width={80} height={80} />
        </Pressable>
      </Animated.View>

      <Pressable
        className="bg-[#18181B] border border-white/10 size-20 rounded-full items-center justify-center"
        onPress={() => {
          setFlip((prev) => (prev === "back" ? "front" : "back"));
        }}
      >
        <RotateLineSVG width={36} height={36} />
      </Pressable>
    </>
  );
}
