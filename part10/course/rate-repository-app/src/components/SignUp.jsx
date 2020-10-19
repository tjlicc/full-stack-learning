import React from 'react';
import { Formik } from 'formik';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';
import * as yup from 'yup';
import useCreateUser from '../hooks/useCreateUser';
import { useHistory } from 'react-router-native';

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required').max(30).min(1),
  password: yup.string().required('Password is required').min(5).max(50),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirmation is required').min(5).max(50),
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

const FormInner = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" ></FormikTextInput>
      <FormikTextInput name="password" placeholder="Password" style={styles.mt10} secureTextEntry={true}></FormikTextInput>
      <FormikTextInput name="passwordConfirmation" placeholder="Password confirmation" style={styles.mt10} secureTextEntry={true}></FormikTextInput>
      <TouchableWithoutFeedback onPress={onSubmit} testID="submitButton">
        <Text color="light" style={styles.btnPrimary}>Sign up</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <FormInner onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [createUser] = useCreateUser();
  const history = useHistory();

  const onSubmit = async (values) => {
    let { username, password, passwordConfirmation } = values;
    try {
      await createUser({ username, password });
      history.push('/sign-in');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignUpContainer onSubmit={onSubmit} />
  );
};

export default SignUp;
