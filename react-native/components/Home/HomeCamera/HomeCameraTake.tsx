import { CameraType, CameraView } from "expo-camera";
import { Pressable, View } from "react-native";
import CameraFillSVG from "@/assets/fill/camera.svg";
import RotateLineSVG from "@/assets/line/rotate.svg";
import ImageLineSVG from "@/assets/line/image.svg";

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
  return (
    <>
      <View className="size-20 items-center justify-center">
        <ImageLineSVG width={56} height={56} />
      </View>

      <Pressable
        onPress={async () => {
          if (!cameraRef?.current) return;

          const photo = await cameraRef.current.takePictureAsync({
            quality: 1,
            skipProcessing: false,
          });

          setPhotoUri(photo.uri);
        }}
      >
        <CameraFillSVG width={80} height={80} />
      </Pressable>

      <View className="bg-[#18181B] border border-white/10 size-20 rounded-full items-center justify-center">
        <Pressable
          onPress={() => {
            setFlip((prev) => (prev === "back" ? "front" : "back"));
          }}
        >
          <RotateLineSVG width={36} height={36} />
        </Pressable>
      </View>
    </>
  );
}
