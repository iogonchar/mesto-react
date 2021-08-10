import React from 'react';

// component imports
import Card from './Card';

// context imports
import { CurrentUserContext } from '../conexts/CurrentUserContext';

// image imports
import imgEditProfile from '../images/edit-profile.svg';
import imgAddCard from '../images/add-button.svg';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        {/* avatar */}
        <div className="profile__avatar-wrapper">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
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
            <h1 className="profile__author">{currentUser.name}</h1>
            <p className="profile__about">{currentUser.about}</p>
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
            props.cards.map(card => (
              <Card
                key={card._id}
                card={card}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
              />
            ))
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;
