import React, {memo, useEffect, useState} from "react";
import {View} from "react-native";
import {DefaultText} from "./DefaultText";

interface TextStreamTypes {
  message: string;
  interval: number;
}


const TextStream: React.FC<TextStreamTypes> = (
  {
    message,
    interval
  }
  ) => {

  const [streamedMessage, setStreamedMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);



  return (
    <View style={{ padding: 20 }}>
      <DefaultText>{streamedMessage}</DefaultText>
    </View>
  );
};

export default TextStream;