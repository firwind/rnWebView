//import liraries
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import {List, InputItem, Toast, Radio, Icon,} from 'antd-mobile';
import Qianbao from '../images/qianbao.png';
import cardcode from '../images/cardcode.png';
import QrcodeImage from '../images/saoyisao.png';
import user from '../images/user.png';
import tel from '../images/tel.png';
import { postJSON } from '../network';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeProgress } from '../redux/Actions';
import checkedicon from '../images/checkedicon.png';
const {width, height} = Dimensions.get('window');


// create a component
class ApplyCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardNum: '',
            nameStr: '',
            phoneStr: '',
            money: 0
        };
    }
   
    getCardNum = (num) =>{
        this.setState({cardNum:num})
    }
    applayToServer = ()=>{
        if (this.state.cardNum.length===0) {
            Toast.info('卡号不能为空！', 2, null, false);
            return;
        }
        if (this.state.nameStr.length===0) {
            Toast.info('姓名不能为空！', 2, null, false);
            return;
        }
        if (this.state.phoneStr.length===0) {
            Toast.info('电话不能为空！', 2, null, false);
            return;
        }
        if (this.state.money===0) {
            Toast.info('金额不能为0', 2, null, false);
            return;
        }
        AsyncStorage.getItem('id',(error,value)=>{
            if(value.length>0){
                this.fethData(value);
            }
            else{
             Toast.info('权限出错', 2, null, false);
            }
        });
        
    }
    async fethData(value) {
        this.props.changeProgress(true);
        const params = `memberId=${value}&cardNo=${this.state.cardNum}&alias=${this.state.nameStr}&mobile=${this.state.phoneStr}&recharge=${this.state.money}`;
        console.log('====================================');
        console.log(`输出参数：${params}`);
        console.log('====================================');
        const url = 'socialCard/createCard';
         try {
            const json = await postJSON(url,params);
             this.props.changeProgress(false);
             if (json.success) {
                this.setState({
                    cardNum: '',
                    nameStr: '',
                    phoneStr: '',
                    money: 0
                })
                
                Toast.info('水卡办理成功!', 3, null, false);
             }
             else{
              Toast.info(json.msg, 2, null, false);
             }
            console.log('====================================');
            console.log(`请求接口数据${JSON.stringify(json)}`);
            console.log('====================================');
          //   this.props.changeHomeApp(json);
         } catch (error) {
           Toast.info('网络错误!', 2, null, false);
           this.props.changeProgress(false);
          //    this.props.changeProgress(false);
             console.log('====================================');
             console.log(`请求接口失败${error}`);
             console.log('====================================');
         }
      }
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <List>
                    <InputItem 
                        placeholder="输入卡号" 
                        type ='number' 
                        extra={
                        <TouchableOpacity onPress={()=>navigation.navigate('Scanner', {callback:this.getCardNum})}>
                            <View style={{width:80,height:30,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                <Text style={{fontSize:16,color:'#98999A'}}>扫一扫</Text>
                                <Image source={QrcodeImage} style={{height:25,width:25 }} resizeMode='contain'/>
                            </View>
                        </TouchableOpacity>} 
                        value={this.state.cardNum} 
                        onChange={(value)=>this.setState({cardNum:value})}
                        >
                        <Image source={cardcode} style={{height:18,width:18}} resizeMode='contain' />
                    </InputItem>
                    <InputItem 
                        placeholder="输入姓名，如张三" 
                        value={this.state.nameStr} 
                        onChange={(value)=>this.setState({nameStr:value})} >
                        <Image source={user} style={{height:18,width:18}} resizeMode='contain' />
                    </InputItem>
                    <InputItem 
                        placeholder="输入用户手机号" 
                        type='number'
                        value={this.state.phoneStr} 
                        onChange={(value)=>this.setState({phoneStr:value})}>
                        <Image source={tel} style={{height:18,width:18}} resizeMode='contain' />
                    </InputItem>
                </List>
                <List renderHeader={() => '充值金额'}>
                    <InputItem 
                        placeholder="输入水卡充值金额，如100元" 
                        type='number'
                        value={this.state.money} 
                        onChange={(value)=>this.setState({money:value})} />
                </List>
                <List renderHeader={() => '支付方式'}>
                    <List.Item
                        extra={< Image source = {checkedicon} style={{height:16,width:16}} resizeMode='contain'/>}
                        thumb="http://7xqi6y.com1.z0.glb.clouddn.com/qianbao.png">
                        线下支付
                    </List.Item>
                </List>
                <View style={styles.bottom}>
                    <View
                        style={[
                        styles.moneycontainer, {
                            flex: 2
                        }
                    ]}>
                        <Text style={[styles.title]}>充值金额：</Text>
                        <Text style={[styles.title, styles.money]}>{this.state.money}元</Text>
                    </View>
                    <View
                        style={[
                        styles.moneycontainer, {
                            flex: 1,
                            backgroundColor: '#c7003a'
                        }
                    ]}>
                        <TouchableOpacity
                            style={{
                            flex: 1
                        }}
                        onPress = {this.applayToServer}
                        >
                            <Text
                                style={{
                                color: 'white',
                                fontSize: 20,
                                flex: 1,
                                textAlign: 'center',
                                marginTop:20
                            }}>充值</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFF6',
        flexDirection: 'column'

    },
    bottom: {
        height: 60,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        width,
        flexDirection: 'row'
    },
    moneycontainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        color: '#98999A',
        marginLeft: 20
    },
    money: {
        marginLeft: 0,
        color: '#c7003a'
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

export default connect(mapStateToProps, mapDispatchToProps)(ApplyCard);
