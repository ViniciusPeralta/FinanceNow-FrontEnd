import styles from './NavBar.module.css'

import { NavLink } from "react-router-dom";

import userStore from '../store/UserStore.ts';

const NavBar = () => {

    const { name, logout } = userStore();

    return (
        <nav className={styles.nav}>
            <div className={styles.start}>
                <NavLink to={`/home/${name}`}>
                    <span className={styles.fin}>Finance</span><span className={styles.now}>Now</span>
                </NavLink>
            </div>
            <div className={styles.middle}>
                <NavLink to={`/transactions/${name}`}
                    className={({ isActive }) => (isActive ? styles.active : undefined)}>
                    Transações
                </NavLink>
                <NavLink to={`/extract/${name}`}
                    className={({ isActive }) => (isActive ? styles.active : undefined)}>
                    Extrato
                </NavLink>
                <NavLink to={`/companies/${name}`}
                    className={({ isActive }) => (isActive ? styles.active : undefined)}>
                    Empresas
                </NavLink>
            </div>
            <div className={styles.final}>
                <h3 onClick={logout}>Sair</h3>
            </div>
        </nav>
    )
}

export default NavBar