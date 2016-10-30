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
import React, {Component} from 'react';
import Login from './Login';
import EthereumAccount from './EthereumAccount';
import styles from '../styles/baseStyles.js';

// Styles specific to the account page
const accountStyles = StyleSheet.create({
  email_container: {
    padding: 20
  },
  email_text: {
    fontSize: 18
  }
});

export default class Account extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentWillMount() {
    // get the current user from firebase
    const userData = this.props.firebaseApp.auth().currentUser;
    console.log('Account');

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
      loading: false
    });
  }

  logout() {
    // logout, once that is complete, return the user to the login screen.
    this.props.firebaseApp.auth().signOut().then(() => {
      this.props.navigator.push({
        component: Login
      });
    });
  }

  goToEthereumAccount() {
    // logout, once that is complete, return the user to the login screen.
    this.props.navigator.push({
      component: EthereumAccount
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


          <TouchableHighlight onPress={this.goToEthereumAccount.bind(this)} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Ethereum</Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={this.logout.bind(this)} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Logout</Text>
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

AppRegistry.registerComponent('Account', () => Account);
