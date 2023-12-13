import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Register.module.css';

import RegisterService from '../../services/register/RegisterService';

const User = (userName, email, password) => {

  return {
    userName: userName,
    email: email,
    password: password
  }
}

const Register = () => {

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [problem, setProblem] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const cleanData = () => {
    setUser('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  const handleSubmit = (e) => {

    e.preventDefault();

    setProblem(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setProblem('As senhas devem ser iguais')
      return
    } else if (password.length < 6) {
      setProblem('A senha deve ter mais de 6 caracteres')
      return
    }

    RegisterService.executeRegister(User(user, email, password)).then(function () {

      setSuccess('Usuário cadastrado com sucesso!')

      cleanData()

    }).catch(function (error) {
      if (error.response) {

        setProblem(error.response.data.message);

        cleanData()

      }
    });

  };

  return (
    <div className={styles.container_register}>
      <div className={styles.registerForm}>
        <h1>Finance<span>Now</span></h1>
        <h2>Cadastro</h2>
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
            <span>E-mail: </span>
            <input type="email"
              placeholder='Digite seu e-mail'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
          <label>
            <span>Confirmação de senha: </span>
            <input type="password"
              placeholder='Confirme sua senha'
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            />
          </label>
          {problem && <h3 className={styles.error}>{problem}</h3>}
          {success && <h3 className={styles.success}>{success}</h3>}
          <input type="submit" value="Cadastrar" />
          <button onClick={() => navigate(-1)}>Voltar</button>
        </form>
      </div>
    </div>
  )
}

export default Register