import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { LiaEye } from "react-icons/lia";

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
      {redirection && <Link to={redirection}><p className="flex items-center gap-2 pt-2">Voir <LiaEye size={20} /></p></Link>}
    </div>
  );
};

export default Notification;
