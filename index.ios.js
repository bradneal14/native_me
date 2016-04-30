/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
// var React = require('react-native');
// var Image = React.Image;
var React = require('react-native');
var Navigator = React.Navigator;
var One = require('./ios/components/nine.js');
//four is WELCOME
//five is list choice


class justMe extends React.Component {
  render() {
    return (
      <One style={styles.container}/>
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
//   <React.NavigatorIOS
//       style={styles.container}
//       initialRoute={{
//         title: 'Home',
//         component: Landing,
//       }}/>
// );
