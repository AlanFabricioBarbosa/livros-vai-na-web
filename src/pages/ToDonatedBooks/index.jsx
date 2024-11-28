import FormToDonated from "../../components/FormToDonated";
import S from "./style.module.scss";

export default function ToDonatedBooks() {
  return (
    <>
      <section className={S["toDonatedBook-container"]}>
        <div>
          <p className={S["text-to-donated-container"]}>
            Por favor, preencha o formulário com suas informações e as
            informações do Livro
          </p>
        </div>
        <FormToDonated />
      </section>
    </>
  );
}
