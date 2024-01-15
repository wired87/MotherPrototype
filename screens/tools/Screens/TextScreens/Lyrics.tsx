import {memo, useContext, useState} from "react";

import React from "react";
import {PrimaryContext, ToolContext} from "../../../Context";
import UniversalTextCreator from "../../../../components/container/Tools/UniversalTextCreator";
import {DefaultInput} from "../../../../components/input/DefaultInput";
import {Vibration} from "react-native";
import {TEXT_REQUEST_URL} from "@env";
import lyric from "../../../../assets/animations/lyric.json";
import {getLanguage} from "../../../../AppFunctions";

//STRINGS
const heading:string = "Create Song text's...";

// INT
const maxLengthSmall:number = 100;
const maxLengthBig:number = 200;


const placeholder:string = `Your written Tex will be shown here...`





const LyricsMain: React.FC  = () => {

  const [genre, setGenre] = useState<string>("");
  const [extraInfos, setExtraInfos] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [editable, setEditable] = useState<boolean>(false);
  const [fieldError, setFieldError] = useState<string>("");

  // CONTEXT
  const {user } = useContext(PrimaryContext);
  const {toolPostRequest } = useContext(ToolContext);

  const getLyricsPostObject = ():object => {
    return {
      "user_id": user?.uid,
      "input_type": "lyric",
      "genre": genre,
      "extraInfos": extraInfos,
      "language": getLanguage(),
    }
  }
  const sendData = async () => {
    if (genre.length == 0) {
      Vibration.vibrate();
      setFieldError("Please provide a Genre fro good results");
      return;
    }
    await toolPostRequest(
      TEXT_REQUEST_URL,
      getLyricsPostObject(),
      setError,
      setResponse
    )
  };
  return(
    <>
      <UniversalTextCreator
        placeholder={placeholder}
        editable={editable}
        heading={heading}
        source={lyric}
        response={response}
        sendData={sendData}
        setResponse={setResponse}
        error={error}
        Content={
          <>
            <DefaultInput
              label={"Genre"}
              placeholder={"Rap, Pop,..."}
              value={genre}
              onChangeAction={setGenre}
              extraStyles={{}}
              max_length= {maxLengthSmall}
              recordingOption
              showClearButton
            />
            <DefaultInput
              label={"Extra Information's"}
              placeholder={"Content about"}
              value={extraInfos}
              onChangeAction={setExtraInfos}
              extraStyles={{}}
              max_length={maxLengthBig}
              recordingOption
              showClearButton
            />
          </>
        }
      />
    </>
  );
}


export default memo(LyricsMain);
