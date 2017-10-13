/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry, View, Text} from 'react-native';
import Home from './app/containers/Home';
import Router from './app/containers/router';
import {Provider} from 'react-redux';
import store from './app/redux/Store';
// create a component
class LongSheng extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router/>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('longsheng', () => LongSheng);
