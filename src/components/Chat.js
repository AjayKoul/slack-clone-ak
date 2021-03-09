import react,{ useState , useEffect,useRef } from 'react';
import styled from 'styled-components';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import database from '../Firebase';
import {useParams} from 'react-router-dom';
import firebase from 'firebase';
import ScrollBar from 'react-scrollbars-custom';

const Chat=({user})=>{

    let {channelId} = useParams();

    const [channel,setChannel] = useState();
    const [messages,setMessages] = useState([]);

    const messagesEndRef = useRef(null);

    const sendMessage = (text) =>{
        if(channelId){
            let payload = {
                text: text,
                timestamp: firebase.firestore.Timestamp.now(),
                user: user.name,
                userImage: user.photo
            }
            database.collection('rooms')
            .doc(channelId)
            .collection('messages')
            .add(payload)
        }
    }

    const getMessages = () => {
        database.collection('rooms')
        .doc(channelId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot)=>{
            let messages = snapshot.docs.map((doc)=>doc.data());
            setMessages(messages);
            
    })
}

    const getChannel = () => {
        database.collection('rooms')
        .doc(channelId)
        .onSnapshot((snapshot)=>{
                setChannel(snapshot.data());
        })
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }

      useEffect(()=>{
        scrollToBottom();
      },[messages])

    useEffect(()=>{
        getChannel()
        getMessages()
        },[channelId])


return(
    <Container>
        <Header>
            <LeftSection>
                <ChannelName>
                    # {channel && channel.name}
                </ChannelName>
                <ChannelInfo>
                    Company-wide announcements and work-based matters
                </ChannelInfo>
            </LeftSection>
            <DetailsSection>
                    <div>Details</div>
                    <InfoOutlinedIcon style={{marginLeft: '10px'}}/>
            </DetailsSection>
        </Header>
        <ScrollBar >
        <MessageContainer>
            {  
                 messages.length > 0 &&
                messages.map( (item,index) => {
                    return <ChatMessage text={item.text} name={item.user} image={item.userImage} timestamp={item.timestamp} />
                })
            }
            
        </MessageContainer>
        <div ref={messagesEndRef} />
        </ScrollBar>
        <ChatInput sendMessage={sendMessage}/>
    </Container>
)
}

export default Chat;

const Container = styled.div`
    width: -webkit-fill-available;
    display: grid;
    grid-template-rows: 11.8vh auto min-content;
    background: ${item=>item.theme.msg};
    color: ${item=>item.theme.msgText};
`

const Header = styled.div`
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${props=>props.theme.border};
    
`

const MessageContainer = styled.div`
`


const LeftSection = styled.div``

const DetailsSection = styled.div`
    display: flex;
`

const ChannelName = styled.div`
    font-weight: 700;
`

const ChannelInfo = styled.div`
    font-weight:400;
    color: #606060;
    font-size: 13px;
`