import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Chat from './components/Chat';
import Login from './components/Login';
import './App.css';
import styled, {ThemeProvider} from 'styled-components';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import database from './Firebase';
import {LightTheme, DarkTheme} from './components/Themes';
import {auth, provider} from './Firebase';
import MediaQuery,{useMediaQuery} from 'react-responsive';
function App() {

const getChannels =()=>{
  database.collection('rooms').onSnapshot((snapshot)=>{
    setRooms(snapshot.docs.map((doc)=>{
      return {id: doc.id, name: doc.data().name}
    }))
  })
}

const [rooms,setRooms] = useState([]);
const [theme,setTheme] = useState(JSON.parse(localStorage.getItem("theme")));
const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')));

const changeTheme = () =>{
  theme === 'light' ? setTheme('dark'): setTheme('light');
}
const signOut = () =>{
  auth.signOut().then(()=>{
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('theme');
  })
}

const handle = () =>{
  if(!smallScreen)
  document.getElementById('smallScreen').style.display="block";
  else{
  document.getElementById('smallScreen').style.display="none";
  }
}
const smallScreen = useMediaQuery(
  {maxWidth: 580},undefined, handle)

  

const hideSideBar = () => {
  const x=document.getElementById('smallScreen');
  if(smallScreen){
  if(x.style.display==="none"){
    x.style.display="block";
  }
  else{
    x.style.display="none";
  }
}
if(!smallScreen)
  x.style.display="block";
}

useEffect(()=>{
  getChannels();
},[])

  return (
      <div>
        <ThemeProvider theme={theme==='dark'?DarkTheme:LightTheme}>
          <Router>
            {
              !user?
              <Login setUser={setUser}/>
              :
              <Container>
                <Header user={user} signOut={signOut} theme={theme} changeTheme={changeTheme} hideSideBar={hideSideBar} />
                <Main>
                    
                      <span id="smallScreen"><Sidebar rooms={rooms} hideSideBar={hideSideBar} handle={handle}/> </span>
                     
                  <Switch>
                    <Route path="/room/:channelId">
                      <Chat user={user}/>
                    </Route>
                    <Route path="/">
                      <SelectChannelMsg>
                      <h1>
                      Bring your team together in channels
                      </h1>
                      <h3>A channel is the place for everything related to a project, topic or team. Everyone in a channel sees the same <span>messages and stays on the same page.</span></h3>
                      </SelectChannelMsg>
                    </Route>
                  </Switch>
                </Main>
              </Container>
            }
          </Router>
        </ThemeProvider>
      </div>
  );
}

export default App;

const Container = styled.div`
  width:100vw;
  height:100vh;
  display:grid;
  grid-template-rows: 38px minmax(0, 1fr);
  overflow: auto;
`
const Main = styled.div`
  display: flex;
`

const SelectChannelMsg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  width: -webkit-fill-available;
  background: ${props=>props.theme.msg};
  color: ${props=>props.theme.msgText};
  h3{
    font-weight: 500;
    width: 70vw;
  }
  text-align: center;
`