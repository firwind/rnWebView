//import liraries
import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ImageBackground,
    Dimensions,
    Image
} from 'react-native';
import Bg2 from '../images/bg2.jpg';
import icon1 from '../images/icon1.png';
import { List, InputItem, Switch, Stepper, Range, Button, createTooltip } from 'antd-mobile';

const { width,height} = Dimensions.get('window');

const infos = {
    name:'南岔河水站',
    bianhao: '92000001',
    location: '上东畏寒啊嘎嘎',
    state:'正常'
};

// create a component
class StationDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
          ...infos
        };
    }
    onclick = () =>{
        console.log('====================================');
        console.log('打印日志阿道夫');
        console.log('====================================');
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={Bg2} style={{width:width,height:120,flexDirection:'row'}}>
                  <View style={styles.icon}>
                      <Image source={icon1} style={{height:30,width:30}} resizeMode='contain'/>
                  </View>
                  <View>
                    <Text style={styles.text1}>{this.state.name}</Text>
                    <Text style={styles.text2}>{`水站编号：${this.state.bianhao}`}</Text>
                    <Text style={styles.text2}>{`安装位置：${this.state.bianhao}`}</Text>   
                  </View>
                </ImageBackground>
                <List>
                  <List.Item extra={this.state.state}>联网状态</List.Item>
                  <List.Item extra='查看' arrow='horizontal' onClick={()=>this.onclick()}>打水记录</List.Item>
               </List>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEFF6',
    },
    top:{
        padding:10,
        flexDirection:'row'
    },
    icon:{
        height:50,
        width:50,
        backgroundColor:'lightgray',
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        margin:15
    },
    text1:{
        fontSize:18,
        color:'white',
        backgroundColor:'transparent',
        marginTop:20,
        marginBottom:10
    },
    text2:{
        fontSize:16,
        color:'white',
        backgroundColor:'transparent',
        marginBottom:5
    }
});

//make this component available to the app
export default StationDetail;
