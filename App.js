import React, { Component, useRef, useMemo, useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import ListItem from "./components/ListItem";
import { SAMPLE_DATA } from "./assets/data/sampleData";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Chart from "./components/Chart";
import { getMarketData } from "./services/cryptoService";
export default App = () => {
  const [data, setData] =useState([])
  const [selectedCoinData, setSelectedCoinData] = useState(null);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["45%"], []);
  const openModel = (item) => {
    setSelectedCoinData(item);
    bottomSheetModalRef.current.present();
  };
  useEffect(()=>{
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData)
    }
    fetchMarketData()
  },[])
  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({ item }) => (
            <ListItem
              name={item.name}
              symbol={item.symbol}
              image={item.image}
              currentPrice={item.current_price}
              priceChangePercentage7d={
                item.price_change_percentage_7d_in_currency
              }
              onPress={() => openModel(item)}
            />
          )}
          ListHeaderComponent={
            <>
              <View style={styles.titleWrapper}>
                <Text style={styles.largeTitle}> Markets </Text>
              </View>
              <View style={styles.divider} />
            </>
          }
        />
      </SafeAreaView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
      >
        {selectedCoinData ? (
          <Chart
            currentPrice={selectedCoinData.current_price}
            image={selectedCoinData.image}
            symbol={selectedCoinData.symbol}
            name={selectedCoinData.name}
            priceChangePercentage7d={
              selectedCoinData.price_change_percentage_7d_in_currency
            }
            sparkline={selectedCoinData.sparkline_in_7d.price}
          />
        ) : null}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  titleWrapper: {
    marginTop: 20,
    // alignItems:'center',
    paddingHorizontal: 16,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#A9ABB1",
    marginHorizontal: 16,
    marginTop: 16,
  },
  bottomSheet: {
    shadowColor: "#010122",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
