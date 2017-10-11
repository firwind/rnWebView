//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const datas = [
    {
        nums:'090090kljkj',
        date:'2017-10-01 09:50',
        name:'张大妈',
        shuiliang:'5'
    }
];

// create a component
class Records extends Component {
    render() {
        return (
            <FlatList 
                style={styles.container}
            >
                <Text>MyClass</Text>
            </FlatList>
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
export default Records;
