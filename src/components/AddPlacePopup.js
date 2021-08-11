import { useState } from 'react';

// component imports
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = useState();
  const [link, setLink] = useState();

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-place"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input className="popup__form-input" id="place" name="name" type="text" placeholder="Название" required minLength="2" maxLength="30" onChange={handleNameChange} />
        <span className="popup__form-input-error place-input-error"></span>
      </label>
      <label className="popup__form-field">
        <input className="popup__form-input" id="place-img" name="link" placeholder="Ссылка на картинку" required type="url" onChange={handleLinkChange} />
        <span className="popup__form-input-error place-img-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
