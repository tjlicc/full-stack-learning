import React from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#ddd'
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export default ItemSeparator;