import CardBooks from "../../components/CardBooks";
import S from "./style.module.scss";

export default function DonatedBooks() {
  return (
    <>
      <p className={S["text-donated-books"]}>Livros Doados</p>
      <CardBooks />
    </>
  );
}
