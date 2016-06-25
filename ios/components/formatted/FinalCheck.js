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
var MainDashboard = require('./ViewQuestions');
var Exit = require('./Exit')

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
    var displayData = {
      display: "here",
      answers: [],
      questions: [],
      numberOfQuestions: 3
    };
    this.state = displayData

    var questions = AsyncStorage.getItem("questions").then((value) => {
      if (value === null) {
        this.setState({questions: ["blank question", "blank question", "BLANK QUESTION"] });
      } else {
        console.log("this is the QUESTION value:", value);
        this.setState({questions: JSON.parse(value)});
      }
    }).done();

    var answers = AsyncStorage.getItem("answers").then((value) => {
      if (value === null) {
        this.setState({answers: ["no answer", "no answer", "NO ANSWER"] });
      } else {
        console.log("this is the ANSWER value:", value);
        this.setState({answers: JSON.parse(value)});
      }
    }).done();
    //
    // var firstAnswer = AsyncStorage.getItem("Answer1").then((value) => {
    //   this.setState({answerOne: value});
    // }).done();
    // var secondAnswer = AsyncStorage.getItem("Answer2").then((value) => {
    //   this.setState({answerTwo: value});
    // }).done();
    // var thirdAnswer = AsyncStorage.getItem("Answer3").then((value) => {
    //   this.setState({answerThree: value});
    // }).done();


    // this.getInitialState = this.getInitialState.bind(this);

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
  goToExit(){
    this.props.navigator.push({id: 'Exit'})
  }
  clearAsync(){
    AsyncStorage.clear();
  }
  goToDash(){
    this.props.navigator.push({ id: 'MainDashboard' });
  }
  render() {
    var height = Dimensions.get('window').height;
    var width = Dimensions.get('window').width;
    var displayQuestionOne = this.state.questions[0]
    var displayQuestionTwo = this.state.questions[1]
    var displayQuestionThree = this.state.questions[2]
    var displayAnswerOne = this.state.answers[0]
    var displayAnswerTwo = this.state.answers[1]
    var displayAnswerThree = this.state.answers[2]
    return (
      <View style={styles.fullBack}>

        <View style={styles.restBox}>
          <Text>ARE YOU SURE YOU WANT TO PROCEED?</Text>

          <View style={styles.centerBox}>
            <View style={styles.centerHeaderBox}>
              <Text style={styles.centerHeaderText}>
                Q-1
              </Text>
              <Text>{displayQuestionOne}</Text>
              <Text>{displayAnswerOne}</Text>
            </View>

          </View>
          <View style={styles.centerBox}>
            <View style={styles.centerHeaderBox}>
              <Text style={styles.centerHeaderText}>
                Q-2
              </Text>
              <Text>{displayQuestionTwo}</Text>
              <Text>{displayAnswerTwo}</Text>
            </View>

          </View>
          <View style={styles.centerBox}>
            <View style={styles.centerHeaderBox}>
              <Text style={styles.centerHeaderText}>
                Q-3
              </Text>
              <Text>{displayQuestionThree}</Text>
              <Text>{displayAnswerThree}</Text>
            </View>

          </View>


        </View>

        <View style={styles.buttonBox}>

          <NavButton
            onPress={() => {
              this.goToExit();
            }}
            text="CONFIRM"
            style={styles.button}
          />
        </View>

      </View>
    );
  }
}

var FinalCheck = React.createClass({

  statics: {
    title: '<Navigator>',
    description: 'JS-implemented navigation',
  },

  renderScene: function(route, nav) {
    if (route.id === 'Exit') {
      return <Exit navigator={nav} />;
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
    width: 100,
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

FinalCheck.external = true;

module.exports = FinalCheck;
