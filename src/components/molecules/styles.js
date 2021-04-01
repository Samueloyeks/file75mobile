import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../styles';

export default StyleSheet.create({
    customBackground: {
        backgroundColor: Colors.CUSTOMBACKGROUND
    },
    header: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        padding: 15,
        // shadowColor: '#000',
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity: 0.4,
        // shadowRadius: 3, 
        // elevation: 5,
        alignItems: 'center',
    },
    headerLeft: {
        flex: 0.5,
        alignItems: 'flex-start'
    },
    headerRight: {
        flex: 0.5,
        alignItems: 'flex-end'
    },
    input: {
        overflow: 'hidden',
        backgroundColor: Colors.WHITE,
        height: 50,
    },
    inputContainer: {
        borderBottomWidth: 0,
        paddingHorizontal: 10,
    },
    inputStyle: {
        fontSize: 12
    },
    searchContainerStyle: {
        borderRadius: 50,
        height: 30,
        padding: 0,
        backgroundColor: Colors.WHITE,
        borderTopWidth: 0
    },
    searchInputContainerStyle: {
        height: 35,
        borderRadius: 50,
        backgroundColor: Colors.WHITE
    },
    searchInputStyle: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12
    },
    errorText: {
        color: 'red',
        fontSize: 12
    },
    serviceCardContainer: {
        backgroundColor: Colors.WHITE,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    serviceDescText: {
        color: 'grey',
        textAlign: 'center'
    },
    textCenter: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom: {
        flex: 0.01,
        alignItems: 'center',
        justifyContent: 'flex-end',
        textAlign: 'center',
        backgroundColor: Colors.CUSTOMBACKGROUND,
        padding: 10,
        position: 'relative'
    },
    smallText: {
        fontSize: Typography.FONT_SIZE_8
    },
    inputIconStyle: {
        marginRight: 5
    },
    socialBlock: {
        flexDirection: 'row',
        paddingHorizontal: '25%',
        margin: 5,
        justifyContent: 'space-between'
    },
    taskCardContainer: {
        backgroundColor: Colors.WHITE,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        // textAlign: 'center',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    taskDescText: {
        color: 'black',
        marginLeft: 5,
        textAlignVertical: 'bottom',
        textTransform:'capitalize'
    },
    tasktime: {
        fontSize: 10,
        color: '#A7A7A7'
    },
    boldText: {
        fontFamily: 'Montserrat-Bold'
    },
    contactBlockContainer: {
        backgroundColor: '#FFF',
        padding: 10,
        // alignItems:'center',
        // justifyContent:'center',
        flexDirection: 'row',
        alignContent: 'space-between',
        justifyContent: 'space-between'
    },
    contactItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15,
        paddingHorizontal: 7,
        flexWrap: 'wrap',
        // flex: 0.3
    },
    mailBlock: {
        borderColor: '#D4D4D4',
        borderLeftWidth: 1,
        borderRightWidth: 1
    },
    contactText: {
        fontSize: 10,
        color: '#A7A7A7',
        marginVertical: 10,
        textAlign: 'center'
    },
    phoneText: {
        fontSize: 10,
        color: '#A7A7A7',
        textAlign: 'center'
    }
});
