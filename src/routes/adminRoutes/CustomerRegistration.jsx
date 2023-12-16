import Registration from "../../components/registration/Registration";
import DocumentTitle from "../DocumentTitle";


function CustomerRegistration() {
  return (
    <>
      <DocumentTitle title="Реєстрація акаунта" />
      <Registration headline="Реєстрація акаунта" to="/log-in" isAdmin={false} />
    </>
  );
}

export default CustomerRegistration;
