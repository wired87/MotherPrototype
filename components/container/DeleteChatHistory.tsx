import {DefaultContainer} from "./DefaultContainer";
import React, {useCallback} from "react";
import axios from "axios";
import {AreYouSureContainer} from "./AreYouSureContainer";

// @ts-ignore
export const DeleteChatHistory = ({ setStatus, dispatch, closeModal }) => {

  const deleteHistory = useCallback(async() => {
    dispatch({
      type: 'LOADING',
      payload: true
    });
    try {
      const response = await axios.post("http://192.168.178.51:8000/delete-chat-history/")
      // @ts-ignore
      setStatus(response.status);

      console.log("response: " + response);
    } catch(error) {
      console.log("error: " + error);
    } finally {
      dispatch({
        type: 'LOADING',
        payload: false
      });
    }
  }, [])


  return(
    <DefaultContainer
      extraStyles={undefined}>
      <AreYouSureContainer
        text={"Are you sure to delete your History?"}
        action={deleteHistory}
        closeModalAction={closeModal} />

    </DefaultContainer>
  );
}