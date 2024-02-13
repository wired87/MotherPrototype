import {useState} from "react";


// ClearMessages Hook
export function useClearMessages() {
  const [clearMessages, setClearMessages] = useState<boolean>(false);
  return {clearMessages, setClearMessages};
}


