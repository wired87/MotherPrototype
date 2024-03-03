import {useState} from "react";


export const useSuccessVisible = () => {
  const [successVisible, setSuccessVisible] = useState<boolean>(false);
  const toggleSuccessVisible = () => setSuccessVisible(previousState => !previousState);

  return { successVisible, setSuccessVisible, toggleSuccessVisible }
}