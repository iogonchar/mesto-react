function Card(props) {

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="places__card">
      <button className="places__delete-card-btn"></button>
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
