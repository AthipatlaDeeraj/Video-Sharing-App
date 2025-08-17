import React from 'react'
import styled from 'styled-components'

const Container=styled.div`
    display: flex;
    gap: 10px;
    margin: 30px 0px;
`;

const Avatar=styled.img`
   height: 50px;
  width: 50px;
  border-radius: 50%;
  cursor: pointer;
`;

const Details=styled.div`
    display: flex;
    gap: 10px;
    flex-direction:column;
     color: ${({theme})=>theme.text};
`
const Name=styled.span`
    font-weight: 400;
    font-size: 13px;
`;
const Date=styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({theme})=>theme.textSoft};
    margin-left: 5px;
`;

const Text=styled.span`
    font-size: 14px;
`;


const Comment = () => {
  return (
    <Container>
        <Avatar src='https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600'/>
        <Details>
            <Name>My Youtube <Date>1 day ago</Date></Name>
            <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste id explicabo soluta neque, dolores sequi dicta! Explicabo beatae porro voluptate suscipit repellendus natus odio dignissimos? Eum iusto voluptate sequi? Facilis!</Text>
        </Details>
    </Container>

  )
}

export default Comment;