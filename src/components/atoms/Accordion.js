import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from '../../styles';

export default class Accordion extends Component{

    constructor(props) {
        super(props);
        this.state = { 
          data: props.data,
          expanded : false,
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
  
  render() {

    return (
       <View>
            <TouchableOpacity ref={this.accordion} style={styles.row} onPress={()=>this.toggleExpand()}>
                <View style={{flex:0.8}}><Text style={[styles.title, styles.font]}>{this.props.title}</Text></View>
                <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={50} color={'#FFF'} />
            </TouchableOpacity>
            <View style={styles.parentHr}/>
            {
                this.state.expanded &&
                <View style={styles.child}>
                    <Text>{this.props.data}</Text>    
                </View>
            }
            
       </View>
    )
  }

  toggleExpand=()=>{
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded : !this.state.expanded})
  }

}

const styles = StyleSheet.create({
    title:{
        fontSize: 12,
        // fontWeight:'bold',
        color: Colors.SECONDARY,
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:80,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: Colors.PRIMARY,
        marginVertical:10
    },
    parentHr:{
        height:1,
        color: '#FFF',
        width:'100%'
    },
    child:{
        backgroundColor: '#FFF',
        padding:16,
    }
    
});