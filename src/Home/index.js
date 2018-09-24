import Orientation from 'react-native-orientation';
import React, { Component } from "react";
import Home1 from "./tabs.js";
import Home3 from "./hometest.js";
import Home4 from "../Home/searchpage.js";
import Home5 from "../Home/contentPage.js";
import {Alert} from "react-native";
import { TabNavigator } from "react-navigation";
import {
  Button,
  Text,
  Icon,
  Item,
  Footer,
  Badge,
  FooterTab,
  Label
} from "native-base";

export default (MainScreenNavigator = TabNavigator(
  {
    Home1: { screen: props => <Home1 {...props} /> },
    Home3: { screen: props => <Home3 {...props} /> },
    Home4: { screen: props => <Home4 {...props} /> }
  },
  {
    tabBarPosition: "bottom",
    swipeEnabled: false,
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate("Home1")}
            >
              <Icon  name="home" />
              <Text>خانه</Text>
            </Button>
            {/* <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("Home2")}
            >
              <Icon name="briefcase" />
              <Text>Picker</Text>
            </Button> */}
            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("Home3")}
            >
              <Icon  name="eye" />
              <Text>خاطرات روز</Text>
            </Button>

            <Button
              vertical
              active={props.navigationState.index === 2}
              onPress={() => Alert.alert(
  
                // This is Alert Dialog Title
                // " قیمت " +content + " است ",
                "به زودی ..",
            
                // This is Alert Dialog Message. 
                // 'برای استفاده باید آن را بخرید',
                ' جستجو در این نسخه غیر فعال است.',
                [
                  // First Text Button in Alert Dialog.
                  // {text: 'نمیخوام', onPress: () => console.log('Ask me later Button Clicked')},
                  // Third OK Button in Alert Dialog
                  // {text: 'میخوام', onPress: () => this.props.navigation.navigate("bankView")},
                  {text: 'فهمیدم', onPress: () => console.log('bezoodi')},
                  
                ]
            
              )}
            >
              <Icon name="ios-search" />
              <Text>جستجو</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
));
