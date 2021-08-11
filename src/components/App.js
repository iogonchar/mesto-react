import { useEffect, useState } from 'react';

// component imports
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';

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

  // cards state
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([ api.getUserInfo(), api.getCards() ])
      .then((values) => {
        const [user, cards] = values;

        setCurrentUser(user);
        setCards(cards);
      })
      .catch(err => console.log(err));
  }, []);

  // like card
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  }

  // delete card
  function handleCardDelete(card) {
    console.log(card);
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => item._id !== card._id))
      })
      .catch((err) => console.log(err));
  }

  // update user profile
  function handleUpdateUser(userInfo) {
    console.log(userInfo);
    api.updateUserInfo(userInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="page__content">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
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

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

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
