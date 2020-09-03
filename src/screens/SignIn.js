import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppLogo from '../components/AppLogo';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

function SignIn({navigation}) {
  const [user, setUser] = useState(null);
  const [visible, setVisible] = useState(false);

  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId:
      '24758434460-eeahus85qnrjs25grp4ukag1evs8m0tq.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  });
  //google sign in
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUser(userInfo);
      setVisible(true);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        Alert.alert('Something went wrong', 'You cancelled the process');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        Alert.alert('Sign In already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        Alert.alert('Something went wrong', 'Google Play services unavailable');
      } else {
        // some other error happened
        Alert.alert('Something went wrong', error.toString());
        console.log(error);
      }
    }
  };

  //facebook login
  async function facebookLogIn() {
    // try {
    //   await Facebook.initializeAsync('441063166853184');
    //   const {
    //     type,
    //     token,
    //     expires,
    //     permissions,
    //     declinedPermissions,
    //   } = await Facebook.logInWithReadPermissionsAsync({
    //     permissions: ['public_profile'],
    //   });
    //   if (type === 'success') {
    //     // Get the user's name using Facebook's Graph API
    //     const response = await fetch(
    //       `https://graph.facebook.com/me?access_token=${token}`,
    //     );
    //     Alert.alert('Logged in!', `Welcome ${(await response.json()).name}!`);
    //     navigation.navigate('Tabs');
    //   } else {
    //     Alert.alert('Facebook Login Failed');
    //   }
    // } catch ({message}) {
    //   Alert.alert('Facebook Login Failed', message);
    // }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppLogo />
      <View style={styles.rect}>
        <TouchableOpacity style={styles.button} onPress={facebookLogIn}>
          <View style={styles.iconRow}>
            <EntypoIcon name="facebook" style={styles.icon}></EntypoIcon>
            <Text style={styles.loremIpsum}>Sign in with Facebook</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={signInWithGoogle}>
          <View style={styles.icon2Row}>
            <MaterialCommunityIconsIcon
              name="google"
              style={styles.icon2}></MaterialCommunityIconsIcon>
            <Text style={styles.signInWithGoogle}>Sign in with Google</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate('SignInForm')}>
          <Text style={styles.loremIpsum2}>
            Sign in with Email &amp; Mobile Number
          </Text>
        </TouchableOpacity>
        <Text style={styles.loremIpsum3}>
          If you are New user, Please Sign Up Below
        </Text>
        <TouchableOpacity
          style={styles.button3}
          onPress={() => navigation.navigate('SignUpStack')}>
          <Text style={styles.signUp}>SIGN UP</Text>
        </TouchableOpacity>
        <Text style={styles.loremIpsum4}>
          By creating or using an Account you agree to the
        </Text>
        <Text style={styles.loremIpsum5}>
          ParkYouself Terms &amp; Conditions and Privacy Policy
        </Text>
      </View>

      {/* user data modal */}
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{user && user.toString()}</Text>

            <TouchableOpacity
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={() => {
                setVisible(!visible);
              }}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  rect: {
    height: 480,
    backgroundColor: 'rgba(39,170,225,1)',
    marginTop: 45,
    alignItems: 'center',
  },
  button: {
    width: 306,
    height: 58,
    backgroundColor: 'rgba(51,88,158,1)',
    borderRadius: 5,
    shadowColor: 'rgba(39,39,39,0.4)',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    elevation: 30,
    shadowOpacity: 0.72,
    shadowRadius: 50,
    flexDirection: 'row',
    marginTop: 40,
    // marginLeft: 34,
  },
  icon: {
    color: 'rgba(252,252,252,1)',
    fontSize: 34,
    height: 37,
    width: 34,
  },
  loremIpsum: {
    fontFamily: 'roboto-regular',
    color: 'rgba(246,244,244,1)',
    fontSize: 15,
    marginLeft: 39,
    marginTop: 9,
  },
  iconRow: {
    height: 37,
    flexDirection: 'row',
    flex: 1,
    marginRight: 73,
    marginLeft: 15,
    marginTop: 10,
  },
  button1: {
    width: 306,
    height: 58,
    backgroundColor: 'rgba(234,66,53,1)',
    borderRadius: 5,
    shadowColor: 'rgba(101,101,101,1)',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    elevation: 30,
    shadowOpacity: 0.44,
    shadowRadius: 50,
    flexDirection: 'row',
    marginTop: 17,
    // marginLeft: 34,
  },
  icon2: {
    color: 'rgba(251,251,251,1)',
    fontSize: 33,
    height: 36,
    width: 33,
  },
  signInWithGoogle: {
    fontFamily: 'roboto-regular',
    color: 'rgba(248,248,248,1)',
    fontSize: 15,
    marginLeft: 49,
    marginTop: 9,
  },
  icon2Row: {
    height: 36,
    flexDirection: 'row',
    flex: 1,
    marginRight: 81,
    marginLeft: 15,
    marginTop: 10,
  },
  button2: {
    width: 306,
    height: 58,
    borderRadius: 5,
    shadowColor: 'rgba(60,60,60,1)',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    elevation: 30,
    shadowOpacity: 0.44,
    shadowRadius: 50,
    backgroundColor: 'rgba(255,254,254,1)',
    marginTop: 18,
    // marginLeft: 34,
  },
  loremIpsum2: {
    fontFamily: 'roboto-700',
    color: 'rgba(92,159,188,1)',
    fontSize: 15,
    marginTop: 20,
    marginLeft: 28,
  },
  loremIpsum3: {
    fontFamily: 'roboto-regular',
    color: 'rgba(252,250,250,1)',
    opacity: 0.66,
    letterSpacing: 0,
    fontSize: 15,
    marginTop: 30,
    // marginLeft: 60,
  },
  button3: {
    width: 306,
    height: 49,
    borderWidth: 1,
    borderColor: 'rgba(225,221,221,1)',
    marginTop: 18,
    // marginLeft: 34,
  },
  signUp: {
    fontFamily: 'roboto-500',
    color: 'rgba(235,233,233,1)',
    fontSize: 18,
    marginTop: 13,
    marginLeft: 119,
  },
  loremIpsum4: {
    fontFamily: 'roboto-regular',
    color: 'rgba(239,237,237,1)',
    marginTop: 35,
    // marginLeft: 38,
  },
  loremIpsum5: {
    fontFamily: 'roboto-regular',
    color: 'rgba(247,245,245,1)',
    marginTop: 4,
    // marginLeft: 31,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default SignIn;
