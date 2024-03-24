import React, {memo, ReactNode, useContext, useMemo} from "react";
import {View, StyleSheet} from "react-native";
import {windowWidth} from "../../chat/chatStyles";
import {PrimaryContext, ThemeContext} from "../../Context";
import SingleEmailService from "../../../components/container/mother/email/SingleEmailService";


const ls = StyleSheet.create(
  {
    main: {
      width: windowWidth,
      height: 100,
    }
  }
)

const ToolSection: React.FC = () => {

  // Context
  const {customTheme} = useContext(ThemeContext);

  const { user} = useContext(PrimaryContext);


  // styles
  const mainStyles =
    [
      ls.main,
      {
        backgroundColor: customTheme.primary,
      }
    ];


  const emailServices = useMemo((): ReactNode => {
    if (user) {
      return (
        <>
          <SingleEmailService
            name={"Gmail"}
            isUnlocked={user?.email?.gmail || false}
            onSwitch={() => {}}
          />
          <SingleEmailService
            name={"Outlook"}
            isUnlocked={user?.email?.outlook || false}
            onSwitch={() => {}}
          />
        </>
      )
    }
    // Error handling -> auth issue
    return(
      <>

      </>
    )
  }, [user])


  return(
    <View style={mainStyles}>
      {
        emailServices
      }
    </View>
  );
}

export default memo(ToolSection);
