import React from 'react';
import styled from 'styled-components';
import Comments from '../components/Comments';
import Card from '../components/Card';

// Dummy video to avoid breaking Card component
const dummyVideo = {
  imgUrl: "https://via.placeholder.com/300x200.png?text=Video",
  title: "Test Video",
  userId: "123456",
  views: 99999,
  createdAt: new Date().toISOString(),
};

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  border: 0.5px solid ${({ theme }) => theme.soft};
  margin: 15px 0px;
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 10px;
`;

const Image = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  cursor: pointer;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.div`
  cursor: pointer;
`;

const ChannelCounter = styled.span`
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  cursor: pointer;
  font-size: 14px;
  background-color: red;
  font-weight: 500;
  height: max-content;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
`;

const Recommendation = styled.div`
  flex: 2;
`;

const Video = () => {
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width="100%"
            height="520"
            src="https://www.youtube.com/embed/xFonV1AT5N0"
            frameBorder="0"
            title="Youtube video playing"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </VideoWrapper>
        <Title>This TEST Video</Title>
        <Details>
          <Info>7,23,34,132 views * Jun 13, 2025</Info>
          <Buttons>
            <Button>
              👍 123
            </Button>
            <Button>
              👎 Dislike
            </Button>
            <Button>
              🔁 Share
            </Button>
            <Button>
              💾 Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600" />
            <ChannelDetail>
              <ChannelName>Your nature</ChannelName>
              <ChannelCounter>900k subscribers</ChannelCounter>
              <Description>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe>Subscribe</Subscribe>
        </Channel>
        <Hr />
        <Comments />
      </Content>
      <Recommendation>
        <Card type="sm" video={dummyVideo} />
        <Card type="sm" video={dummyVideo} />
        <Card type="sm" video={dummyVideo} />
        <Card type="sm" video={dummyVideo} />
        <Card type="sm" video={dummyVideo} />
      </Recommendation>
    </Container>
  );
};

export default Video;
