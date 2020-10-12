import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { useHistory } from "react-router-native";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from './RepositoryItem';
import ItemSeparator from './ItemSeparator';

export const RepositoryListContainer = ({ repositories }) => {
  const history = useHistory();
  const TouchableRepositoryItem = ({ item, ...props }) => {
    const toDetail = () => {
      history.push(`/${item.id}`);
    };

    return (
      <TouchableOpacity onPress={toDetail}>
        <RepositoryItem item={item} {...props} showLink={false} />
      </TouchableOpacity>
    );
  };

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList data={repositoryNodes} ItemSeparatorComponent={ItemSeparator} renderItem={TouchableRepositoryItem} />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return (
    <RepositoryListContainer repositories={repositories}></RepositoryListContainer>
  );
};

export default RepositoryList;
