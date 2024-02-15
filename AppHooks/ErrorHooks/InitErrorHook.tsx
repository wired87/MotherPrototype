import {useState} from "react";

export const useInitError = () => {
  const [initError, setInitError] = useState<string>("");
  const updateInitError = (text:string) => setInitError(text);

  return {initError, setInitError, updateInitError}
}