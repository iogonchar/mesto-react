// component imports
import Header from './Header';
import Main from './Main';

function App() {
  return (
    <div className="page__content">
      <Header />
      <Main />


      <footer className="footer">
        <p className="footer__copyright" lang="en">&copy; 2021 Mesto Russia</p>
      </footer>
    </div>
  );
}

export default App;
