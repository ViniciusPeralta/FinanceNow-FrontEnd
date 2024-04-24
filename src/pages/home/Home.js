import NavBar from '../../components/navbar/NavBar.js';

import styles from './Home.module.css';

import { useNavigate } from 'react-router-dom';

import extract from '../../images/extract.jpg';
import transfer from '../../images/transfer.jpg';

import userStore from '../../store/user/UserStore.ts';

const Home = () => {

  const navigate = useNavigate();
  const { name } = userStore();

  const handleExtract = () => {
    navigate(`/extract/${name}`)
  }

  const handleTransaction = () => {
    navigate(`/transactions/${name}`)
  }

  return (
    <div className={styles.home}>
      <NavBar />
      <h1>Bem vindo (a), {name}.</h1>
      <h2>Tenha controle sobre suas finanças agora!</h2>
      <div className={styles.block}>
        <div className={styles.text}>
          <h1 className={styles.trans}>Transações</h1>
          <p>Registre suas transações financeiras para gerar o extrato.</p>
          <button onClick={handleTransaction}>Acesse</button>
        </div>
        <div>
          <img src={transfer} alt="Trasfers" className={styles.transfer} />
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.text}>
          <h1 className={styles.ext}>Extrato</h1>
          <p>Acesse seu extrato mensal para analisar e controlar seus gastos.</p>
          <button onClick={handleExtract}>Acesse</button>
        </div>
        <div>
          <img src={extract} alt='Extract' className={styles.extract} />
        </div>
      </div>
      <div className={styles.contact}>
        <h1>Dúvidas ou sugestões</h1>
        <h2>Para nos contatar utilize o e-mail: contato.financenow@hotmail.com</h2>
        <h3>PeraltaSolutions{'\u00a9'}</h3>
      </div>
    </div>
  )
}

export default Home