import {GoogleSignin, statusCodes, User} from "@react-native-google-signin/google-signin";
import {GOOGLE_IOS_CLIENT_ID, GOOGLE_WEB_CLIENT_ID} from "@env";
import {GoogleServices, UserObjectInterface} from "../../../AppInterfaces/AuthInterfaces";



export const googleProcessConfig = (scopes: string[]) => {
  GoogleSignin.configure(
    {
      scopes: scopes,
      webClientId: GOOGLE_WEB_CLIENT_ID,
      offlineAccess: true,
      iosClientId: GOOGLE_IOS_CLIENT_ID
    })
};

export const handleSignOut = async (
  scopes: string[],
  updateDeleteObject: (value:boolean) => void
)=> {
  console.log("SignOut process started...");
  googleProcessConfig(scopes);
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    updateDeleteObject(true);
    console.log('Access Revoked. Delete Request Started...');
  } catch (error) {
    console.error(error);
  }
}


export const handleGoogleSignIn = (
  scopes: string[],
  updateDeleteObject: (value:boolean) => void,
  updateAuthObject: (userObject: User) => void,
  updateUserGoogleServices: (key: keyof GoogleServices, value: boolean) => void,
  key: keyof GoogleServices
) => {
  googleProcessConfig(scopes);
  updateDeleteObject(false);
  try {
    signIn(updateAuthObject)
      .then(() => {
          console.log("USER SUCCESSFULLY SIGNED IN!");
          updateUserGoogleServices(key, true);
        }
      )
  } catch {
    console.log("error occurred while try unlock Google services...")
  }
};


export const handleGoogleAuth = (
  user: UserObjectInterface | null | undefined,
  scopes: string[],
  key: keyof GoogleServices,
  updateAuthObject: (value:User | null) => void,
  updateDeleteObject: (value:boolean) => void,
  updateUserGoogleServices: (key: keyof GoogleServices, value: boolean) => void

) => {

  console.log("User is not signed in with Google try to sign the user in...");
  if ( user?.services?.googleServices?.signedIn ) {
    //  CHANGE TO: UPDATE BOTTOM SHEET TO CONFIRM. IF CONFIRTM CALL CODE BELOW
    handleSignOut(
      scopes,
      updateDeleteObject
    ).then(() => {
      console.log("User successful signed out...")
      updateUserGoogleServices(key, false)
    })
  } else {
    console.log("Try to sign in the user...");
    handleGoogleSignIn(
      scopes,
      updateDeleteObject,
      updateAuthObject,
      updateUserGoogleServices,
      key
    );
  }
}

export const signIn = async (updateGoogleUser: (userObject: User) => void) => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log("GOOGLE USER INFO: ", userInfo);
    updateGoogleUser(userInfo);
  } catch (e:unknown) {
    if (e.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log("SIGN_IN_CANCELLED");
    } else if (e.code === statusCodes.IN_PROGRESS) {
      console.log("IN_PROGRESS");
    } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log("PLAY_SERVICES_1NOT_AVAILABLE");
    } else {
      console.log("UNEXPECTED ERROR OCCURED:", e);
    }
  }
};

/*
[
        "https://mail.google.com/",
        "https://www.googleapis.com/auth/dataportability.businessmessaging.conversations",
        "https://www.googleapis.com/auth/dataportability.chrome.autofill",
        "https://www.googleapis.com/auth/dataportability.chrome.bookmarks",
        "https://www.googleapis.com/auth/dataportability.chrome.dictionary",
        "https://www.googleapis.com/auth/dataportability.chrome.extensions",
        "https://www.googleapis.com/auth/dataportability.chrome.history",
        "https://www.googleapis.com/auth/dataportability.chrome.reading_list",
        "https://www.googleapis.com/auth/dataportability.chrome.settings",
        "https://www.googleapis.com/auth/dataportability.maps.commute_routes",
        "https://www.googleapis.com/auth/dataportability.maps.commute_settings",
        "https://www.googleapis.com/auth/dataportability.maps.ev_profile",
        "https://www.googleapis.com/auth/dataportability.maps.offering_contributions",
        "https://www.googleapis.com/auth/dataportability.maps.photos_videos",
        "https://www.googleapis.com/auth/dataportability.maps.reviews",
        "https://www.googleapis.com/auth/dataportability.maps.starred_places",
        "https://www.googleapis.com/auth/dataportability.myactivity.maps",
        "https://www.googleapis.com/auth/dataportability.myactivity.search",
        "https://www.googleapis.com/auth/dataportability.myactivity.shopping",
        "https://www.googleapis.com/auth/dataportability.myactivity.youtube",
        "https://www.googleapis.com/auth/dataportability.saved.collections",
        "https://www.googleapis.com/auth/dataportability.shopping.addresses",
        "https://www.googleapis.com/auth/dataportability.shopping.reviews",
        "https://www.googleapis.com/auth/dataportability.youtube.channel",
        "https://www.googleapis.com/auth/dataportability.youtube.comments",
        "https://www.googleapis.com/auth/dataportability.youtube.live_chat",
        "https://www.googleapis.com/auth/dataportability.youtube.music",
        "https://www.googleapis.com/auth/dataportability.youtube.playable",
        "https://www.googleapis.com/auth/dataportability.youtube.posts",
        "https://www.googleapis.com/auth/dataportability.youtube.private_playlists",
        "https://www.googleapis.com/auth/dataportability.youtube.private_videos",
        "https://www.googleapis.com/auth/dataportability.youtube.public_playlists",
        "https://www.googleapis.com/auth/dataportability.youtube.public_videos",
      ],
 */
/* EXAMPLE RESPONSE
GOOGLE USER INFO:  {
"idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU1YzE4OGE4MzU0NmZjMTg4ZTUxNTc2YmE
3MjgzNmUwNjAwZThiNzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxM
DA0NTY4OTkwNjM0LWhyZDcwajVvNDlvcDczZmtqZWthcjVvMGNzMjk1cTVuLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiY
XVkIjoiMTAwNDU2ODk5MDYzNC1qNHFhaGJ2ZXVha2pvOGFxM3FvdHYwczJqcDhtZTBoZC5hcHBzLmdvb2dsZXVzZXJjb250ZW50L
mNvbSIsInN1YiI6IjExNjI4MzY0ODk0ODA0MzA5Njk4NCIsImVtYWlsIjoiZGVyYmVuZWRpa3Quc3RlcnJhQGdtYWlsLmNvbSIs
ImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiQmVuZWRpa3QgU3RlcnJhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2d
sZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0l2WEJDbEl2VkdLcnpwd1NvY1pCb25wRkdKMFpxTkE0N2toX19wOERRWD1zOTYtYyI
sImdpdmVuX25hbWUiOiJCZW5lZGlrdCIsImZhbWlseV9uYW1lIjoiU3RlcnJhIiwibG9jYWxlIjoiZGUiLCJpYXQiOjE3MDg3MDQw
ODksImV4cCI6MTcwODcwNzY4OX0.Pq5XrvQpowFn7FS7AYIH14lTJEag2TrvPQAGTlDPpv2T84q0zNHyPj7dzGEImnNU68yd9pRoW2
FvJ-KBk0Kzw4Qo1iaBc1oRjMPHzJGHbDqziVskMyAe6vmLaGrPvdj6IVGbd3vy1NwrOJVW7PwAlPYiF2cCQmDj0POI7cZFHZ5jncV
Uu41ZHySTo7ffoGXuEp0P90B2RD4bpGE226BJ_gZg-dOnz5ow7YHiUMt6cS62MqvrnOpHcD4XEkH_NtNI9uumPQZdrHmep14tU1K2s
L6NRL3iwEEaLPWTdf_8qS6o9cDR5G7nmbLXWyslPqM827FmQcCZNd6LQ9F6u4uScA",
"scopes": ["https://www.googleapis.com/auth/userinfo.profile",
"https://www.googleapis.com/auth/userinfo.email"],
"serverAuthCode": "4/0AeaYSHA0-9dn9XkiCwx5wpNqcjb22gyH67VFcJpNJsbZNP_K2RqVN-gHcK9tCp_5XeniTg",
"user": {
"email": "derbenedikt.sterra@gmail.com",
"familyName": "Sterra",
"givenName": "Benedikt",
"id": "116283648948043096984",
"name": "Benedikt Sterra",
"photo": "https://lh3.googleusercontent.com/a/ACg8ocIvXBClIvVGKrzpwSocZBonpFGJ0ZqNA47kh__p8DQX=s96-c"}
}
 */


