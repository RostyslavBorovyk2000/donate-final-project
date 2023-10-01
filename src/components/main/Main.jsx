// import styles from "./Main.module.scss"
import stylesApp from "../App.module.scss"

export default function Main( {children} ) {

    return (
        <main className={stylesApp.container}>
            {children}
        </main>
    )
}