//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground,AsyncStorage, Dimensions } from 'react-native';
import BeiJing from '../images/beijing.png';
import { Toast } from 'antd-mobile';
import QRCode from 'react-native-qrcode';
import QQImage from '../images/qq.png';
import Pengyou from '../images/pengyou.png';
import Weixin from '../images/weixin.png';

const { width, height } = Dimensions.get('window');

const url = 'http://m.rrsjk.com/socialShare.html?memberId=';

// create a component
class SocialShare extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text:''
        };
    }
    
    
    componentDidMount() {
        AsyncStorage.getItem('id',(error,value)=>{
            if(value.length>0){
                this.setState({text:`${url}${value}`});
            }
            else{
                Toast.info('权限出错', 2, null, false);
            }
        });
    }
    
    render() {
        return (
            <ImageBackground source={BeiJing} style={styles.backimage}>
                <View style={{flex: 1}}/>
                <View style={{flex: 1,alignItems: 'center'}}>
                    <QRCode
                        value={this.state.text}
                        size={150}
                        bgColor='black'
                        fgColor='white'/>
                    <Text style={{margin: 10,backgroundColor: 'transparent'}}>扫一扫</Text>
                    <View style={{height:100,width:width,backgroundColor:'transparent',flexDirection:'row',justifyContent:'space-around'}}>
                        <View style={styles.contentCenter}>
                            <Image source={Weixin} style={{width: 60,height: 60}}/>
                            <Text style={styles.messagetext}>微信</Text>
                        </View>
                        <View style={styles.contentCenter}>
                            <Image source={Pengyou} style={{width: 60,height: 60}} />
                            <Text style={styles.messagetext}>朋友圈</Text>
                        </View>
                        <View style={styles.contentCenter}>
                            <Image source={QQImage} style={{width: 60,height: 60}} />
                            <Text style={styles.messagetext}>QQ</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    topcontainer:{
        flex:3,
        backgroundColor: '#c7003a',
        justifyContent:'space-around',
    },
    midcontainer:{
        height:120,
        alignItems: 'center'
    },
    bottomtainer:{
        paddingTop:20,
        flex:4,
        justifyContent:'space-between',
    },
    navtopbar:{
        height:64,
        margin:20,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        color:'white',
        fontSize: 18,
        alignContent:'center',
    },
    mineIcon:{
        width: 30,
        height:30,
    },
    messagetext:{
        color: 'black',
        marginTop: 15
    },
    contentCenter:{
        justifyContent:'center',
        alignItems:'center',
    },
    messageFont:{
        fontSize: 18
    },
   
    itemimage: {
        height: 50,
        width: 50,
        marginBottom: 10,
    },
    header:{
        position:'absolute',
        left:0,
        top:15
    },
    backimage:{
        flex: 1
    }
});

//make this component available to the app
export default SocialShare;
