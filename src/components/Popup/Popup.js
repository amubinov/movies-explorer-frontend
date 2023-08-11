import { useState } from 'react';
import logoImage from "../../images/logo.svg";
import "./Popup.css";

export const Popup = ({ isOpen, popupMessage, onClick }) => {

  const [open, setOpen] = useState({ isOpen });

  function handleClick() {
    onClick();
  }

  return (
    <section
      className={`${open ? "popup__overlay popup_opened" : "popup__overlay"}`}
      onClick={handleClick}
    >
      <div className="popup">
        <img
          src={`${logoImage}`}
          alt="Логотип сайта"
          className="popup__logo"
        />
        <h2 className={"popup__title"}>
          {popupMessage}
        </h2>
        <button
          className='popup__button'
          onClick={handleClick}
        >OK</button>

      </div>
    </section>
  );
}

export default Popup;
