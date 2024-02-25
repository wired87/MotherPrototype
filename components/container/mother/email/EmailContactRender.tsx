import {memo, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import {View, StyleSheet, FlatList, FlatListProps} from "react-native";
import {PrimaryContext, ThemeContext} from "../../../../screens/Context";
import {MEDIA_URL} from "@env";
import {userIdRequest} from "../../../../AppFunctions/GetObjectFunctions";
import EmailContactItem from "./EmailContactItem";


const ls = StyleSheet.create(
  {
    main: {
      width: 100,
      height: 100,
      backgroundColor: "red",
    }
  }
)

const SingleErrorMessage = () => {
  const {defaultPostRequest, jwtToken} = useContext(PrimaryContext);
  const [error, setError] = useState<string>("");
  const [response, setResponse] = useState<object[]>([]);
  const { customTheme } = useContext(ThemeContext);

  useEffect(() => {
    defaultPostRequest(
      MEDIA_URL,
      userIdRequest(),
      setError,
      setResponse,

  ).then(() => console.log("Contact Data successfully requested..."))
  }, []);

  const keyExtractor = (item: object, index: number) => String(index);


  const contactList = useCallback(():ReactNode | undefined => {
    if ( response ) {
      return(
        <FlatList
          data={response}
          keyExtractor={keyExtractor}
          renderItem={
          ({ item, index }) => (
            <EmailContactItem key={index} item={item}/>
          )
        }
      />
    )}
  }, []);



  return(
    <View>
      {
        contactList()
      }
    </View>
  );
}

export default memo(SingleErrorMessage);
