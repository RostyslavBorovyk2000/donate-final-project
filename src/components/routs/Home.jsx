import CategorysList from "../categorysList/CategorysList"
import CardList from "../cardlist/CardList"
import styles from "./Home.module.scss"
import stylesApp from "../App.module.scss"


function MainPage(){

    const style = {
        "width": "100%",
        "height": "500px",
        "backgroundColor": "green",
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center",
        "fontSize": "50px",
        "color": "white",
        // "backgroundImage": "url('https://res.cloudinary.com/dzaxltnel/image/upload/v1696186408/logo_bgxjco.jpg')",
        "backgroundSize": "contain",
        "backgroundRepeat": "no-repeat",
    }

    return (
        <>
            <div style={style}>
                Тут міг бути ваш слайдер
            </div>
            <CategorysList />
            <CardList />
            <section className={`${styles.homeTextSection} ${stylesApp.container}`}>
                <p className={styles.call}>Долучись до Підтримки Наших Героїв!</p>
                <h2 className={styles.headline}>Вітаємо на сайті Ставка на Перемогу!</h2>
                <p>Друзі, вітаємо вас на нашому благодійному порталі, де кожен може допомогти нашим захисникам. Цей сайт створений з одною єдиною метою: підтримати Збройні Сили України у їхній важливій місії. І тут кожен може зробити свій внесок в перемогу. Як? Дуже просто!</p>
                <h4 className={styles.headline}>Наш сайт - це більше, ніж інтернет-магазин: більше ніж просто продаж одягу</h4>
                <p>У нас ви знайдете великий вибір військового одягу та аксесуарів. На відміну від звичайних магазинів, кожна ваша покупка тут стає часткою чогось значущого. 10% з прибутку від кожної покупки йде прямо на потреби ЗСУ. Таким чином, ви не лише отримуєте якісні товари, але й робите благородний вчинок.</p>
                <h4 className={styles.headline}>Аукціон cпеціальних Лотів: Цінність кожного предмету!</h4>
                <p>Наш аукціон — це місце, де ви можете знайти унікальні предмети. Може бути картини відомих художників, книги з автографами авторів, або різні інші цікавинки. І найкраща частина? Всі кошти від продажу лотів підуть на потреби ЗСУ. Це шанс не лише стати власником чогось унікального, але й допомогти тим, хто захищає нашу свободу.</p>
                <h4 className={styles.headline}>Донати на підтримку ЗСУ: кожна гривня на вагу золота!</h4>
                <p>Ми розуміємо, що не завжди можна придбати щось з магазину або взяти участь в аукціоні. Ось тому ми надаємо можливість зробити донат на конкретні потреби. Це може бути все: від ліків і до боєприпасів. І кожен гривень, який ви донатите, піде прямо туди, де йому зараз потрібно.</p>
                <h4 className={styles.headline}>Долучайтеся сьогодні!</h4>
                <p>Кожен ваш крок, навіть найменший, робить нас сильнішими. Це не просто покупки або донати. Це інвестиції в безпеку і майбутнє нашої України. Поділіться нашим сайтом з друзями, родичами, колегами. Чим більше людей дізнається про нашу ініціативу, тим ефективніше ми зможемо допомогти нашим захисникам.</p>
                <p>З нами — перемагаємо!</p>
            </section>
        </>
    )
}

export default MainPage