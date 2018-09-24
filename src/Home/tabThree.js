
import Orientation from 'react-native-orientation';
var API_URL = require('../config/config.js');
var DATA =[];
import React, { Component } from 'react';
import { AsyncStorage } from "react-native";
import {ListView,Alert} from 'react-native';
import { Container,Root, Header,Toast,Badge, Content,Icon, List, ListItem,Title, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
export default class ListThumbnailExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listViewData: [],
      loading : false
    };

    }

  render() {
    return (
      <Root>
      <Container>
        <Content>
        <ListItem noBorder style={{flex:1 , marginBottom: 10}} thumbnail>
               <Left>
                   {/* <Thumbnail square source={{isStatic:true,uri : global.imageurl[rowData]}} /> */}
                </Left>
                <Body>
                  <Text style={{alignSelf:"flex-end"}}>متاسفانه این قسمت هنور فعال نشده است.</Text>
                  <Text style={{alignSelf:"flex-end"}}note numberOfLines={1}></Text>
                </Body>
                <Right>
                 
                </Right>
              </ListItem>
        </Content>
      </Container>
      </Root>
    );
  }
}