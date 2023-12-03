import React, {useCallback, useContext, useMemo} from 'react';
import {View, SectionList} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {getAuth} from "firebase/auth";
import {BottomImage} from "../../components/images/BottomImage";
import {useSelector, useDispatch} from "react-redux";
import {PlusAdContainer} from "../../components/container/PlusPlanContainer/PlusPlanContainer";
import { userStyles } from './userStyles';
import {AuthContext, PrimaryContext, ThemeContext} from "../Context";
import {settingStyles} from "../settings/settingStyles";
import RoundedButton from "../../components/buttons/RoundedButton";
import ProfileContainer from "../../components/container/ProfileContainer";

const accountOptions = [
  {
    id: 1,
    icon: "cog-outline", //<Icon name={icon.settingsIcon} size={26} color="white" />
    title: "Settings"
  },
  {
    id: 2,
    icon: "logout", //<Icon name={icon.logoutIcon} size={26} color="white" />,
    title: "Logout"
  },
  {
    id: 3,
    icon: "trash-can-outline", //<Icon name={icon.trashIcon} size={26} color="white" />,
    title: "Delete Account"
  },
]


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
      await user?.delete().then(() => {
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

    } catch (error: any) {
      setError("true");
      console.log("There was an error while logging the user out: \n" + error?.message);

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

  const options = useMemo(() => accountOptions.map(item => ({
    ...item,
    action:
      item.id === 1 ?  moveToScreen("Settings", { screen: screens.settingsScreen }) :
      item.id === 2 ? async () => await userLogout().then(() => console.log("user successfully logged out..")) :
                      async () => await deleteUser().then(() => console.log("User successfully deleted"))
  })), []);



  const convActions = useMemo(() => [
    {
      title: "Options",
      data: options
    }
  ], [] )


  return (
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
      style={[settingStyles.accountLoop,  {backgroundColor: customTheme.primary}]}
      sections={convActions}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => item + index.toString()}
      renderItem={({ item }) => (
          <RoundedButton
            item={item}
            action={item.action}
            list={options}
          />
      )}
     />
  );
}

