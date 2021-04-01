import api from './api';
import db from '../utils/db';
import { getToken } from '../helpers/auth';
import axios from 'axios';
import {
    API_URL,
    GOOGLE_WEB_CLIENT,
    GOOGLE_IOS_CLIENT
} from 'react-native-dotenv';
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';


 
const baseURL = API_URL;

GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT,
    offlineAccess: true,
    iosClientId: GOOGLE_IOS_CLIENT,
});



export const userService = {
    login,
    signup,
    facebookAuth,
    googleAuth,
    forgotPassword,
    logout
};

async function login(data) {
    const url = `${baseURL}/login`;

    try {
        const resp = await axios.post(url, data);
        if (resp.data) {
            const userToken = resp.data.token
            const user = resp.data.data.user
            const userData = {
                email: user.email,
                fullName: user.fullName,
                id: user._id
            }
            await db.set('userToken', userToken);
            await db.set('userData', JSON.stringify(userData));

            return resp.data;
        }
    } catch (error) {
        if (error.response && error.response.status == 401) {
            alert('Incorrect email or password')
        }
        return error;
    }
}

async function signup(data) {
    const url = `${baseURL}/signup`;

    try {
        const resp = await axios.post(url, data);
        if (resp.data) {
            const userToken = resp.data.token
            const user = resp.data.data.user
            const userData = {
                email: user.email,
                fullName: user.fullName,
                id: user._id
            }
            console.log(userData)
            await db.set('userToken', userToken);
            await db.set('userData', JSON.stringify(userData));

            return resp.data;
        }
    } catch (error) {
        if (error.response && error.response.status == 409) {
            alert('Email has already been registered')
        }
        return error;
    }
}

async function facebookAuth() {
    const login = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    try {
        if (login.isCancelled) {
            console.log('login cancelled');
        } else {
            let data = await AccessToken.getCurrentAccessToken();
            const accessToken = data.accessToken.toString();
            const user = await getInfoFromToken(accessToken);
            const url = `${baseURL}/auth/facebook`;
            const resp = await axios.post(url, user);

            if (resp.data) {
                const userToken = resp.data.token
                const user = resp.data.data.user
                const userData = {
                    email: user.email,
                    fullName: user.fullName,
                    id: user._id
                }
                await db.set('userToken', userToken);
                await db.set('userData', JSON.stringify(userData));

                return resp.data;
            }

        }
    } catch (err) {
        console.log(err)
        alert('Error occured')
    }
}

async function googleAuth() {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        const user = {
            fullName: userInfo.user.name,
            email: userInfo.user.email,
            password: userInfo.user.id
        }
        const url = `${baseURL}/auth/google`;
        const resp = await axios.post(url, user);

        if (resp.data) {
            const userToken = resp.data.token
            const user = resp.data.data.user
            const userData = {
                email: user.email,
                fullName: user.fullName,
                id: user._id
            }
            await db.set('userToken', userToken);
            await db.set('userData', JSON.stringify(userData));

            return resp.data;
        }
    } catch (error) {
        console.log(error)
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
        } else {
            if (error.code == 401)
                alert('Email has already been registered')
        }
    }
}

async function forgotPassword(data) {
    const url = `${baseURL}/forgotPassword`;

    try {
        const resp = await axios.post(url, data);
        if (resp.data && resp.data.status == 'success') {
            return resp;
        }
    } catch (error) {
        alert('Error sending reset token')
        return error;
    }
}

async function logout() {
    // remove user from local storage to log user out
    // const url = `${baseURL}/logout`;
    // await axios.get(url);

    // await GoogleSignin.revokeAccess();
    // await GoogleSignin.signOut();
    await db.delete('userToken');
    await db.delete('userData');

    return;
}

function handleResponse(response) {
    console.log(response)
    if (response.status === 401) {
        // unauthorized 
        // logout();
        // location.reload(true);
    }

    if (response.status === 409) {
        console.log('email exists')
        alert('Email has already been registered')
        // unauthorized 
        // logout();
        // location.reload(true);
    }

    // const error = (data && data.message) || response.statusText;
    // return Promise.reject(error);

    return response.data;
}

function getInfoFromToken(token) {
    return new Promise((resolve, reject) => {
        const PROFILE_REQUEST_PARAMS = {
            fields: {
                string: 'first_name,last_name,email'
            }
        }
        const request = new GraphRequest(
            '/me', { token, parameters: PROFILE_REQUEST_PARAMS },
            (error, result) => {
                if (error) {
                    console.log('Login info has error', error)
                    reject(error)
                } else {
                    const userData = {
                        fullName: result.first_name + ' ' + result.last_name,
                        email: result.email,
                        password: result.id
                    }
                    resolve(userData)
                }
            }
        )

        new GraphRequestManager().addRequest(request).start()
    })
}

