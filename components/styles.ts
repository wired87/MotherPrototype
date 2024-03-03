import {Dimensions, StyleSheet} from "react-native";

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent"
    },
    box1: {
        marginTop: 20,
        backgroundColor: "black",
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    subBox1: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 0.5,
        borderBottomColor: "grey",
        paddingBottom: 15
    },
    boxText1: {
        backgroundColor: "#2b2a27",
        borderRadius: 10,
        padding: 4,
    },
    middleText: {
        textAlign: "center",
        marginBottom: 5,
    },




    subBox2: {
        textDecorationLine: "underline",
        display: "flex",
        flexDirection: "row",

        alignItems: "center",
        backgroundColor: "red",
        borderBottomWidth: 0.5,  // Add this to create a bottom border
        borderBottomColor: "grey",
        paddingBottom: 15

    },


    adsCont: {
        borderColor :"white",
        marginTop: 50,
        borderRadius:28,
        paddingVertical: 30,

    },




    infoElementContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },

    optionsContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 45,
        paddingHorizontal: 30,
        borderRadius: 14,
        borderWidth: 1,
    },
    optionsElement: {
        width: windowWidth * .7,
        height: 60,
        justifyContent: "center",
        alignItems: 'flex-start',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#01152a',
        marginTop: 20,
    },



    authTextInfo: {
        marginTop: 20,
    },

    authNavHeaderContainerSmall: {
        marginHorizontal: 15,
        borderRadius: 14,
    },

    headerContainerAuth:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,

    },


    infoChangeContainer: {
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 0,
        paddingVertical: 5,
        backgroundColor: 'transparent',
        width: 300,
        height: 60,
    },
    personalInfoText: {
        width: 250,
        borderWidth: .5,
        borderRadius: 9,
        fontFamily: "Roboto",
        fontSize: 17,
        paddingLeft: 10,
        paddingVertical: 7,
        overflow: 'hidden',
    },
    label: {
        marginRight: 10,
        width: 80,
        fontSize: 17,
        fontFamily: "Roboto",
    },


    purchaseButtonAccountMain: {
        borderRadius: 20,
        width: 200,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },

    tabBArContainer: {
        width: window.innerWidth,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
    },
    smallTabBArContainer: {
        padding: 10,
        width: window.innerWidth * .33,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
    },
    linearGradient: {
        borderRadius: 9,
        width: 300,
        paddingVertical: 2,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(1,21,42,0.2)',
    },


    endButton: {
        marginBottom: 120,
        width: 300,
        height: 220,
        marginTop: 36,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    adsContainer: {
        flex: 1,
    },
    rowPadding: {
        paddingHorizontal: 20
    },

    header: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 10
    },
    headerDesc: {
        lineHeight: 28,
        color: 'white',
        textAlign: 'left'
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 20
    },
    btnContainer: {
        borderColor:"white",
        borderWidth: 2,
        backgroundColor: 'rgba(255, 255, 255, .3)',
        paddingVertical: 8,
        marginHorizontal: 10,
        justifyContent:"center",
        alignItems:"center",
        borderRadius: 20,
        elevation: 50,
        shadowOffset: { width: 70, height: 40 },
        shadowOpacity: .5,
        shadowRadius: 4,
        padding: 16,
        shadowColor: "#FFFFFF",
        width: windowWidth * .8,
        flexDirection: "row",
    },




    profile: {
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',


    },
    whiteProfileBox :{

        borderWidth: 2,
        borderColor:"lightgray",

        borderRadius: 10,
        marginRight:10,
        marginLeft:10,
        marginTop:10,
        padding:20


    },
    profilePhoto: {
        height: 100,
        width: 100,
        borderRadius: 100 / 2,
        borderWidth: 2,
        backgroundColor: 'lightgray',
        borderColor: 'gray'
    },
    profileInfo: {
        flex: 1
    },

    infoTxt: {
        color: 'black',
        fontSize: 15,
        fontFamily: "JetBrainsMono",
        marginBottom: 30,
        flexWrap:"wrap",
    },


    // INput


    logoText: {
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        color:"black",
        fontSize:40,
        fontFamily: "JetBrainsMono",
        marginBottom: 0,
    },

    logoCont :{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        paddingTop:30,
        marginTop:20,
        paddingBottom:130
    },
    optionBtn: {
        borderRadius: 6,
        borderWidth: 1,
        paddingHorizontal: 14,
        paddingVertical: 8
    },
    optionTxt: {
        color: 'black',
        fontSize: 16,
        fontFamily: "JetBrainsMono",

    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
    },
    MoreBtn :{
        backgroundColor:"#030824",
        height:50 ,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        marginTop:15
    },

    buttonTextProfile:{
        color:"white",
        fontSize:18,
    },


    buttonIconProfile: {
        marginRight: 5,
        color:"black",

    },
    buttonIconCont: {
        marginRight: 5,
        color:"black",
    },

    profileHeader: {
        fontSize: 34,
        fontFamily: "JetBrainsMono",
        color: '#000000',
        textAlign: 'center',
        marginTop: 40,
        marginHorizontal: "auto",
    },

    mirrorLogo: {
        fontSize: 60,
        fontFamily: "JetBrainsMono",
        opacity: .5,
        margin: 0,
    },

    modalInfoText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: "JetBrainsMono",
        textAlignVertical: "center",
    },

    button: {
        borderRadius: 20,
        paddingHorizontal: 30,

        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: "JetBrainsMono",
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    errorImg: {
        width: 100,
        height: 100,
        marginVertical: 10,
    },

    topBtnTxt: {
        marginLeft: 10,
        marginRight: 30,
        textAlign: 'left',
        fontSize: 18,
        fontFamily: "JetBrainsMono",
        color:"rgba(255,255,255,1)"
    },


})
