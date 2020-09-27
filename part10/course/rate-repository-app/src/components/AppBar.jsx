import React from 'react';
import { ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Link } from "react-router-native";
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bgcDarken
  },
  tab: {
    padding: 10
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.tab}>
          <Link to="/" component={TouchableWithoutFeedback}>
            <Text color="light" fontSize="subheading">Repositories</Text>
          </Link>
        </View>
        <View style={styles.tab}>
          <Link to="/sign-in" component={TouchableWithoutFeedback}>
            <Text color="light" fontSize="subheading">Sign in</Text>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;
