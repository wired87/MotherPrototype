import {memo, useCallback, useContext, useState} from "react";
import {PrimaryContext, ThemeContext, ToolContext} from "../../../Context";
import React from "react";
import UniversalTextCreator from "../../../../components/container/Tools/UniversalTextCreator";
import {DefaultInput} from "../../../../components/input/DefaultInput";
import StoryDefault from "../../../../assets/animations/StoryDefault.json";
import {ScrollView, Vibration} from "react-native";
import {TEXT_REQUEST_URL} from "@env";
import {toolStyles as ts} from "../../toolStyles";
import {DefaultText} from "../../../../components/text/DefaultText";

//STRINGS
const heading:string = "Create Story's, Poems and much more...";

// INT
const maxLengthSmall:number = 100;
const maxLengthBig:number = 200;


const placeholder:string = `Your written Tex will be shown here...`



const StoryMain: React.FC  = () => {

  const [storyAbout, setStoryAbout] = useState<string>("");
  const [extraInfos, setExtraInfos] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [kind, setKind] = useState<string>("");
  const [response , setResponse] = useState<string>("");
  const [error , setError] = useState<string>("");
  const [fieldError , setFieldError] = useState<string>("");
  const [editable, setEditable] = useState<boolean>(false);
  const [alreadyRunning, setAlreadyRunning] = useState<boolean>(false);

  // Context
  const {user,loading } = useContext(PrimaryContext);
  const {toolPostRequest } = useContext(ToolContext);
  const {customTheme } = useContext(ThemeContext);

  const getStoryPostObject = ():object => {
    return {
      "user_id": user?.uid,
      "input_type": "story",
      "genre": genre,
      "extraInfos": extraInfos,
      "storyAbout": storyAbout,
      "kind": kind
    }
  }

  const sendData = useCallback(async () => {
    if (kind.length == 0){
      Vibration.vibrate();
      setFieldError("Please provide a Type");
      return;
    }else if (loading) {
      Vibration.vibrate();
      setAlreadyRunning(true);
      return;
    }
    setError("");
    await toolPostRequest(
      TEXT_REQUEST_URL,
      getStoryPostObject(),
      setError,
      setResponse
    )
  }, [kind])


  const fieldErrorText = useCallback(() => {
    if (fieldError && fieldError.length > 0) {
      return(
        <DefaultText text={fieldError}/>
      );
    }
  }, [fieldError])


  return(
    <ScrollView
      automaticallyAdjustsScrollIndicatorInsets
      accessibilityIgnoresInvertColors={true}
      indicatorStyle={"white"}
       showsVerticalScrollIndicator
      style={{backgroundColor: customTheme.primary}}
      contentContainerStyle={ts.justifyAlign}>

    <UniversalTextCreator
      placeholder={placeholder}
      editable={editable}
      heading={heading}
      source={StoryDefault}
      response={response}
      sendData={sendData}
      setResponse={setResponse}
      error={error}
      Content={<>
        <DefaultInput
          label={"Type"}
          placeholder={"Poem, Story,... "}
          value={kind}
          onChangeAction={setKind}
          extraStyles={{}}
          max_length={maxLengthSmall}
          recordingOption
          showClearButton/>

        {fieldErrorText()}

        <DefaultInput
          label={"About "}
          placeholder={"A Spaceship (optional)"}
          value={storyAbout}
          onChangeAction={setStoryAbout}
          extraStyles={{}}
          max_length={maxLengthSmall}
          recordingOption
          showClearButton/>

        <DefaultInput
          label={"Genre"}
          placeholder={"Action, Romantic,... (optional)"}
          value={genre}
          onChangeAction={setGenre}
          extraStyles={{}}
          max_length={maxLengthBig}
          recordingOption
          showClearButton/>

        <DefaultInput
          label={"Extra Information's"}
          placeholder={"Main figure,... (optional)"}
          value={extraInfos}
          onChangeAction={setExtraInfos}
          extraStyles={{}}
          max_length={maxLengthBig}
          recordingOption
          showClearButton/>
      </>
    }
    />
    </ScrollView>
  );
}


export default memo(StoryMain);
