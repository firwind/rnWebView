import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Home from './Home';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Controllers from  './controllers';
import Mine from './Mine';
import { Image, Dimensions} from 'react-native';
import { NavBarConfig } from './controllers';
import Login from './login';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeProgress } from '../redux/Actions';
import ProgressHud from './ProgressHud';
import { View } from 'react-native';


const { height, width } = Dimensions.get('window');


const DrawerRouter = DrawerNavigator(
    {
        MainTab: {
            screen: Home,
        },
        SettingsTab: {
            screen: Mine,
        },
    },
    { 
        drawerWidth: 0.9*width,
        drawerPosition: 'left',
        contentComponent: Mine
    }
);

const HomeRouter = StackNavigator(
    {
        ...Controllers,
        Main:{
            screen: Login,
            navigationOptions :{
                header: null
            }
        },
        Home:{
            screen: DrawerRouter,
            navigationOptions :{
                header: null
            }
        }
    },

    {
        initialRouteName: 'Main',
        //headerMode: 'none',

        /*
   * Use modal on iOS because the card mode comes from the right,
   * which conflicts with the drawer example gesture
   */
        mode: 'card',
    }
);

// create a component
class mrouter extends Component {
    getCurrentRouteName(navigationState) {
        if (!navigationState) {
          return null;
        }
        const route = navigationState.routes[navigationState.index];
        // dive into nested navigators
        if (route.routes) {
          return this.getCurrentRouteName(route);
        }
        return route.routeName;
      }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.progressHud !== nextProps.progressHud) {
            return true;
        } 
        return false;  
    }
    render() {
        return (
            <View style={{ flex:1 }}>
                <HomeRouter 
                  onNavigationStateChange={(prevState, currentState)=>{
                    const currentScreen = this.getCurrentRouteName(currentState);
                    const prevScreen = this.getCurrentRouteName(prevState);
                      //保证是返回到首页
                      if (currentScreen==='MainTab'&&prevScreen!='Main') {
                        const route = prevState.routes[prevState.index];
                        const { onRefresh } = route.params;
                        if (onRefresh) {
                            onRefresh();
                        }
                        console.log('====================================');
                        console.log(currentScreen+prevScreen);
                        console.log('====================================');
                      }
                  }}  
                />
                {
                    this.props.progressHud ?  <ProgressHud /> : null
                }
               
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(changeProgress, dispatch),
});

const mapStateToProps = (state, ownProps) => {
    return {
        progressHud: state.progressHud,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(mrouter);

// export default HomeRouter;
