import { useRef } from "react";

// component imports
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef('');

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    })
      .then(() => avatarRef.current.value = '')
      .catch((err) => console.log(err));
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
          ref={avatarRef}
          className="popup__form-input"
          id="user-avatar"
          name="avatar"
          placeholder="Ссылка на аватар"
          required
          type="url"
        />
        <span className="popup__form-input-error user-avatar-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
