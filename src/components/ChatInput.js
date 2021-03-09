import React,{useState} from 'react'
import styled from 'styled-components'
import SendIcon from '@material-ui/icons/Send';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Picker from 'emoji-picker-react';
import MediaQuery from 'react-responsive';

//on click msg  area color of formatting options  rgb(115 113 113)
// when idle rgb(197 194 194) 
// when clicked then black

var msgAreaFocus = false;

function ChatInput({sendMessage}) {

    const send = (e) => {
        e.preventDefault();
        if(text)
        sendMessage(text);
        setText("");
    }

    const showHide = () =>{
        const x = document.getElementById("emojiContainer");
        x.style.display=(x.style.display === "none")?"block":"none";
    }

    const [chosenEmoji,setChosenEmoji] = useState(null);
    const [text,setText] = useState("");
    const [formatOptions,setFormatOptions] = useState({
        bold: false,
        italic: false,
        strike: false
    })

    const onEmojiClick = (event,emojiObject) =>{
        setChosenEmoji(emojiObject);
        setText(text+emojiObject.emoji);
    }

    

    const handleChange = (e) =>{
          if(formatOptions.bold){ 
              e.style.fontWeight="bold"
              setText(e.value);
            }
            else{
                 e.style.fontWeight="normal";
                 setText(e.value);
            }
            if(formatOptions.italic){ 
                e.style.fontStyle="italic"
                setText(e.value);
              }
              else{
                   e.style.fontStyle="normal";
                   setText(e.value);
              }
              if(formatOptions.strike){ 
                e.style.textDecoration="line-through"
                setText(e.value);
              }
              else{
                   e.style.textDecoration="none";
                   setText(e.value);
              }
    }


document.addEventListener('mousedown', myFunc)
    function myFunc(e) {
        const y = document.getElementById('emojiContainer');
        const x = document.getElementById('formatTextBold');
        const z = document.getElementById('emojiIcon');
     if(localStorage.getItem('user')){
        if(!y.contains(e.target)) 
        y.style.display="none"; 
        if(!x.contains(e.target)){
            var a=document.querySelectorAll("#formatting-bold,#formatting-italic,#formatting-strike");
        for(var i=0;i<a.length;i++){
            a[i].style.color= "rgb(197 194 194)";
            msgAreaFocus = false;
        }
        }
     }
    }
    
    

    const colorChange = () =>{
        var x=document.querySelectorAll("#formatting-bold,#formatting-italic,#formatting-strike");
        for(var i=0;i<x.length;i++){
            x[i].style.color= "rgb(115 113 113)";
            msgAreaFocus = true;
        }
    }

    const highlight =(e)=>{
        var temp = document.querySelectorAll("#formatting-bold,#formatting-italic,#formatting-strike");

        for(var j=0;j<temp.length;j++){
            if(temp[j].contains(e.target) && msgAreaFocus){
            temp[j].style.background= temp[j].style.background === "none" ? "#dbdcdc" : "none";
            if(j===0)
                (formatOptions.bold)?setFormatOptions({...formatOptions,bold: false}) : setFormatOptions({...formatOptions,bold: true})
            
            else if(j===1)
                (formatOptions.italic)?setFormatOptions({...formatOptions,italic: false}) : setFormatOptions({...formatOptions,italic: true})
                
            else if(j===2)
                (formatOptions.strike)?setFormatOptions({...formatOptions,strike: false}) : setFormatOptions({...formatOptions,strike: true})
            
            }
        }
    }

    
    return (
        
        <Container>
            <InputContainer id="formatTextBold">
                <form>
                    <input type="text" placeholder="Message here..." value={text} onClick={()=>colorChange()} onChange={(e)=>handleChange(e.target)}/>
                    <SendButton type="submit" onClick={(e)=>send(e)}>
                     <SendIcon fontSize="small" style={{color: "D9D9D9"}}/>
                    </SendButton>
                </form>
                <hr/>
                <FormattingOptions>
                    <LeftFormatting>
                        
                        <span><FormatBoldIcon id="formatting-bold" onClick={(e)=> highlight(e)} fontSize="small" style={{color: "rgb(197 194 194)", padding: "3px", cursor: "pointer", background: "none", borderRadius: "3px"}}/></span>
                        <span><FormatItalicIcon id="formatting-italic" onClick={(e)=> highlight(e)} fontSize="small" style={{color: "rgb(197 194 194)", padding: "3px", cursor: "pointer", background: "none", borderRadius: "3px"}}/></span>
                        <span><StrikethroughSIcon id="formatting-strike" onClick={(e)=> highlight(e)} fontSize="small" style={{color: "rgb(197 194 194)", padding: "3px", cursor: "pointer", background: "none", borderRadius: "3px"}}/></span>
                    </LeftFormatting>
                    <RightFormatting>
                        <div id="emojiContainer" style={{display: "none"}}>
                            <MediaQuery minWidth={550}>
                            <span id="bigScreen"><Picker onEmojiClick={onEmojiClick} /></span>
                            </MediaQuery>
                            <MediaQuery maxWidth={550}>
                            <span id="smallScreen"><Picker onEmojiClick={onEmojiClick} pickerStyle={{ width: '100%' }}/></span>
                            </MediaQuery>
                        </div>
                        <SentimentSatisfiedOutlinedIcon id="emojiIcon" onClick={()=>showHide()} style={{cursor: "pointer"}}/>
                    </RightFormatting>
            </FormattingOptions>
            </InputContainer>
            
        </Container>
    )
}

export default ChatInput


const Container = styled.div`
     padding-left: 20px;
     padding-right: 20px;
     padding-bottom: 24px;
`
const SendButton=styled.button`
    background: #007a5a;
    border-radius: 2px;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    cursor: pointer;
    border: none;
    :hover{
        background: #148567;
    }
`
const InputContainer=styled.div`
    border: 1px solid #8D8D8E;
    border-radius: 7px;
    form {
        display: flex;
        height: 42px;
        align-items: center;
        padding-left: 10px;
        border-radius: 7px;
        background: ${props=>props.theme.sendArea};
        input{
            flex: 1;
            border: none;
            font-size: 13px;
            color: ${props=>props.theme.msgText};
            background: ${props=>props.theme.sendArea};
        }
        input:focus{
            outline: none;
        }
    }
`

const FormattingOptions = styled.div`
    display: flex;
    justify-content: space-between;
    
`
const LeftFormatting = styled.div`
    padding-left: 8px;
    display: flex;
    align-items: center;
    color: white;

    span{
        padding: 2px;
    }

`

const RightFormatting = styled.div`
    padding-right: 8px;

    span#bigScreen{
        position: absolute;
        bottom: 16.5vh;
        right: 10px;
    }
    span#smallScreen{
        position: absolute;
        bottom: 16.5vh;
        left: 285px;
    }
`