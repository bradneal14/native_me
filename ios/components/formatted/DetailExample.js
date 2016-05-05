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
var ListThree = require('./ListThree.js');

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

class NavMenu extends React.Component {
  render() {
    var height = Dimensions.get('window').height;
    var width =Dimensions.get('window').width;
    return (
      <View style={styles.fullBack}>

        <View style={styles.restBox}>
          <View style={styles.topBox}>
            <Image source={require('../../../images/Ponder.png')} style={styles.image}/>
            <Text style={styles.centerHeaderText}>
              PICK QUESTIONS
            </Text>
          </View>
          <View style={styles.centerBox}>
            <View style={styles.centerHeaderBox}>
            </View>
            <Text style={styles.centerMainContent}>
              Hello hello hello helllo hello
              Hello hello hello helllo hello
              Hello hello hello helllo hello
              Hello hello hello helllo hello
              Hello hello hello helllo hello
            </Text>

          </View>
        </View>

        <View style={styles.buttonBox}>

          <NavButton
            onPress={() => {
              this.props.navigator.push({ id: 'ListThree' });
            }}
            text="CONTINUE"
            style={styles.button}
          />
        </View>
      </View>
    );
  }
}

var DetailExample = React.createClass({

  statics: {
    title: '<Navigator>',
    description: 'JS-implemented navigation',
  },

  renderScene: function(route, nav) {
    if (route.id === 'ListThree') {
      return <ListThree navigator={nav} />;
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
    paddingBottom: 15
  },
  restBox: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'red',
    alignItems: 'center',
  },
  centerBox: {
    borderWidth: 2,
    borderColor: 'green',
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  topBox: {
    borderColor: 'purple',
    borderWidth: 2,
    marginTop: 10,
  },
  centerHeaderText: {
    alignSelf: 'center'
  },
  image: {
    height: 80,
    width: 73,
    borderWidth: 1,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  centerMainContent:{
    fontWeight:'bold',
    color:'blue',
    textAlign:'center',
    fontSize:20,
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: 'brown'
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
  buttonText: {
    fontFamily: 'AvenirNext-Regular',
    paddingTop: 15,
    fontSize: 15,
    fontWeight: '500',
    alignSelf: 'center',
    color: '#E84C3D',
  },

});

DetailExample.external = true;

module.exports = DetailExample;
