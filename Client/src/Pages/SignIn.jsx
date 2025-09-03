import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice.js";
import { auth,provider } from '../firebase.js';
import { signInWithPopup } from 'firebase/auth';

const Container=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 56px);
    color: ${({ theme }) => theme.textSoft};
    flex-direction: column;
`
const Wrapper=styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: ${({ theme }) => theme.bgLighter};
    border:1px solid ${({ theme }) => theme.soft};
    padding: 20px 50px;
    gap: 10px;
`

const Title=styled.h1``
const SubTitle=styled.h2``
const Input=styled.input``
const Button=styled.button`
    cursor: pointer;
    
`
const More=styled.div` 
    display: flex;
    gap:20px;
    margin-top: 10px;
`
const Links=styled.div`
    display: flex;
    gap:20px;`
const Link=styled.span``


const SignIn = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const dispatch = useDispatch();


    //see what happenning is first user clicks login button so we get data(pwd,name,googleauth etc) then we send this to backend using axios to communicate
    //this http calls like post,put etc for sending data to backend then we process
    //THERE IS FILE NAMES AXIOS.JS FOR HANDLING THAT AXIOS PART EVERYTIME INTEGRATING WITH BACKEND

    const handleLogin=async (e)=>{
        //without entering no refresh ,, like default avoiding
        e.preventDefault();
        dispatch(loginStart());
        try {

            const res=await axios.post("/api/auth/signin", { name, password });

            dispatch(loginSuccess(res.data));
        } catch (err) {
            dispatch(loginFailure());
        }
    }

    const SignInWithGoogle = async () => {
        signInWithPopup(auth,provider).then((result)=>{

            axios.post("api/auth/google",{
                name:result.user.displayName,
                email:result.user.email,
                img:result.user.photoURL,
            }).then((res)=>{ 
                dispatch(loginSuccess(res.data))
            })            
        }).catch((err)=>{dispatch(loginFailure())})
    };
    //so added google authentication here

  return (
    <Container>
        <Wrapper>
            <Title>Sign In</Title>
            <SubTitle>Welcome to My Youtube</SubTitle>
            <Input placeholder='UserName' onChange={(e)=>setName(e.target.value)}/>
            <Input type='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
           <Button onClick={handleLogin}>Sign In</Button>
           <Title>Or</Title>
           <Button onClick={SignInWithGoogle}>Signin with Google</Button>
            <Input placeholder='UserName' onChange={(e)=>setName(e.target.value)}/>
            <Input placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
            <Input type='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
           <Button>Sign Up</Button>
        </Wrapper>
        <More>
            Eng(USA)
            <Links>
                <Link>Helps</Link>
                <Link>Privacy</Link>
                <Link>Terms</Link>
            </Links>
        </More>
    </Container>
  )
}

export default SignIn