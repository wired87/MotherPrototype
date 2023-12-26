import React, {Dispatch, memo, SetStateAction, useCallback, useMemo, useState} from "react";
import {SafeAreaView} from "react-native";
import {DefaultInput} from "../../components/input/DefaultInput";
import {toolStyles as ts} from "./toolStyles";

// Strings
const placeholderTranscript = "Your generated transcript";




interface SpeechToTextTypes {

}


const SpeechToText: React.FC<SpeechToTextTypes> = () => {
  const [transcript, setTranscript] = useState<string | undefined>(undefined);
  const [editable, setEditable] = useState<boolean>(false);

  const handleChangeInput = useCallback(() => {
    setEditable(true);
  }, [transcript])

  return(
    <SafeAreaView>



      <DefaultInput
        editable={editable}
        placeholder={placeholderTranscript}
        value={transcript}
        onChangeAction={handleChangeInput}
        keyboardType={undefined}
        extraStyles={ts.input}
      />

    </SafeAreaView>
  );
}

export default memo(SpeechToText);