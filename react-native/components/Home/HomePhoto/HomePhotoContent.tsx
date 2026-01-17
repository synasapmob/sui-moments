import { Image } from "react-native";

export default function HomePhotoContent() {
  return (
    <>
      <Image
        source={require("@/assets/images/overlay.png")}
        className="size-full absolute z-[1]"
      />

      <Image
        src="https://media.daily.dev/image/upload/f_auto,q_auto/v1/posts/5596b63ef353c31d117e88e927b8cbe1?_a=AQAEulh"
        className="size-full absolute"
        resizeMode="cover"
      />
    </>
  );
}
