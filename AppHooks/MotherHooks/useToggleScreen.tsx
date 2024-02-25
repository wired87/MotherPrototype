import {useEffect, useState} from "react";


export const useToggleScreen = () => {
  const [toggleScreen, setToggleScreen] = useState<boolean>(true);
  const updateToggleScreen = () => setToggleScreen(previousState => !previousState);

  useEffect(() => {
    console.log("ToggleScreen:", toggleScreen);
  }, [toggleScreen]);

  return { toggleScreen, setToggleScreen, updateToggleScreen };
}