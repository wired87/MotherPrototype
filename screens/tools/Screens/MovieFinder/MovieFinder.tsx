import React, {useState, useContext, useCallback, memo, useRef, useEffect} from 'react';

import {
  View,
  StyleSheet,
  Pressable,
  Linking,
  Vibration, Dimensions, ActivityIndicator, ScrollView
} from 'react-native';

import * as RNLocalize from 'react-native-localize';
import {PrimaryContext, ThemeContext} from "../../../Context";
import {toolStyles as ts} from "../../toolStyles";
import {DefaultButton} from "../../../../components/buttons/DefaultButton";
import {DefaultInput} from "../../../../components/input/DefaultInput";
import {getAuth} from "firebase/auth";
import {getResponse} from "../../../chat/functions/SendProcess";
import {MEDIA_URL} from "@env";
import SwipeModal from "../../../../components/modals/SwipeModal";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";
import ErrorContainerSwipeModal from "../../../../components/container/ErrorContainerSwipeModal";
import {DefaultText} from "../../../../components/text/DefaultText";
import DefaultImage from "../../../../components/images/DefaultImage";
import TextStream from "../../../../components/text/TextStream";

// Lotie
import LottieView, {AnimationObject} from "lottie-react-native";
import popcornDefault from "../../../../assets/animations/Movie/popcornDefault.json";
import failPopcorn from "../../../../assets/animations/Movie/failPopcorn.json";
import successPopcorn from "../../../../assets/animations/Movie/successPopcorn.json";
import BottomImage from "../../../../components/images/BottomImage";
import {StyleProps} from "react-native-reanimated";


// STRINGS
const buttonText:string = "Search Movie";
const requiredText:string = "Please provide minimum one Movie or Serie";
const heading:string = "Movie/Serie finder";
const defaultMoviePlaceholder = "Your Movies will be shown here";

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

  const bottomSheetRef = useRef<BottomSheetMethods>(null);


  // STYLES
  const backgroundColor: StyleProps = {backgroundColor: customTheme.primary};
  const mainContainerStyles: StyleProps[] = [ts.main, backgroundColor];
  const errorTextStyles: StyleProps = {opacity: alreadyRunning? 1:0};
  const textColor: StyleProps = { color: customTheme.text }
  const pressableTextStyles: StyleProps[] = [ls.movieTitle, textColor];
  const movieBoxStyles: StyleProps[] = [ls.card, {backgroundColor: "transparent"}];

  const {
    loading,
    setLoading,
    jwtToken,
    setJwtToken} = useContext(PrimaryContext);


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
    setFirstMedia("");
    setSecondMedia("");
    setThirdMedia("");
    setResponseError("");
    setSearchResult(null);
    setSuccessAnimationFinish(false);
    await sendData()
  };


  const postObject = () => {
    return {
      "user_id": getAuth().currentUser,
      "movies": `${firstMedia}, ${secondMedia}, ${thirdMedia}`,
      "language": getDeviceLanguage() || "en-US"
    }
  }

  const sendData = async () => {
    const requestBody = postObject();
    await getResponse(
      setLoading,
      setResponseError,
      setJwtToken,
      jwtToken,
      requestBody,
      setSearchResult,
      MEDIA_URL
      )
    };


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


    console.log("222")
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
    if (responseError.length > 0 && bottomSheetRef && bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(1);
    }
  }, [responseError]);


  useEffect(() => {
    if (alreadyRunning) {
      const interval = setInterval(() => {
        setAlreadyRunning(false);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [alreadyRunning]);



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


  const defaultLottie = useCallback((source: string | AnimationObject | { uri: string; }) => {
    return <LottieView speed={1} style={ts.lottie} source={source} autoPlay loop={false} onAnimationFinish={
      () => {
        setSuccessAnimationFinish(true);
        console.log("Animation finished...");
      }
    }/>
  }, [])


  const movieResults = useCallback(() => {
    if (searchResult && responseError.length == 0 && successAnimationFinish && !loading) {
        return searchResult.map((item) => {
          return movieItem(item)
        }
      );
    }else if (!loading && !searchResult){
      return (
        <>
          <LottieView style={ts.lottie} source={popcornDefault} autoPlay loop={false} />
          <DefaultText text={defaultMoviePlaceholder} moreStyles={ls.awaitResultText} />
        </>
      )
    }else if (loading) {
      return <ActivityIndicator size={60} color={customTheme.text} />
    }else if (!loading && searchResult && !successAnimationFinish && responseError.length == 0) {
      return defaultLottie(successPopcorn);
    }else if (responseError.length > 0 && !loading && !successAnimationFinish && !searchResult) {
      return defaultLottie(failPopcorn);
    }else{
      return <></>
    }
  }, [searchResult, loading, successAnimationFinish, responseError])


  return (
    <ScrollView style={mainContainerStyles} contentContainerStyle={ts.contentContainerMovie}>

      <TextStream  message={heading} />

      {renderInputs()}

      <DefaultButton
        text={buttonText}
        onPressAction={handleSearch}
      />

      <DefaultText error text={"Request already running."} moreStyles={errorTextStyles}/>

      <View style={ts.resultContainer}>
        {movieResults()}
      </View>

      <BottomImage />

      <SwipeModal
        bottomSheetRef={bottomSheetRef}
        modalIndex={-1}
        Content={
          <ErrorContainerSwipeModal
            error={responseError}
          />
        }
      />
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
