import "./App.css";
import FlashCard from "./components/FlashCard";
import { useState, useEffect } from "react";

const cards = [
  {
    front: "What is React?",
    back: "React is a JavaScript library for building user interfaces, developed by Facebook. It allows for the creation of reusable UI components and efficiently updates the UI with a virtual DOM.",
  },
  {
    front: "What is JSX in React?",
    back: "JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to HTML. It is used in React to describe what the UI should look like. JSX is eventually transpiled into JavaScript by tools like Babel.",
  },
  {
    front: "What are components in React?",
    back: "Components are the building blocks of a React application. They can be either functional or class-based, and they encapsulate UI logic and rendering. Components can be reused and nested.",
  },
  {
    front: "What is state in React?",
    back: "State is an object that holds data that can change over time. It is used to control the behavior and rendering of a component. React updates the UI whenever the state changes.",
  },
  {
    front: "What are props in React?",
    back: "Props (short for properties) are read-only data passed from a parent component to a child component. They allow the child component to receive data or functions from its parent and render accordingly.",
  },
  {
    front: "What does the useState hook do in React?",
    back: "The useState hook is used in functional components to add state. It returns an array with two values: the current state and a function to update it.",
  },
  {
    front: "What does the useEffect hook do in React?",
    back: "The useEffect hook is used to perform side effects in functional components, such as fetching data, updating the DOM, or subscribing to external events. It runs after the component renders.",
  },
  {
    front: "What are the lifecycle methods in a React class component?",
    back: "React class components have lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount that are used to execute code at specific points during the component’s life.",
  },
  {
    front: "What is the virtual DOM in React?",
    back: "The virtual DOM is a lightweight copy of the real DOM. React uses it to optimize rendering. When a component’s state changes, React updates the virtual DOM first and then compares it with the real DOM, updating only the changed parts.",
  },
  {
    front: "What is React Router?",
    back: "React Router is a library used for handling routing in a React application. It allows you to navigate between different views or pages in a single-page application without reloading the page.",
  },
];

function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

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
