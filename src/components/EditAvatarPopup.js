import { useState, useRef } from "react";

// component imports
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const avatar = useRef('');
  const [avatarLink, setAvatarLink] = useState();

  function handleAvatarLinkChange(e) {
    setAvatarLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatar.current.value
    });
  }

  return(
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          ref={avatar}
          className="popup__form-input"
          id="user-avatar"
          name="avatar"
          placeholder="Ссылка на аватар"
          required
          type="url"
          value={avatarLink || ''}
          onChange={handleAvatarLinkChange}
        />
        <span className="popup__form-input-error user-avatar-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
