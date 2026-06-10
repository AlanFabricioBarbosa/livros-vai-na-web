import FormToDonated from "../../components/FormToDonated";
import { FaHeart, FaUsers, FaLightbulb, FaLeaf } from "react-icons/fa";
import S from "./style.module.scss";

const benefits = [
  { icon: FaHeart, text: "Ajuda pessoas que não têm acesso a livros" },
  { icon: FaUsers, text: "Fortalece a comunidade e laços sociais" },
  { icon: FaLightbulb, text: "Estimula o aprendizado e a curiosidade" },
  { icon: FaLeaf, text: "Dá uma nova vida ao seu livro em vez de descartá-lo" },
];

export default function ToDonatedBooks() {
  return (
    <>
      <section className={S["page-header"]}>
        <h2 className={S["page-title"]}>Doe um Livro</h2>
        <p className={S["page-subtitle"]}>
          Sua doação pode transformar a vida de alguém
        </p>
      </section>

      <section className={S["donate-layout"]}>
        <div className={S["donate-info"]}>
          <h3 className={S["info-title"]}>Por que sua doação importa?</h3>
          <p className={S["info-desc"]}>
            Preencha o formulário ao lado com as informações do livro que deseja
            doar. Cada livro é uma porta para um novo mundo.
          </p>
          <ul className={S["benefits-list"]}>
            {benefits.map(({ icon: Icon, text }, i) => (
              <li key={i} className={S["benefit-item"]}>
                <span className={S["benefit-icon"]}>
                  <Icon />
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={S["donate-form"]}>
          <FormToDonated />
        </div>
      </section>
    </>
  );
}

