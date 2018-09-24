import Orientation from 'react-native-orientation';
var API_URL = require('../config/config.js');
import React, { Component } from 'react';
import { Image,ListView,Alert } from 'react-native';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import { Container, Header,Title ,Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
export default class contentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subnum: [],
      loading : false
    };
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    global.subnum = [];
    global.btnsubnum = [];
    global.lowersubjects = [];
    global.lowerdescriptions = [];
    global.eventdate = [];
    global.lowerimageurl = [];
    global.author = [];
    global.isPurchased = [];
    global.expire= [];
    }

    componentWillMount() {
      if(window._update== "yes")
      {
        this.props.navigation.navigate('update');
      }
      this.fetchPurchased();
  }
  componentDidMount() {
    Orientation.lockToPortrait();
  }

  async fetchPurchased() {
    if(window._username == undefined){
      return;
    }else{
      this.setState({loading : true});
      fetch(API_URL + '/auth/getContents/'+ window._id, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Authorization' : 'Bearer ' + window._token,
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({loading : false});
        response = ""+responseJson;
        if(response == "Unauthenticated." || response == "undefined" || response == "nothing"){
          // Toast.show({
          //   text: 'Unauthenticated !!',
          //   buttonText: 'Okay'
          // })
          }else {
            var count = Object.keys(responseJson).length;
            for(let i = 0 ; i < count ; i ++){
              global.btnsubnum[i] = responseJson[i].content_id;
              // console.warn(global.btnsubnum[i]);
              global.subnum[i] = i;
              global.lowersubjects[i] = responseJson[i].subject;
              global.lowerdescriptions[i] = responseJson[i].description;
              global.lowerimageurl[i] = responseJson[i].imageurl;
              global.author[i] = responseJson[i].author;
              global.eventdate[i] = responseJson[i].eventdate;
            }
            this.setState({
              subnum : global.subnum
            });

            this.setState({
              listViewData : this.ds.cloneWithRows(global.subjects)
            });
            this.forceUpdate();
        }
      })
      .catch((error) => {
        this.setState({loading : false});
        Toast.show({
          text: "No internet connection!",
          buttonText: "Okay",
          position: "top",
          duration: 3000,
          textStyle: { color: "red" }
        });
      });    
    }
      // }}
  }


fetchButton(rowData){
  // if(global.isPurchased[rowData] != undefined){
  //   if(global.isPurchased[rowData] == "0" && global.expire[rowData] >= 25){
  //     return('خرید');
  //   }
  //   else{
      return('ادامه');
  //   }
  // }
}

getIcon(rowData){
  // if(global.isPurchased[rowData] != undefined){
  //   if(global.isPurchased[rowData] == "0" && global.expire[rowData] >= 25){
  //     return("ios-basket");
  //   }
  //   else{
      return("ios-search");
    // }
  // }
}

selectHandler(content){
  Alert.alert(
  
    // This is Alert Dialog Title
    // " قیمت " +content + " است ",
    "به زودی ..",

    // This is Alert Dialog Message. 
    // 'برای استفاده باید آن را بخرید',
    'خرید در این نسخه غیر فعال است.',
    [
      // First Text Button in Alert Dialog.
      // {text: 'نمیخوام', onPress: () => console.log('Ask me later Button Clicked')},
      // Third OK Button in Alert Dialog
      // {text: 'میخوام', onPress: () => this.props.navigation.navigate("bankView")},
      {text: 'فهمیدم', onPress: () => console.log('bezoodi')},
      
    ]

  )
}

buttonHandler(rowData){
  // if(global.isPurchased[rowData] != undefined){
  //   if(global.isPurchased[rowData] == "0" && global.expire[rowData] >= 25){
  //     this.selectHandler(window.contents[window._thisname][rowData].price);
  //   }
  //   else{
      this.props.navigation.navigate("showMore", { name: window._thisname , id : global.btnsubnum[rowData] , index : rowData ,subject : global.btnsubnum[rowData], mainsubj : global.lowersubjects[rowData]})
  //   }
  // }
}


  makeScene(){
    this.fetchPurchased();
    this.forceUpdate();
  }




  render() { 
    return (
      <Container>
        <Image
          style={{width: '100%', height: '100%',opacity:0.8,position:'absolute'}}
          source={require('./backgroundbtn.jpg')}
        />
        <Header> 
        <Left style={{flex : 0.2}}>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate('Homeindex')
              }}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
            <Body style = {{
              justifyContent: "flex-end",
              alignItems: "flex-end"}}>
            <Title>{window._thissubject}</Title>
          </Body>
        </Header>
        <Content>
        <OrientationLoadingOverlay
          visible={this.state.loading}
          color="white"
          indicatorSize="large"
          messageFontSize={24}
          message="لطفا صبر کنید... "
          />
        <ListView
        enableEmptySections={true}
        removeClippedSubviews={false}
        dataSource={this.ds.cloneWithRows(this.state.subnum)}
            renderRow={rowData =>
            <Card>
              <CardItem>
                <Left>
                <Thumbnail source={{isStatic:true,uri: global.lowerimageurl[rowData]}} />
                </Left>
                <Body >
                    <Text style = {{textAlign:"center",alignSelf: "center"}}>{global.lowersubjects[rowData]}</Text>
                  </Body>
                <Right style = {{marginTop:10 }} >
                <Text style ={{direction:'rtl',textAlign: 'right', alignSelf: 'stretch'}}>
                    {global.author[rowData]}
                  </Text>
                    {/* <Text note>{global.eventdate[rowData]}</Text> */}
                  </Right> 
              </CardItem>
              <CardItem>
              <Body >
              <Text note style = {{textAlign: 'right', alignSelf: 'stretch'}}>{global.lowerdescriptions[rowData]}</Text>
                  </Body>
                </CardItem>
              <CardItem>
              </CardItem>
              <CardItem>
              <Left></Left>
                  <Body>
                  <Button
                  onPress={() => {this.buttonHandler(rowData)}}
                   transparent textStyle={{color: '#87838B'}}>
                    <Icon style={{marginLeft: 20,}} name={this.getIcon(rowData)} />
                    <Text>{this.fetchButton(rowData)}</Text>
                  </Button>
                </Body>
                  <Right>
                  </Right>
              </CardItem>
            </Card>
            } />
        </Content>
      </Container>
    );
  }
}
