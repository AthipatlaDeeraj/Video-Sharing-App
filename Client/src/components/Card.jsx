import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
import axios from "axios";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div`
  margin-top: -8px;
`;

const ChannelName = styled.h2`
  font-size: 14px;
  margin: 9px 0px;
  color: ${({ theme }) => theme.textSoft};
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Info = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
`;

const demoImage = "https://i.pinimg.com/1200x/20/0a/07/200a072465dc3c288a1d5780105705f7.jpg"; // Replace with actual demo image URL or import it

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});
  const [imgSrc, setImgSrc] = useState(video.imgUrl || demoImage);

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`/api/users/find/${video.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);

  // Update imgSrc if video.imgUrl changes
  useEffect(() => {
    setImgSrc(video.imgUrl || demoImage);
  }, [video.imgUrl]);

  return (
    <Link to={`/video/placeholder`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image
          type={type}
          src={imgSrc}
          onError={() => setImgSrc(demoImage)} // fallback on error
        />
        <Details>
          <ChannelImage type={type} src={channel.img} />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>
              {video.views} • {format(video.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
