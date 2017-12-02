//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity,AsyncStorage} from 'react-native';
import { List } from 'antd-mobile';

// create a component
class Mine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todayMoney: 0,
            todayBucket: 0,
            todayCards: 0,
            waterStation: 0,
            hidden:false,
            memberName:'',
            photoUrl:''
        };
        
    }
    goJiFen = ()=>{
        const { navigation } = this.props;
        navigation.navigate('SocialShare');
       
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
            memberName:params.memberName,
            photoUrl:params.photoUrl
        });
        
    }
    onBack = () => {
        const { navigation } = this.props;
        navigation.navigate('Main');
        AsyncStorage.setItem('name','',null);
        AsyncStorage.setItem('pwd','',null);
        AsyncStorage.setItem('id','',null);
    }
    render() {
        return (
            <View style={styles.container}>
                <View
                    style={[
                    styles.container,{
                        backgroundColor:'#F0F1F2'
                    }
                ]}>
                    <View
                        style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 50
                    }}>
                        <Image
                            source={{
                            uri:this.state.photoUrl
                        }}
                            style={{
                            height: 60,
                            width: 60,
                            borderRadius: 30
                        }}/>
                        <Text
                            style={{
                            fontSize: 20,
                            marginLeft: 30
                        }}>{this.state.memberName}</Text>
                    </View>
                    <View
                        style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        marginBottom:15
                    }}>
                        <View style={styles.contentCenter}>
                            <Text style={[styles.messagetext, styles.messageFont]}>{this.state.todayBucket}户</Text>
                            <Text style={styles.des}>今日打水(桶)</Text>
                        </View>
                        <View style={styles.contentCenter}>
                            <Text style={[styles.messagetext, styles.messageFont]}>{this.state.todayCards}张</Text>
                            <Text style={styles.des}>今日办卡(张)</Text>
                        </View>
                        <View style={styles.contentCenter}>
                            <Text style={[styles.messagetext, styles.messageFont]}>{this.state.waterStation}</Text>
                            <Text style={styles.des}>经营水站(台)</Text>
                        </View>
                    </View>
                </View>
                <List>
                    <List.Item arrow='horizontal' onClick={()=>{this.goJiFen()}}>
                         推荐好友赚积分
                   </List.Item>
                </List>
                <View
                    style={[
                    styles.container, {
                        flex: 2
                    }
                ]}>
               
                </View>
                <TouchableOpacity style={styles.button} onPress={()=>{this.onBack()}}>
                    <Text style={styles.buttontext}>退出</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    messagetext: {
        color: '#c7003a'
    },
    contentCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    messageFont: {
        fontSize: 18
    },
    des:{
        color:'#959697',
        fontSize: 15
    },
    button:{
        backgroundColor: '#C3003B',
        height:45,
        margin:10,
        borderRadius:5,
        borderWidth:2,
        borderColor:'#C3003B',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttontext:{
        fontSize:16,
        color:'white'
     },
});

//make this component available to the app
export default Mine;
