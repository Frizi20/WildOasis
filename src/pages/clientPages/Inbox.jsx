import { useMediaQuery } from "react-responsive";
import styled, { css } from "styled-components";
import MobileHeader from "../../ui/clientUi/MobileHeader";
import MobileNavList from "../../features/client/MobileNavList";
import PageHeader from "../../features/client/PageHeader";
import UserAvatar from "../../features/authentication/UserAvatar";
import { MdHideImage, MdOutlineArrowBackIosNew } from "react-icons/md";
import { PiImage } from "react-icons/pi";
import {
    HiArrowLeft,
    HiOutlinePaperAirplane,
    HiPaperAirplane,
} from "react-icons/hi2";
import { useState } from "react";

import chatData from "../../data/dummy-chat.json";
import dayjs from "dayjs";

const Wrapper = styled.div`
    height: calc(100vh - 180px);
    display: flex;
    flex-direction: column;
`;

const Container = styled.div`
    display: flex;
    border: 1px solid gainsboro;
    flex: 1;
    position: absolute;
    left: 0;
    bottom: 20px;
    top: 170px;
    width: 100%;

    @media screen and (max-width: 590px) {
        top: 140px;
        bottom: 75px;
    }

    ${(props) =>
        props.$isMobile &&
        css`
            & .inbox {
                /* display: none; */
                width: 100%;
            }
        `}
`;
const Messages = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    border-right: 1px solid gainsboro;
`;

const MessagesHeader = styled.div`
    padding: 20px;
    border-bottom: 1px solid gainsboro;
`;

const CheckboxHeader = styled.div`
    /* height: 60px; */
    padding: 20px;
    border-bottom: 1px solid gainsboro;
    display: flex;
    align-items: center;
    gap: 20px;

    @media screen and (max-width: 920px) {
        text-align: center;
    }
`;

const MessagesContainer = styled.div`
    overflow: auto;
    height: calc(100% - 60px);
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 10px;
    margin-right: 5px;
    padding-right: 5px;

    &::-webkit-scrollbar-track {
        background: #efefef; /* color of the tracking area */
        margin-top: 10px;
        margin-bottom: 10px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }
`;
const MessageItem = styled.div`
    flex: 0 0 120px;
    background-color: #f5f5f585;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    box-shadow: 0 0 0px 1px #e7e7e799;

    & .avatar-container {
        flex: 0 0 60px;
        /* border: 1px solid gainsboro; */
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & .avatar {
        border: 1px solid gainsboro;
        border-radius: 50%;
        height: 45px;
        width: 45px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & .message-details {
        font-size: 1.2rem;
    }

    & .message-details div {
        padding: 3px;
    }

    & .name {
        font-weight: 400;
        font-size: 1.4rem;
        color: #2a2a2a;
    }

    & .date {
        font-weight: 500;
        color: #808080;
    }
    /* &:hover {
        background-color: #dadada;
    } */
`;

const StyledChatBox = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    /* margin-right: 10px; */
    max-width: 100%;
`;

const ChatContainer = styled.div`
    flex: 1;
    overflow: auto;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;

    &::-webkit-scrollbar-track {
        background: #efefef; /* color of the tracking area */
        margin-top: 10px;
        margin-bottom: 10px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }
`;

const Chat = styled.div`
    width: 500px;
    max-width: 100%;
    /* width: 100%; */
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    /* border: 1px solid; */
    padding: 20px 10px 20px 10px;
    flex: 1;
`;

const ChatMessage = styled.div`
    /* border: 1px solid gainsboro; */
    /* padding: 20px; */
    /* border-radius: 50px; */
    display: flex;
    position: relative;
    align-items: center;
    gap: 10px;

    & .message {
        border: 1px solid gainsboro;
        padding: 10px;
        border-radius: 20px;
    }

    & .avatar {
        /* width: 30px; */
        /* height: 30px; */
        border: 1px solid gainsboro;
        flex: 0 0 30px;
        aspect-ratio: 1/1;
        border-radius: 50%;
        position: relative;
        overflow: hidden;
    }

    & .avatar .img {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    & .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    & .options {
        /* flex: 0 0 30px; */
        border: 1px solid gainsboro;
        aspect-ratio: 1/1;
        opacity: 0;
    }

    &.right {
        flex-direction: row-reverse;
    }
`;

const ChatInputContainer = styled.div`
    bottom: 10px;
    height: 65px;
    background-color: #fff;
    /* position: sticky; */
    /* bottom: 0; */
    border: 1px solid gainsboro;
    padding: 12px;
`;

const ChatInput = styled.div`
    display: block;
    width: 500px;
    height: 100%;
    border: 1px solid #242424;
    margin: 0 auto;
    border-radius: 20px;
    padding: 5px;
    display: flex;
    align-items: center;
    max-width: 100%;

    & .img {
        padding: 0 10px;
    }

    & svg {
        width: 25px;
        height: 25px;
    }
`;
const SendMessage = styled.div`
    padding: 0 10px;
`;

const Input = styled.input.attrs({ type: "text" })`
    flex: 1;
    height: 100%;
    border: none;
    outline: none;
    padding: 5px;
    width: 0;
    &:focus {
        outline: none;
    }
`;

const BackButton = styled.div``;

export default function Inbox() {
    const isMobile = useMediaQuery({ query: "(max-width: 590px)" });
    const isMobile2 = useMediaQuery({ query: "(max-width: 922px)" });
    const [showInbox, setShowInbox] = useState(null);

    const inbox = chatData.inbox;
    const currContact = inbox.find((contact) => {
        return contact.id === showInbox;
    });

    return (
        <Wrapper>
            <PageHeader>Inbox</PageHeader>

            <Container $isMobile={isMobile2}>
                {(!isMobile2 || !showInbox) && (
                    <Messages className="inbox">
                        <MessagesHeader>Messages</MessagesHeader>
                        <MessagesContainer>
                            {inbox.map((contact) => {
                                return (
                                    <MessageItem
                                        key={contact.id}
                                        onClick={() => {
                                            setShowInbox(contact.id);
                                        }}
                                    >
                                        <div className="avatar-container">
                                            <div className="avatar">
                                                <img
                                                    src={
                                                        contact?.avatar ||
                                                        "default-user.jpg"
                                                    }
                                                    alt="image"
                                                />
                                            </div>
                                        </div>
                                        <div className="message-details">
                                            <div className="header">
                                                <div className="name">
                                                    {contact.name}{" "}
                                                    <span>
                                                        &bull; completed{" "}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="msg-content">
                                                {contact?.lastMessage?.text}
                                            </div>
                                            <div className="date">
                                                {dayjs(
                                                    contact.lastMessage
                                                        .timestamp
                                                ).format("DD MMM YYYY")}
                                            </div>
                                        </div>
                                    </MessageItem>
                                );
                            })}
                        </MessagesContainer>
                    </Messages>
                )}
                {(!isMobile2 || showInbox) && (
                    <ChatBox
                        setShowInbox={setShowInbox}
                        contact={currContact}
                    />
                )}
            </Container>

            {isMobile && (
                <MobileHeader>
                    <MobileNavList />
                </MobileHeader>
            )}
        </Wrapper>
    );
}

function ChatBox({ setShowInbox, contact }) {
    console.log(contact);
    return (
        <StyledChatBox>
            <CheckboxHeader>
                <BackButton
                    onClick={() => {
                        setShowInbox(null);
                    }}
                >
                    <MdOutlineArrowBackIosNew />
                </BackButton>
                <div className="name">Matac Cristi</div>
            </CheckboxHeader>
            <ChatContainer>
                <Chat>
                    {contact.messages.map((message) => {
                        return (
                            <ChatMessage
                                className={
                                    message.sender === "1" ? "right" : "left"
                                }
                                key={message.id}
                            >
                                <div className="avatar">
                                    <div className="img">
                                        <img
                                            src={
                                                message.sender !== "1"
                                                    ? contact.avatar
                                                    : "/default-user.jpg"
                                            }
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className="message">{message.text}</div>
                                <div className="options">x</div>
                            </ChatMessage>
                        );
                    })}
                </Chat>
            </ChatContainer>
            <ChatInputContainer>
                <ChatInput>
                    <div className="img">
                        <PiImage />
                    </div>
                    <Input />
                    <SendMessage>
                        <HiOutlinePaperAirplane />
                    </SendMessage>
                </ChatInput>
            </ChatInputContainer>
        </StyledChatBox>
    );
}
