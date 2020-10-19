import React from "react";
import Constants from "expo-constants";
import { View, StyleSheet } from "react-native";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ReviewForm from "./ReviewForm";
import { Redirect, Route, Switch } from "react-router-native";
import RepositoryDetail from "./RepositoryDetail";

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/sign-in" exact>
          <SignIn />
        </Route>
        <Route path="/sign-up" exact>
          <SignUp />
        </Route>
        <Route path="/create-review" exact>
          <ReviewForm />
        </Route>
        <Route path="/:id" exact>
          <RepositoryDetail />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
