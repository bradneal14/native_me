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


class NumberButton extends React.Component {
  render() {
    return (
      <View style={styles.numButtonBox}>
        <TouchableHighlight
          style={styles.NumButton}
          underlayColor='rgba(151, 10, 45, .2)'
          onPress={this.props.whenTouched}>
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}


class PinPad extends React.Component {
  constructor(){
    super();
    var passCode = {"pin": 2222};
    this.state = passCode;
  }
  something(){
    console.log("something is happening");
  }
  render() {
    return (
      <View style={styles.keyPadBox}>
        <NumberButton
          whenTouched={this.props.onOne}
          value = {1}
          text = "1"
        />
        <NumberButton
          whenTouched={this.props.onTwo}
          value = {2}
          text = "2"
        />
        <NumberButton
          whenTouched={this.props.onThree}
          value = {3}
          text = "3"
        />
        <NumberButton
          whenTouched={this.props.onFour}
          value = {4}
          text = "4"
        />
        <NumberButton
          whenTouched={this.props.onFive}
          value = {5}
          text = "5"
        />
        <NumberButton
          whenTouched={this.props.onSix}
          value = {6}
          text = "6"
        />
        <NumberButton
          whenTouched={this.props.onSeven}
          value = {7}
          text = "7"
        />
        <NumberButton
          whenTouched={this.props.onEight}
          value = {8}
          text = "8"
        />
        <NumberButton
          whenTouched={this.props.onNine}
          value = {9}
          text = "9"
        />
        <NumberButton
          whenTouched={this.props.onZero}
          value = {0}
          text = "0"
        />
    </View>
    );
  }
}


class NavMenu extends React.Component {
  render() {
    var pin = this.props.pin;
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
              <Text style={styles.password}>{pin}</Text>
            </View>
          </View>

          <PinPad
            onOne={this.props.addOne}
            onTwo={this.props.addTwo}
            onThree={this.props.addThree}
            onFour={this.props.addFour}
            onFive={this.props.addFive}
            onSix={this.props.addSix}
            onSeven={this.props.addSeven}
            onEight={this.props.addEight}
            onNine={this.props.addNine}
            onZero={this.props.addZero}
            />

          <View style={styles.buttonBox}>
            <NavButton
              onPress={this.props.continue}
              text="LOGIN"
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
  componentDidMount: function(){
    this.setState({savedPin: "1014"})
  },
  getInitialState: function(){
    return({display: "", pin: ""});
  },
  addNumber: function(num, nav){
    if (this.state.pin.length < 4) {
      var newPin = this.state.pin + num
      this.setState({pin: newPin});
    }
    if (this.state.pin === this.state.savedPin){
      nav.push({ id: 'TextExample'})
    }
  },
  continue: function(nav){
    if (this.state.pin === "NAH"){
      this.setState({pin: ""});
    } else if (this.state.pin === this.state.savedPin){
      nav.push({ id: 'TextExample'})
    } else {
      this.setState({pin: "NAH"})
    }
  },
  renderScene: function(route, nav) {
    if (route.id === 'TextExample') {
      return <TextExample navigator={nav} />;
    } else {
      return (
        <NavMenu
          pin={this.state.pin}
          navigator={nav}
          continue={() => {
            this.continue(nav)}}
          addOne={() => {
            this.addNumber(1, nav) }}
          addTwo={() => {
            this.addNumber(2, nav) }}
          addThree={() => {
            this.addNumber(3, nav) }}
          addFour={() => {
            this.addNumber(4, nav) }}
          addFive={() => {
            this.addNumber(5, nav) }}
          addSix={() => {
            this.addNumber(6, nav) }}
          addSeven={() => {
            this.addNumber(7, nav) }}
          addEight={() => {
            this.addNumber(8, nav) }}
          addNine={() => {
            this.addNumber(9, nav) }}
          addZero={() => {
            this.addNumber(0, nav) }}
        />
      );
    }
  },


  render: function() {
    return (
      <Navigator
        ref={this._setNavigatorRef}
        style={styles.container}
        initialRoute={{ message: 'Message in pin render', }}
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
  // componentDidMount: function(){
  //   this.setState({"pin": 1212});
  // },
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


var buttonBoxHeight = (Dimensions.get("window").height) / 7;
var buttonBoxWidth = (buttonBoxHeight * 1);
var buttonRadius = (Dimensions.get("window").height) / 10;
var styles = StyleSheet.create({
  fullBack: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#EEEEEE',
    borderWidth: 0,
    justifyContent: 'space-between'
  },
  password: {
    fontSize: 15,
  },
  numButtonBox: {
    borderWidth: 2,
    borderColor: 'purple',
    height: buttonBoxHeight,
    width: buttonBoxWidth,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pinDisplayBoxOuter: {
    borderWidth: 1,
    flex: .3,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100
  },
  pinDisplayBoxInner: {
    borderWidth: 0,
    borderColor: 'black',
    justifyContent: 'center',
  },
  buttonBox:{
    flex: 1,
    borderColor: "yellow",
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    margin: 5,
    flexDirection: 'row'
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
    flex:4,
    borderColor: 'lightgreen',
    borderWidth: 3,
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'stretch',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  NumButton: {
    backgroundColor: 'rgba(151, 82, 145, .3)',
    margin: 0,
    height: buttonRadius,
    paddingTop: 0,
    width: buttonRadius,
    borderRadius: buttonRadius,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(255,255,255,.5)',
  },
  buttonText: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 15,
    fontWeight: '500',
    alignSelf: 'center',
    color: '#E84C3D',
  },

});

PinLogin.external = true;

module.exports = PinLogin;
