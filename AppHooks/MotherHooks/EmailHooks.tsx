import {useState} from "react";

export const useSynonym = () => {
  const [synonym, setSynonym] = useState<string>("");

  const updateSynonym = (value:string) => setSynonym(value)

  return { synonym, setSynonym, updateSynonym }
}


