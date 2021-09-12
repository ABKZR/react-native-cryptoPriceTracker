import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';

export default class ListItem extends Component {
  render() {
      const priceChangeColor = this.props.priceChangePercentage7d > 0?'#34C759' :'#FF3B30';
    return (
      <TouchableOpacity  onPress={this.props.onPress}>
        <View style={styles.itemWrapper}>
          {/* LeftSide */}
          <View style={styles.leftWrapper}>
            <Image
              source={{
                uri: this.props.image,
              }}
              style={styles.image}
            />
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>{this.props.name}</Text>
              <Text style={styles.subtitle}>{this.props.symbol.toUpperCase()}</Text>
            </View>
          </View>
          {/* Right Side */}
          <View style={styles.rightWrapper}>
            <Text style={styles.title}>$ {this.props.currentPrice}</Text>
            <Text style={styles.subtitle, {color:priceChangeColor}}>{this.props.priceChangePercentage7d.toFixed(2)}%</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
      paddingHorizontal:16,
      marginTop:24,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
  },
  leftWrapper: {
      flexDirection:'row',
      alignItems:'center'
  },
  rightWrapper: {
      alignItems:'flex-end'
  },
  image: {
      height:48,
      width:48
  },
  titleWrapper:{
      marginLeft:8
  },
  title: {
      fontSize:18,

  },
  subtitle: {
      marginTop:4,
      fontSize:14,
      color:"#A9ABB1"
  },
});
