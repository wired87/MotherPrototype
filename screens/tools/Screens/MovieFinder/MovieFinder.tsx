import React, {useState, useContext, useCallback, memo, useEffect } from 'react';

import {
  View,
  StyleSheet,
  Pressable,
  Linking,
  Vibration, ScrollView
} from 'react-native';

import * as RNLocalize from 'react-native-localize';
import {PrimaryContext, ThemeContext} from "../../../Context";
import {toolStyles as ts} from "../../toolStyles";
import {DefaultButton} from "../../../../components/buttons/DefaultButton";
import {DefaultInput} from "../../../../components/input/DefaultInput";
import {getAuth} from "firebase/auth";
import {MEDIA_URL} from "@env";
import {DefaultText} from "../../../../components/text/DefaultText";
import DefaultImage from "../../../../components/images/DefaultImage";
import TextStream from "../../../../components/text/TextStream";

// Lottie
import LottieView from "lottie-react-native";
import popcornDefault from "../../../../assets/animations/Movie/popcornDefault.json";
import successPopcorn from "../../../../assets/animations/Movie/successPopcorn.json";
import BottomImage from "../../../../components/images/BottomImage";
import {StyleProps} from "react-native-reanimated";
import {defaultLottie} from "../../Functions";

import toolError from "../../../../assets/animations/toolError.json";
import {IconButton} from "react-native-paper";
import LottieContainer from "../../../../components/container/LottieContainer";
import ToolIndicator from "../../../../components/indicators/ToolIndIcator";

// STRINGS
const buttonText:string = "Search Movie";
const requiredText:string = "Please provide minimum one Movie or Serie";
const heading:string = "Movie/Series finder";
const defaultMoviePlaceholder:string = "Your Movies will be shown here";
const reFreshIcon:string = "refresh";

export interface Movie {
  id: string;
  title: string;
  description: string;
  runtime: string | number;
  image: string;
  videoUrl: string;
}


const MovieFinder = () => {
  const [firstMedia, setFirstMedia] = useState<string>("");
  const [secondMedia, setSecondMedia] = useState<string>("");
  const [thirdMedia, setThirdMedia] = useState<string>("");

  const [fieldError, setFieldError] = useState<boolean>(false);
  const [responseError, setResponseError] = useState<string>("");

  const [alreadyRunning, setAlreadyRunning] = useState<boolean>(false);
  const [successAnimationFinish, setSuccessAnimationFinish] = useState<boolean>(false);

  const [searchResult, setSearchResult] = useState<Movie[] | null>(null);

  const {customTheme} = useContext(ThemeContext);

  // STYLES
  const backgroundColor: StyleProps = {backgroundColor: customTheme.primary};
  const mainContainerStyles: StyleProps[] = [ts.main, backgroundColor];
  const errorTextStyles: StyleProps = {opacity: alreadyRunning? 1:0};
  const textColor: StyleProps = { color: customTheme.text }
  const pressableTextStyles: StyleProps[] = [ls.movieTitle, textColor];
  const movieBoxStyles: StyleProps[] = [ls.card, {backgroundColor: "transparent"}];

  const {loading, defaultPostRequest} = useContext(PrimaryContext);


  const handleCardPress = async (videoLink: string) => {
    await Linking.openURL(videoLink);
  };

  const noInput =
    firstMedia.trim().length === 0 &&
    secondMedia.trim().length === 0 &&
    thirdMedia.trim().length === 0;

  const handleSearch = async () => {
    if (noInput) {
      console.log("No Movie/Serie provided")
      setFieldError(true);
      return;
    }else if (loading) {
      Vibration.vibrate();
      setAlreadyRunning(true);
      return;
    }

    setResponseError("");
    setSuccessAnimationFinish(false);
    await defaultPostRequest(
      MEDIA_URL,
      postObject(),
      setResponseError,
      setSearchResult,
      undefined,
      true

    )
  };


  const postObject = () => {
    return {
      "user_id": getAuth().currentUser,
      "movies": `${firstMedia}, ${secondMedia}, ${thirdMedia}`,
      "language": getDeviceLanguage() || "en-US"
    }
  }


  // FIELD ERROR LOGIC
  useEffect(() => {
    if (fieldError) {
      const interval = setInterval(() => {
        setFieldError(false);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [fieldError]);


  useEffect(() => {
    console.log("Movies received:", searchResult);
  }, [searchResult]);


  const getDeviceLanguage = () => {
    const locales = RNLocalize.getLocales();
    if (locales.length > 0) {
      return locales[0].languageTag;
    } else {
      return "en-US";
    }
  };

  const renderInputs = useCallback(() => {
    const inputStyles = [ts.input, textColor];
    return (
      <View style={ts.justifyAlign}>

        <DefaultInput
          extraStyles={inputStyles}
          onChangeAction={setFirstMedia}
          value={firstMedia}
          placeholder={`First Movie/Serie (required)`}
          showClearButton
        />

        <DefaultInput
          extraStyles={inputStyles}
          onChangeAction={setSecondMedia}
          value={secondMedia}
          placeholder={'Second Movie/Serie (optional)'}
          showClearButton
        />

        <DefaultInput
          extraStyles={inputStyles}
          onChangeAction={setThirdMedia}
          value={thirdMedia}
          placeholder={`Third Movie/Serie (optional)`}
          showClearButton
        />

        {fieldError? <DefaultText text={requiredText} /> :null}

      </View>
    );
  }, [firstMedia, secondMedia, thirdMedia, fieldError]);


  useEffect(() => {
    if (alreadyRunning) {
      const interval = setInterval(() => {
        setAlreadyRunning(false);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [alreadyRunning]);

  useEffect(() => {
    console.log("RESPONSE ERROR:", responseError, responseError.length);
  }, [responseError]);

  const movieItem = useCallback((item: Movie) => {
    console.log("Image:", item.image);
    if (successAnimationFinish) {
      return(
        <Pressable
          key={item.id}
          onPress={() => handleCardPress(item.videoUrl)}
          style={movieBoxStyles}>
          <DefaultImage
            source={item.image}
          />
          <View style={ls.cardTextContainer}>
            <DefaultText text={item.title} moreStyles={pressableTextStyles} />
            <DefaultText moreStyles={ls.descriptionText} text={item.description} ellipsizeMode={"tail"} />
          </View>
        </Pressable>
      )
    }else{
      return <></>
    }
  }, [successAnimationFinish, searchResult])


  const movieResults = useCallback(() => {
    if (
      searchResult &&
      searchResult.length > 0 &&
      responseError.length == 0 &&
      successAnimationFinish &&
      !loading
    ) {
      console.log("success ani must be shown...")
      return searchResult.map((item) => {
          return movieItem(item)
        }
      );
    }else if (!loading && !searchResult && responseError.length == 0){
      console.log("default ani must be shown...")
      return (
        <>
          <LottieView style={ts.lottie} source={popcornDefault} autoPlay loop={false} />
          <DefaultText text={defaultMoviePlaceholder} moreStyles={ls.awaitResultText} />
        </>
      )
    }else if (loading) {
      console.log("loading spinner mnus t be shown...")
      return <ToolIndicator />

    }else if (!loading && searchResult && !successAnimationFinish && responseError.length == 0) {
      console.log("success...")
      return defaultLottie(successPopcorn, setSuccessAnimationFinish);

    }else if (responseError.length > 0 && !loading && !searchResult) {
      console.log("error ani must be shown...")
      return(
        <LottieContainer
          source={toolError}
          text={responseError}
          extraChild={
            <IconButton size={40} iconColor={customTheme.primaryButton} icon={reFreshIcon} onPress={handleSearch} />
          }
        />
      );
    }
    console.log("nothing must be shown...")
    return <></>
  }, [searchResult, loading, successAnimationFinish, responseError, firstMedia, secondMedia, thirdMedia])


  return (
    <ScrollView style={mainContainerStyles} contentContainerStyle={ts.contentContainerMovie}>

      <TextStream  message={heading} />

      {renderInputs()}

      <DefaultButton
        text={buttonText}
        extraStyles={ts.postBUttoneMovie}
        onPressAction={handleSearch}
      />

      <DefaultText error text={"Request already running."} moreStyles={errorTextStyles}/>

      <View style={ts.resultContainer}>
        {movieResults()}
      </View>

      <BottomImage />


    </ScrollView>
  );
};


export default memo(MovieFinder);


const ls = StyleSheet.create({
  input: {
    flex: 0.8,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  clearButton: {
    padding: 5,
  },
  searchButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  searchText: {
    fontSize: 20,
    fontWeight: '700',
  },
  card: {
    borderRadius: 8,
    height: 140,
    width: "95%",
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: "grey",
    marginVertical: 10,
    flex: 1,
    overflow: "hidden",
  },
  movieTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
  },
  descriptionText: {
    fontSize: 12,
    fontWeight: "400",
    textAlign: "left",
    lineHeight: 12
  },
  cardTextContainer: {
    width: "67%",
    paddingLeft: 5,
  },

  awaitResultText: {
    marginTop: 5,
  }
});
