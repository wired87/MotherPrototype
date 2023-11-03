import {DefaultContainer} from "./DefaultContainer";
import {Dimensions, TextInput} from "react-native";
import {DefaultInput} from "../input/DefaultInput";


const windowWidth = Dimensions.get('window').width;

export const MessageInputContainer = () => {

  return(
    <DefaultContainer
      extraStyles={{ backgroundColor: "transparent", position: "relative", justifyContent: "center", alignItems: "center"}} >
      <DefaultInput
        placeholder={"Ask something!"}

        value={undefined}
        onChangeAction={undefined}
        secure={undefined}
        editable={undefined}
        keyboardType={undefined} />
    </DefaultContainer>
  );
}