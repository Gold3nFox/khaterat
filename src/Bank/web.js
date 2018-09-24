import Orientation from 'react-native-orientation';
import React, { Component } from 'react'

import {
   View,
   WebView,
   StyleSheet
} 
from 'react-native'

export default class BankView extends React.Component {

    componentDidMount() {
        Orientation.lockToPortrait();
      }

    render() {
    return (
      <View style = {styles.container}>
         <WebView
            source = {{ uri: 
               'http://10.0.3.2:8000/main' }}
         />
      </View>
   )
}
}
const styles = StyleSheet.create({
    container: {
       height: 350,
    }
 })


// Route::group([
//     'prefix' => 'auth'
// ], function () {
//     Route::post('login', 'AuthController@login');
//     Route::post('signup', 'AuthController@signup');
//     Route::post('checktoken/{token}', 'AuthController@checktoken');
    
    
    
  
//     Route::group([
//       'middleware' => 'auth:api'
//     ], function() {
//         Route::get('logout', 'AuthController@logout');
//         Route::get('user', 'AuthController@user');
//         Route::get('getevent/{id}', 'ContentController@getContent');
//         Route::get('getcontent', 'MainPageController@getContent');
//         Route::post('createcontent', 'MainPageController@createContent');
//         Route::post('getInfo/{username}', 'AuthController@getInfo');
//         Route::post('getPurchased/{username}', 'AuthController@getPurchased');
//         Route::post('createevent', 'ContentController@createContent');
//         Route::get('getsize', 'ContentController@getSize');
//     });
// });








