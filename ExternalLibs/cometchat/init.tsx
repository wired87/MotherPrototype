import {CometChat} from '@cometchat-pro/react-native-chat';

const appID = '2461041496490eae';
const region = 'EU';
const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .build();

CometChat.init(appID, appSetting).then(
    () => {
        console.log('Initialization completed successfully');
        // You can now call login function.
    },
    (error) => {
        console.log('Initialization failed with error:', error);
        // Check the reason for error and take appropriate action.
    },
);