import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, Custom } from '../../styles'


export default StyleSheet.create({
    screen: {
        flex: 1,
    },
    customBackground: {
        backgroundColor: Colors.CUSTOMBACKGROUND,
        padding: 30,
        flex: 0.99
    },
    content: {
        flex: 0.99
    },
    textCenter: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boldText: {
        fontFamily: 'Montserrat-Bold',
        color: Colors.SECONDARY
    },
    smallText: {
        fontSize: Typography.FONT_SIZE_8
    },
    largeText: {
        fontSize: Typography.FONT_SIZE_24
    },
    bottom: {
        flex: 0.01,
        alignItems: 'center',
        justifyContent: 'flex-end',
        textAlign: 'center',
        backgroundColor: Colors.CUSTOMBACKGROUND,
        padding: 10
    },
    primary: {
        color: Colors.PRIMARY
    },
    textInline: {
        flexDirection: 'row'
    },
    floatLeft: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    buttonStyle: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    primaryButtonStyle: {
        backgroundColor: Colors.PRIMARY
    },
    secondaryButtonStyle: {
        backgroundColor: Colors.SECONDARY
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    overlay: {
        zIndex: 1,
        backgroundColor: 'transparent',
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomView: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    }
});
