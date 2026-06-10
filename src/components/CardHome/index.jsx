import community from "../../assets/img/cardHomeImg/community.png";
import reading from "../../assets/img/cardHomeImg/reading.png";
import transform from "../../assets/img/cardHomeImg/transform.png";
import balance from "../../assets/img/cardHomeImg/balance.png";
import S from "./style.module.scss";

const cards = [
  {
    img: community,
    alt: "Representação visual de um grupo de indivíduos conectados.",
    text: "Oferece livros a quem não tem acesso, ajudando a reduzir a exclusão social.",
  },
  {
    img: reading,
    alt: "Silhueta de uma pessoa segurando um livro aberto.",
    text: "Estimula o hábito da leitura e o aprendizado contínuo.",
  },
  {
    img: transform,
    alt: "Um punho fechado cercado por ícones de pessoas, representando união.",
    text: "Fornece conhecimento e inspiração, permitindo que indivíduos transformem suas vidas.",
  },
  {
    img: balance,
    alt: "Símbolo de justiça e imparcialidade.",
    text: "Garante que todos, independentemente de sua condição, tenham oportunidades de aprendizado.",
  },
];

export default function CardHome() {
  return (
    <>
      <section className={S["text-home-container"]}>
        <span className={S["text-home-eyebrow"]}>Por que participar?</span>
        <h2 className={S["text-home-content"]}>Por que devo doar?</h2>
      </section>
      <section className={S["card-home-container"]}>
        <div className={S["card-home-content"]}>
          {cards.map((card, i) => (
            <div key={i} className={S["card-home-item"]}>
              <img src={card.img} alt={card.alt} />
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

