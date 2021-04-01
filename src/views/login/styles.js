import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, Custom } from '../../styles'

export default StyleSheet.create({
    customBackground: {
        backgroundColor: Colors.CUSTOMBACKGROUND,
        // height: '100%',
        padding: 30,
        paddingTop: '30%',
        flex:0.9,
    },
    titleStyle: {
        paddingVertical: Spacing.SCALE_18,
        fontSize: Typography.FONT_SIZE_24,
        color: Colors.SECONDARY
    },
    labelStyle: {
        paddingVertical: Spacing.SCALE_8,
        fontSize: Typography.LINE_HEIGHT_16,
        color: Colors.SECONDARY,
        fontFamily: 'Montserrat-Bold'
    },
    buttonStyle: {
        width: '100%',
        backgroundColor: Colors.PRIMARY,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    textCenter: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInline: {
        flexDirection: 'row'
    },
    boldText: {
        fontFamily: 'Montserrat-Bold',
        color: Colors.SECONDARY
    },
    smallText: {
        fontSize: Typography.FONT_SIZE_8
    }
});
