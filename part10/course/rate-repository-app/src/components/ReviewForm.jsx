import React from 'react';
import { Formik } from 'formik';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';
import * as yup from 'yup';
import useCreateReview from '../hooks/useCreateReview';
import { useHistory } from 'react-router-native';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: ''
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().integer().min(0,).max(100,)
});

const styles = StyleSheet.create({
  btnPrimary: {
    marginTop: 10,
    padding: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    borderColor: theme.colors.primary,
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  container: {
    padding: 10
  },
  mt10: {
    marginTop: 10
  }
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" testID="ownerNameField"></FormikTextInput>
      <FormikTextInput name="repositoryName" placeholder="Repository name" testID="repositoryNameField" style={styles.mt10}></FormikTextInput>
      <FormikTextInput name="rating" placeholder="Rating between 0 ann 100" testID="ratingField" style={styles.mt10} keyboardType="numeric"></FormikTextInput>
      <FormikTextInput name="text" placeholder="Review" testID="textField" style={styles.mt10} multiline={true}></FormikTextInput>
      <TouchableWithoutFeedback onPress={onSubmit} testID="submitButton">
        <Text color="light" style={styles.btnPrimary}>Create a review</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export const ReviewFormContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const ReviewForm = () => {
  const [createReview] = useCreateReview();
  const history = useHistory();

  const onSubmit = async (values) => {
    let { ownerName, repositoryName, rating, text } = values;
    rating = parseInt(rating);
    try {
      const repositoryId = await createReview({ ownerName, repositoryName, rating, text });
      console.log(repositoryId);
      history.push('/' + repositoryId);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ReviewFormContainer onSubmit={onSubmit} />
  );
};

export default ReviewForm;
