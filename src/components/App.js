// component imports
import Header from './Header';

// image imports
import imgEditProfile from '../images/edit-profile.svg';
import imgAddCard from '../images/add-button.svg';

// Аватар временно !!!
import imgAvatar from '../images/avatar.jpg';

// import './App.css';

function App() {
  return (
    <div className="page__content">
      <Header />

      <main className="content">
        <section className="profile">
          {/* avatar */}
          <div className="profile__avatar-wrapper">
            <img
              className="profile__avatar"
              src={imgAvatar}
              alt="Аватар"
            />
            <button className="profile__avatar-change-btn"></button>
          </div>

          {/* user info */}
          <div className="profile__info-wrapper">
            <div className="profile__info">
              <h1 className="profile__author">Жак-Ив Кусто</h1>
              <p className="profile__about">Исследователь океана</p>
            </div>

            <button className="profile__profile-edit-btn">
              <img
                className="profile__profile-edit"
                src={imgEditProfile}
                alt="Редактировать профиль"
              />
            </button>
          </div>

          {/* add new card */}
          <button className="profile__add-card-btn">
            <img
              className="profile__add-card"
              src={imgAddCard}
              alt="Добавить новое место"
            />
          </button>
        </section>

        <section className="places"></section>
      </main>

      <footer className="footer">
        <p className="footer__copyright" lang="en">&copy; 2021 Mesto Russia</p>
      </footer>
    </div>
  );
}

export default App;
