import React, {useState, useContext, useCallback, memo, useRef, useEffect} from 'react';

import {
  View,
  StyleSheet,
  Pressable,
  FlatList,
  Linking,
  Text, KeyboardAvoidingView, Vibration
} from 'react-native';

import * as RNLocalize from 'react-native-localize';
import {PrimaryContext, ThemeContext} from "../../../Context";
import {HeadingText} from "../../../../components/text/HeadingText";
import {toolStyles as ts} from "../../toolStyles";
import {DefaultButton} from "../../../../components/buttons/DefaultButton";
import {DefaultInput} from "../../../../components/input/DefaultInput";
import {getAuth} from "firebase/auth";
import {getResponse} from "../../../chat/functions/SendProcess";
import {MEDIA_URL} from "@env";
import DefaultProgressBar from "../../../../components/animations/DefaultProgressBar";
import SwipeModal from "../../../../components/modals/SwipeModal";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";
import ErrorContainerSwipeModal from "../../../../components/container/ErrorContainerSwipeModal";
import {DefaultText} from "../../../../components/text/DefaultText";
import DefaultImage from "../../../../components/images/DefaultImage";

// STRINGS
const buttonText = "Search Movie";
const requiredText = "Please provide minimum one Movie or Serie";




export interface Movie {
  id: string;
  title: string;
  description: string;
  rating: string | number;
  image: string;
  videoLink: string;
}


const MovieFinder = () => {
  const [firstMedia, setFirstMedia] = useState<string>("");
  const [secondMedia, setSecondMedia] = useState<string>("");
  const [thirdMedia, setThirdMedia] = useState<string>("");

  const [fieldError, setFieldError] = useState<boolean>(false);
  const [responseError, setResponseError] = useState<string>("");
  const [alreadyRunning, setAlreadyRunning] = useState<boolean>(false);

  const [searchResult, setSearchResult] = useState<Movie[] | null>(null);

  const {customTheme} = useContext(ThemeContext);

  const bottomSheetRef = useRef<BottomSheetMethods>(null);


  // STYLES
  const backgroundColor = {backgroundColor: customTheme.primary};
  const mainContainerStyles = [ts.main, backgroundColor];
  const errorTextStyles = {opacity: alreadyRunning? 1:0};
  const textColor = { color: customTheme.text }
  const pressableTextStyles = [styles.movieTitle, textColor];

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
    setResponseError("");
    if (noInput) {
      console.log("No Movie/Serie provided")
      setFieldError(true);
      return;
    }else if (loading) {
      Vibration.vibrate();
      setAlreadyRunning(true);
      return;
    }
    const searchTerm: string = `${firstMedia}, ${secondMedia}, ${thirdMedia}`;
    await sendData(searchTerm)
  };


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


  const sendData = async (movieNames: string) => {
    const endpoint = MEDIA_URL;
    const requestBody = {
      "user_id": getAuth().currentUser,
      "movies": movieNames,
      "language": getDeviceLanguage() || "en-US"
    };
    await getResponse(
      setLoading,
      setResponseError,
      setJwtToken,
      jwtToken,
      requestBody,
      setSearchResult,
      endpoint
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


  const movieResults = useCallback(() => {
    if (searchResult && searchResult.length > 0) {
      return(
        <FlatList
          style={styles.cardContainer}
          data={searchResult}
          keyExtractor={(index, item) => index.toString()}
          renderItem={({item, index} ) => (
            <Pressable
              key={index}
              onPress={() => handleCardPress(item.videoLink)}
              style={styles.card}>
              <DefaultImage
                source={item.image}
              />
              <View style={styles.cardTextContainer}>
                <Text style={pressableTextStyles}>
                  {item.title}
                </Text>
                <Text style={[styles.moviePara]} numberOfLines={4}>
                  {item.description}
                </Text>
              </View>
            </Pressable>
          )}
        />
      );
    }else {
      return <></>
    }
  }, [searchResult])


  return (
    <KeyboardAvoidingView style={mainContainerStyles} >
      <HeadingText
        text={"Movie Finder"}
         extraStyles={undefined}
      />

      {renderInputs()}

      <DefaultButton onPressAction={handleSearch} text={buttonText} />

      <DefaultText error text={"Request already running."} moreStyles={errorTextStyles}/>

      <DefaultProgressBar loading={loading} />

      <View>
        {movieResults()}
      </View>

      <SwipeModal
        bottomSheetRef={bottomSheetRef}
        modalIndex={-1}
        Content={
          <ErrorContainerSwipeModal
            error={responseError}
          />
        }
      />
    </KeyboardAvoidingView>
  );
};

export default memo(MovieFinder);


const styles = StyleSheet.create({
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
  cardContainer: {
    marginTop: 20,
    width: '90%',
  },
  card: {
    borderRadius: 8,
    padding: 20,
    marginBottom: 10,
    height: 140,
    flexDirection: 'row',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  image: {
    width: 130,
    height: 110,
    resizeMode: 'cover',
    borderRadius: 30,
  },
  moviePara: {
    fontSize: 16,
    fontWeight: "400",

  },
  cardTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
});
