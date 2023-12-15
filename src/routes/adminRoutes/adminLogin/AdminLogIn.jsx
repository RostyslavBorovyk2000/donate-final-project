import LogIn from "../../../components/logIn/LogIn";
import DocumentTitle from "../../DocumentTitle";


function AdminLogIn() {
  return (
    <>
      <DocumentTitle title="Увійдіть в систему" />
      <LogIn headline="Увійдіть в систему" toRegistration="/adm-registration" toLogIn="/adm-page" />
    </>
  );
}

export default AdminLogIn;
