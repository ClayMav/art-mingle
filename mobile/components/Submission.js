import React from "react";
import { useGlobal } from "reactn";
import { Text } from "react-native-elements";
import { Icon } from "react-native-eva-icons";
import styled from "styled-components";

const SubWrapper = styled.View`
  flex-direction: row;
  margin: 15px 0;
`;
const SubPreview = styled.View`
  width: 90px;
  height: 90px;
  background: ${props => props.color};
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  elevation: 6;
  margin-right: 20px;
`;
const SubInfo = styled.View``;
const SubLikes = styled.View`
  flex-direction: row;
`;

const Submission = ({ submission }) => {
  return (
    <SubWrapper>
      <SubPreview color={submission.color} />
      <SubInfo>
        <Text>{submission.name}</Text>
        <Text>{submission.user}</Text>
        <Text>for {submission.project}</Text>
        <SubLikes>
          <Icon name="heart-outline" height={20} width={20} />
          <Text>{submission.likes}</Text>
        </SubLikes>
      </SubInfo>
    </SubWrapper>
  );
};

export { Submission }