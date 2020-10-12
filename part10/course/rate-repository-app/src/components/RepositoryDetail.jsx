import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import ItemSeparator from './ItemSeparator';
import theme from '../theme';
import Text from './Text';
import { format } from 'date-fns';

const circleRadius = 25;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10
  },
  ratingContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  rating: {
    width: circleRadius * 2,
    height: circleRadius * 2,
    borderWidth: 2,
    borderRadius: circleRadius,
    borderColor: theme.colors.primary,
    lineHeight: circleRadius * 2 - 5,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating} color="primary" fontWeight="bold" align="center">{review.rating}</Text>
      </View>
      <View>
        <Text fontWeight="bold" fontSize="subheading">{review.user.username}</Text>
        <Text color="textSecondary">{format(new Date(review.createdAt), 'MM.dd.yyyy')}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const RepositoryDetail = () => {
  const params = useParams();
  const { repository } = useRepository(params.id);

  const repositoryInfo = repository || {};
  const reviews = (repositoryInfo?.reviews?.edges || []).map(edge => edge.node);

  const ItemWrapper = (props) => {
    return (
      <View>
        <RepositoryItem {...props} />
        {reviews.length > 0 ? <ItemSeparator /> : null}
      </View>
    );
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => <ItemWrapper showLink={true} item={repositoryInfo} />}
    />
  );
};

export default RepositoryDetail;
