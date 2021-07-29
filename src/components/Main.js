import { useState, useEffect } from 'react';

import Card from './Card';

import api from '../utils/api';

import imgEditProfile from '../images/edit-profile.svg';
import imgAddCard from '../images/add-button.svg';

function Main(props) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([ api.getUserInfo(), api.getInitialCards() ])
      .then(values => {
        const [userInfo, initialCards] = values;

        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);

        setCards(initialCards);
      })
      .catch(err => console.log(err));
  });

  return (
    <main className="content">
      <section className="profile">
        {/* avatar */}
        <div className="profile__avatar-wrapper">
          <img
            className="profile__avatar"
            src={userAvatar}
            alt="Аватар"
          />
          <button
            className="profile__avatar-change-btn"
            onClick={props.onEditAvatar}
          ></button>
        </div>

        {/* user info */}
        <div className="profile__info-wrapper">
          <div className="profile__info">
            <h1 className="profile__author">{userName}</h1>
            <p className="profile__about">{userDescription}</p>
          </div>

          <button
            className="profile__profile-edit-btn"
            onClick={props.onEditProfile}
          >
            <img
              className="profile__profile-edit"
              src={imgEditProfile}
              alt="Редактировать профиль"
            />
          </button>
        </div>

        {/* add new card */}
        <button
          className="profile__add-card-btn"
          onClick={props.onAddPlace}
        >
          <img
            className="profile__add-card"
            src={imgAddCard}
            alt="Добавить новое место"
          />
        </button>
      </section>

      <section className="places">
        <ul className="places__list">
          {
            cards.map(card =>
              <Card
                key={card._id}
                card={card}
              />
            )
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;
