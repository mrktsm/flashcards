const FlashCard = ({ card, isFlipped, onFlip, animationClass }) => {
  return (
    <div
      className={`flip-card ${isFlipped ? "flipped" : ""} ${animationClass}`}
      onClick={onFlip}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">{card.front}</div>
        <div className="flip-card-back">{card.back}</div>
      </div>
    </div>
  );
};

export default FlashCard;
