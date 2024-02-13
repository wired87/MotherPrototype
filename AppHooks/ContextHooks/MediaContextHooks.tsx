import {useDoc, usePickedImage} from "../InputHooks";

export const useMediaContextHooks = () => {
  const {pickedImage, updatePickedImage} = usePickedImage();
  const {doc, updateDoc} = useDoc();
  return {
    doc, updateDoc,
    pickedImage, updatePickedImage,
  }
}