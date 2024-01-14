import {memo, useContext, useState} from "react";

import {PrimaryContext} from "../../../../Context";
import React from "react";
import UniversalTextCreator from "../../../../../components/container/Tools/UniversalTextCreator";
import {DefaultInput} from "../../../../../components/input/DefaultInput";

//STRINGS
const heading:string = "Create Story's, Poems and much more...";

// INT
const maxLengthSmall:number = 100;
const maxLengthBig:number = 200;


const placeholder:string = `Your written Tex will be shown here...`


const ProductMain: React.FC  = () => {

  const [category, setCategory] = useState<string>("");
  const [extraInfos, setExtraInfos] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const [editable, setEditable] = useState<boolean>(false);

  const {user } = useContext(PrimaryContext);

  const getCardPostObject = ():object => {
    return {
      "user_id": user?.uid,
      "input_type": "product",
      "title": title,
      "extraInfos": extraInfos,
      "category": category
    }
  }

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
              placeholder={"Description, Slogan,..."}
              value={category}
              onChangeAction={setCategory}
              extraStyles={{}}
              max_length= {maxLengthSmall}
              recordingOption
              showClearButton
            />
            <DefaultInput
              placeholder={"Product Title..."}
              value={title}
              onChangeAction={setTitle}
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


export default memo(ProductMain);
