import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import OlcumBanner from './OlcumBanner';

const minute = 500;
export default class OlcumFeed extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
  }
  state = {
    prevOlcumler: null,
    olcumler: [3, 4, 5],
    isLoading: true,
  };

  componentDidMount() {
    this._isMounted = true;
    // console.log('Propsie' + JSON.stringify(this.props.yatisId));
    this.getOlcumDegerleri();
  }

  intervalId = window.setInterval(() => {
    this.getOlcumDegerleri();
  }, 100000);

  componentWillUnmount() {
    this._isMounted = false;
  }
  getOlcumDegerleri() {
    fetch(`http://192.168.1.38:3000/patients/olcumler/${this.props.yatisId}`)
      .then(response => response.json())
      .then(data => {
        if (this._isMounted) {
          this.setState(prevState => ({
            prevOlcumler: prevState.olcumler,
            olcumler: data,
            isLoading: false,
          }));
        }
        //console.log('PrevState in fun' + this.state.olcumler);
        console.log('Olcumler çalıştı. ' + this.state.olcumler);
        // console.log('Ates Degeri Tipi= ' + typeof this.state.atesDeger[0]);

      })
      .catch(err => {
        alert(err);
      });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="orange"></ActivityIndicator>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <OlcumBanner data={this.state.olcumler}></OlcumBanner>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
