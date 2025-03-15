import "./App.css";
import FlashCard from "./components/FlashCard";
import { useState, useEffect, useRef } from "react";

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
  const [feedback, setFeedback] = useState(null);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const feedbackTimeoutRef = useRef(null);
  const [shuffledCards, setShuffledCards] = useState([...cards]);

  useEffect(() => {
    setShuffledCards([...cards]);
  }, []);

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

    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
    }
    setFeedbackVisible(false);
    setFeedback(null);

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

  const handleSubmit = () => {
    // Clear any existing timeout
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
    }

    if (
      value.toLowerCase() === shuffledCards[currentCardIndex].back.toLowerCase()
    ) {
      setFeedback({ message: "Correct answer!", type: "success" });
      setIsFlipped(true);
    } else {
      setFeedback({ message: "Incorrect answer!", type: "error" });
    }

    setFeedbackVisible(true);

    // Set timeout to fade out
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedbackVisible(false);

      setTimeout(() => {
        setFeedback(null);
      }, 500);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

  // Add this function to your component
  const shuffleCards = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setIsFlipped(false);

    // Clear any feedback
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
    }
    setFeedbackVisible(false);
    setFeedback(null);

    // First, apply the slide animation
    setAnimationClass("slide-right");

    // After animation starts, prepare the new shuffled deck
    setTimeout(() => {
      // Create a copy of the cards
      const shuffled = [...cards];

      // Fisher-Yates shuffle algorithm
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setShuffledCards(shuffled);

      // Reset to the first card
      setCurrentCardIndex(0);
    }, 300);
  };

  return (
    <div className="app-container">
      <div className="card-counter">
        Card {currentCardIndex + 1} of {cards.length}
      </div>
      <div className="card-container">
        {feedback && (
          <div
            className={`feedback-message ${feedback.type} ${
              feedbackVisible ? "visible" : "hidden"
            }`}
          >
            {feedback.message}
          </div>
        )}
        <FlashCard
          card={shuffledCards[currentCardIndex]}
          isFlipped={isFlipped}
          onFlip={() => !isAnimating && setIsFlipped(!isFlipped)}
          animationClass={animationClass}
        />
      </div>
      <div className="button-container">
        <button
          onClick={() => changeCard("prev")}
          disabled={isAnimating}
          className={isAnimating ? "disabled" : ""}
          aria-label="Previous card"
        >
          ←
        </button>
        <button onClick={shuffleCards}>Shuffle</button>
        <button
          onClick={() => changeCard("next")}
          disabled={isAnimating}
          className={isAnimating ? "disabled" : ""}
          aria-label="Next card"
        >
          →
        </button>
      </div>
      <div className="input-container">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your answer"
        />
        <button onClick={handleSubmit} className="submit-button">
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
