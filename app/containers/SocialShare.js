//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground,AsyncStorage, Dimensions } from 'react-native';
import BeiJing from '../images/beijing.png';
import { Toast } from 'antd-mobile';
import QRCode from 'react-native-qrcode';
import QQImage from '../images/qq.png';
import Pengyou from '../images/pengyou.png';
import Weixin from '../images/weixin.png';
import * as WeChat from 'react-native-wechat';

const { width, height } = Dimensions.get('window');

const url = 'http://m.rrsjk.com/socialShare.html?memberId=';

// create a component
class SocialShare extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text:''
        };
      WeChat.registerApp('wx35f14e67f7ac19bc');
    }
    
    onPress = (type)=>{
        this.share(type);
    }
    async share(type){
        switch (type) {
            case '1':
                {
                    try {
                        let result = await WeChat.shareToSession({
                          type: 'news',
                          title: '送你300积分，快来领取吧！',
                          description: '领取300积分，扫码免费喝健康好水，还有更多抽奖等你拿！',
                          webpageUrl: this.state.text
                        });
                        console.log('share image url to time line successful:', result);
                      } catch (e) {
                        if (e instanceof WeChat.WechatError) {
                          console.error(e.stack);
                        } else {
                          throw e;
                        }
                      }
                }
                break;
            case '2':
            {
                try {
                    let result = await WeChat.shareToTimeline({
                      type: 'news',
                      title: '送你300积分，快来领取吧！',
                      description: '领取300积分，扫码免费喝健康好水，还有更多抽奖等你拿！',
                      webpageUrl: this.state.text
                    });
                    console.log('share image url to time line successful:', result);
                  } catch (e) {
                    if (e instanceof WeChat.WechatError) {
                      console.error(e.stack);
                    } else {
                      throw e;
                    }
                  }
            }
                break;
            default:
                break;
        }
       
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
                        size={0.2*height}
                        bgColor='black'
                        fgColor='white'/>
                    <Text style={{margin: 10,backgroundColor: 'transparent'}}>扫一扫</Text>
                    <View style={{height:100,width:width,backgroundColor:'transparent',flexDirection:'row',justifyContent:'space-around'}}>
                        <TouchableOpacity style={styles.contentCenter} onPress={()=>this.onPress('1')}>
                            <Image source={Weixin} style={{width: 60,height: 60}}/>
                            <Text style={styles.messagetext}>微信</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.contentCenter} onPress={()=>this.onPress('2')}>
                            <Image source={Pengyou} style={{width: 60,height: 60}} />
                            <Text style={styles.messagetext}>朋友圈</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.contentCenter} onPress={()=>this.onPress('3')}>
                            <Image source={QQImage} style={{width: 60,height: 60}} />
                            <Text style={styles.messagetext}>QQ</Text>
                        </TouchableOpacity> */}
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
