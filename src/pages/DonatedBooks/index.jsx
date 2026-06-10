import CardBooks from "../../components/CardBooks";
import S from "./style.module.scss";

export default function DonatedBooks() {
  return (
    <>
      <section className={S["page-header"]}>
        <h2 className={S["page-title"]}>Livros Doados</h2>
        <p className={S["page-subtitle"]}>
          Encontre seu próximo livro favorito entre os títulos disponíveis para doação
        </p>
      </section>
      <CardBooks />
    </>
  );
}

