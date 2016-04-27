'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Image,
  View,
  Navigator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
} = ReactNative;
var Five = require('./five.js');

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

class NavMenu extends React.Component {
  render() {
    return (
      <View style={styles.scene}>
        <View style={styles.backdropView}>
          <View>
            <Text style={styles.headline}>TEXT ONE</Text>
          </View>
          <View style={styles.listItemView}>
            <Text style={styles.listItemText}>
              Me is here to help you stay on top of your successes and challenges
              simply and consistently.
              {'\n'}
              {'\n'}
              All you have to do is
              answer Yes or No to your self-created questions every night before you go
              to sleep. Me will help you track your emotions, successes and failures
              of each day.
              {'\n'}
              {'\n'}
              Choose your questions based on what is important for you to know
              about yourself - what part of your life you want to monitor or assess.
              At the end of each Term, you will receive a report at the end of
              each week and or month charting your behaviors and emotions. This will
              give you a realistic analysis of your
              progress and pit falls. It is easy and quick.
            </Text>

          </View>
        </View>
        <NavButton
          onPress={() => {
            this.props.navigator.push({ id: 'five' });
          }}
          text="CONTINUE"
          style={styles.button}
        />
    </View>
    );
  }
}

var textOne = React.createClass({

  statics: {
    title: '<Navigator>',
    description: 'JS-implemented navigation',
  },

  renderScene: function(route, nav) {
    if (route.id === 'five') {
      return <Five navigator={nav} />;
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
        initialRoute={{ message: 'Message in textOne render', }}
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
  backdropView: {
    top: 50
  },
  image: {
    height: 110,
    width: 100,
    marginTop: 10,
    marginLeft: 10,
    flexDirection: 'row'
  },
  imageAlt: {
    height: 130,
    width: 110,
    marginTop: -15,
    marginLeft: 10

  },
  blueListItemText: {
    color: '#3d84e8',
    paddingTop: 50,
    fontFamily:'AvenirNext-Regular', //Camel Case
    fontSize: 21,
    textAlign: 'center',
    paddingLeft: 10,
  },
  listItemView:{
    flexDirection: 'row',
    backgroundColor: 'rgba(50,50,50,0)',
    alignSelf: 'center',
    width: 375,
    height: 400,
    marginBottom: 60,
    borderRadius: 3,
    borderWidth: 1,
    borderColor:'rgba(50,50,50,.2)',

  },
  listItemText: {
    paddingTop: 20,
    color: 'red', //red
    fontFamily:'AvenirNext-Regular', //Camel Case
    fontSize: 16,
    textAlign: 'left',
    paddingLeft: 10,
    flex: 1
  },
  headline: {
    fontFamily:'AvenirNext-Regular',
    fontSize: 21,
    alignSelf: 'center',
    marginTop: -21,
    paddingBottom: 20,
    backgroundColor: 'rgba(0,0,0,0)',
    // color: '#FBBE2F'
    // color: '#E84C3D' //red
    color: '#3d84e8', //blue
    flexDirection: 'row'

  },
  headline_red: {
    fontFamily:'STHeitiSC-Medium',
    // fontFamily:'STHeitiSC-Medium',
    fontSize: 40,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    // color: '#FBBE2F'
    color: '#E84C3D' //red
    // color: '#3d84e8' //blue
  },
  container: {
    flex: 1,
  },
  button: {
    // flexDirection: 'column',
    alignSelf: 'center',
    backgroundColor: 'rgba(251, 82, 45, .1)',
    // backgroundColor: 'rgba(150, 150, 150, .1)',
    marginTop: 20,
    height: 50,
    padding: 0,
    width: 190,
    borderRadius: 25,
    borderWidth: 0,
    borderColor: 'rgba(255,255,255,.5)',
  },
  buttonText: {
    // fontFamily: 'STHeitiSC-Medium',
    fontFamily: 'AvenirNext-Regular',
    paddingTop: 15,
    fontSize: 15,
    fontWeight: '500',
    alignSelf: 'center',
    color: '#E84C3D',
  },
  scene: {
    flex: 1,
    paddingTop: 20,
    height: null,
    width: null,
    backgroundColor: '#EEEEEE'
    // resizeMode: 'cover',
  }
});

textOne.external = true;

module.exports = textOne;