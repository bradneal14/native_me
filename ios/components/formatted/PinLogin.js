'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  AsyncStorage,
  View,
  Navigator,
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
        <NumberButton
          onPress={() => {
            this.setState({"pin": this.state.pin + this.props.value});
          }}
          value = {1}
          text = "1"
        />
        <NumberButton
          onPress={() => {
            this.setState({"pin": this.state.pin + this.props.value});
          }}
          value = {1}
          text = "1"
        />
        <NumberButton
          onPress={() => {
            this.setState({"pin": this.state.pin + this.props.value});
          }}
          value = {1}
          text = "1"
        />
        <NumberButton
          onPress={() => {
            this.setState({"pin": this.state.pin + this.props.value});
          }}
          value = {1}
          text = "1"
        />
        <NumberButton
          onPress={() => {
            this.setState({"pin": this.state.pin + this.props.value});
          }}
          value = {1}
          text = "1"
        />
        <NumberButton
          onPress={() => {
            this.setState({"pin": this.state.pin + this.props.value});
          }}
          value = {1}
          text = "1"
        />
        <NumberButton
          onPress={() => {
            this.setState({"pin": this.state.pin + this.props.value});
          }}
          value = {1}
          text = "1"
        />
        <NumberButton
          onPress={() => {
            this.setState({"pin": this.state.pin + this.props.value});
          }}
          value = {1}
          text = "1"
        />
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
  constructor() {
    super();
    // this.getInitialState = this.getInitialState.bind(this);
    var pinData = {
      pin: ""
    }
    this.state = pinData
  }
  render() {
    return (
      <View style={styles.fullBack}>

        <View style={styles.restBox}>
          <View style={styles.centerBox}>
            <View style={styles.centerHeaderBox}>
              <Text style={styles.centerHeaderText}>
                PLEASE ENTER YOUR
              </Text>
            </View>
            <Text style={styles.centerMainContent}>
              Pin.
            </Text>
          </View>

        </View>

        <View style={styles.pinPadBox}>

          <View style={styles.pinDisplayBoxOuter}>
            <View style={styles.pinDisplayBoxInner}>
              <Text style={styles.password}>{this.state.pin}</Text>
            </View>
          </View>

          <PinPad/>

          <View style={styles.buttonBox}>
            <NavButton
              onPress={() => {
                this.props.navigator.push({ id: 'TextExample' });
              }}
              text="BEGIN SETUP"
              style={styles.button}
              />
          </View>
        </View>
      </View>
    );
  }
}

var PinLogin = React.createClass({

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
  password: {
    fontSize: 40,
  },
  numButtonBox: {
    borderWidth: 2,
    borderColor: 'purple',
    height: 67,
    width: 85,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pinDisplayBoxOuter: {
    borderWidth: 1,
    flex: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100
  },
  pinDisplayBoxInner: {
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
  },
  buttonBox:{
    flex: 4,
    borderColor: "yellow",
    borderWidth: 3,
    alignItems: 'center',
    margin: 5,
  },
  restBox: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'red',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  pinPadBox: {
    flex: 5,
    borderWidth: 3,
    borderColor: 'lightblue',
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center'
  },
  keyPadBox: {
    borderColor: 'lightgreen',
    borderWidth: 3,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 274,
    height: 274
  },
  centerBox: {
    borderWidth: 0,
    borderColor: 'green',
  },
  centerHeaderBox: {
    borderColor: 'orange',
    borderWidth: 0,
    alignSelf: 'flex-start',
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
    height: 50,
    padding: 0,
    width: 190,
    borderRadius: 25,
    borderWidth: 0,
    marginBottom: 20,
    borderColor: 'rgba(255,255,255,.5)',
  },
  NumButton: {
    backgroundColor: 'rgba(151, 82, 145, .3)',
    margin: 3,
    height: 50,
    paddingTop: 0,
    width: 50,
    borderRadius: 50,
    marginBottom: 5,
    borderColor: 'rgba(255,255,255,.5)',
  },
  buttonText: {
    fontFamily: 'AvenirNext-Regular',
    paddingTop: 15,
    fontSize: 15,
    fontWeight: '500',
    alignSelf: 'center',
    color: '#E84C3D',
  },

});

PinLogin.external = true;

module.exports = PinLogin;
