//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavBarConfig } from './controllers';
import MineIcon from '../images/mine.png';
import EyeIcon from '../images/eye.png';
import Zu1 from '../images/zu1.png';
import Zu2 from '../images/zu2.png';
import Zu3 from '../images/zu3.png';
import Zu4 from '../images/zu4.png';
import Zu5 from '../images/zu5.png';
import Zu6 from '../images/zu6.png';
import Xinshou from '../images/xinshou1.png';
import { Grid, Toast } from 'antd-mobile';


const apps = [
    {
        appIcon:Zu1,
        text: '办理水卡'
    },
    {
        appIcon:Zu2,
        text: '在线充值'
    },
    {
        appIcon:Zu3,
        text: '水站管理'
    },
    {
        appIcon:Zu4,
        text: '会员管理'
    },
    {
        appIcon:Zu5,
        text: '经营分析'
    },
    {
        appIcon:Zu6,
        text: '水站学堂'
    }
];

// create a component
class home extends Component {
   constructor(props) {
       super(props);
       this.state = {
           todayMoney: 1780.00,
           todayBucket: 189,
           todayCards: 58,
           waterStation: 19,
       };
       
   }
   itemClick = (item) => {
    const { navigation } = this.props;
     switch (item.text) {
         case '办理水卡':
         navigation.navigate('ApplyCard', {name: '办理水卡'});
             break;
         case '在线充值':
         case '水站管理':
         case '会员管理':
         case '经营分析':
         case '水站学堂':
         Toast.info('敬请期待!', 2, null, false);
            break;
         default:
             break;
     }
   }
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
               <View style={styles.topcontainer}>
                <View style={styles.navtopbar}>
                  <TouchableOpacity onPress={()=>navigation.navigate('DrawerOpen', {name: '打开抽屉'})}>
                      <Image source={MineIcon} style={styles.mineIcon}/>
                   </TouchableOpacity>
                  <Text style={styles.title}>
                     水站管家
                  </Text>
                  <Image style={styles.mineIcon}/>
                </View>
                <View style={styles.midcontainer}>
                   <Text style={{color:'white'}}>当天充值</Text>
                   <View style={{flexDirection:'row'}}>
                      <Text style={{color:'white',fontSize:25}}>￥{this.state.todayMoney}</Text>
                      <TouchableOpacity>
                         <Image source={EyeIcon} style={[styles.mineIcon,{marginLeft:10}]} resizeMode='contain' />
                      </TouchableOpacity>
                   </View>
                </View>
                <View style={{height:70,backgroundColor:'#F0EDF6',flexDirection:'row',justifyContent:'space-around'}}>
                  <View style={styles.contentCenter}>
                      <Text style={[styles.messagetext,styles.messageFont]}>{this.state.todayBucket}</Text>
                      <Text style={styles.messagetext}>今日打水(桶)</Text>
                  </View>
                  <View style={styles.contentCenter}>
                      <Text style={[styles.messagetext,styles.messageFont]}>{this.state.todayCards}</Text>
                      <Text style={styles.messagetext}>今日办卡(张)</Text>
                  </View>
                  <View style={styles.contentCenter}>
                      <Text style={[styles.messagetext,styles.messageFont]}>{this.state.waterStation}</Text>
                      <Text style={styles.messagetext}>经营水站(台)</Text>
                  </View>
                </View>
              </View>
              <View style={styles.bottomtainer}>
                <Grid
                    data={apps}
                    hasLine={false}
                    columnNum={3}
                    renderItem={dataItem => {
                        return (
                            <TouchableOpacity
                                onPress={() => this.itemClick(dataItem)}
                                style={[styles.contentCenter,{marginTop:40}]}
                            >
                                <View style={styles.contentCenter}>
                                    <Image resizeMode='contain'
                                        source={dataItem.appIcon}
                                        style={styles.itemimage}/>
                                    <Text>{dataItem.text}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }
                    }
                    />
                    <View style={{flexDirection:'row',justifyContent:'center',padding:20}}>
                        <Image source={Xinshou} style={{width:20,height:20,marginRight:10}}/>
                        <Text style={styles.messagetext}>
                            新手指南->>
                        </Text>
                   </View>
              </View>
            </View>
        );
    }
}

home.navigationOptions = {
    header: null
};
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    topcontainer:{
        flex:1.4,
        backgroundColor: '#D5002F',
        justifyContent:'space-between',
    },
    midcontainer:{
      height:120,
      alignItems: 'center'
    },
    bottomtainer:{
        flex:2,
        marginTop:30,
        justifyContent:'space-between',
    },
    navtopbar:{
        height:64,
        margin:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    title:{
        color:'white',
        fontSize: 18,
    },
    mineIcon:{
        width: 30,
        height:30,
    },
    messagetext:{
        color: '#D5002F',
    },
    contentCenter:{
        justifyContent:'center',
        alignItems:'center'
    },
    messageFont:{
        fontSize: 18
    },
   
    itemimage: {
        height: 60,
        width: 60,
        marginBottom: 10,
    },
});

//make this component available to the app
export default home;
