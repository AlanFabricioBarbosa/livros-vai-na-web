import community from "../../assets/img/cardHomeImg/community.png";
import reading from "../../assets/img/cardHomeImg/reading.png";
import transform from "../../assets/img/cardHomeImg/transform.png";
import balance from "../../assets/img/cardHomeImg/balance.png";
import S from "./style.module.scss";

export default function CardHome() {
  return (
    <>
      <section className={S["text-home-container"]}>
        <div>
          <p className={S["text-home-content"]}>Por que devo doar?</p>
        </div>
      </section>
      <section className={S["card-home-container"]}>
        <div className={S["card-home-content"]}>
          <div className={S["card-home-item"]}>
            <img src={community} alt="" />
            <p>
              Oferece livros a quem não tem acesso, ajudando a reduzir a
              exclusão social.
            </p>
          </div>
          <div className={S["card-home-item"]}>
            <img src={reading} alt="" />
            <p>Estimula o hábito da leitura e o aprendizado contínuo.</p>
          </div>
          <div className={S["card-home-item"]}>
            <img src={transform} alt="" />
            <p>
              Fornece conhecimento e inspiração, permitindo que indivíduos
              transformem suas vidas.
            </p>
          </div>
          <div className={S["card-home-item"]}>
            <img src={balance} alt="" />
            <p>
              Garante que todos, independentemente de sua condição, tenham
              oportunidades de aprendizado.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
