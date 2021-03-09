import react from 'react'
import styled from 'styled-components'
import {auth,provider} from '../Firebase'

const Login=(props)=>{

    const signIn = () =>{
        auth.signInWithPopup(provider)
        .then((result)=>{
            const newUser = {
                name: result.user.displayName,
                photo: result.user.photoURL
            }
            localStorage.setItem('user',JSON.stringify(newUser));
            props.setUser(newUser);

        })
        .catch((error)=>{
            console.log(error.message);
        })
    }
    
return (
        <Container>
            <Content>
                <SlackImg src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"/>
                <h1>Sign in Slack</h1>
                <SignInButton onClick={()=>signIn()}>
                    Sign in with Google
                </SignInButton>
            </Content>
        </Container>
    )
}

export default Login;

const Container = styled.div`
    background: ${item=>item.theme.msg}; /*e2d9d9*/
    color: black;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;  /*chikd component got horizontally aligned in center*/
    align-items: center;
`
const Content = styled.div`
    padding: 100px;
    border-radius: 5px;
    background: white;
    box-shadow: 0px 0px 9px 1px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const SlackImg = styled.img`
    height: 100px;
`
const SignInButton = styled.button`
    margin-top: 50px;
    background: #0a8d48;
    color: white;
    border: none;
    height: 40px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 15px;
`