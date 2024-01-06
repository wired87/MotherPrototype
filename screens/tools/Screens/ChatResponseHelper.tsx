import React, {memo, useContext, useMemo, useState} from "react";

import {
  ScrollView,
} from "react-native";

import {toolStyles as ts} from "../toolStyles";
import {ThemeContext} from "../../Context";
import UniversalTextCreator from "../../../components/container/Tools/UniversalTextCreator";
import {DefaultInput} from "../../../components/input/DefaultInput";
import {DefaultButton} from "../../../components/buttons/DefaultButton";

// Strings
const placeholderTranscript: string = "The forward text responses will be shown here...";
const buttonText = "Generate Answers";
const heading: string = "Transcribe your thoughts..";

const ChatResponseHelper: React.FC = () => {
  const [response, setResponse] = useState<string>("");
  const [editable, setEditable] = useState<boolean>(false);
  const [input, setInput]= useState<string>("");

  // Context
  const { customTheme } = useContext(ThemeContext);

  const backgroundColor = {backgroundColor: customTheme.primary};











  const Content = useMemo(() => {
    return(<>
            <DefaultInput
      value={input}
      placeholder={"Provide me all context that could be relevant..."}
      onChangeAction={setInput}
      editable={true}
      keyboardType={undefined}
      extraStyles={undefined}
      multiline={true}
      numberOfLines={12}
    />
    <DefaultButton
      extraStyles={undefined}
      onPressAction={handlePostPress}
      text={buttonText}
      secondIcon={undefined}
    />
  </>

    );

  }, []);




  return(
    <ScrollView style={backgroundColor} contentContainerStyle={ts.justifyAlign}>
      <UniversalTextCreator
        value={response}
        placeholder={placeholderTranscript}
        editable={editable}
        changeText={setResponse}
        heading={heading}
        Content={

        }
      />
    </ScrollView>
  );
}

export default memo(ChatResponseHelper);

