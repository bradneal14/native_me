/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
// var React = require('react-native');
// var Image = React.Image;
var React = require('react-native');
var Landing = require('./ios/components/landing.js');
var Navigator = React.Navigator;
var Example = require('./ios/components/example.js');


class justMe extends React.Component {
  render() {
    return (
      <Example/>
    );
  }
}

const styles = React.StyleSheet.create({
  container: {
    flex: 1
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
