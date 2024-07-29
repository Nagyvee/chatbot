import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCount, lastChatAnimated } from "../../redux_state/actions";

const useTypewriter = (text, speed = 15) => {
  const [displayedText, setDisplayedText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    let currentText = "";
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        currentText += text[index];
        setDisplayedText(currentText);
        index++;
      } else {
        dispatch(addCount());
        dispatch(lastChatAnimated(false));
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
};

export default useTypewriter;
