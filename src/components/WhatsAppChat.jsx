import React from "react";
import "./WhatsAppChat.css";

const WhatsAppChat = () => {
  const phoneNumber = "9921150541"; // Replace with your resort's WhatsApp number
  const message = "Hello! I would like to know more about Gondwana Jungle Resort.";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a href={whatsappLink} className="whatsapp-chat" target="_blank" rel="noopener noreferrer">
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp Chat" />
      <span>Chat With Us</span>
    </a>
  );
};

export default WhatsAppChat;
