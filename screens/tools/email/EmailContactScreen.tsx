import React, {memo, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import {ScrollView, View} from "react-native";
import {toolStyles as ts} from "../toolStyles";
import {uniStyles as us} from "../../universalStyles";
import {ThemeContext} from "../../Context";
import EmailContactInputForm from "../../../components/container/mother/email/EmailContactInputForm";
import {useStatus} from "../../../AppHooks/MotherHooks/SuccessHook";
import {useModalVisible} from "../../../AppHooks/MotherHooks/useModalVisible";

const EmailContactScreen: React.FC = () => {
  const {customTheme} = useContext(ThemeContext);
  const mainScroll = [ us.scrollMain, { backgroundColor: customTheme.primary } ];

  const { modalVisible, setModalVisible } = useModalVisible()
  const { status, setStatus, updateStatus } = useStatus();

  const handleStatus = useCallback(() => {
    if ( status.length > 0 ) {
      setModalVisible(true);
    }
  }, [status])

  useEffect(() => {
    handleStatus()
  }, [status]);



  return(
    <ScrollView style={mainScroll} contentContainerStyle={ts.contentContainerMovie}>
      <View>
        <EmailContactInputForm
          success={status}
          updateSuccess={updateStatus}
        />
      </View>

    </ScrollView>
  )
}
export default memo(EmailContactScreen);