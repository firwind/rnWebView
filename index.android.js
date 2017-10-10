
import React, { Component } from 'react';
import { AppRegistry, View, Text} from 'react-native';
import Home from './app/containers/Home';
import Router from './app/containers/router';
// create a component
class LongSheng extends Component {
    render() {
        return (
            <Router />
        );
    }
}

AppRegistry.registerComponent('longsheng', () => LongSheng);