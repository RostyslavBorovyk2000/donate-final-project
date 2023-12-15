import CategorysList from "../../components/categoriesList/CategoriesList";
// import FilteredCardList from "../../cardlists/FilteredCardList";
import { MainFilteredCardList } from "../../components/cardlists/FilteredCardList";
import MainSlider from "../../components/slider/MainSlider";
import DocumentTitle from "../DocumentTitle";
import pic from "../../images/bet-on-victory-ban-1.jpeg";
import styles from "./Home.module.scss";


function MainPage() {
  return (
    <>
      <DocumentTitle title="Донат Перемоги - твій внесок в Перемогу!" />
      <MainSlider />
      <CategorysList />
      <section className={styles.cardListSection}>
        <div className={styles.cardsSectionTextContent}>
          <h2 className={styles.cardsSectionHeadline}>Наші хіти</h2>
          <p className={styles.cardsSectionText}>Найпопулярніші позиції</p>
        </div>

        {/* <FilteredCardList property="isPopular" value /> */}
        <MainFilteredCardList property="isPopular" value />
                
      </section>
      <section className={styles.homeTextSection}>
        <p className={styles.call}>Долучись до Підтримки Наших Героїв!</p>
        <h2 className={styles.headline}>Вітаємо на сайті Ставка на Перемогу!</h2>
        <p>
          Друже, вітаємо тебе на нашому благодійному порталі,
          де кожен може допомогти нашим захисникам. Цей сайт створений
          з одною єдиною метою: підтримати Збройні Сили України у їхній
          важливій місії. І тут кожен може зробити свій внесок в перемогу.
          Як? Дуже просто!
        </p>
        <h4 className={styles.headline}>
          Наш сайт - це більше, ніж інтернет-магазин:
          більше ніж просто продаж одягу
        </h4>
        <p>
          У нас ти знайдеш великий вибір військового одягу та аксесуарів.
          На відміну від звичайних магазинів, кожна покупка тут стає часткою
          чогось значущого. 10% з прибутку від кожної покупки йде на потреби ЗСУ.
          Таким чином, ти не лише отримуєш якісні товари, але й робиш благородний вчинок.
        </p>
        <h4 className={styles.headline}>Аукціон cпеціальних Лотів: Цінність кожного предмету!</h4>
        <p>
          Наш аукціон — це місце, де ти можеш знайти унікальні предмети. Це можуть бути
          картини відомих художників, книги з автографами авторів, цінні речі та різні
          інші цікавинки. І найкраща частина! Всі кошти від продажу лотів підуть на
          потреби ЗСУ. Це шанс не лише стати власником чогось унікального, але й
          допомогти тим, хто захищає нашу свободу.
        </p>
        <h4 className={styles.headline}>Донати на підтримку ЗСУ: кожна гривня на вагу золота!</h4>
        <p>
          Ми розуміємо, що не завжди є необхідність придбати щось з магазину
          або можливість взяти участь в аукціоні. Ось тому ми пропонуємо зробити
          донат на конкретні потреби військових. Це може бути все: від ліків і
          до броників. І кожна гривня, яку ви донатите, піде на купівлю справді важливих речей.
        </p>
        <h4 className={styles.headline}>Долучайся сьогодні!</h4>
        <p>
          Кожен твій крок, навіть найменший, робить нас сильнішими. Це не
          просто покупки або донати. Це інвестиції в безпеку і майбутнє нашої
          держави. Поділися нашим сайтом з друзями, родичами, колегами. Чим більше
          людей дізнається про нашу ініціативу, тим ефективніше ми зможемо
          допомогти нашим захисникам!
        </p>
        <p>З нами — перемагаємо!</p>
      </section>
      <div className={styles.pictureWrapper}>
        <img src={pic} alt="alt" className={styles.picture} />
      </div>
    </>
  );
}

export default MainPage;
