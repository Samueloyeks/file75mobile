import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, Custom } from '../../styles'


export default StyleSheet.create({
    screen: {
        flex: 1,
    },
    customBackground: {
        height: '100%',
        // padding: 30,
        paddingTop:30,
        paddingLeft:30,
        paddingRight:30,
        flex: 1
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
    largeText:{
        fontSize: Typography.FONT_SIZE_28
    },
    bottom: {
        flex: 0.01,
        alignItems:'center',
        justifyContent: 'flex-end',
        textAlign:'center',
        backgroundColor:Colors.CUSTOMBACKGROUND,
        padding:10
    },
    primary:{
        color:Colors.PRIMARY
    },
    textInline: {
        flexDirection: 'row',
        flexWrap:'wrap'
    },
    floatLeft:{
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    buttonStyle: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        zIndex:-2,
    },
    primaryButtonStyle:{
        backgroundColor:Colors.PRIMARY
    },
    secondaryButtonStyle:{
        backgroundColor:Colors.SECONDARY
    },
    addFormButton:{
        padding:10,
        alignSelf:'flex-end',
    },
    row:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-evenly'
    },
    oneThirdCol:{
        flex:0.3,
    },
    smallButtonStyle: {
        width: '100%',
        // height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        zIndex:-2,
        flexWrap:'wrap'
    },
});
