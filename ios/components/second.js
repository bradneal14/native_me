
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  Image,
  View,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback
} from 'react-native';

// source={require('./images/night.jpg')}>


var bgArr = [
  "http://www.mmphototours.com/Portals/0/LiveGallery/519/Images/Dead%20Vlei%20trees%20low%20profile%20IMG_1912.jpg",
  "http://i.imgur.com/03opi15.jpg",
  "https://i.imgur.com/c2K0XXw.jpg",
  "https://i.imgur.com/XYAhYd5.jpg",
  "https://i.imgur.com/wIv3LK9.jpg",
  "https://i.imgur.com/UrJog0N.jpg",
  "https://i.imgur.com/cCIxEyg.jpg",
  "https://i.imgur.com/XHYzn9u.jpg",
  "https://i.imgur.com/tlSQeOM.jpg",
  "http://i.imgur.com/WCn4HEt.png"
]


// Array.prototype.sample = function() {
//   return this[~~(Math.random() * this.length)];
// }


class Second extends Component {
  render() {
    var rando = Math.floor(Math.random() * (bgArr.length));
    var bgUsing = bgArr[rando]
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
     TouchableElement = TouchableNativeFeedback;
    }
    return (
      <Image
        style={styles.bgImage}
        source={{uri: bgUsing}}>
        <View style={styles.backdropView}>
          <Text style={styles.headline}>Another Page</Text>
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    alignSelf: 'center',
    width: null,
  },
  button: {
  height: 40,
  width: 200,
  // flex: 1,
  flexDirection: 'row',
  backgroundColor: '#48BBEC',
  borderColor: '#48BBEC',
  borderWidth: 1,
  borderRadius: 8,
  marginLeft: 290,
  alignSelf: 'stretch',
  justifyContent: 'center'
},
  buttonText:{
    fontSize: 25,
  },
  text: {
    // justifyContent: 'center',
    // alignItems: 'flex-end'
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  backdropView: {
    paddingTop: 270,
    height: 400,
    width: 800,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  headline: {
    fontSize: 50,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white'
  }
});
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

module.exports = Second;
