import React from 'react';

// context imports
import { CurrentUserContext } from '../conexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  // const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardDeleteButtonClassName = (
    `places__delete-card-btn ${isOwn ? '' : 'places__delete-card-btn_hidden'}`
  );

  // const cardLikeButtonClassName = (
  //   `...`
  // );

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="places__card">
      <button className={cardDeleteButtonClassName}></button>
      <img className="places__img" src={props.card.link} alt={props.card.name} onClick={handleCardClick} />
      <h2 className="places__title">{props.card.name}</h2>
      <div className="places__like-wrapper">
        <button className="places__like-card-btn"></button>
        <span className="places__likes-count">{props.card.likes.length}</span>
      </div>
    </li>
  );
}

export default Card;
