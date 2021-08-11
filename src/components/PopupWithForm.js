// image imports
import imgClosePopup from '../images/close-icon.svg';

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_form ${props.isOpen ? 'popup_opened' : ''}`}
      id={`popup-${props.name}`}
    >
      <div className="popup__container popup__container_type_form">
        <button className="popup__popup-close-btn" onClick={props.onClose}>
          <img
            className="popup__popup-close"
            src={imgClosePopup}
            alt="Закрыть"
          />
        </button>

        <h2 className="popup__title">{props.title}</h2>

        <form
          className="popup__form"
          name={`popup-${props.name}-form`}
          id={`popup-${props.name}-form`}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="popup__form-submit-btn" type="submit">{props.buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
