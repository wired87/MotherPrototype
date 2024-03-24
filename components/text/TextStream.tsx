import React, {useCallback, useContext, useEffect, useState} from "react";
import {DefaultText} from "./DefaultText";
import {inputStyles} from "../input/styles";
import {ThemeContext} from "../../screens/Context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface TextStreamTypes {
  message: string;
  icon?: string;
}


const TextStream: React.FC<TextStreamTypes> = (
  {
    message,
    icon,
  }
  ) => {
  const [streamedMessage, setStreamedMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Context
  const { customTheme } = useContext(ThemeContext);

  // STYLES
  const defaultTextColor = {color: customTheme.text};
  const moreHeadingStreamInputStyles:object[] = [inputStyles.streamHeadingInput, defaultTextColor, ];


  useEffect(() => {
    if (currentIndex < message.length) {
      const timer: NodeJS.Timeout = setTimeout(() => {
        setStreamedMessage(prevMessage => prevMessage + message.charAt(currentIndex));
        setCurrentIndex((prevIndex: number) => prevIndex + 1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, message]);

  const extraIcon = useCallback(() => {
    if (icon && icon.length > 0) {
      return <MaterialCommunityIcons name={icon} color={customTheme.text} size={30}/>
    }
  }, [])

  return (
    <>
      <DefaultText text={streamedMessage} moreStyles={moreHeadingStreamInputStyles} />
      {
        extraIcon()
      }
    </>
  );
};

export default TextStream;