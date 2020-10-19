import { useQuery, useApolloClient } from '@apollo/react-hooks';
import React, { useContext } from 'react';
import { ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Link, useHistory } from "react-router-native";
import { AUTHORIZED_USER } from '../graphql/queries';
import theme from '../theme';
import Text from './Text';
import AuthStorageContext from '../contexts/AuthStorageContext';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bgcDarken
  },
  tab: {
    padding: 10
  }
});

const AppBar = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const history = useHistory();

  const { data } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network'
  });
  const user = data?.authorizedUser;

  const logout = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push('sign-in');
  };

  const TabsAfterSignIn = () => {
    return (
      <>
        <View style={styles.tab}>
          <Link to="/create-review" component={TouchableWithoutFeedback}>
            <Text color="light" fontSize="subheading">Create a review</Text>
          </Link>
        </View>
        <View style={styles.tab}>
          <TouchableWithoutFeedback onPress={logout}>
            <Text color="light" fontSize="subheading">Sign out</Text>
          </TouchableWithoutFeedback>
        </View>
      </>
    );
  };

  const TabsBeforeSignIn = () => {
    return (
      <>
        <View style={styles.tab}>
          <Link to="/sign-in" component={TouchableWithoutFeedback}>
            <Text color="light" fontSize="subheading">Sign in</Text>
          </Link>
        </View>
        <View style={styles.tab}>
          <Link to="/sign-up" component={TouchableWithoutFeedback}>
            <Text color="light" fontSize="subheading">Sign up</Text>
          </Link>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.tab}>
          <Link to="/" component={TouchableWithoutFeedback}>
            <Text color="light" fontSize="subheading">Repositories</Text>
          </Link>
        </View>
        {
          user ? <TabsAfterSignIn /> : <TabsBeforeSignIn />
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;
