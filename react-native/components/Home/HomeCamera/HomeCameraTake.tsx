import { CameraType, CameraView } from "expo-camera";
import { Image, Pressable, View } from "react-native";

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
      <Image
        source={require("@/assets/icons/btn-image.png")}
        className="size-14"
      />

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
        <Image
          source={require("@/assets/icons/btn-camera.png")}
          className="size-20"
        />
      </Pressable>

      <View className="bg-[#18181B] border border-white/10 size-20 rounded-full items-center justify-center">
        <Pressable
          onPress={() => {
            setFlip((prev) => (prev === "back" ? "front" : "back"));
          }}
        >
          <Image
            source={require("@/assets/icons/btn-flip.png")}
            className="size-10"
          />
        </Pressable>
      </View>
    </>
  );
}
