//import liraries
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import {List, InputItem, Toast, Radio, Icon} from 'antd-mobile';
import Qianbao from '../images/qianbao.png';
import QrcodeImage from '../images/saoyisao.png';

const {width, height} = Dimensions.get('window');


// create a component
class ApplyCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardNum: '',
            nameStr: '',
            phoneStr: '',
            money: ''
        };
    }
    
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <List>
                    <InputItem placeholder="输入卡号，如0200157492" extra={
                        <TouchableOpacity onPress={()=>navigation.navigate('Scanner', {name: ''})}>
                            <View style={{width:80,height:30,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                <Text style={{fontSize:16,color:'#98999A'}}>扫一扫</Text>
                                <Image source={QrcodeImage} style={{height:25,width:25 }} resizeMode='contain'/>
                            </View>
                        </TouchableOpacity>}>{this.state.cardNum}</InputItem>
                    <InputItem placeholder="输入姓名，如张三">{this.state.nameStr}</InputItem>
                    <InputItem placeholder="输入用户手机号" type='phone'>{this.state.phoneStr}</InputItem>
                </List>
                <List renderHeader={() => '充值金额'}>
                    <InputItem placeholder="输入水卡充值金额，如100元" type='number'>{this.state.money}</InputItem>
                </List>
                <List renderHeader={() => '支付方式'}>
                    <List.Item
                        extra={() =>< Image source = {{uri:'https://cdn3.iconfinder.com/data/icons/iconic-1/32/check_alt-128.png'}}/>}
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
                        <Text style={[styles.title, styles.money]}>10元</Text>
                    </View>
                    <View
                        style={[
                        styles.moneycontainer, {
                            flex: 1,
                            backgroundColor: '#D5002F'
                        }
                    ]}>
                        <TouchableOpacity
                            style={{
                            flex: 1
                        }}>
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
        color: '#D5002F'
    }
});

//make this component available to the app
export default ApplyCard;
