import React from "react";
import styled from "styled-components";

import { Text, View, AppRegistry } from "react-native";

import { NativeRouter, Route } from "react-router-native";

import { Home } from "./screens/Home";

const About = () => <Text>About</Text>;

const Topics = () => <Text>Topics</Text>;

const Content = styled.View`
  flex: 1;
`;

const App = () => {
  return (
    <NativeRouter>
      <Content>
        <Route exact path="/" component={Home} />
        <Route path="/groups" component={Topics} />
        <Route path="/groups/:id" component={Topics} />
        <Route path="/projects" component={About} />
        <Route path="/projects/:id" component={About} />
        <Route path="/projects/:id/submissions" component={About} />
        <Route path="/profile" component={Topics} />
        <Route path="/users" component={Topics} />
        <Route path="/users/:id" component={Topics} />
      </Content>
    </NativeRouter>
  );
};

export default App;

AppRegistry.registerComponent("art-mingle", () => App);
