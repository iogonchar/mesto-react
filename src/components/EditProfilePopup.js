import { useEffect, useState, useContext } from 'react';

// component imports
import PopupWithForm from "./PopupWithForm";

// context imports
import { CurrentUserContext } from '../conexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          className="popup__form-input"
          id="author"
          name="author"
          placeholder="Имя"
          type="text"
          required
          minLength="2"
          maxLength="40"
          value={name || ''}
          onChange={handleNameChange}
        />
        <span className="popup__form-input-error author-input-error"></span>
      </label>
      <label className="popup__form-field">
        <input
          className="popup__form-input"
          id="about-author"
          name="about"
          placeholder="Занятие"
          type="text"
          required
          minLength="2"
          maxLength="200"
          value={description || ''}
          onChange={handleDescriptionChange}
        />
        <span className="popup__form-input-error about-author-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
