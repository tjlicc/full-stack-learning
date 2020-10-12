import React from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';
import * as Linking from 'expo-linking';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  image: {
    flexGrow: 0,
    width: 40,
    height: 40,
    marginLeft: 10,
    marginRight: 10
  },
  langType: {
    marginLeft: 60,
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5
  },
  card: {
    alignItems: 'center'
  },
  tagContainer: {
    justifyContent: "space-around"
  },
  tagNumber: {
    marginBottom: 5
  },
  btnContainer: {
    padding: 10,
    paddingBottom: 0
  }
});

const formatNum = (num = 0) => {
  if (num > 1000) {
    return (num / 1000).toFixed(1) + 'k';
  } else {
    return num;
  }
};

const RepositoryItem = ({ item, showLink }) => {
  const linkBtn = showLink ? (
    <View style={styles.btnContainer}>
      <Button title="Open in Github" color={theme.colors.primary} onPress={() => Linking.openURL(item.url)}/>
    </View>
  ) : null;

  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.image}></Image>
        <View>
          <Text fontSize="subheading" fontWeight="bold" testID="fullName">{item.fullName}</Text>
          <Text color="textSecondary">{item.description}</Text>
        </View>
      </View>
      <View style={styles.flexRow}>
        <Text style={styles.langType} color="light">{item.language}</Text>
      </View>
      <View style={[styles.flexRow, styles.tagContainer]}>
        <View>
          <Text align="center" fontWeight="bold" style={styles.tagNumber}>{formatNum(item.stargazersCount)}</Text>
          <Text align="center" color="textSecondary">Stars</Text>
        </View>
        <View>
          <Text align="center" fontWeight="bold" style={styles.tagNumber}>{formatNum(item.forksCount)}</Text>
          <Text align="center" color="textSecondary">Forks</Text>
        </View>
        <View>
          <Text align="center" fontWeight="bold" style={styles.tagNumber}>{formatNum(item.reviewCount)}</Text>
          <Text align="center" color="textSecondary">Reviews</Text>
        </View>
        <View>
          <Text align="center" fontWeight="bold" style={styles.tagNumber}>{formatNum(item.ratingAverage)}</Text>
          <Text align="center" color="textSecondary">Rating</Text>
        </View>
      </View>
      {linkBtn}
    </View >
  );
};

export default RepositoryItem;
