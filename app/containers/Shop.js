//import liraries
import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    WebView 
} from 'react-native';

// private void saveLocalStorage() {
    
//             //1.拼接 JavaScript 代码
//             String userInfo = getLnThirdUserInfo();
//             String js = "window.localStorage.setItem('LnThirdUserInfo','" + userInfo + "');";
//             String jsUrl = "javascript:(function({ var localStorage = window.localStorage; localStorage.setItem('LnThirdUserInfo','" + userInfo + "') })()";
    
//             if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
//                 webView.evaluateJavascript(js, null);
//             } else {
//                 webView.loadUrl(jsUrl);
//                 webView.reload();
//             }
//         }
const userInfo = { 
    "appFrom":1,
    "from":1,
    "userInfo":{
        "loginName":"18663927456",
        "mobile":"18663927456",
        "name":"徐海洋",
        "soAddr":"测试",
        "soArea":"450902",
        "soCity":"450900",
        "soProvince":"450000",
        "xsid":"13827176"}
};
const jsStr = "window.localStorage.setItem('LnThirdUserInfo','" + JSON.stringify(userInfo) + "');";
const jsUrl = "javascript:(function({ var localStorage = window.localStorage; localStorage.setItem('LnThirdUserInfo','" + JSON.stringify(userInfo) + "') })()";
// create a component
class Shop extends Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const { state } = navigation;
        const { params } = state;
        this.state = {
            jsStr:"window.localStorage.setItem('LnThirdUserInfo','" + params.user + "');"
        };
        
    }
    render() {
        return (
            <View style={styles.container} >
                <WebView
                    ref={(web)=>{this.web=web;}}
                    injectedJavaScript = {this.state.jsStr}
                    onLoad={()=>{this.web.injectJavaScript(this.state.jsStr);}}
                    automaticallyAdjustContentInsets={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate='normal'
                    startInLoadingState={true}
                    style={styles.container}
                    source={{uri: 'http://ln.rrsjk.com/APPh5/pages/lenong/Ln-thirdLogin.html'}}
                    scalesPageToFit={true}
                />
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
export default Shop;
