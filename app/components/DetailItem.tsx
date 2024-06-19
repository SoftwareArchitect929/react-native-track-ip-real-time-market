// DetailItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type DetailItemProps = {
  label: string;
  value?: string;
}

const DetailItem = ({ label, value }: DetailItemProps) => (
  <View style={styles.detailItemContainer}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  detailItemContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
  },
  detailLabel: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    width: '100%',
  },
  detailValue: {
    marginTop: 10,
    color: 'gray',
    textAlign: 'center',
    fontSize: 12,
    width: '100%',
  },
});

export default DetailItem;
