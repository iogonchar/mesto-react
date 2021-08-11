import React from 'react';

// context imports
import { CurrentUserContext } from '../conexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardDeleteButtonClassName = (
    `places__delete-card-btn ${isOwn ? '' : 'places__delete-card-btn_hidden'}`
  );

  const cardLikeButtonClassName = (
    `places__like-card-btn ${isLiked ? 'places__like-card-btn_liked' : ''}`
  );

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="places__card">
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <img className="places__img" src={props.card.link} alt={props.card.name} onClick={handleCardClick} />
      <h2 className="places__title">{props.card.name}</h2>
      <div className="places__like-wrapper">
        <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
        <span className="places__likes-count">{props.card.likes.length}</span>
      </div>
    </li>
  );
}

export default Card;
