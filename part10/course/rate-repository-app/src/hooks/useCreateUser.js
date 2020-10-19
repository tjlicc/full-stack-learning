import { useMutation } from '@apollo/react-hooks';
import { CREATE_USER } from '../graphql/mutations';

const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER, {});

  const createUser = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const { data } = await mutate({ variables: { username, password } });
    return data?.createUser?.id;
  };

  return [createUser, result];
};

export default useCreateUser;
