import React, {useContext, useEffect, useState} from "react";
import {View} from "react-native";
import {DefaultText} from "./DefaultText";
import {inputStyles} from "../input/styles";
import {ThemeContext} from "../../screens/Context";

interface TextStreamTypes {
  message: string;
}


const TextStream: React.FC<TextStreamTypes> = (
  {
    message,
  }
  ) => {
  const [streamedMessage, setStreamedMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Context
  const { customTheme } = useContext(ThemeContext);

  // STYLES
  const defaultTextColor = {color: customTheme.text};
  const moreHeadingStreamInputStyles = [inputStyles.streamHeadingInput, defaultTextColor];


  useEffect(() => {
    if (currentIndex < message.length) {
      const timer: NodeJS.Timeout = setTimeout(() => {
        setStreamedMessage(prevMessage => prevMessage + message.charAt(currentIndex));
        setCurrentIndex((prevIndex: number) => prevIndex + 1);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, message]);

  return (
    <DefaultText text={streamedMessage} moreStyles={moreHeadingStreamInputStyles} />
  );
};

export default TextStream;