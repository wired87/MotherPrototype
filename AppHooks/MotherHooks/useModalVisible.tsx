import {useState} from "react";

export const useModalVisible = () => {
  const [ modalVisible, setModalVisible ] = useState<boolean>(false);

  const updateModalVisible = (value:boolean) => setModalVisible(value)

  return { modalVisible, setModalVisible, updateModalVisible }
}