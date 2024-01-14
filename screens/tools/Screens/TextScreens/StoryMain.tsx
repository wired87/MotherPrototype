import {memo, ReactNode, useCallback, useContext, useRef, useState} from "react";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";
import {PrimaryContext, ToolContext} from "../../../Context";
import React from "react";
import UniversalTextCreator from "../../../../components/container/Tools/UniversalTextCreator";
import {DefaultInput} from "../../../../components/input/DefaultInput";

//STRINGS
const clear:string = "close";
const create:string = "create";
const name:string = "";
const heading:string = "Create Story's, Poems and much more...";

// INT
const maxLengthSmall:number = 100;
const maxLengthBig:number = 200;


const placeholder:string = `Your written Tex will be shown here...`



const StoryMain: React.FC  = () => {

  const [storyAbout, setStoryAbout] = useState<string>("");
  const [extraInfos, setExtraInfos] = useState<string>("");
  const [genre, setGenre] = useState<string>("");

  const [editable, setEditable] = useState<boolean>(false);


  // Context
  const {setResponse, response } = useContext(ToolContext);

  const {user } = useContext(PrimaryContext);

  const getCardPostObject = ():object => {
    return {
      "user_id": user?.uid,
      "input_type": "story",
      "genre": genre,
      "extraInfos": extraInfos,
      "storyAbout": storyAbout
    }
  }

  const handleClearField = useCallback(() => {
    setResponse("");
  }, [response])

  return(
    <>
      <UniversalTextCreator
        placeholder={placeholder}
        editable={editable}
        heading={heading}
        postObject={getCardPostObject}
        Content={
          <>
            <DefaultInput
              placeholder={"About... "}
              value={storyAbout}
              onChangeAction={setStoryAbout}
              extraStyles={{}}
              max_length= {maxLengthSmall}
              recordingOption
              showClearButton
            />
            <DefaultInput
              placeholder={"Genre (Poem, Story,..."}
              value={genre}
              onChangeAction={setGenre}
              extraStyles={{}}
              max_length={maxLengthBig}
              recordingOption
              showClearButton
            />
            <DefaultInput
              placeholder={"Extra Information's to provide"}
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


export default memo(StoryMain);
