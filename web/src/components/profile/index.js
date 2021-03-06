import React, { useEffect } from "react";
import { useGlobal } from "reactn";
import styled from "styled-components";
import { SmallCard } from "../card_small/index";

const ProfilePage = styled.main`
  background: #a1e9ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  margin: -115px 0 0 0;
`;

const Bio = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0 40px 0;
  width: 1098px;
`;

const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
`;

const WelcomeTitle = styled.h1`
  font-size: 64px;
  font-weight: normal;
  margin: 115px 0 0 0;
`;

const Title = styled.h1`
  font-size: 64px;
  font-weight: normal;
  margin: 0;
`;

const UserStat = styled.h2`
  font-size: 24px;
  font-weight: normal;
  margin: 5px 0 5px 0;
`;

const ProfileImage = styled.div`
  background: linear-gradient(-45deg, rgba(256, 256, 256, 0) 0%,
                              rgba(256, 256, 256, 0.3) 100%),
                              ${props => props.color};
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0,0,0,0.25);
  height: 150px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 115px 0 0 0;

  h1 {
    font-size: 64px;
    font-weight: normal;
  }
`;

const SubmitSection = styled.div`
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

const SubmitBound = styled.div`
  width: 1098px;
`;

const Submissions = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 10px 0 10px;
  width: 100%;
`;

const Profile = ({ 
  username,
  interactions, 
  submissions_no,
  color,
  submissions }) => {
  const user_submissions = submissions.map((element, index) => {
    if (element.likes.total >= 1000) {
      let simplified = Math.floor(element.likes.total / 1000);
      element.likes.total = `${simplified}K`;
    }

    if (element.likes.bronze >= 1000) {
      let simplified = Math.floor(element.likes.bronze / 1000);
      element.likes.bronze = `${simplified}K`;
    }

    if (element.likes.gold >= 1000) {
      let simplified = Math.floor(element.likes.gold / 1000);
      element.likes.gold = `${simplified}K`;
    }

    if (element.likes.platinum >= 1000) {
      let simplified = Math.floor(element.likes.platinum / 1000);
      element.likes.platinum = `${simplified}K`;
    }
    
    return(
      <SmallCard
        color={element.color}
        title={element.title}
        name={element.name}
        prompt={element.prompt}
        likes={element.likes}
        key={index}
      />
    );
  });

  return(
    <ProfilePage>
      <Bio>
        <ProfileText>
          <WelcomeTitle>Welcome {username}!</WelcomeTitle>
          <UserStat>Following {interactions} people</UserStat>
          <UserStat>{submissions_no} Submissions</UserStat>
        </ProfileText>
        <ProfileImage color={color}>
          <h1>R</h1>
        </ProfileImage>
      </Bio>

      <SubmitSection>
        <SubmitBound>
          <Title>Your Submissions</Title>
          <Submissions>
            {user_submissions}
          </Submissions>
        </SubmitBound>
      </SubmitSection>
    </ProfilePage>
  );
};

export { Profile};
