import React from 'react';
import PropTypes from 'prop-types';
import Home from './Home';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Controllers from  './controllers';
import Mine from './Mine';
import { Image, Dimensions} from 'react-native';
import { NavBarConfig } from './controllers';
import Login from './login';

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

export default HomeRouter;
