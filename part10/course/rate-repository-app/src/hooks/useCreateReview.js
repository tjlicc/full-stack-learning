import { useMutation } from '@apollo/react-hooks';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW, {});

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    // call the mutate function here with the right arguments
    const { data } = await mutate({ variables: { repositoryName, ownerName, rating, text } });
    return data?.createReview?.repositoryId;
  };

  return [createReview, result];
};

export default useCreateReview;
