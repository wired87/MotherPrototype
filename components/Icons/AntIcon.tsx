import {memo, useContext} from "react";
import {ThemeContext} from "../../screens/Context";
import Icon from "react-native-vector-icons/AntDesign"



const SingleErrorMessage = () => {

  const { customTheme } = useContext(ThemeContext);

  return(
    <Icon name={}/>
  );
}

export default memo(SingleErrorMessage);
