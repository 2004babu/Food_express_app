import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile, UserCredential } from 'firebase/auth'
import showMessage from './utils/ShowMessage';
import axios from 'axios';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APPID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT
};
let auth;

const app = initializeApp(firebaseConfig)

export default auth = getAuth(app)

const googleauthProvider = new GoogleAuthProvider()


const apiurl = import.meta.env.VITE_BACKEND_URL;
export const sighInWithGoogle = async () => {
    try {
        if (!auth) return
        const result: UserCredential = await signInWithPopup(auth, googleauthProvider);

        const user = result.user;
        const token = await user.getIdToken()
        const response = await axios.post(apiurl + '/auth/googlelogin', {}, {withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
        if (response.data.user) {

            return response.data.user
        } else {
            return null

        }
    } catch (error) {
        console.log(error);
        showMessage((error as Error).message)
    }
}



export const signUpEmailAndPassword = async (email: string, password: string, name: string) => {
    try {

        const result: UserCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = result.user;

        const updateUser = await updateProfile(user, { displayName: name })
        console.log(updateUser);

        const token = await user.getIdToken();


        const response = await axios.post(apiurl + '/auth/emailSignup', {}, {withCredentials: true, headers: { Authorization: `Bearer ${token}` } })


        // await axios.post(apiurl + '/auth/setjwt', {}, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })


        if (response.data.user) {

            return response.data.user
        } else {
            return null

        }

    } catch (error) {
        console.log((error as Error).message);
        return (error as Error).message
    }
}
export const sighInWithEmail = async (email: string, password: string) => {
    try {

        const result: UserCredential = await signInWithEmailAndPassword(auth, email, password)

        if (result.user) {

            return `"Welcome!" ${result.user.displayName ?? result.user.email}`
        } else {
            return 'User Not Found!'

        }


        // const user = result.user
        // const token = await user.getIdToken();

        // const apiurl = import.meta.env.VITE_BACKEND_URL

        // const response = await axios.post(apiurl + '/auth/emaillogin', {}, { headers: { Authorization: `Bearer ${token}` } })

    } catch (error) {
        console.log((error as Error).message);
        return 'User Not Found Check UserName and PassWord!'


    }
}

