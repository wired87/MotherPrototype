import {ActivityIndicator, Image, View, StyleSheet} from "react-native";
import React, {memo, useContext, useState} from "react";
import error_img from "../../assets/images/error_img.png";
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

  const image = source? {uri: source} : {error_img}

  return (
    <View style={ls.main}>
      {isLoading && <ActivityIndicator />}
      {hasError && (
        <>
          <MaterialCommunityIcons name={"close"} size={25} color={customTheme.placeholder} />
          <DefaultText text={text} />
        </>
      )}
      <Image
        source={image}
        onLoadStart={() => {setIsLoading(true); setHasError(false);}}
        onLoad={() => setIsLoading(false)}
        onLoadEnd={() => setIsLoading(false)}
        onError={() => setHasError(true)}
      />
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
      width: "100%",
      height: "100%",
    },
  }
)