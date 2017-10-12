//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Alert } from 'react-native';
import { QRScannerView } from 'ac-qrcode';

// create a component
class Scanner extends Component {
    render() {
        return (
            <QRScannerView
                onScanResultReceived={this.barcodeReceived.bind(this)}
                renderTopBarView={() => this._renderTitleBar()}
                renderBottomMenuView={() => this._renderMenu()}
            />
        );
    }
    _renderTitleBar(){
        return(
            null
        );
    }

    _renderMenu() {
        return (
            null
        );
    }

    barcodeReceived(e) {
        const { navigation } = this.props;
        const { state } = navigation;
        const { params } = state;
        navigation.goBack();
        params.callback(e.data);
        // Alert.alert(
        //     'Type: ' + e.type,
        //     'Data: ' + e.data,
        //     [
        //         {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        //         {text: 'OK', onPress: () => console.log('OK Pressed')},
        //     ],
        //     { cancelable: false }
        // )
        console.log(e)
    }
}

//make this component available to the app
export default Scanner;
