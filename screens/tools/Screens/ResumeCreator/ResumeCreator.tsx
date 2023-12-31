import React, {memo, useContext, useMemo, useState} from "react";
import {ResumeContext, ThemeContext} from "../../../Context";

import {ScrollView} from "react-native";
import {toolStyles as ts} from "../../toolStyles";
import UniversalTextCreator from "../../../../components/container/Tools/UniversalTextCreator";
import ResumeContent from "./Content";

const heading = "AI Job Application creator"
const placeholderResume = "Your written Application will be shown here.."

const ResumeCreator = () => {
  const [editable, setEditable] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // Context
  const { customTheme } = useContext(ThemeContext);
  const {resume, setResume} = useContext(ResumeContext);

  // STYLES
  const backgroundColor = {backgroundColor: customTheme.primary};

  const Content = useMemo(() => {
    return <ResumeContent
      setError={setError} />
  }, [])

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
    </ScrollView>
  );
}

export default memo(ResumeCreator);