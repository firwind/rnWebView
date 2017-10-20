//import liraries
import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Image,
    Dimensions,
    AsyncStorage,
    BackHandler 
} from 'react-native';
import { NavBarConfig } from './controllers';
import MineIcon from '../images/mine.png';
import EyeIcon from '../images/eye.png';
import Zu1 from '../images/zu1.png';
import Zu2 from '../images/zu2.png';
import Zu3 from '../images/zu3.png';
import Zu4 from '../images/zu4.png';
import Zu5 from '../images/zu5.png';
import Zu6 from '../images/zu6.png';
import HiddenImage from '../images/hidden.png';
import Xinshou from '../images/xinshou1.png';
import { Grid, Toast } from 'antd-mobile';
import ManageStation from './ManageStattion';
import MangeMember from './MangeMember';
import { postJSON } from '../network';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeProgress } from '../redux/Actions';

const { width, height } = Dimensions.get('window');


const apps = [
    {
        appIcon:Zu1,
        text: '办理水卡'
    },
    {
        appIcon:Zu2,
        text: '水卡充值'
    },
    {
        appIcon:Zu3,
        text: '水站管理'
    },
    {
        appIcon:Zu4,
        text: '水卡管理'
    },
    {
        appIcon:Zu5,
        text: '水站商城'
    },
    {
        appIcon:Zu6,
        text: '经营分析'
    }
    
];

// create a component
class home extends Component {
   constructor(props) {
       super(props);
       this.state = {
           todayMoney: 0,
           todayBucket: 0,
           todayCards: 0,
           waterStation: 0,
           localStorage: '',
           hidden:false
       };
       
   }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('====================================')
        console.log()
        console.log('====================================')
        return true;
   }
   onRefresh = () => {
    AsyncStorage.getItem('id',(error,value)=>{
        if(value.length>0){
           this.fetchData(value);
        }
        else{
         Toast.info('权限出错', 2, null, false);
        }
    });
   }
   componentDidMount() {
    const { navigation } = this.props;
    const { state } = navigation;
    const { params } = state;
    this.setState({
        todayMoney: params.todayRecharge,
        todayBucket: params.todayFetch,
        todayCards: params.todayCardNum,
        waterStation: params.dispenserNum,
        localStorage: params.localStorage
    });

    AsyncStorage.getItem('id',(error,value)=>{
        if(value.length>0){
           this.fetchData(value);
        }
        else{
         Toast.info('权限出错', 2, null, false);
        }
    });

    BackHandler.addEventListener('hardwareBackPress', function() {
        console.log('====================================');
        console.log();
        console.log('====================================');
        return true;
       });
   }

    async fetchData(value) {
        this.props.changeProgress(true);
        const url = `socialLogin/homePage`;
        const params = `memberId=${value}`;
        try {
            const json = await postJSON(url,params);
            this.props.changeProgress(false);
            if(json.dispenserNum){
                this.setState({
                    todayMoney:json.todayRecharge,
                    todayBucket:json.todayFetch,
                    todayCards:json.todayCardNum,
                    waterStation:json.dispenserNum
                })
            }
            else {
                Toast.info('请求接口失败!', 2, null, false);
            }

            console.log('====================================');
            console.log(`请求接口数据${JSON.stringify(json)}`);
            console.log('====================================');
        } catch (error) {
            Toast.info('网络错误！',2,null,false);
            this.props.changeProgress(false);
        }
    }

   itemClick = (item) => {
    const { navigation } = this.props;
     
     switch (item.text) {
         case '办理水卡':
         navigation.navigate('ApplyCard', {name: '办理水卡',onRefresh:this.onRefresh});
             break;
         case '水卡充值':
         navigation.navigate('ChargeCard', {name: '水卡充值',onRefresh:this.onRefresh});
             break;
         case '水站管理':
         navigation.navigate('ManageStation', {name: '水站管理',onRefresh:this.onRefresh});
             break;
         case '水卡管理':
         navigation.navigate('Records', {name: '水卡管理',onRefresh:this.onRefresh});
         break;
         case '经营分析':
         Toast.info('敬请期待!', 2, null, false); 
         break;
         case '水站商城':
         navigation.navigate('Shop', {user:this.state.localStorage});
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
                    <TouchableOpacity onPress={()=>navigation.navigate('DrawerOpen', {name: '打开抽屉'})} style={styles.header}>
                        <Image source={MineIcon} style={styles.mineIcon}/>
                    </TouchableOpacity>
                    <Text style={styles.title}>
                        水站管家
                    </Text>               
                </View>
                <View style={styles.midcontainer}>
                   <Text style={{color:'white'}}>当天充值</Text>
                   <View style={{flexDirection:'row',alignItems:'center'}}>
                      <Text style={{color:'white',fontSize:28}}>￥{this.state.hidden?'***':this.state.todayMoney}</Text>
                      <TouchableOpacity onPress={()=>{this.setState({hidden:!this.state.hidden})
                      }}>
                         <Image source={this.state.hidden?HiddenImage:EyeIcon} style={[styles.mineIcon,{marginLeft:10}]} resizeMode='contain' />
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
                                style={[styles.contentCenter]}
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
    header: null,

};
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
        color: '#c7003a',
    },
    contentCenter:{
        justifyContent:'center',
        alignItems:'center'
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
    }
});


const mapDispatchToProps = dispatch => bindActionCreators({
    changeProgress
},dispatch);

const mapStateToProps = (state, ownProps) => {
    return {
        progressHud: state.progressHud,
    };
};

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(home);
