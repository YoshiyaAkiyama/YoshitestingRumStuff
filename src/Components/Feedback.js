import "../Styles/Feedback.css";
import { FeedbackContext } from "../Context/FeedbackContext";
import { useContext } from "react";
export default function Feedback() {
  const { isVisible, feedbackText, hideFeedback } = useContext(FeedbackContext);
  return (
    <div
      className={`Feedback ${
        isVisible ? `Feedback-visible` : "Feedback-hidden"
      }`}
    >
      <p>{feedbackText}</p>
      <button onClick={hideFeedback}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
}
