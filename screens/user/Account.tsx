import React, {useCallback, useContext, useMemo} from 'react';
import {View, ScrollView, SectionList} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {getAuth} from "firebase/auth";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {DefaultInput} from "../../components/input/DefaultInput";
import {BottomImage} from "../../components/images/BottomImage";

import {useSelector, useDispatch} from "react-redux";
import {DefaultButton} from "../../components/buttons/DefaultButton";
import {HeadingText} from "../../components/text/HeadingText";
import {PlusAdContainer} from "../../components/container/PlusPlanContainer/PlusPlanContainer";
import { userStyles } from './userStyles';
import {themeColors} from "../../colors/theme";
import {AuthContext, PrimaryContext, ThemeContext} from "../Context";
import SmallFlatLoop from "../../components/flatlist/SmallFlatLoop";
import {settingStyles} from "../settings/settingStyles";
import RoundedButton from "../../components/buttons/RoundedButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ProfileContainer from "../../components/container/ProfileContainer";

export const AccountMain = () => {

  const auth = getAuth();
  const {user, setUser} = useContext(PrimaryContext);
  const { customTheme } = useContext(ThemeContext);
  const {setError} = useContext(AuthContext);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  // @ts-ignore
  const loading = useSelector(state => state.loading.value);
  // @ts-ignore
  const text = useSelector(state => state.text.value)
  // @ts-ignore
  const icon = useSelector(state => state.icon.value)
  // @ts-ignore
  const screens = useSelector(state => state.screens.value)
  // @ts-ignore
  const newLogout = useSelector(state => state.logout.value)

  const moveToScreen = useCallback((screenName: string, params?: object) => {

    // @ts-ignore
    return () => navigation.navigate(screenName, params);
  }, []);

  //modal zum bestätigenn einbauen
  const deleteUser = useCallback(async () => {
    dispatch({
      type: 'LOADING',
      payload: true
    })
    try {
      // @ts-ignore
      await user.delete().then(() => {
          console.log("successfully sign the User out")
        }
      )
    } catch (error) {
      console.log(error)
    } finally {
      dispatch({
        type: 'LOADING',
        payload: false
      })
    }
  }, []);


  const userLogout = async () => {
    dispatch({
      type: "LOGOUT",
      payload: true
    });
    dispatch({
      type: 'LOADING',
      payload: true
    });
    console.log("successfully dispatched", "\n loading:", loading)

    try {
      await auth.signOut().then(() => {
        console.log("User is successfully logged out")
        setUser(null);
      });
      setError("false")
      console.log("user:", user)

    } catch (error) {
      setError("true"); // @ts-ignore
      console.log("There was an error while logging the user out: \n" + error.message);

    } finally {
      dispatch({
        type: 'LOADING',
        payload: false
      });
      console.log("Data dispatched. newLogout: ", newLogout, "\n loading:", loading)
      // @ts-ignore
      navigation.navigate("ChatMain");
    }
  };

  const accountActions = useMemo(() => {
    return [
      {
        id: 1,
        data: [
          {
            action:moveToScreen("Settings", { screen: screens.settingsScreen }),
            icon: <Icon name={icon.settingsIcon} size={26} color="white" />,
            text: "Settings"
          }
        ]
      },
      {
        id: 2,
        data: [
          {
            action:  async () => await userLogout().then(() => console.log("user successfully logged out..")),
            icon: <Icon name={icon.logoutIcon} size={26} color="white" />,
            text: "Logout"
          }
        ]
      },
      {
        id: 3,
        data: [
          {
            action: async () => await deleteUser().then(() => console.log("User successfully deleted")),
            icon: <Icon name={icon.trashIcon} size={26} color="white" />,
            text: "Delete Account"
          }
        ]
      }
    ];
  }, []);

  return (
    <View style={[userStyles.mainContainerProfile, {backgroundColor: customTheme.primary}]}>
      <SectionList
        ListHeaderComponent={
          <>
            <View style={userStyles.adContainer}>
              <PlusAdContainer/>
            </View>
            <ProfileContainer moveToScreen={moveToScreen} />
          </>
        }
        ListFooterComponent={
          <BottomImage/>
        }
        sections={accountActions}
        style={settingStyles.box2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item + index.toString()}
        renderItem={({ item, index }) => (
          <RoundedButton
            item={item}
            action={item.action}
            index={index}
            list={accountActions}
          />
        )}
       />
    </View>
  );
}

/*
   <DefaultButton
          onPressAction={}
          extraStyles={undefined}
          text={}
          secondIcon={
            <MaterialCommunityIcons
              name={}
              size={20} color={"rgb(255,255,255)"}
              style={userStyles.buttonIcon}
            />
          }
        />
        <DefaultButton
          onPressAction={

          }
          extraStyles={undefined}
          text={}
          secondIcon={
            <MaterialCommunityIcons
              name={}
              size={20}
              color={"rgb(255,255,255)"}
              style={userStyles.buttonIcon}
            />
          }
        />
        <DefaultButton
          onPressAction={
          }}
          extraStyles={undefined}
          text={}
          secondIcon={
            <MaterialCommunityIcons
              name={}
              size={20} color={"rgb(255,255,255)"}
              style={userStyles.buttonIcon}
            />
          }
        />
 */