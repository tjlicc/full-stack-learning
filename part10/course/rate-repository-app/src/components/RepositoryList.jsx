import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#ddd'
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList data={repositoryNodes} ItemSeparatorComponent={ItemSeparator} renderItem={RepositoryItem} />
  );
};

export default RepositoryList;
