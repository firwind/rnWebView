//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { List, InputItem, Switch, Stepper, Range, Button, createTooltip } from 'antd-mobile';

// create a component
class Getpassword extends Component {
    render() {
        return (
            <View style={styles.container}>
                <List>
                    <InputItem 
                      placeholder="请输入您的手机号码"
                      thumb="http://7xqi6y.com1.z0.glb.clouddn.com/qianbao.png"
                    />
                      
                </List>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

//make this component available to the app
export default Getpassword;
