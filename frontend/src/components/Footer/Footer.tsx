import { FC } from "react";
import "./Footer.scss";

const Footer: FC = () => {
  return (
    <section className="footer">
      <h6 className="footer__title">Трудились над проектом</h6>
      <ul className="footer__list">
        <li className="footer__list-item">
          <a className="footer__author-link" href="https://github.com/ilinNE">
            Никита Ильин
          </a>{" "}
          х{" "}
          <a className="footer__author-link" href="https://github.com/GudRom">
            Рома Гудожников
          </a>
        </li>
        <li className="footer__list-item">
          <a className="footer__author-link" href="https://github.com/yuliaiakovleva">
            Юля Яковлева
          </a>{" "}
          х{" "}
          <a className="footer__author-link" href="https://github.com/NastiaShh">
            Настя
          </a>
        </li>
        <li className="footer__list-item">
          <a className="footer__author-link" href="https://github.com/YuliaOvchinnikova">
            Юля Овчинникова
          </a>{" "}
          х{" "}
          <a className="footer__author-link" href="https://github.com/TarStaBor">
            Станислав
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Footer;
