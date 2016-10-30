'use strict';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ToolbarAndroid,
  WebView
} from 'react-native';

import JSONTree from 'react-native-json-tree'


import React, {Component} from 'react';
import Login from './Login';
import Account from './Account';
import styles from '../styles/baseStyles.js';

// import Web3 from 'web3'
// let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

let web3 = {foo: 'bar'};
// Styles specific to the account page
const accountStyles = StyleSheet.create({
  email_container: {
    padding: 20
  },
  email_text: {
    fontSize: 18
  }
});

export default class EthereumAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentWillMount() {
    // get the current user from firebase
    const userData = this.props.firebaseApp.auth().currentUser;
    console.log('EthereumAccount');

    var profileImage;

    if (userData.photoURL === null){
      profileImage = 'https://facebook.github.io/react/img/logo_og.png';
    } else {
      profileImage = userData.photoURL;
    }

    this.setState({
      user: {
        email: userData.email,
        photo: profileImage
      },
      web3: web3,
      loading: false
    });
  }


  goToFirebaseAccount() {
    // logout, once that is complete, return the user to the login screen.
    this.props.navigator.push({
      component: Account
    });
  }

  render() {
    // If we are loading then we display the indicator, if the account is null and we are not loading
    // Then we display nothing. If the account is not null then we display the account info.
    const content = this.state.loading ? <ActivityIndicator size="large"/> :
       this.state.user &&

        <View >

          <Image
            style={styles.image}
            source={{uri: this.state.user.photo}} />

          <View >
            <Text style={accountStyles.email_text}>{this.state.user.email}</Text>
          </View>


          <JSONTree data={this.state.web3} />

          <TouchableHighlight onPress={this.goToFirebaseAccount.bind(this)} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Firebase Account</Text>
          </TouchableHighlight>

        </View>
      ;


    return (
      <View style={styles.container}>

        <View style={styles.body}>

          {content}

        </View>

      </View>
    );
  }

}

AppRegistry.registerComponent('EthereumAccount', () => EthereumAccount);
