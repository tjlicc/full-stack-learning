import React from 'react';
import { Formik } from 'formik';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';
import * as yup from 'yup';

const initialValues = {
  username: '',
  password: ''
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
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
      <FormikTextInput name="username" placeholder="Username"></FormikTextInput>
      <FormikTextInput name="password" placeholder="Password" style={styles.mt10} securetextentry={true}></FormikTextInput>
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text color="light" style={styles.btnPrimary}>Sign In</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;