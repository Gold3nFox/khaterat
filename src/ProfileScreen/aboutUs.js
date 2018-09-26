import Orientation from 'react-native-orientation';
import React, { Component } from 'react';
import { Image,WebView } from 'react-native';
import { Container,Title,Right, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
export default class CardShowcase4Example extends Component {
  
  componentDidMount() {
    Orientation.lockToPortrait();
  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.openDrawer()}}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body></Body>
          <Right>
            <Title>درباره ما</Title>
          </Right>
        </Header>
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail style={{width : 60,height : 60}} source={{uri : 'https://khaterat.mobi/js/FinalPics/Logocircle.png'}} />
                <Right>
                  <Text>خاطرات</Text>
                </Right>
              </Left>
            </CardItem>
            <CardItem>
              <Left></Left>
              <Body><Image  source={{uri : 'https://khaterat.mobi/js/LogoTamas.jpg'}} style={{height: 193,width: 134.3,flex: 1,right:"10%"}}/></Body>
              <Right></Right>
              </CardItem>
            <CardItem>
              <Body>
                {/* <Image  source={{uri : 'https://khaterat.mobi/js/LogoTamas.jpg'}} style={{height: 193,width: 134.3,flex: 1,left:'25%'}}/> */}
                <Text style ={{marginTop:15,textAlign: 'right', alignSelf: 'stretch'}}>
                نرم افزار "خاطرات" محصول شركت توليد محتواي الكترونيكي سيمرغ (تماس) است. کلیه حقوق مادی و معنوی سایت و نرم‌افزار "خاطرات" متعلق به اين شرکت می‌باشد.
                </Text>
              </Body>
            </CardItem>
            {/* <CardItem>
              <Left>
                <Button transparent onPress={() => {
                Linking.canOpenURL("www.khaterat.mobi").then(supported => {
                  if (supported) {
                    Linking.openURL(this.props.url);
                  } else {
                    console.log("Don't know how to open URI: ");
                  }
                })}}  textStyle={{color: '#87838B'}}>
                  <Icon name="ios-home" />
                  <Text>سایت</Text>
                  
                </Button>
              </Left>
            </CardItem> */}
          </Card>
        </Content>
      </Container>
    );
  }
}