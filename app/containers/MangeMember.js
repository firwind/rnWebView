//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SearchBar, Button, WhiteSpace, WingBlank, Tabs, Badge } from 'antd-mobile';
// create a component
class MangeMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText:''
        };
    }
    
    callback = ()=>{
        console.log('====================================');
        console.log('sadadsasd');
        console.log('====================================');
    }
    handleTabClick = ()=>{
        console.log('====================================');
        console.log('sadadsasd');
        console.log('====================================');
    }
    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    value={this.state.searchText}
                    placeholder="搜索"
                    onSubmit={value => console.log(value, 'onSubmit')}
                    onClear={value => console.log(value, 'onClear')}
                    onFocus={() => console.log('onFocus')}
                    onBlur={() => console.log('onBlur')}
                    onCancel={() => console.log('onCancel')}
                   
                    onChange={(value)=>{this.setState({searchText:value})
                    }}
                />
                <Tabs 
                     defaultActiveKey="1" 
                     onChange={this.callback} 
                     onTabClick={this.handleTabClick}
                     activeUnderlineColor='#D30031'
                     activeTextColor='#D30031'
                     textColor='gray'
                     >
                    <Tabs.TabPane tab='今日打水' key="1">
                        
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='水卡列表' key="2">
                        
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='待充值' key="3">
                        
                    </Tabs.TabPane>
                    
                </Tabs>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDEFF4',
    },
});

//make this component available to the app
export default MangeMember;
