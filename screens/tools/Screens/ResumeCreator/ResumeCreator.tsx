import React, {memo, useContext, useEffect, useMemo, useRef, useState} from "react";
import {ThemeContext} from "../../../Context";

import {ScrollView} from "react-native";
import {toolStyles as ts} from "../../toolStyles";
import UniversalTextCreator from "../../../../components/container/Tools/UniversalTextCreator";
import ResumeContent from "./Content";
import {SwipeModal} from "../../../../components/modals/SwipeModal";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";
import ErrorContainerSwipeModal from "../../../../components/container/ErrorContainerSwipeModal";


const heading = "AI Job Application \n creator"
const placeholderResume = "Your written Application will be shown here.."

const ResumeCreator = () => {
  const [editable, setEditable] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const [resume, setResume] = useState<string>("");
  // Context
  const { customTheme } = useContext(ThemeContext);

  // STYLES
  const backgroundColor = {backgroundColor: customTheme.primary};

  const Content = useMemo(() => {
    return <ResumeContent
              setError={setError}
              setResume={setResume}
    />
  }, [])

  const updateModalIndex = () => {
    bottomSheetRef?.current?.snapToIndex(2);
  }

  useEffect(() => {
    if (error.length > 0) {
      updateModalIndex()
    }
  }, [error]);

  return(
    <ScrollView style={backgroundColor} contentContainerStyle={ts.justifyAlign}>
      <UniversalTextCreator
        value={resume}
        placeholder={placeholderResume}
        editable={editable}
        changeText={setResume}
        heading={heading}
        Content={Content}
      />
      <SwipeModal
        bottomSheetRef={bottomSheetRef}
        Content={
        <ErrorContainerSwipeModal error={error}/>
      }
      />
    </ScrollView>
  );
}

export default memo(ResumeCreator);