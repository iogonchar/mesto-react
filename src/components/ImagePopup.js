// image imports
import imgClosePopup from '../images/close-icon.svg';

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_form ${props.isOpen ? 'popup_opened' : ''}`}
      id={`popup-${props.name}`}
    >
      <div className="popup__container popup__container_type_slide">
        <button className="popup__popup-close-btn" onClick={props.onClose}>
          <img
            className="popup__popup-close"
            src={imgClosePopup}
            alt="Закрыть"
          />
        </button>
        <img className="popup__img" src={props.card.link} alt={props.card.name} />
        <p className="popup__text">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
