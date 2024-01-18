import {ActivityIndicator, Image, View, StyleSheet} from "react-native";
import React, {memo, useContext, useState} from "react";
import iconFinal from "../../assets/icons/iconFinal.png";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {ThemeContext} from "../../screens/Context";
import {DefaultText} from "../text/DefaultText";

//  ACCEPTED FORMATS:  png, jpg, jpeg, bmp, gif, webp, psd

// STRINGS
const text = " Could not load The Image";

interface DefaultImageTypes {
  source: string;
}

const DefaultImage: React.FC<DefaultImageTypes> = (
  {
    source
  }
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const {customTheme} = useContext(ThemeContext);

  const image = source? {uri: source} : {iconFinal}

  console.log("Image received:", source);

  return (
    <View style={ls.main}>
      {isLoading && <ActivityIndicator size={20} color={customTheme.text}/>}
      {hasError && (
        <>
          <MaterialCommunityIcons name={"close"} size={25} color={customTheme.placeholder} />
          <DefaultText text={text} />
        </>
      )}
      <Image
        style={ls.image}
        source={image}
        onLoadStart={() => {setIsLoading(true); setHasError(false);}}
        onLoad={() => setIsLoading(false)}
        onLoadEnd={() => setIsLoading(false)}
        onError={() => setHasError(true)}
      />
      <MaterialCommunityIcons color={"rgba(255,255,255,.5)"}  size={80} style={ls.icon} name={"play-circle-outline"}/>
    </View>
  );
}

export default memo(DefaultImage);


const ls = StyleSheet.create(
  {
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    main: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      width: "33%",
      height: "100%",
    },
    icon: {
      position: "absolute",

    }
  }
)