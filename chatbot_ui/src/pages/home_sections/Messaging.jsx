import React, { useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import profileIcon from "../../assets/profile.jpg";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import useTypewriter from "./TypeWriter";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy } from "react-icons/fa";
import NayveeIcon from "../../assets/nayvee_logo_ icon_nobg.png";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border-radius: 8px;
  overflow-y: auto;
  overflow-x: hidden;

  .failed {
    color: red;
    margin: 1rem auto;
    font-size: 0.8rem;
    font-weight: 550;
  }

  @media (max-width: 485px) {
    padding: 2rem 0;
  }

  .loading {
    display: flex;
    margin: 0 auto;
    font-weight: 350;

    img {
      width: 14px;
      height: 18px;
      margin: 0 0.45rem;
      animation: spin 1s infinite linear;

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }

    span {
      animation: textSize 3s infinite linear;
      transition: animation ease-in;

      @keyframes textSize {
        from {
          font-size: 0.5rem;
        }
        to {
          font-size: 0.85rem;
        }
      }
    }
  }
`;

const Message = styled.div`
  display: flex;
  flex-wrap: ${({ sender }) => (sender === "user" ? "no-wrap" : "wrap")};
  align-items: flex-start;
  position: relative;
  padding: 0.75rem 1.5rem 0.2rem 0.5rem;
  background-color: ${({ sender }) =>
    sender === "user" ? "#A3FFD6" : "#f9f9f9"};
  border-radius: 2px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  max-width: 75%;
  ${({ sender }) => sender === "user" && "align-self: flex-end;"}

  @media (max-width: 768px) {
    max-width: ${({ sender }) => (sender === "user" ? "80%" : "100%")};
  }

  .user-profile {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 0.75rem;
  }

  .nayvee-logo {
    width: 18px;
    height: 22px;
    margin: 0.2rem 0.45rem;
  }

  p {
    margin: 0 0 0.75rem;
    color: #333;
    word-break: break-word;
  }
`;

const MarkdownContent = styled.div`
  font-size: 1rem;
  color: #333;
  width: 100%;
  margin: 0;
  position: relative;
   overflow-x: auto;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 1rem 0 0.5rem;
    font-weight: bold;
  }

  pre {
    width: 100%;
    max-width: 100%; 
    padding: 0.2rem;
    border-radius: 5px;
    position: relative;
    background-color: #2d2d2d;
    white-space: pre; 
    overflow-wrap: break-word;

    @media (max-width: 378px) {
      font-size: 0.78rem;
      padding: 0;
    }
  }

  code {
    background: #f5f5f5;
    padding: 0.3rem 0.4rem;
    border-radius: 3px;
    white-space: pre; /* Use pre to maintain whitespace */
    overflow-wrap: break-word; /* Break long words */

    @media (max-width: 487px) {
      font-size: 1rem;
    }
  }

  blockquote {
    margin: 1rem 0;
    padding: 0.5rem 1rem;
    background: #f9f9f9;
    border-left: 5px solid #ccc;
  }

  ul,
  ol {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  a {
    color: #0366d6;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;


const CopyButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: ${({ copie }) => (copie ? "#888" : "#0366d6")};
  color: white;
  border: none;
  padding: 0.25rem;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  z-index: 5; 

  &:hover {
    background: ${({ copie }) => (copie ? "#888" : "#024b9a")};
  }
`;

const CodeBlock = ({ className, children }) => {
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";
  const [copyText, setCopyText] = useState(false);

  return (
    <div style={{ position: "relative", overflowX: 'hidden' }}>
      {language && (
        <span
          style={{
            position: "absolute",
            top: "0.5rem",
            left: "0.5rem",
            color: "#bbb",
            fontSize: "0.75rem",
            zIndex: 2,
          }}
        >
          {language}
        </span>
      )}
      <CopyToClipboard
        text={String(children).replace(/\n$/, "")}
        onCopy={() => setCopyText(true)}
      >
        <CopyButton copie={copyText}>
          <FaCopy style={{ marginRight: "0.25rem" }} />{" "}
          {copyText ? "Copied" : "Copy"}
        </CopyButton>
      </CopyToClipboard>
      <SyntaxHighlighter
        style={materialDark}
        language={language}
        PreTag="pre"
        wrapLines={true}
        wrapLongLines={true}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  );
};

const components = {
  code({ node, inline, className, children, ...props }) {
    return !inline && className ? (
      <CodeBlock className={className} {...props}>
        {children}
      </CodeBlock>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

const ChatMessage = ({ sender, message, user, typeChat }) => {
  const typedMessage = sender === "Nayvee" ? useTypewriter(message) : message;

  return (
    <Message
      sender={sender}
      className={sender === user ? "sender-text" : "chatbot-message"}
    >
      {sender === "user" && (
        <img
          src={user?.image ? user.image : profileIcon}
          className="user-profile"
          alt="profile img"
        />
      )}
      {sender === "Nayvee" ? (
        <MarkdownContent>
          <ReactMarkdown components={components}>
            {typeChat === message ? typedMessage : message}
          </ReactMarkdown>
        </MarkdownContent>
      ) : (
        <p>{typedMessage}</p>
      )}
      {sender === "Nayvee" && (
        <>
          <img src={NayveeIcon} alt="Nayvee Logo" className="nayvee-logo" />
          <span
            style={{ fontSize: "12px", paddingTop: ".35rem", color: "#999" }}
          >
            Nayvee
          </span>
        </>
      )}
    </Message>
  );
};

export default function Messages({ failedMsg, typeChat }) {
  const pendingMessage = useSelector((state) => state.chat.pendingMessage);
  const chatMessage = useSelector((state) => state.chat.userChats);
  const user = useSelector((state) => state.user.userDetails);

  return (
    <Container>
      {chatMessage.length > 0 &&
        chatMessage.map(({ sender, message }, index) => (
          <ChatMessage
            key={index}
            sender={sender}
            message={message}
            user={user}
            typeChat={typeChat}
          />
        ))}
      {pendingMessage !== null && (
        <>
          <ChatMessage
            sender="user"
            message={pendingMessage.message}
            user={user}
          />
          <div className="loading">
            <img src={NayveeIcon} alt="Nayvee Logo" className="nayvee-logo" />
            <span>Nayvee filtering...</span>
          </div>
        </>
      )}
      {failedMsg && <p className="failed">Error sending message. Try again.</p>}
    </Container>
  );
}
