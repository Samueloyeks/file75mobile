import UUIDGenerator from 'react-native-uuid-generator';


export async function generateId() {
    const uuid = await UUIDGenerator.getRandomUUID();
    return uuid;
}
