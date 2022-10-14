import React , {useState} from "react";
import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";
import {IoMdSend} from "react-icons/io";
import {BsEmojiSmileFill} from "react-icons/bs";

export default function ChatInput({handleSendMessage}){
    const [showEmojiPicker,setShowEmojiPicker] = useState(false);
    const [message,setMessage] = useState("");

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (emojiData,event) => {
        let msg = message;
        msg += emojiData.emoji;
        setMessage(msg);
    }

    const sendChat = (event) => {
        event.preventDefault();
        if(message.length > 0){
            handleSendMessage(message);
            setMessage("");
        }
    }

    return(
    <Container>
        <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                {
                    showEmojiPicker && <EmojiPicker height={200} width={200} onEmojiClick={handleEmojiClick}/>
                }
            </div>
        </div>
        <form className="input-container" onSubmit={(e) => sendChat(e)}>
            <input type="text" placeholder="type your message here..." value={message} onChange={(e) => setMessage(e.target.value)}/>
            <button className="submit">
                <IoMdSend/>
            </button>
        </form>
    </Container>
    );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom : 0.3 rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position : absolute;
        top: -14rem;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .epr-header{
            display:none;
        }
        .epr-body{
            .epr-emoji-variation-picker{
                display:none;
            }
            .epr-emoji-list{
                .epr-emoji-category{
                    .epr-emoji-category-label{
                        display:none;
                    }
                }
            }
        }
        .epr-preview{
            display:none;
        }
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;