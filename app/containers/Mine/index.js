//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

// create a component
class Mine extends Component {
    onBack = () => {
        const { navigation } = this.props;
        navigation.navigate('Main');
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
                            uri: 'http://pic.qqtn.com/up/2017-8/2017082311054115976.jpg'
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
                        }}>张维波</Text>
                    </View>
                    <View
                        style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        marginBottom:15
                    }}>
                        <View style={styles.contentCenter}>
                            <Text style={[styles.messagetext, styles.messageFont]}>230户</Text>
                            <Text style={styles.des}>今日打水(桶)</Text>
                        </View>
                        <View style={styles.contentCenter}>
                            <Text style={[styles.messagetext, styles.messageFont]}>1200元</Text>
                            <Text style={styles.des}>今日办卡(张)</Text>
                        </View>
                        <View style={styles.contentCenter}>
                            <Text style={[styles.messagetext, styles.messageFont]}>890桶</Text>
                            <Text style={styles.des}>经营水站(台)</Text>
                        </View>
                    </View>
                </View>
                <View
                    style={[
                    styles.container, {
                        flex: 2
                    }
                ]}></View>
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
        color: '#D5002F'
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
