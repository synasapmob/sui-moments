import { useEffect } from "react";
import { Text, View } from "react-native";
import Draggable from "react-native-draggable";

interface HomeCameraCaptionsProps {
  captions: string[] | undefined;
  setCaptions: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}

export default function HomeCameraCaptions({
  captions,
  setCaptions,
}: HomeCameraCaptionsProps) {
  useEffect(() => {
    return () => {
      setCaptions(undefined);
    };
  }, [setCaptions]);

  return (
    <>
      {captions?.length
        ? captions.map((caption, index) => (
            <View key={index} className="z-[1]">
              <Draggable
                x={150}
                y={200}
                onPressIn={() => {}}
                onPressOut={() => {}}
                onDrag={() => {}}
                onRelease={() => {}}
              >
                <Text className="text-black bg-white p-1.5">{caption}</Text>
              </Draggable>
            </View>
          ))
        : null}
    </>
  );
}
