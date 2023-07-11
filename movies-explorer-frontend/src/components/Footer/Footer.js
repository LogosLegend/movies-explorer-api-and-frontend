import { Route, Routes } from "react-router-dom";

function Footer(props) {

  return(
  <Routes>
    <Route path="*" element={
      <footer className="footer">
        <p className="footer__note">Учебный проект Яндекс.Практикум х BeatFilm.</p>

        <div className="footer__container">
          <p className="footer__copyright">© 2023</p>

        <div className="footer__links">
          <a target="_blank" rel="noopener noreferrer" className="footer__link button-hovered" href="https://practicum.yandex.ru/profile/web/">Яндекс.Практикум</a>
          <a target="_blank" rel="noopener noreferrer" className="footer__link button-hovered" href="https://github.com/LogosLegend">Github</a>
        </div>
        </div>
      </footer>
    } />

    <Route path="/not-found" element={
      <>
        
      </>
    } />
  </Routes>
  );
}

export default Footer;