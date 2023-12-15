import Registration from "../../components/pagination/Pagination";
import DocumentTitle from "../DocumentTitle";


function AdminRegistration() {
  return (
    <>
      <DocumentTitle title="Реєстрація адміністратора" />
      <Registration headline="Реєстрація адміністратора" to="/admin" isAdmin />
    </>
  );
}

export default AdminRegistration;
