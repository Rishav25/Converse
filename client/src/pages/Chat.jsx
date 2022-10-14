import React, { useState, useEffect , useRef} from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { allUsersRoute, host } from "../utils/APIRoutes";
import {io} from "socket.io-client";

import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
export default function Chat() {

  const socket = useRef();

  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      async function getCurrentUser() {
        const localUser = await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        setCurrentUser(localUser);
      }

      getCurrentUser();
    }
  }, [navigate]);

  useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  },[currentUser])

  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        async function getContacts() {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        }
        getContacts();
      } else {
        navigate("/setavatar");
      }
    }
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : ( 
          <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
