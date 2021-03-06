import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useGlobal } from "reactn";
import { View, ScrollView, FlatList } from "react-native";
import { Link, Route } from "react-router-native";
import { Text, SearchBar, Button } from "react-native-elements";
import { Icon } from "react-native-eva-icons";
import { Navigation } from "../../components/Navigation";
import styled from "styled-components";
import { GroupModal } from "../../components/GroupModal";

import { JOIN_GROUP } from "../../utils/helpers";
const colors = [
  "#ABE8DC",
  "#B4EECD",
  "#B6DBF4",
  "#DCC5E6",
  "#ACDDD3",
  "#B3E3C8",
  "#B4D3E8",
  "#DABCE4",
  "#FBEAA3",
  "#F6D2AD",
  "#F8C2B8",
  "#FDDCA8",
  "#EFC2A1",
  "#EAB9B2"
];

const HomeWrapper = styled.View`
  flex: 1;
`;
const HomeScroll = styled.ScrollView``;
const Constrain = styled.View`
  padding: 0 30px;
`;

const GroupWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 25px;
`;

const MemRow = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const Members = styled(Text)`
  font-size: 18px;
  margin-left: 10px;
`;

const ButtonContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 36px;
  border-radius: 10px;
  border: 3px solid black;
  background-color: transparent;
  margin-right: 15px;
`;

const ButtonText = styled.Text`
  font-size: 15px;
  color: black;
  text-align: center;
`;

const Group = ({ group }) => {
  const [curUser] = useGlobal("curUser");
  const [joined, setJoined] = useState(
    curUser.groups.findIndex(i => i.id === group.id) >= 0
  );
  const [joinGroup] = useMutation(JOIN_GROUP);

  const onJoin = async () => {
    // Do nothing for now
    console.log(await joinGroup({ variables: { id: group.id } }));
    setJoined(true);
  };

  return (
    <GroupWrapper>
      <View>
        <Text h4>{group.name}</Text>
        <MemRow>
          <Icon name="people-outline" width={20} height={20} />
          <Members>{group.users.length}</Members>
        </MemRow>
      </View>
      {!joined && (
        <ButtonContainer onPress={() => onJoin()}>
          <ButtonText>Join</ButtonText>
        </ButtonContainer>
      )}
      {joined && (
        <ButtonContainer>
          <Link to={`/groups/${group.id}`}>
            <ButtonText>View</ButtonText>
          </Link>
        </ButtonContainer>
      )}
    </GroupWrapper>
  );
};

const UserWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 25px;
`;
const NameTier = styled.View`
  flex-direction: row;
  align-items: center;
`;
const UserImage = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const User = ({ user }) => {
  return (
    <Link to={`/users/${user.id}`}>
      <UserWrapper>
        <UserImage
          style={{
            backgroundColor: colors[Math.floor(Math.random() * colors.length)]
          }}
        />
        <View style={{ marginLeft: 10 }}>
          <NameTier>
            <Text h4>{`${user.firstName} ${user.lastName}`}</Text>
          </NameTier>
          <MemRow>
            <Icon
              style={{ marginRight: -5 }}
              name="clipboard-outline"
              width={20}
              height={20}
            />
            <Members>{user.submissions.length}</Members>
          </MemRow>
        </View>
      </UserWrapper>
    </Link>
  );
};

const TabHolder = styled.View`
  justify-content: space-between;
  width: 100%;
  height: 40px;
  flex-direction: row;
`;
const TabLink = styled(Link)`
  flex: 1;
  width: 33%;
  align-items: center;
  justify-content: center;
`;

const Search = ({ match }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [users] = useGlobal("users");
  const [groups] = useGlobal("groups");
  const [mUsers, setMUsers] = useState(users);
  const [mGroups, setMGroups] = useState(groups);

  useEffect(() => {
    setLoading(true);
    const getMatching = async () => {
      const temp = groups.filter(item => {
        if (item.name.toLowerCase().includes(search.toLowerCase())) {
          return item;
        }
      });
      setMGroups(temp);

      const temp2 = users.filter(item => {
        const name = `${item.firstName} ${item.lastName}`.toLowerCase();
        if (name.includes(search.toLowerCase())) {
          return item;
        }
      });
      setMUsers(temp2);
    };
    getMatching();
    setLoading(false);
  }, [search]);

  const GroupWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `;

  const ListWrapper = styled(FlatList)`
    margin-bottom: 20px;
  `;

  const CombinedList = () => {
    const [modalShown, setModalShown] = useState(false);

    const handleCreate = () => {
      setModalShown(!modalShown);
    };
    return (
      <View>
        <GroupWrapper>
          <Text h4>Groups</Text>
          <ButtonContainer onPress={handleCreate}>
            <ButtonText>Create</ButtonText>
          </ButtonContainer>
        </GroupWrapper>
        <ListWrapper
          data={mGroups}
          renderItem={({ item }) => <Group group={item} />}
          keyExtractor={item => item.id}
        />
        <Text h4>Users</Text>
        <FlatList
          data={mUsers}
          renderItem={({ item }) => <User user={item} />}
          keyExtractor={item => item.id}
        />
        <GroupModal visible={modalShown} setVisible={setModalShown} />
      </View>
    );
  };

  const GroupsList = () => {
    const [modalShown, setModalShown] = useState(false);
    const handleCreate = () => {
      setModalShown(!modalShown);
    };

    return (
      <View>
        <GroupWrapper>
          <Text h4>Groups</Text>
          <ButtonContainer onPress={handleCreate}>
            <ButtonText>Create</ButtonText>
          </ButtonContainer>
        </GroupWrapper>
        <FlatList
          data={mGroups}
          renderItem={({ item }) => <Group group={item} />}
          keyExtractor={item => item.id}
        />
        <GroupModal visible={modalShown} setVisible={setModalShown} />
      </View>
    );
  };

  const UsersList = () => {
    return (
      <View>
        <Text h4>Users</Text>
        <FlatList
          data={mUsers}
          renderItem={({ item }) => <User user={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };

  return (
    <HomeWrapper>
      <HomeScroll>
        <Constrain style={{ marginTop: 60, marginBottom: 100 }}>
          <Text h3>Search</Text>
          <SearchBar
            placeholder="Search Here..."
            onChangeText={setSearch}
            value={search}
            showLoading={loading}
            lightTheme
            containerStyle={{
              backgroundColor: "transparent",
              borderTopWidth: 0,
              borderBottomWidth: 0
            }}
          />
          <TabHolder>
            <TabLink to={`${match.path}`}>
              <Text h4>All</Text>
            </TabLink>
            <TabLink to={`${match.path}/groups`}>
              <Text h4>Groups</Text>
            </TabLink>
            <TabLink to={`${match.path}/users`}>
              <Text h4>Users</Text>
            </TabLink>
          </TabHolder>
          <Route exact path={`${match.path}`} component={CombinedList} />
          <Route exact path={`${match.path}/groups`} component={GroupsList} />
          <Route exact path={`${match.path}/users`} component={UsersList} />
        </Constrain>
      </HomeScroll>

      <Navigation />
    </HomeWrapper>
  );
};

export { Search };
