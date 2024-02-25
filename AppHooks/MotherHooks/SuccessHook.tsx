import {useState} from "react";

export const useStatus = () => {
  const [status, setStatus] = useState<string>("");

  const updateStatus = (value:string) => setStatus(value)

  return { status, setStatus, updateStatus }
}