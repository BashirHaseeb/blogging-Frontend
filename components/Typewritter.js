"use client";
import { useState, useEffect } from "react";

const TypewriterEffect = ({ texts }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [sentenceIndex, setSentenceIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[sentenceIndex];

    const typingInterval = setInterval(() => {
      if (index < currentText.length) {
        setDisplayedText((prev) => prev + currentText[index]);
        setIndex((prev) => prev + 1);
      } else {
        clearInterval(typingInterval); // Stop typing when the sentence is complete
        setTimeout(() => {
          setDisplayedText(""); // Clear text before showing the next sentence
          setIndex(0); // Reset character index
          setSentenceIndex((prev) => (prev + 1) % texts.length); // Move to the next sentence
        }, 3000); // Pause before showing the next sentence
      }
    }, 100); // Typing speed: 100ms per character

    return () => clearInterval(typingInterval);
  }, [index, sentenceIndex, texts]);

  return (
    <div
      style={{ fontFamily: "monospace", whiteSpace: "pre" }}
      className="text-center text-xl md:text-3xl"
    >
      {displayedText}
      <span className="cursor">|</span>
      <style jsx>{`
        .cursor {
          display: inline-block;
          background-color: black;
          color: white;
          margin-left: 3px;
          width: 8px;
          height: 20px; /* Adjust height if needed */
          animation: blink 0.6s steps(2, start) infinite;
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1; /* Visible */
          }
          50% {
            opacity: 0; /* Invisible */
          }
        }
      `}</style>
    </div>
  );
};

export default TypewriterEffect;
