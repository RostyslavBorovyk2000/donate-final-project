import Registration from "../../components/registration/Registration";
import DocumentTitle from "../DocumentTitle";


function AdminRegistration() {
  return (
    <>
      <DocumentTitle title="Реєстрація адміністратора" />
      {/* eslint-disable-next-line react/jsx-boolean-value */}
      <Registration headline="Реєстрація адміністратора" to="/admin" isAdmin={true} />
    </>
  );
}

export default AdminRegistration;
