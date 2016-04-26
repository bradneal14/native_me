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
        underlayColor="blue"
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
          <Text style={styles.headline}>Four</Text>
        </View>
        <NavButton
          onPress={() => {
            this.props.navigator.push({ id: 'five' });
          }}
          text="Next Page"
          style={styles.button}
        />
    </View>
    );
  }
}

var Four = React.createClass({

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
        initialRoute={{ message: 'Message in Four render', }}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromBottom;
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
    top: 175
  },
  headline: {
    fontSize: 50,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'red'
  },
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  container: {
    flex: 1,
  },
  button: {
    flexDirection: 'column',
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,.0)',
    marginTop: 490,
    height: 50,
    padding: 0,
    width: 190,
    borderWidth: 0,
    borderColor: 'rgba(255,255,255,.5)',
  },
  buttonText: {
    fontFamily: 'futura',
    paddingTop: 10,
    fontSize: 20,
    fontWeight: '500',
    alignSelf: 'center',
    color: 'red',
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

Four.external = true;

module.exports = Four;
