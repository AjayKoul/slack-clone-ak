import react from 'react'
import styled from 'styled-components'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded';
import NightsStaySharpIcon from '@material-ui/icons/NightsStaySharp';
import MediaQuery from 'react-responsive';
import MenuIcon from '@material-ui/icons/Menu';

const Header = ({user,signOut,theme,changeTheme,hideSideBar}) =>{
    localStorage.setItem('theme',JSON.stringify(theme));

    return(
        <Container>
            <MediaQuery maxWidth={580}>
                <span id="menu"><MenuIcon onClick={hideSideBar}/></span>
            </MediaQuery>
            <Main>
            <MediaQuery minWidth={580}>
                <AccessTimeIcon/>
            </MediaQuery>
            <MediaQuery minWidth={580}>
                <span id="searchBigScreen"><SearchContainer>
                    <input type="text" placeholder="Search..."/>
                </SearchContainer></span>
            </MediaQuery>
            <MediaQuery maxWidth={580}>
            <span id="searchSmallScreen"><SearchContainer>
                    <input type="text" placeholder="Search..."/>
                </SearchContainer></span>
            </MediaQuery>
            <MediaQuery minWidth={580}>
                <HelpOutlineIcon/>
            </MediaQuery>
            </Main>           
            <UserContainer>
                <DarkMode>
                    <span onClick={changeTheme}>
                        {theme==='light'?<NightsStaySharpIcon/>:<WbSunnyRoundedIcon/>}
                    </span>
                </DarkMode>
                <Name>
                    {user.name}
                </Name>
                <UserImg onClick={signOut}>
                    <img src= {user.photo? user.photo:"https://i.imgur.com/6VBx3io.png"}/>
                </UserImg>
            </UserContainer>
        </Container>
    )
}

export default Header;

const Container = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    background: ${item=>item.theme.header};
    color: white;
    position: relative;
    border-bottom: 1px solid ${props=>props.theme.border};

    span#menu{
        position: absolute;
        left: 8px;
        text-align: center;
    }
`
const Main = styled.div`
    display:flex;
    span#searchSmallScreen{
        position: absolute;
        left: 35px;
        bottom: 5px;
        
    }
`
const UserContainer = styled.div`
    display:flex;
    align-items: center;
    padding-right: 16px;
    position: absolute;
    right: 0;
`
const SearchContainer = styled.div `
    width: 30vw;
    border-radius: 6px;
    margin-right: 20px;
    margin-left: 8px;
    float: left;    
    
    input{
        width: 100%;
        border-radius: 6px;
        background-color: transparent;
        border: 1px solid black;
        padding-left: 8px;
        color: white;
        padding-top: 4px;
        padding-bottom: 4px;
    }
    input:focus{
        outline: none;
    }
`
const Name = styled.div `
    padding-right: 16px;
`
const UserImg = styled.div `
    width: 28px;
    height: 28px;
    border: 2px solid white;
    border-radius: 3px;
    cursor: pointer;
    img{
        width: 100%;
    }
`
const DarkMode = styled.div `
    display: flex;
    align-items: center;
    padding-right: 12px;
    cursor: pointer;
    

`