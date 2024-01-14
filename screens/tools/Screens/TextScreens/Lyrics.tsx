import {memo, useContext, useState} from "react";

import React from "react";
import {PrimaryContext} from "../../../Context";
import UniversalTextCreator from "../../../../components/container/Tools/UniversalTextCreator";
import {DefaultInput} from "../../../../components/input/DefaultInput";


//STRINGS
const heading:string = "Create Story's, Poems and much more...";

// INT
const maxLengthSmall:number = 100;
const maxLengthBig:number = 200;


const placeholder:string = `Your written Tex will be shown here...`




const LyricsMain: React.FC  = () => {

  const [genre, setGenre] = useState<string>("");
  const [extraInfos, setExtraInfos] = useState<string>("");


  const [editable, setEditable] = useState<boolean>(false);

  const {user } = useContext(PrimaryContext);

  const getLyricsPostObject = ():object => {
    return {
      "user_id": user?.uid,
      "input_type": "lyric",
      "genre": genre,
      "extraInfos": extraInfos,
    }
  }

  return(
    <>
      <UniversalTextCreator
        placeholder={placeholder}
        editable={editable}
        heading={heading}
        postObject={getLyricsPostObject}
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
