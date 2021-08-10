import { useEffect, useState } from 'react';

// component imports
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

// context imports
import { CurrentUserContext } from '../conexts/CurrentUserContext';

// utils imports
import api from '../utils/api';

function App() {
  // popup state
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  // card state
  const [selectedCard, setSelectedCard] = useState({});

  // popup open handlers
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  // popup close handler
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }

    // current user state
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
      api.getUserInfo()
        .then((user) => setCurrentUser(user))
        .catch(err => console.log(err));
    }, []);

  return (
    <div className="page__content">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        <PopupWithForm
          title="Обновить аватар"
          name="edit-avatar"
          buttonText="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <label className="popup__form-field">
            <input className="popup__form-input" id="user-avatar" name="avatar" placeholder="Ссылка на аватар" required type="url" />
            <span className="popup__form-input-error user-avatar-input-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          title="Редактировать профиль"
          name="edit-profile"
          buttonText="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <label className="popup__form-field">
            <input className="popup__form-input" id="author" name="author" placeholder="Имя" type="text" required minLength="2" maxLength="40" />
            <span className="popup__form-input-error author-input-error"></span>
          </label>
          <label className="popup__form-field">
            <input className="popup__form-input" id="about-author" name="about" placeholder="Занятие" type="text" required minLength="2" maxLength="200" />
            <span className="popup__form-input-error about-author-input-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          title="Новое место"
          name="add-place"
          buttonText="Сохранить"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <label className="popup__form-field">
            <input className="popup__form-input" id="place" name="name" type="text" placeholder="Название" required minLength="2" maxLength="30" />
            <span className="popup__form-input-error place-input-error"></span>
          </label>
          <label className="popup__form-field">
            <input className="popup__form-input" id="place-img" name="link" placeholder="Ссылка на картинку" required type="url" />
            <span className="popup__form-input-error place-img-input-error"></span>
          </label>
        </PopupWithForm>

        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
