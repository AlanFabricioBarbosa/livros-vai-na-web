import { Link } from "react-router-dom";
import { FaHandHoldingHeart, FaArrowRight } from "react-icons/fa";
import S from "./style.module.scss";

export default function BannerHome() {
  return (
    <section className={S["banner-container"]}>
      <div className={S["banner-overlay"]} />
      <div className={S["banner-content"]}>
        <span className={S["banner-tag"]}>
          <FaHandHoldingHeart /> Plataforma de doação
        </span>
        <h2 className={S["banner-title"]}>
          Venha fazer parte da maior rede de doação
        </h2>
        <p className={S["banner-subtitle"]}>
          Doe livros, espalhe conhecimento e transforme vidas ao seu redor.
        </p>
        <div className={S["banner-actions"]}>
          <Link to="/toDonatedBooks" className={S["banner-cta"]}>
            Doe um livro agora <FaArrowRight />
          </Link>
          <Link to="/donatedBooks" className={S["banner-secondary"]}>
            Ver livros disponíveis
          </Link>
        </div>
      </div>
    </section>
  );
}

