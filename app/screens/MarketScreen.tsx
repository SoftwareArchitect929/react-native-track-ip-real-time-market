import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useDebouncedCallback } from 'use-debounce';
import { TiingoData } from '../Types';

const MarketScreen = () => {
  const [marketData, setMarketData] = useState<TiingoData[]>([]);
  const [bufferedData, setBufferedData] = useState<TiingoData[]>([]);

  const processIncomingData = useCallback((data: TiingoData) => {
    if (data?.data[0] === 'Q' && data?.data[1] === 'eurusd') {
      setBufferedData((prevData) => [...prevData, data]);
    }
  }, []);

  const debouncedUpdate = useDebouncedCallback(() => {
    setMarketData((prevData) => [...bufferedData, ...prevData].slice(-100));
    setBufferedData([]);
  }, 1200, { maxWait: 2000 });

  useEffect(() => {
    const ws = new W3CWebSocket('wss://api.tiingo.com/fx');

    const subscribeMessage = {
      eventName: 'subscribe',
      authorization: 'ef888b34054e266b6a8cbc7e65dfbb611a035bc3',
      eventData: {
        thresholdLevel: 5,
      },
      tickers: ['eurusd'],
    };

    ws.onopen = () => {
      ws.send(JSON.stringify(subscribeMessage));
    };

    ws.onmessage = (event) => {
      if (event && event?.data) {
        processIncomingData(JSON.parse(event.data as string));
      }
    };

    ws.onerror = (error) => {
      console.error(`WebSocket error: ${error.message}`);
    };

    return () => {
      if (ws.readyState === ws.OPEN) {
        ws.close();
      }
    };
  }, [processIncomingData]);

  useEffect(() => {
    if (bufferedData.length > 0) {
      debouncedUpdate();
    }
  }, [bufferedData, debouncedUpdate]);

  const tableHead = ['Currency', 'Exchange Rate', 'Exchange Rate'];

  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        {tableHead.map((head, index) => (
          <View style={styles.head} key={`header-${index}`}><Text style={styles.headText}>{head}</Text></View>
        ))}
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.tableBody}>
          {marketData.map((item, index) => (
            <View style={styles.tableRow} key={`bodyrow-${index}`}>
              <View style={styles.head}><Text style={styles.dataText}>EUR to USD</Text></View>
              <View style={styles.head}><Text style={styles.dataText}>{item.data[4]}</Text></View>
              <View style={styles.head}><Text style={styles.dataText}>{item.data[5]}</Text></View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,backgroundColor: '#fff',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  tableHeader: {
    borderWidth: 1,
    width: '100%',
    borderColor: '#C1C0B9',
    flexDirection: 'row',
  },
  tableBody: {
    width: '100%',
  },
  tableRow: {
    flexDirection: "row",
    width: '100%',
  },
  head: {
    height: 40,
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f8ff',
  },
  headText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dataText: {
    fontSize: 14,
    textAlign: 'center',
    margin: 6,
  },
});

export default MarketScreen;
