import React,{ useEffect } from 'react';
import styled from 'styled-components';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {sidebarItems} from '../Data/SidebarData';
import AddIcon from '@material-ui/icons/Add';
import database from '../Firebase';
import {history, useHistory} from 'react-router-dom';

function Sidebar(props) {

    useEffect(()=>{
        props.handle()
    },[])

    const history = useHistory();

    const goToChannel = (id) =>{
        history.push(`/room/${id}`);
    }
    
    const addChannel=()=>{
        const promptName= prompt("Enter channel name");
        if(promptName)
        database.collection('rooms').add({name: promptName})
    }

    return (
        
        <div style={{height: "-webkit-fill-available"}}>
            <Container>
                <Workspace>
                    <Name>
                        CleverProgrammer
                    </Name>
                    <NewMessage>
                        <AddCircleOutlineIcon/>
                    </NewMessage>
                </Workspace>
                <MainChannels>
                    {
                        sidebarItems.map(item=>(
                            <MainChannelsItems>
                                {item.icon}
                                {item.text}
                            </MainChannelsItems>
                        ))
                    }

                </MainChannels>
                <ChannelHeading>
                    <Name1>
                        Channel
                    </Name1>
                    <NewMessage1>
                        <AddIcon onClick={()=>addChannel()}/>
                    </NewMessage1>
                </ChannelHeading>
                <ChannelContainer onClick={props.hideSideBar}>
                    {
                        props.rooms.map(item=>(    
                        <NewChannelContainer onClick={()=> goToChannel(item.id)}>
                            # {item.name}
                        </NewChannelContainer>
                            )
                        )
                    }
                </ChannelContainer>
            </Container>
        </div>
    )
}

export default Sidebar

const Container = styled.div `
    background: ${item=>item.theme.sidebar};
    height: 100%;
    width: 260px;
    border-right: 1px solid ${props=>props.theme.border};
`
const Workspace = styled.div `
    color: white;
    height: 11.7vh;
    display:flex;
    align-items: center;
    padding-left: 19px;
    justify-content: space-between;
    border-bottom: 1px solid ${props=>props.theme.border};
`
const Name = styled.div `
    
    
`
const NewMessage = styled.div `
    width: 36px;
    height: 36px;
    background: white;
    color: #3F0E40;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 20px;
    cursor: pointer;

`
const MainChannels = styled.div `
    padding-top: 20px;
    
`
const MainChannelsItems = styled.div `
    color: white;
    display: grid;
    grid-template-columns: 15% auto;
    height: 28px;
    align-items: center;
    padding-left: 19px;
    cursor:pointer;
    
    :hover{
        background: #532753;
    }
`
const ChannelContainer = styled.div `
    color: white;
    

    
`
const NewChannelContainer = styled.div `
    color: white;
    padding-left: 19px;
    cursor: pointer;
    :hover{
        background: #350D36;
    }
    
`
const Name1 = styled.div `
    padding-left: 19px;
    
`
const NewMessage1 = styled.div `
    margin-right: 20px;
    cursor:pointer;
    
`
const ChannelHeading = styled.div `
    color: white;
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin-top: 8px;
    
`