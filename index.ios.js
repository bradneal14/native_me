/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
// var React = require('react-native');
// var Image = React.Image;
var React = require('react-native');
var Navigator = React.Navigator;
var {AsyncStorage} = React;
var FirstLanding = require('./ios/components/formatted/Landing.js');


var PinLogin = require('./ios/components/formatted/AddTick.js');
//CHANGE THIS BACK TO PINLOGIN.JS AFTER DEV

//four is WELCOME
//five is list choice


class justMe extends React.Component {
  constructor() {
    AsyncStorage.getItem("tripped").then((value) => {
      if (value !== null){
        this.setState({"tripped": value});
      } else {
        this.setState({tripped: "false"})
      }
    }).done();
    super();
    var displayData = {
      tripped: "false"
    }
    this.state = displayData;
    var testing = function(){
      console.log("here")
    }
    testing.bind(this);
  }
  render() {
    if (this.state.tripped === "false"){
      var entryComponent = <FirstLanding style={styles.container}/>
    } else {
      var entryComponent = <PinLogin style={styles.container}/>
    }
    return (
      entryComponent
    );
  }
}

const styles = React.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  }
});

React.AppRegistry.registerComponent('justMe', () => justMe);

// return (
  // <React.NavigatorIOS
  //     style={styles.container}
  //     initialRoute={{
  //       title: 'Home',
  //       component: Landing,
  //     }}/>
// );
