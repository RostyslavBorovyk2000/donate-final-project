import DocumentTitle from "../DocumentTitle";
import styles from "./DeliveryPayment.module.scss";

function DeliveryPayment() {
  return (
    <section style={{ padding: "50px 15px 100px" }}>
      <DocumentTitle title="Доставка та оплата: умови та терміни" />
      <h1 style={{
        fontSize: "30px", marginTop: "10px", color: "#7c8d66", textTransform: "uppercase",
      }}
      >
        Доставка та оплата
      </h1>
      <p style={{ padding: "5px 0px 50px", color: "rgb(61 61 61)" }}>
        Умови оплати та доставки в магазині
      </p>
      <div>
        <h2 className={styles.deliveryTitle}>Доставка по Україні</h2>
        <div>
          <h3 className={styles.deliverySubtitle}>
            Доставка у відділення &quot;Нової Пошти&quot;
          </h3>
          <p className={styles.deliveryText}>
            {`Завдяки доставці «Новою Поштою» ви можете отримати ваше
                замовлення навіть у найвіддаленіших куточках нашої країни.`}
          </p>
          <p className={styles.deliveryText}>
            {`Перед відправкою товару з вами зв'яжуться наші представники,
                      для уточнення деталей доставки.`}
          </p>
          <p className={styles.deliveryText}>
            Терміни доставки до відділення «Нової Пошти» в середньому 2–3 дні.
          </p>
          <p className={styles.deliveryText}>
            {`Після відправки товару ви отримаєте SMS-повідомлення з номером декларації.
                      Уточнити конкретну дату отримання вашого замовлення ви можете
                      на сайті компанії «Нова Пошта».`}
          </p>
          <p className={styles.deliveryText}>
            Вартість доставки визначає перевізник «Нова Пошта», і в середньому
            варіюється від 45 грн до 100 грн.
          </p>
          <p className={styles.deliveryText}>
            {`Перед відправкою товар перевіряється та страхується на повну вартість.
                При отриманні товару вам необхідно перевірити його на наявність пошкоджень і в разі проблем на місці пред'явити претензії службі доставки. 
                Служба доставки відшкодовує завдані збитки, якщо її було завдано з вини перевізника.`}
          </p>
          <h2 className={styles.deliveryTitle}>Способи оплати</h2>
          <p className={styles.deliveryText}>
            <strong className={styles.strongText}>
              Безготівкова оплата при оформленні замовлення
            </strong>
          </p>
          <p className={styles.deliveryText}>
            {`Власники карт Visa та MasterCard можуть повністю оплатити замовлення у момент його оформлення.
                Даний варіант оплати дозволить заощадити час при отриманні посилки.`}
          </p>

          <p className={styles.deliveryText}>
            <strong className={styles.strongText}>
              Оплата готівкою при отриманні на поштових відділеннях
            </strong>
          </p>
          <p className={styles.deliveryText}>
            При отриманні посилки на відділеннях Нової Пошти ви можете
            розплатитися готівкою.
          </p>
        </div>
      </div>
    </section>
  );
}

export default DeliveryPayment;
