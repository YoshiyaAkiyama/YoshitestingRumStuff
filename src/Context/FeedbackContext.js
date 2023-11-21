import { createContext, useEffect, useState } from "react";
export const FeedbackContext = createContext();

export function FeedbackProvider({ children }) {
  const [feedbackText, setFeedbackText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const displayFeedback = (text) => {
    setFeedbackText(text);
    setIsVisible(true);
  };
  const hideFeedback = () => {
    setIsVisible(false);
  };
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  }, [isVisible]);
  const value = {
    isVisible,
    displayFeedback,
    hideFeedback,
    feedbackText
  };
  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
}
