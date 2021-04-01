import db from '../utils/db';


export async function getToken() {
    var userToken;

    try {
        userToken = await db.get('userToken');
    } catch (ex) {
        console.log('Error getting token: ' + ex)
    }

    return userToken;
}

export async function deleteToken() {

    try {
        await db.delete('userToken');
    } catch (ex) {
        console.log('Error deleting token: ' + ex)
    }

    return userToken;
}

export async function getUser() {
    var userData;

    try {
        userData = await db.get('userData');
    } catch (ex) {
        console.log('Error getting user data: ' + ex)
    }

    return JSON.parse(JSON.parse(userData));
}