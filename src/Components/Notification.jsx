import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Notification = ({ message, redirection, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose(); 
    }, 7000);
    return () => clearTimeout(timer);
  }, [onClose]); 
  return (
    <div className={`notification ${visible ? "visible" : ""}`}>
      <p>{message}</p>
      {redirection && <Link to={redirection}>Voir</Link>}
    </div>
  );
};

export default Notification;
