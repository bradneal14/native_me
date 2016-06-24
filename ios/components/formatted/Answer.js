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
var ViewQuestions = require('./ViewQuestions')
var EditQuestions = require('./EditQuestions')
var MainDashboard = require('./MainDashboard')
var Results = require('./Results')

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

class ChoiceButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.choiceButton}
        underlayColor='rgba(251, 182, 45, .0)'
        onPress={this.props.onPress}>
        <Text style={styles.choiceButtonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

class NavMenu extends React.Component {
  constructor() {
    super();
    var questions = AsyncStorage.getItem("questions").then((value) => {
      this.setState({display: value});
    }).done();
    // this.getInitialState = this.getInitialState.bind(this);
    var displayData = {
      display: "test",

      currentQuestion: -1,
      numberOfQuestions: 3
    }
    this.state = displayData
  }
  testing(){
    console.log(this.state);
    console.log("something is working");
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
  showNext(){
    switch (this.state.currentQuestion){
      case 0:
      //This is what I am working on now. It is one method that takes the
      //question number. The question number will be used to index into
      // a questions array or as a key in a questions hash
      //I will be able to get rid of the switch statement
        this.showOne(0);
        break;
      case 1:
        this.showTwo();
        break;
      case 2:
        this.showThree();
        break;
    }
  }
  goToResults(){
    this.props.navigator.push({ id: 'Results' });
    this.testing();
  }
  showOne(question_number){
    this.setState({display: this.state.questionOne});
    //I will change the line above this comment to say:
    //this.setState({display: this.state.questions[question_number]});
    //I will need to also make changes to the saving mechanism to account for said data structure

    //Notes on the saving aspect:
    // I can have an array or hash of questions, and I will, but that should also be
    //completely seperate from the saved data. The saved data will be organized in a hash
    //with dates as keys. Each key will be mapped to a value, which will be a hash with questions
    //as keys and yes/no as values. For now the questions and answers will be saved as strings
    //but maybe I can do question_id or something in the future. So in any given day-key in the
    //hash there would be a key which is also a hash with anywhere from 3-5 and maybe eventually
    //more keys in it, each of which is a question with an answer value. This is entirely seperate
    //from the array of questions, which may be edited or added to, and like a print or stamp, can
    //just be popped into the days hash each day. Yes this is definteily not the most efficient way
    //because I'm saving the same string over and over but its a start.

    this.setState({currentQuestion: this.state.currentQuestion + 1});
  }
  showTwo(){
    this.setState({display: this.state.questionTwo});
    this.setState({currentQuestion: this.state.currentQuestion + 1});
  }
  showThree(){
    this.setState({display: this.state.questionThree});
    this.setState({currentQuestion: this.state.currentQuestion + 1});
  }
  clearAsync(){
    AsyncStorage.clear();
  }
  beginAnswers(){
    this.setState({currentQuestion: 0});
    this.showNext();
  }
  tallyNo(){
    var currentQuestion = this.state.currentQuestion
    var storeAs = "Answer" + currentQuestion.toString();
    AsyncStorage.setItem(storeAs, "No");
  }
  tallyYes(){
    var currentQuestion = this.state.currentQuestion
    var storeAs = "Answer" + currentQuestion.toString();
    AsyncStorage.setItem(storeAs, "Yes");
  }
  render() {
    var height = Dimensions.get('window').height;
    var width = Dimensions.get('window').width;
    var display = this.state.display

    if (this.state.currentQuestion === -1){
      var bothChoiceButtons =
        <View style={styles.choiceButtonBox}>
        </View>;
      var nextButton =
        <NavButton
          onPress={() => {
            this.beginAnswers();
          }}
          text="Begin"
          style={styles.button}
          />
    } else {
      if (this.state.currentQuestion <= this.state.numberOfQuestions -1){
        var nextButton =
        <NavButton
          onPress={() => {
            this.showNext();
          }}
          text="Next"
          style={styles.button}
          />
      } else {
        var nextButton =
        <NavButton
          onPress={() => {
            this.goToResults();
          }}
          text="Results"
          style={styles.button}
          />
      }
      var bothChoiceButtons =
        <View style={styles.choiceButtonBox}>
          <ChoiceButton
            onPress={() => {
              this.tallyNo();
            }}
            text="No"
            style={styles.choiceButton}
            />
          <ChoiceButton
            onPress={() => {
              this.tallyYes();
            }}
            text="Yes"
            style={styles.choiceButton}
            />
        </View>
    }

    return (
      <View style={styles.fullBack}>

        <View style={styles.restBox}>

          <View style={styles.centerBox}>
            <View style={styles.centerHeaderBox}>
              <Text style={styles.centerHeaderText}>
                <Text>{display}</Text>
                {this.state.userInput}
                {this.state.display}
              </Text>
            </View>

          </View>
          {bothChoiceButtons}


        </View>

        <View style={styles.buttonBox}>

          {nextButton}

        </View>
      </View>
    );
  }
}

var Answer = React.createClass({

  statics: {
    title: '<Navigator>',
    description: 'JS-implemented navigation',
  },

  renderScene: function(route, nav) {
    if (route.id === 'ViewQuestions') {
      return <ViewQuestions navigator={nav} />;
    } else if (route.id === "EditQuestions"){
      return <EditQuestions navigator={nav} />;
    } else if (route.id === 'MainDashboard'){
      return <MainDashboard navigator={nav} />;
    } else if (route.id === 'Results'){
      return <Results navigator={nav} />;
    }
    else {
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
    justifyContent: 'space-between'
  },
  centerHeaderBox: {
    borderColor: 'orange',
    borderWidth: 2,
    alignSelf: 'center',
  },
  centerHeaderText: {

  },
  choiceButton: {
    backgroundColor: 'rgba(7, 35, 150, .2)',
    marginTop: 20,
    height: 50,
    padding: 0,
    width: 50,
    borderRadius: 25,
    borderWidth: 0,
    marginBottom: 20,
    borderColor: 'rgba(255,255,255,.5)',
  },
  choiceButtonBox:{
    borderWidth: 2,
    borderColor: "yellow",
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30
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
  choiceButtonText: {
    fontFamily: 'AvenirNext-Regular',
    paddingTop: 15,
    fontSize: 15,
    fontWeight: '500',
    alignSelf: 'center',
    color: '#1338db',
  },
  centerMainContent:{
    margin: 20,
    alignSelf: 'center',
    borderWidth: 1,
    color: 'blue'
    },

});

Answer.external = true;

module.exports = Answer;
