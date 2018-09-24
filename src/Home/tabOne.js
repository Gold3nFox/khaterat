import React, { Component } from "react";
import { FlatList,TouchableHighlight,Image, View } from "react-native";
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import { AsyncStorage,ListView,StyleSheet,Alert } from "react-native";
import { Toast,Container, Header, Content, Card,ListItem, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { withNavigation } from 'react-navigation';
var API_URL = require('../config/config.js');

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#3f51b5',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: 'purple',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  box:{
    borderWidth: 2,
    borderColor: 'black',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    elevation: 1,marginLeft:10,width:150,height:200
  }
})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories : [],
      subcategories : [],
      ct : [],
      color :true,
      data : [],
      flatdata : [],
      loading : false,
      pishnamayesh : '0',
      boughtpishnamayesh : '0',
    };
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    global.categories = [];
    global.subcategories = [];
    global.catnum = [];
    global.subnum = [];
    global.ct = [];
    global.color = [];
    global.price = [];
    global.rendernum = [];
    global.subjects = [];
    global.descriptions = [];
    global.imageurl = [];
    global.id = [];
    global.expire= [];
    window.changed = "0";
    global.boughtrendernum = [];
    global.boughtsubjects = [];
    global.boughtdescriptions = [];
    global.boughtimageurl = [];
    global.boughtid = [];
  }

  shouldComponentUpdate(){
    if(window.changed == "1")
      {
        this.getCategories();
        window.changed = "0";
        this.forceUpdate();
      }
      return true;
  
  }

  _retrieveData = async () => {
    if(window._token == undefined || window._token == ""){
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
          response = ""+responseJson.message;
          if(response == "Unauthenticated." || response == undefined){
            this.setState({loading : false});
            // Toast.show({
            //   text: 'Unauthenticated !!',
            //   buttonText: 'Okay'
            // })
            }else {
              this.setState({loading : false});
              window._username = responseJson.email;
              this.getCategories();
              this.fetchContent();
              this.fetchboughtContent();
              this.forceUpdate();
          }
        })
        .catch((error) => {
          this.setState({loading : false});
          this.props.navigation.navigate("Login");
        });
      }else{
        this.setState({loading : false});
        this.props.navigation.navigate("Login");
      }
     } catch (error) {
      this.setState({loading : false});
      this.props.navigation.navigate("Login");
       // Error retrieving data
     }
    }else{
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
          this.setState({loading : false});
          }else {
            window._username = responseJson.email;
            this.getCategories();
            this.fetchContent();
            this.fetchboughtContent();
            this.forceUpdate();
            this.setState({loading : false});
        }
      })
      .catch((error) => {
        this.setState({loading : false});
        this.props.navigation.navigate("Login");
      });
    }
  }


  componentWillMount() {
    // console.disableYellowBox = true;
    window.changed = "0";
    if(window._token == "" || window._token == undefined)
      this._retrieveData();
    else{
      this.getCategories();
      this.fetchContent();
      this.fetchboughtContent();
    }


  }

  getCategories(){
    fetch(API_URL + '/auth/getfav/'+window._username, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With' : 'XMLHttpRequest',
        'Authorization' : 'Bearer ' + window._token,
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      response = ""+responseJson.message;
          if(response == "Unauthenticated." || response == undefined || responseJson == 'nothing'){
            this.setState({flatdata : []});
          }else{
            this.setState({flatdata : responseJson});
          }
          this.setState({loading : false});
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

  flatlistdata(){
    if(this.state.flatdata != '') {
      return(this.state.flatdata);
    }
    else return ([]);
  }

  likehandle(row2Data){
    if(row2Data.color == "white"){
      row2Data.color = "red";
    }
    else {
      row2Data.color = "white";
      var data = this.state.flatdata
      var index = data.indexOf(row2Data);
      if (index > -1) {
        data.splice(index, 1);
      }
      this.setState({flatdata : data});
      fetch(API_URL + '/auth/removefav/'+row2Data.id+'/'+window._username, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With' : 'XMLHttpRequest',
          'Authorization' : 'Bearer ' + window._token,
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
      })
      .catch((error) => {
        Toast.show({
          text: "No internet connection!",
          buttonText: "Okay",
          position: "top",
          duration: 3000,
          textStyle: { color: "red" }
        });
      });
      window.changed = "2";
    }
    if(this.state.color == "white")
      this.setState({color : "red"});
    else
      this.setState({color : "white"});
  }

  fetchContent() {
    if(window._username == undefined){
      return;
    }else{
      this.setState({loading : true});
      fetch(API_URL + '/auth/getpishnamayesh/'+ window._username, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Authorization' : 'Bearer ' + window._token,
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({loading : false});
        response = ""+responseJson.message;
        if(response == "Unauthenticated." || responseJson == "nothing"){
          this.setState({loading : false,empty : '1'});
          global.rendernum = [];
          global.subjects = [];
          global.descriptions = [];
          global.imageurl = [];
          global.id = [];
          this.setState({pishnamayesh : '0'});
          this.forceUpdate();
          }else {
            var count = Object.keys(responseJson).length;
            for(let i = 0 ; i < count; i++){
              global.rendernum[i] = i;
              global.subjects[i] = responseJson[i].Mainsubject;
              global.descriptions[i] = responseJson[i].Maindescription;
              global.imageurl[i] = responseJson[i].Mainimageurl;
              global.id[i] = responseJson[i].id;
              global.expire[i] = responseJson[i].expire;
              global.price[i] = responseJson[i].price;
            }
            if(count > 0){
              this.setState({pishnamayesh : '1'});
            }
            this.setState({
              listViewData : this.ds.cloneWithRows(global.subjects)
            })
            this.setState({loading : false});
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

}

fetchboughtContent() {
  if(window._username == undefined){
    return;
  }else{
    this.setState({loading : true});
    fetch(API_URL + '/auth/getpishpurchased/'+ window._username, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Authorization' : 'Bearer ' + window._token,
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      response = ""+responseJson.message;
      if(response == "Unauthenticated." || responseJson == "nothing"){
        this.setState({loading : false});
        this.forceUpdate();
        }else {
          var count = Object.keys(responseJson).length;
          for(let i = 0 ; i < count; i++){
            global.boughtrendernum[i] = i;
            global.boughtsubjects[i] = responseJson[i].Mainsubject;
            global.boughtdescriptions[i] = responseJson[i].Maindescription;
            global.boughtimageurl[i] = responseJson[i].Mainimageurl;
            global.boughtid[i] = responseJson[i].id;
          }
          if(count > 0){
            this.setState({boughtpishnamayesh : '1'});
          }
          this.setState({loading : false});
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

}

  mytitle(){
    if(this.state.flatdata == ''){
      return([]);
    }else{
      return(      
        <CardItem style={styles.containerStyle}>
        <Right style = {{flex:1,}}>
        <Text style = {{color:'white',fontSize: 13,fontWeight:'bold',textAlign:'center',alignSelf: "center"}}>علاقه مندی ها</Text>
        </Right>
        </CardItem>
      );
    }
  }
  removepish(rowData){
    fetch(API_URL + '/auth/removepishnamayesh/'+global.id[rowData]+'/'+window._username, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With' : 'XMLHttpRequest',
        'Authorization' : 'Bearer ' + window._token,
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.fetchContent();
      this.fetchboughtContent();
    })
    .catch((error) => {
      Toast.show({
        text: "No internet connection!",
        buttonText: "Okay",
        position: "top",
        duration: 3000,
        textStyle: { color: "red" }
      });
    });
  }

  pishnamayeshtitle(){
    if(this.state.pishnamayesh == '0'){
      return([]);
    }else{
      return(      
        <CardItem style={styles.containerStyle}>
        <Right style = {{flex:1,}}>
        <Text style = {{color:'white',fontSize: 13,fontWeight:'bold',textAlign:'center',alignSelf: "center"}}>پیش نمایش ها</Text>
        </Right>
        </CardItem>
      );
    }
  }

  boughtpishnamayeshtitle(){
    if(this.state.boughtpishnamayesh == '0'){
      return([]);
    }else{
      return(      
        <CardItem style={styles.containerStyle}>
        <Right style = {{flex:1,}}>
        <Text style = {{color:'white',fontSize: 13,fontWeight:'bold',textAlign:'center',alignSelf: "center"}}>خریده شده ها</Text>
        </Right>
        </CardItem>
      );
    }
  }

  fetchpishbutton(rowData){
    if(global.expire[rowData] > 6){
      return("خرید");
    }else{
      return("بیشتر");
    }
  }

  buy(rowData){
    fetch(API_URL + '/auth/buyitem/'+global.id[rowData]+'/'+window._username, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With' : 'XMLHttpRequest',
        'Authorization' : 'Bearer ' + window._token,
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson == undefined || responseJson == ""){

      }
      else if(responseJson == "not enough money"){
        Alert.alert(
  
          // This is Alert Dialog Title
          // " قیمت " +content + " است ",
          "قیمت "+global.price[rowData]+"واحد است",
      
          // This is Alert Dialog Message. 
          // 'برای استفاده باید آن را بخرید',
          'متاسفانه اعتبار شما برای خرید کافی نیست لطقا برای خرید اکانت خود را شارژ فرمایید',
          [
            // First Text Button in Alert Dialog.
            {text: 'انصراف', onPress: () => console.log('Ask me later Button Clicked')},
            // Third OK Button in Alert Dialog
            {text: 'شارز', onPress: () => console.log('Ask me later Button Clicked')},
            // {text: 'فهمیدم', onPress: () => console.log('bezoodi')},
            
          ]
      
        )
      }else if(responseJson == "bought"){
        this.fetchContent();
        this.fetchboughtContent();
        Toast.show({
          text: "با موفقیت خریده شد",
          buttonText: "Okay",
          position: "bottom",
          duration: 3000,
        });
      }
    })
    .catch((error) => {
      Toast.show({
        text: "No internet connection!",
        buttonText: "Okay",
        position: "top",
        duration: 3000,
        textStyle: { color: "red" }
      });
    });
    
  }
  handlepishpress(rowData){
    if(global.expire[rowData]>6){
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
          }else {
            if(global.price[rowData] < responseJson.money){
              Alert.alert(
  
                // This is Alert Dialog Title
                // " قیمت " +content + " است ",
                "قیمت "+global.price[rowData]+"واحد است",
            
                // This is Alert Dialog Message. 
                // 'برای استفاده باید آن را بخرید',
                'اعتبار شما برای خرید کافی است آیا به خرید خود اطمینان دارید',
                [
                  // First Text Button in Alert Dialog.
                  {text: 'خیر', onPress: () => console.log('Ask me later Button Clicked')},
                  // Third OK Button in Alert Dialog
                  {text: 'بله', onPress: () => this.buy(rowData)},
                  // {text: 'فهمیدم', onPress: () => console.log('bezoodi')},
                  
                ]
            
              )
            }
            else{
              Alert.alert(
  
                // This is Alert Dialog Title
                // " قیمت " +content + " است ",
                "قیمت "+global.price[rowData]+"واحد است",
            
                // This is Alert Dialog Message. 
                // 'برای استفاده باید آن را بخرید',
                'متاسفانه اعتبار شما برای خرید کافی نیست لطقا برای خرید اکانت خود را شارژ فرمایید',
                [
                  // First Text Button in Alert Dialog.
                  {text: 'انصراف', onPress: () => console.log('Ask me later Button Clicked')},
                  // Third OK Button in Alert Dialog
                  {text: 'شارز', onPress: () => console.log('Ask me later Button Clicked')},
                  // {text: 'فهمیدم', onPress: () => console.log('bezoodi')},
                  
                ]
            
              )
            }
        }
      })
      .catch((error) => {
        Toast.show({
          text: "No internet connection!",
          buttonText: "Okay",
          position: "top",
          duration: 3000,
          textStyle: { color: "red" }
        });
      });
    }else{
      this.props.navigation.navigate("conIndex", { name: global.id[rowData] , subject:global.subjects[rowData] });
      window._id = global.id[rowData];
      window._thissubject = global.subjects[rowData];
    }
  }

  render() {
    return (
      <Content>
        <OrientationLoadingOverlay
          visible={this.state.loading}
          color="white"
          indicatorSize="large"
          messageFontSize={24}
          message="لطفا صبر کنید... "
          />
        <View>

        
          {this.mytitle()}
              

              <FlatList
              horizontal
              extraData={this.state.color}
              data={this.flatlistdata()}
              renderItem={({ item: row2Data }) => {
                return (
                  <Card style={styles.box}>
                  <CardItem cardBody style={{width:150,height:150}}>
                  <TouchableHighlight style={{height : 150,width:150}} onPress={() => this.props.navigation.navigate('subjects', { id: row2Data.id})}>
                    <Image source={{uri:row2Data.imageurl}} style={{height: 150,resizeMode:'stretch', width: null, flex: 1}}/>
                  </TouchableHighlight>
                  </CardItem>
                  <CardItem style={{flex:1,backgroundColor:'grey'}}>
                      {/* <Thumbnail source={{uri: 'https://khaterat.mobi/js/FinalPics/Logocircle.png'}} /> */}
                      <TouchableHighlight onPress={() => this.likehandle(row2Data)}>
                      <Icon name='close' style={{color:row2Data.color,textAlign:'center'}} />
                      </TouchableHighlight>
                      <Text note numberOfLines={1} style={{flex:1,fontSize:10,color:'white',textAlign:'center'}}>{row2Data.Subcategory}</Text>
                        {/* <Text note>خاطرات</Text> */}
      
                  </CardItem>
                </Card>
                );
              }}
              keyExtractor={(item, index) => index}
            />
            </View>

            {this.boughtpishnamayeshtitle()}

            <ListView 
            removeClippedSubviews={false}
            enableEmptySections={true}
            dataSource={this.ds.cloneWithRows(global.boughtrendernum)}
            renderRow={rowData =>
            <ListItem noBorder style={{flex:1 , marginBottom: 10}} thumbnail>
            <Left>
                <Thumbnail square source={{isStatic:true,uri : global.boughtimageurl[rowData]}} />
              </Left>
              <Body>
                <Text style={{alignSelf:"flex-end"}}>{global.boughtsubjects[rowData] }</Text>
                <Text style={{alignSelf:"flex-end"}}note numberOfLines={1}>{global.boughtdescriptions[rowData] }</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => {this.props.navigation.navigate("conIndex", { name: global.boughtid[rowData] , subject:global.boughtsubjects[rowData] });
                  window._id = global.boughtid[rowData];
                  window._thissubject = global.boughtsubjects[rowData];
                }}>
                  <Text>بیشتر</Text>
                  </Button>
              
              </Right>
            </ListItem>}
            />

            {this.pishnamayeshtitle()}

            <ListView 
          removeClippedSubviews={false}
          enableEmptySections={true}
          dataSource={this.ds.cloneWithRows(global.rendernum)}
            renderRow={rowData =>
              <ListItem noBorder style={{flex:1 , marginBottom: 10}} thumbnail>
               <Left>
                   <Thumbnail square source={{isStatic:true,uri : global.imageurl[rowData]}} />
                </Left>
                <Body>
                  <Text style={{alignSelf:"flex-end"}}>{global.subjects[rowData] }</Text>
                  <Text style={{alignSelf:"flex-end"}}note numberOfLines={1}>{global.descriptions[rowData] }</Text>
                </Body>
                <Right>
                <Button style={{height:12,marginBottom:5}} transparent onPress={() => {this.removepish(rowData); 
                  }}>
                    <Icon style={{fontSize:15 , color :'red'}} name="close"></Icon>
                  </Button>
                  <Button transparent onPress={() => {this.handlepishpress(rowData)
                  }}>
                    <Text>{this.fetchpishbutton(rowData)}</Text>
                    </Button>
                 
                </Right>
              </ListItem>}
              />


      
      </Content>
    );
  }
}

export default withNavigation(App);
