import React, {memo, useContext, useState} from "react";

import {
  ScrollView,
} from "react-native";

import {toolStyles as ts} from "../toolStyles";
import {ThemeContext} from "../../Context";
import UniversalTextCreator from "../../../components/container/Tools/UniversalTextCreator";
import TranscribeButton from "../../../components/buttons/TranscribeButton";
import succSpeechToText from "../../../assets/animations/succSpeechToText.json";

// Strings
const placeholderTranscript: string = "Your generated transcript will be shown here";

const heading: string = "Transcribe your thoughts..";

const SpeechToText: React.FC = () => {
  const [transcript, setTranscript] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Context
  const { customTheme } = useContext(ThemeContext);

  const backgroundColor = {backgroundColor: customTheme.primary};

  return(
    <ScrollView style={backgroundColor} contentContainerStyle={ts.justifyAlign}>
      <UniversalTextCreator
        placeholder={placeholderTranscript}
        heading={heading}
        source={""}
        response={transcript}
        setResponse={setTranscript}
        error={error}
        successAnimation={succSpeechToText}
        Content={
          <TranscribeButton
            setTranscript={setTranscript}
            setError={setError}
            transcript={transcript}
          />
        }
      />
    </ScrollView>
  );
}

export default memo(SpeechToText);
