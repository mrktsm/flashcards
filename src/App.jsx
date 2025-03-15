import "./App.css";
import FlashCard from "./components/FlashCard";
import { useState, useEffect } from "react";

const cards = [
  {
    front: "Data structure that follows First-In-First-Out (FIFO) order.",
    back: "Queue",
  },
  {
    front: "Data structure that follows Last-In-First-Out (LIFO) order.",
    back: "Stack",
  },
  {
    front: "Data structure that stores key-value pairs.",
    back: "HashMap",
  },
  {
    front: "A tree structure where each node has at most two children.",
    back: "Binary Tree",
  },
  {
    front: "A tree-based data structure used to maintain a priority.",
    back: "Heap",
  },
  {
    front: "A collection of nodes connected by edges.",
    back: "Graph",
  },
  {
    front: "A linear data structure that allows operations from both ends.",
    back: "Deque",
  },
  {
    front:
      "A data structure that stores elements in key-value pairs, typically unordered.",
    back: "Dictionary",
  },
  {
    front: "A tree-like structure used for storing strings.",
    back: "Trie",
  },
  {
    front:
      "A dynamic data structure that stores elements in nodes, each pointing to the next.",
    back: "Linked List",
  },
];

function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (animationClass) {
      const timer = setTimeout(() => {
        setAnimationClass("");
        setIsAnimating(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [animationClass]);

  const changeCard = (direction) => {
    if (isAnimating) return;

    setIsAnimating(true);

    setIsFlipped(false);

    setTimeout(() => {
      setAnimationClass(direction === "next" ? "slide-left" : "slide-right");

      setTimeout(() => {
        setCurrentCardIndex((prevIndex) => {
          const newIndex =
            direction === "next"
              ? (prevIndex + 1) % cards.length
              : (prevIndex - 1 + cards.length) % cards.length;
          return newIndex;
        });
      }, 300);
    }, 300);
  };

  return (
    <div className="app-container">
      <div className="card-counter">
        Card {currentCardIndex + 1} of {cards.length}
      </div>
      <div className="card-container">
        <FlashCard
          card={cards[currentCardIndex]}
          isFlipped={isFlipped}
          onFlip={() => !isAnimating && setIsFlipped(!isFlipped)}
          animationClass={animationClass}
        />
      </div>
      <div className="button-container">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button>Submit</button>
        <button
          onClick={() => changeCard("prev")}
          disabled={isAnimating}
          className={isAnimating ? "disabled" : ""}
          aria-label="Previous card"
        >
          ←
        </button>
        <button
          onClick={() => !isAnimating && setIsFlipped(!isFlipped)}
          disabled={isAnimating}
          className={`flip-button ${isAnimating ? "disabled" : ""}`}
          aria-label="Flip card"
        >
          Flip
        </button>
        <button
          onClick={() => changeCard("next")}
          disabled={isAnimating}
          className={isAnimating ? "disabled" : ""}
          aria-label="Next card"
        >
          →
        </button>
      </div>
    </div>
  );
}

export default App;
