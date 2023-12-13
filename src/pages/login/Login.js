import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Login.module.css';

import LoginService from '../../services/login/LoginService';
import userStore from '../../store/UserStore.ts';

const Login = () => {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [problem, setProblem] = useState(null);

  const { setEmail, setUsername, setUserId } = userStore();

  const handleSubmit = (e) => {

    e.preventDefault();

    setProblem(null)

    LoginService.executeLogin(user, password).then(function (response) {

      setUserId(response.data.data.id)
      setUsername(response.data.data.userName)
      setEmail(response.data.data.email)

    }).catch(function (error) {
      if (error.response) {

        setProblem(error.response.data.message);

      }

    });

    setUser('');
    setPassword('');

  };

  return (
    <div className={styles.container_login}>
      <div className={styles.loginForm}>
        <h1>Finance<span>Now</span></h1>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} >
          <label>
            <span>Usuário: </span>
            <input type="text"
              placeholder='Digite seu usuário'
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
          </label>
          <label>
            <span>Senha: </span>
            <input type="password"
              placeholder='Digite sua senha'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </label>
          {problem && <h3 className={styles.error}>{problem}</h3>}
          <input type="submit" value="Entrar" />
        </form>
        <NavLink to='/register'>Não tem cadastro? Cadastre-se!</NavLink>
      </div>
    </div>
  )
}

export default Login