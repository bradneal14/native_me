'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Image,
  View,
  Navigator,
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
} = ReactNative;
var NEXTFILE = require('./NEXTFILE.js');

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

let test_object = "sample test object";

class NavMenu extends React.Component {
  constructor() {
    super();
    // this.getInitialState = this.getInitialState.bind(this);
    var displayData = {
      display: "here",
      questionOne: "",
      questionTwo: "",
      questionThree: ""
    }
    this.state = displayData
  }
  toggleState(){
    if (this.state.display === "here"){
      this.setState({display: "there"});
      // var first = {myKey: "value"}
      // var myKey = "hi"
    } else {
      this.setState({display: "here"});
    }
  }
  testing(){
    console.log("the test is performed without my command");
  }
  clearAsync(){
    AsyncStorage.clear();
  }
  render() {
    var height = Dimensions.get('window').height;
    var width = Dimensions.get('window').width;
    var show = this.state.display
    return (
      <View style={styles.fullBack}>

        <View style={styles.restBox}>

          <View style={styles.centerBox}>
            <View style={styles.centerHeaderBox}>
              <Text style={styles.centerHeaderText}>
                QUESTION INPUT 1
                {this.state.userInput}
              </Text>
            </View>
            <Text>{this.state.questionOne}</Text>
            <TextInput
              multiline = {true}
              ref = "questionOne"
              style={styles.inputBox}
              onChangeText={(questionOne) => this.setState({questionOne})}>
            </TextInput>
          </View>

          <View style={styles.centerBox}>
            <View style={styles.centerHeaderBox}>
              <Text style={styles.centerHeaderText}>
                QUESTION INPUT 2
              </Text>
            </View>
            <Text>{this.state.questionTwo}</Text>
            <TextInput
              multiline = {true}
              ref = "questionTwo"
              style={styles.inputBox}
              onChangeText={(questionTwo) => this.setState({questionTwo})}>
            </TextInput>
          </View>

          <View style={styles.centerBox}>
            <View style={styles.centerHeaderBox}>
              <Text style={styles.centerHeaderText}>
                QUESTION INPUT 3
              </Text>
            </View>
            <Text>{this.state.questionThree}</Text>
            <TextInput
              multiline = {true}
              ref = "questionThree"
              style={styles.inputBox}
              onChangeText={(questionThree) => this.setState({questionThree})}>
            </TextInput>
          </View>
        </View>

        <View style={styles.buttonBox}>
          <NavButton
            onPress={() => {
              var questionOne = this.state.questionOne;
              var questionTwo = this.state.quetionTwo;
              var questionThree = this.state.questionThree;
              if (questionOne){
                AsyncStorage.setItem("questionOne", questionOne);
              } else {
                AsyncStorage.setItem("questionOne", "*nada1*");
              }
              if (questionTwo){
                AsyncStorage.setItem("questionTwo", questionTwo);
              } else {
                AsyncStorage.setItem("questionTwo", "*nada2*");
              }
              if (questionThree){
                AsyncStorage.setItem("questionThree", questionThree);
              } else {
                AsyncStorage.setItem("questionThree", "*nada3*");
              }
              // AsyncStorage.setItem("hello", JSON.stringify(test_object))
            }}
            text="SAVE"
            style={styles.button}
          />

          <NavButton
            onPress={() => {
              // var storedData = AsyncStorage.getItem("key");
              // this.setState({display: storedData});
              AsyncStorage.getItem("key").then((value) => {
                this.setState({display: value});
              }).done();
            }}
            text="REVEAL"
            style={styles.button}
          />

          <NavButton
            onPress={() => {
              this.toggleState();
            }}
            text="TOGGLE"
            style={styles.button}
          />

          <NavButton
            onPress={() => {
              this.clearAsync();
            }}
            text="X Async"
            style={styles.button}
          />
        </View>
      </View>
    );
  }
}

var QuestionInput = React.createClass({

  statics: {
    title: '<Navigator>',
    description: 'JS-implemented navigation',
  },

  renderScene: function(route, nav) {
    if (route.id === 'NEXTFILEE') {
      return <NEXTFILE navigator={nav} />;
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
    borderWidth: 1,
    justifyContent: 'space-between'
  },
  buttonBox: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'blue',
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  inputBox: {
    height: 40,
    borderColor: 'red',
    borderWidth: 0,
    margin: 15,
    marginTop: 5,
    backgroundColor: 'white'
  },
  restBox: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'red',
    justifyContent: 'space-around',
    alignItems: 'stretch',

  },
  centerBox: {
    borderWidth: 2,
    borderColor: 'green',
  },
  centerHeaderBox: {
    borderColor: 'orange',
    borderWidth: 2,
    alignSelf: 'center',
  },
  centerHeaderText: {

  },
  button: {
    backgroundColor: 'rgba(251, 82, 45, .1)',
    marginTop: 20,
    height: 50,
    padding: 0,
    width: 70,
    borderRadius: 25,
    borderWidth: 0,
    marginBottom: 20,
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
  centerMainContent:{
    margin: 20,
    alignSelf: 'center',
    borderWidth: 1,
    color: 'blue'
    },

});

QuestionInput.external = true;

module.exports = QuestionInput;
