import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, Custom } from '../../styles'


export default StyleSheet.create({
    screen: {
        flex: 1,
    },
    customBackground: {
        height: '100%',
        // padding: 30,
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
        flex: 1
    },
    content: {
        flex: 0.99
    },
    titleStyle: {
        paddingVertical: Spacing.SCALE_18,
        fontSize: Typography.FONT_SIZE_24,
        color: Colors.SECONDARY
    },
    labelStyle: {
        paddingVertical: Spacing.SCALE_8,
        fontSize: Typography.FONT_SIZE_12,
        color: Colors.SECONDARY,
        fontFamily: 'Montserrat-Regular'
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
        fontSize: Typography.FONT_SIZE_28
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
        flexDirection: 'row',
        flexWrap: 'wrap'
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
        marginTop: 20,
    },
    primaryButtonStyle: {
        backgroundColor: Colors.PRIMARY
    },
    secondaryButtonStyle: {
        backgroundColor: Colors.SECONDARY
    },
    imageContainer: {
        width: '100%',
        height: 250,
        overflow: 'hidden',
        padding: 10,
        backgroundColor: '#FFF',
        // textAlign:'center',
        // alignItems:'center',
        // justifyContent:'center'
    },
    image: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
