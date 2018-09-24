

import { AsyncStorage } from "react-native";
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import Orientation from 'react-native-orientation';
var API_URL = require('../config/config.js');
import React, { Component } from 'react';
import { Image,ListView,Alert } from 'react-native';
import { Container, Header,Title,Root ,Toast,Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
export default class contentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      subject: "",
      price : "",
      imageurl :"",
      eventdate : "",
      created_at: "",
      author: "",
      loading : false,
    };
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    global.nums = [];
    global.daysubs = [];
    global.daydes = [];
    global.daydate = [];
    global.dayimg = [];
    global.dayimg2 = [];
    global.height = [];
    global.btnname = [];
    }


    componentWillMount() {
      if(window._update== "yes")
      {
        this.props.navigation.navigate('update');
      }
      this._retrieveData();
      if(window._username != "")
        this.makeScene();
  }



  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('key:Token');
      if (value !== null) {
        // We have data!!
        window._token = value;
        fetch(API_URL + '/auth/user', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Authorization' : 'Bearer '+window._token,
          },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({loading : false});
          response = ""+responseJson.message;
          if(response == "Unauthenticated." || response == undefined){
            // Toast.show({
            //   text: 'Unauthenticated !!',
            //   buttonText: 'Okay'
            // })
            }else {
              window._username = responseJson.email;
              this.makeScene();
              this.forceUpdate();
          }
        })
        .catch((error) => {
          this.setState({loading : false});
        });
      }
     } catch (error) {
      this.setState({loading : false});
       // Error retrieving data
     }
  }


  makeScene(){
    this.fetchPurchased();
    this.forceUpdate();
  }

  async fetchPurchased() {
    if(window._username == undefined){
      return;
    }else{
      fetch(API_URL + '/auth/getToday/' + window._username, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Authorization' : 'Bearer ' + window._token,
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({loading : false});
        response = ""+responseJson;
        if(response != "undefined"){
        if(response == "Unauthenticated."){
          // Toast.show({
          //   text: 'Unauthenticated !!',
          //   buttonText: 'Okay'
          // })
          }else {
            for(let i = 0 ; i < 10; i++){
              if(responseJson[i] != undefined){
                global.daysubs[i] = responseJson[i].subject;
                global.height[i] = 150;
                global.daydes[i] = responseJson[i].description;
                global.daydate[i] = responseJson[i].shamsi_date;
                global.dayimg[i] = responseJson[i].imageurl;
                global.dayimg2[i] = responseJson[i].secondimageurl;
                global.nums[i] = i;
                global.btnname[i] = "بیشتر";
              }
            }
            this.setState({loading : false});
            this.forceUpdate();
        }
      }
      })
      .catch((error) => {
        this.setState({loading : false});
        Toast.show({
          text: error,
          buttonText: "Okay",
          position: "top",
          duration: 3000,
          textStyle: { color: "red" }
        });
      });    
  }}
  componentDidMount() {
    Orientation.lockToPortrait();
  }
  settextmore(rowData)
  {
    if(global.height[rowData] == 150)
      return "..."
    else
      return ""
  }

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Root>
      <Container>
      <Image
          style={{width: '100%', height: '100%',opacity:0.8,position:'absolute'}}
          source={require('./backgroundbtn.jpg')}
        />
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
            <Body style = {{
              justifyContent: "flex-end",
              alignItems: "flex-end"}}>
            <Title>خاطرات روزانه</Title>
          </Body>
        </Header>
        <Content getRef={(input) => { this.Scroller = input; }} >
        {/* <OrientationLoadingOverlay
          visible={this.state.loading}
          color="white"
          indicatorSize="large"
          messageFontSize={24}
          message="لطفا صبر کنید... "
          /> */}
        <ListView
        removeClippedSubviews={false}
        enableEmptySections={true}
        dataSource={this.ds.cloneWithRows(global.nums)}
            renderRow={rowData =>
              <Card style={{flex: 0}}>
              <CardItem>
                <Left>
                  <Thumbnail source={{isStatic:true,uri: global.dayimg[rowData]}} />
                </Left>
                <Body>
                  <Text style = {{alignSelf: "center",textAlign:"right"}}>{global.daysubs[rowData]}</Text>
                  </Body>
                <Right>
                {/* <Text style ={{textAlign: 'right', alignSelf: 'stretch'}}>
                    {this.state.author}
                  </Text> */}
                  <Text style={{textAlign:'right'}} note>{global.daydate[rowData]}</Text>
                  </Right>
              </CardItem>
              <CardItem >
                <Body>
                  <Image source={{isStatic:true,uri: global.dayimg2[rowData]}} style={{alignSelf:'center',height: 200, width: 200, flex: 1 , marginBottom:15}}/>
                  <Text note style ={{textAlign: 'right', alignSelf: 'stretch'}}>
                    {global.daydes[rowData].substring(0,global.height[rowData])+this.settextmore(rowData)}
                  </Text>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                <Button 
                  onPress={() => {
                    Alert.alert(
  
                      // This is Alert Dialog Title
                      // " قیمت " +content + " است ",
                      "به زودی ..",
                  
                      // This is Alert Dialog Message. 
                      // 'برای استفاده باید آن را بخرید',
                      'نظرات در این نسخه غیر فعال است.',
                      [
                        // First Text Button in Alert Dialog.
                        // {text: 'نمیخوام', onPress: () => console.log('Ask me later Button Clicked')},
                        // Third OK Button in Alert Dialog
                        // {text: 'میخوام', onPress: () => this.props.navigation.navigate("bankView")},
                        {text: 'فهمیدم', onPress: () => console.log('bezoodi')},
                        
                      ]
                  
                    )
                    }}
                   transparent textStyle={{color: '#87838B'}}>
                    <Icon style={{marginLeft: 20,}} name="ios-text" />
                    <Text>نظرات</Text>
                  </Button>
                </Left>
                <Body></Body>
                <Right>
                  <Button 
                  onPress={() => {
                    
                    if(global.btnname[rowData] == "بیشتر")
                    {
                      global.height[rowData] = global.daydes[rowData].lenght;
                      global.btnname[rowData] = "کمتر";
                      this.forceUpdate();
                    }else{
                      // scrollTo({x: 150*rowData, y: 0, animated: true});
                      // this.Scroller._root.scrollTo({x: 150*rowData, y: 0, animated: true});
                      global.height[rowData] = 150;
                      global.btnname[rowData] = "بیشتر";
                      this.forceUpdate();
                    }
                    
                    }}
                   transparent textStyle={{color: '#87838B'}}>
                    <Icon style={{marginLeft: 20,}} name="ios-more" />
                    <Text>{global.btnname[rowData]}</Text>
                  </Button>
                </Right>
              </CardItem>
            </Card>
            }/>
        </Content>
      </Container>
      </Root>
    );
  }
}