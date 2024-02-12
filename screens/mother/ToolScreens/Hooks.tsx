import {useState} from "react";

export const useEmailAuth = () => {
  const [serviceUserNameOrEmail, setServiceUserNameOrEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const updateServiceUserNameOrEmail = (text:string) => {
    setServiceUserNameOrEmail(text);
  }

  const updatePassword = (text:string) => {
    setPassword(text);
  }

  return {
    serviceUserNameOrEmail, setServiceUserNameOrEmail, updateServiceUserNameOrEmail,
    password, setPassword, updatePassword
  }
}

