import React, { Component, useEffect } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
} from "@rainbow-me/animated-charts";
import { useSharedValue } from "react-native-reanimated";
export const { width: SIZE } = Dimensions.get("window");
export default class Chart extends Component {
  render() {
    const currentPrice = this.props.currentPrice;
    // const latestCurrentPrice = useSharedValue(currentPrice);
    // useEffect(() => {
    //   latestCurrentPrice.value = currentPrice;
    // }, [currentPrice]);
    const formatUSD = (value) => {
      "worklet";
      if (value === "") {
        const formattedValue = `$ ${currentPrice
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
        return formattedValue;
      }
      const formattedValue = `$ ${parseFloat(value)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
      return formattedValue;
    };
    const priceChangeColor =
      this.props.priceChangePercentage7d > 0 ? "#34C759" : "#FF3B30";
    return (
      <ChartPathProvider
        data={{ points: this.props.sparkline, smoothingStrategy: "bezier" }}
      >
        <View style={styles.chartWrapper}>
          {/* Titles */}
          <View style={styles.titleWrapper}>
            <View style={styles.upperTitle}>
              <View style={styles.upperLeftTitle}>
                <Image
                  source={{ uri: this.props.image }}
                  style={styles.image}
                />
                <Text style={styles.subtitle}>
                  {this.props.name} ({this.props.symbol.toUpperCase()})
                </Text>
              </View>
              <Text style={styles.subtitle}>7d</Text>
            </View>
            <View style={styles.lowerTitles}>
              <ChartYLabel format={formatUSD} style={styles.boldTitle} />
              {/* <Text style={styles.boldTitle}>${this.props.currentPrice}</Text> */}
              <Text style={(styles.title, { color: priceChangeColor })}>
                {this.props.priceChangePercentage7d.toFixed(2)}%
              </Text>
            </View>
          </View>
          <View style={styles.chartLineWrapper}>
            <ChartPath height={SIZE / 2} stroke="black" width={SIZE} />
            <ChartDot style={{ backgroundColor: "black" }} />
          </View>
        </View>
      </ChartPathProvider>
    );
  }
}

const styles = StyleSheet.create({
  chartWrapper: {
    marginVertical: 16,
  },
  upperLeftTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  lowerTitles: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  upperTitle: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  titleWrapper: {
    marginHorizontal: 16,
  },
  subtitle: {
    fontSize: 14,
    color: "#A9ABB1",
  },
  boldTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  title: {
    fontSize: 18,
  },
  chartLineWrapper: {
    marginTop: 40,
  },
});
