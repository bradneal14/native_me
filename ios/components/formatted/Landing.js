'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Image,
  AsyncStorage,
  View,
  Navigator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
} = ReactNative;
var TextExample = require('./TextExample.js');

import Dimensions from 'Dimensions';
// var Device = require('react-native-device');

  // underlayColor="#B5B5B5"
class NavButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor='rgba(251, 182, 45, .0)'
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}
class PinPad extends React.Component {
  constructor(){
    super();
    var passCode = {"pin": ""};
    this.state = passCode;
  }
  render() {
    return (
      <View style={styles.keyPadBox}>
        <NumberButton
          onPress={() => {
            this.setState({"pin": this.state.pin + this.props.value});
          }}
          value = {1}
          text = "1"
        />

    </View>
    );
  }
}

class NumberButton extends React.Component {
  render() {
    return (
      <View style={styles.numButtonBox}>
        <TouchableHighlight
          style={styles.NumButton}
          underlayColor='rgba(151, 10, 45, .2)'
          onPress={this.props.onPress}>
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

class NavMenu extends React.Component {
  render() {
    return (
      <View style={styles.fullBack}>

        <View style={styles.restBox}>
          <View style={styles.centerBox}>
            <View style={styles.centerHeaderBox}>
              <Text style={styles.centerHeaderText}>
                WELCOME TO
              </Text>
            </View>
            <Text style={styles.centerMainContent}>
              Me.
            </Text>

          </View>
        </View>

        <View style={styles.buttonBox}>
          <NavButton
            onPress={() => {
              AsyncStorage.setItem("tripped", "true");
              this.props.navigator.push({ id: 'TextExample' });
            }}
            text="BEGIN SETUP"
            style={styles.button}
            />
        </View>
      </View>
    );
  }
}

var LANDING = React.createClass({

  statics: {
    title: '<Navigator>',
    description: 'JS-implemented navigation',
  },

  renderScene: function(route, nav) {
    if (route.id === 'TextExample') {
      return <TextExample navigator={nav} />;
    } else {
      return (
        <NavMenu
          message={route.message}
          navigator={nav}
          onExampleExit={this.props.onExampleExit}
        />
      );
    }
  },

  render: function() {
    return (
      <Navigator
        ref={this._setNavigatorRef}
        style={styles.container}
        initialRoute={{ message: 'Message in nine render', }}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}
      />
    );
  },


  componentWillUnmount: function() {
    this._listeners && this._listeners.forEach(listener => listener.remove());
  },

  _setNavigatorRef: function(navigator) {
    if (navigator !== this._navigator) {
      this._navigator = navigator;

      if (navigator) {
        var callback = (event) => {
          console.log(
            `One: event ${event.type}`,
            {
              route: JSON.stringify(event.data.route),
              target: event.target,
              type: event.type,
            }
          );
        };
        // Observe focus change events from the owner.
        this._listeners = [
          navigator.navigationContext.addListener('willfocus', callback),
          navigator.navigationContext.addListener('didfocus', callback),
        ];
      }
    }
  },
});


var styles = StyleSheet.create({
  fullBack: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#EEEEEE',
    borderWidth: 0,
    justifyContent: 'space-between'
  },
  buttonBox: {
    alignItems: 'center',
    borderWidth: 0,
    paddingBottom: 15
  },
  // numButtonBox:{
  //   flex: 0,
  //   borderColor: "yellow",
  //   borderWidth: 1,
  //   alignItems: 'center'
  // },
  restBox: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerKeyPadBox: {
    flex: 1,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'lightgreen',
  },
  //broader box in which pinpad is centered
  pinPadBox: {
    borderWidth: 3,
    borderColor: 'lightblue',
  },
  //box containing the buttons
  // keyPadBox: {
  //   borderColor: 'green',
  //   borderWidth: 3,
  //   // margin: 100,
  //   justifyContent: 'space-between',
  //   // alignItems: 'flex-end',
  //   flexDirection: 'column',
  //   flexWrap: 'wrap',
  // },
  centerBox: {
    borderWidth: 0,
    borderColor: 'green',
  },
  centerHeaderBox: {
    borderColor: 'orange',
    borderWidth: 0,
    alignSelf: 'flex-start',
    alignItems: 'center',
    paddingRight: 5
  },
  centerHeaderText: {
    fontFamily:'AvenirNext-Regular',
    fontSize: 20,
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#3d84e8' //blue
  },
  centerMainContent:{
    borderWidth: 0,
    borderColor: 'blue',
    fontFamily:'STHeitiSC-Medium',
    fontSize: 40,
    marginTop: -15,
    paddingLeft: 30,
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#E84C3D',
  },
  button: {
    backgroundColor: 'rgba(251, 82, 45, .1)',
    marginTop: 20,
    height: 50,
    padding: 0,
    width: 190,
    borderRadius: 25,
    borderWidth: 0,
    marginBottom: 20,
    borderColor: 'rgba(255,255,255,.5)',
  },
  // NumButton: {
  //   backgroundColor: 'rgba(151, 82, 145, .3)',
  //   margin: 3,
  //   height: 50,
  //   padding: 0,
  //   width: 50,
  //   borderRadius: 25,
  //   marginBottom: 5,
  //   borderColor: 'rgba(255,255,255,.5)',
  // },
  buttonText: {
    fontFamily: 'AvenirNext-Regular',
    paddingTop: 15,
    fontSize: 15,
    fontWeight: '500',
    alignSelf: 'center',
    color: '#E84C3D',
  },

});

LANDING.external = true;

module.exports = LANDING;
