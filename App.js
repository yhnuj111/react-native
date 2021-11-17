/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  Button,
  ScrollView,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';

const listData = [
  '商品1',
  '商品2',
  '商品3',
  '商品4',
  '商品5',
  '商品6',
  '商品7',
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
    };
  }
  componentDidMount() {
    this._startTimer();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  renderItem({item, index}) {
    return (
      <View style={styles.row}>
        <Text>{item}</Text>
      </View>
    );
  }
  _startTimer() {
    this.interval = setInterval(() => {
      let nextPage = this.state.currentPage + 1;
      if (nextPage >= 3) {
        nextPage = 0;
      }
      this.setState({currentPage: nextPage});
      const offSetX = nextPage * Dimensions.get('window').width;
      this.scrollView.scrollTo({
        x: offSetX,
        y: 0,
        animated: true,
      });
    }, 2000);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput style={styles.input} placeholder="搜索商品" />
          <Button
            style={styles.button}
            title="搜索"
            onPress={() => {
              Alert.alert('你单击了搜索按钮', null, null);
            }}
          />
        </View>
        <View style={styles.advertisement}>
          <ScrollView
            ref={res => {
              this.scrollView = res;
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}>
            <Text
              style={{
                width: Dimensions.get('window').width,
                height: 180,
                backgroundColor: 'gray',
              }}>
              广告1
            </Text>
            <Text
              style={{
                width: Dimensions.get('window').width,
                height: 180,
                backgroundColor: 'orange',
              }}>
              广告2
            </Text>
            <Text
              style={{
                width: Dimensions.get('window').width,
                height: 180,
                backgroundColor: 'yellow',
              }}>
              广告3
            </Text>
          </ScrollView>
        </View>
        <View style={styles.products}>
          <FlatList data={listData} renderItem={this.renderItem} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    marginTop: Platform.OS === 'ios' ? 30 : 0,
    height: 40,
    flexDirection: 'row',
  },
  advertisement: {
    height: 180,
  },
  products: {
    flex: 1,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 2,
  },
  button: {
    flex: 1,
  },
  row: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
