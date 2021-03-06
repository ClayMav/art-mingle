import React from "react";
import { useGlobal } from "reactn";
import { View, ActivityIndicator } from "react-native";
import { Link } from "react-router-native";
import { Text } from "react-native-elements";
import { Icon } from "react-native-eva-icons";
import styled from "styled-components";

import { Navigation } from "../../components/Navigation";
import { Submission } from "../../components/Submission";

const HomeWrapper = styled.View`
  flex: 1;
`;
const HomeScroll = styled.ScrollView``;
const Constrain = styled.View`
  padding: 0 30px;
`;

const ProjectsHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TopBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ProfileIcon = styled(View)`
  border-radius: 50px;
  border: 3px black solid;
`;
const PSWrapper = styled(View)`
  background: ${props => props.color};
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  elevation: 6;
  height: 200px;
  width: 200px;
  margin: 20px 0 25px 30px;
`;
const PSBox = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const ProjectsHolder = styled.FlatList`
  max-height: 280px;
`;

const PSName = styled(Text)`
  color: white;
  font-weight: bold;
`;
const PSLink = styled(Link)``;

const ProjectSquare = ({ project }) => {
  // TODO change link to the project id
  return (
    <PSWrapper color={project.color}>
      <PSLink to={`/projects/${project.id}`}>
        <PSBox>
          <Icon name="mic-outline" fill="#ffffff" width={100} height={100} />
          <PSName h4>{project.name}</PSName>
        </PSBox>
      </PSLink>
    </PSWrapper>
  );
};

const SubmissionList = styled.FlatList`
  margin-right: 30px;
`;

const Home = () => {
  const [user] = useGlobal("curUser");
  const [projects] = useGlobal("projects");
  const [followingSubmissions] = useGlobal("followingSubmissions");
  if (!user) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <HomeWrapper>
      <HomeScroll>
        <Constrain style={{ marginTop: 60 }}>
          <TopBar>
            <ProjectsHeader>
              <Text h3>Projects</Text>
            </ProjectsHeader>
            <Link to={`/users/${user.id}`}>
              <ProfileIcon>
                <Icon name="person-outline" width={32} height={32} />
              </ProfileIcon>
            </Link>
          </TopBar>
        </Constrain>
        <ProjectsHolder
          horizontal
          showsHorizontalScrollIndicator={false}
          data={user.projects}
          progressViewOffset={50}
          renderItem={({ item }) => <ProjectSquare project={item} />}
          keyExtractor={item => item.id}
        />
        <Constrain>
          <Text h3>Followed</Text>
        </Constrain>
        <SubmissionList
          data={followingSubmissions}
          renderItem={({ item }) => <Submission submission={item} />}
          keyExtractor={item => item.id}
        />
        <Constrain style={{ marginBottom: 100 }} />
      </HomeScroll>

      <Navigation />
    </HomeWrapper>
  );
};

export { Home };
