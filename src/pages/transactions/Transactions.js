import { useState, useEffect, useRef } from 'react';

import Modal from 'react-modal';

import NavBar from '../../components/navbar/NavBar.js';

import styles from './Transactions.module.css';

import TransactionService from '../../services/transaction/TransactionService';

import DateFormat from '../../utils/DateFormat';

import register from '../../images/register.jpg'
import edit from '../../images/edit.jpg'
import deleteimg from '../../images/delete.jpg'
import searchnull from '../../images/searchnull.jpg'
import searchempty from '../../images/searchempty.jpg'
import searchwrong from '../../images/searchwrong.jpg'

import userStore from '../../store/user/UserStore.ts';

const Transaction = (type, value, essential, category, description, date, user) => {

  return {
    userId: user,
    type: type,
    value: value,
    essential: essential,
    category: category,
    description: description,
    date: DateFormat.formatDate(date)
  }
}

const UpdateTransaction = (id, type, value, essential, category, description, date, user) => {

  return {
    id: id,
    user: user,
    type: type,
    value: value,
    essential: essential,
    category: category,
    description: description,
    date: date
  }
}

const TransactionList = (id, type, value, essential, category, description, date) => {

  return {
    id: id,
    type: type,
    value: value,
    essential: essential,
    category: category,
    description: description,
    date: date,
  }
}

const Transactions = () => {

  const { userId } = userStore();

  Modal.setAppElement('#root');

  const [type, setType] = useState('CREDIT');
  const [value, setValue] = useState('');
  const [essential, setEssential] = useState(false);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [transactionList, setTransactionList] = useState([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [toBeDeleted, setToBeDeleted] = useState([]);
  const [id, setId] = useState('');

  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);

  const [problem, setProblem] = useState('');
  const [success, setSuccess] = useState('');

  const handleDeteleSelection = (t) => {

    if (toBeDeleted.includes(t.id)) {
      toBeDeleted.splice(toBeDeleted.indexOf(t.id), 1);
    } else {
      toBeDeleted.push(t.id);
    }

  }

  function cleanData() {
    setEssential(false);
    setType('CREDIT');
    setSuccess('');
    setProblem('');
    setDateFrom('');
    setDateTo('');
    setTransactionList('');
    setToBeDeleted([]);
    setValue('');
    setCategory('');
    setDescription('');
    setDate('');
  }

  function closeRegisterModal() {
    setRegisterModalIsOpen(false);
    cleanData();
  }

  function closeEditModal() {
    setEditModalIsOpen(false);
    cleanData();
  }

  function closeDeleteModal() {
    setDeleteModalIsOpen(false);
    cleanData();
  }

  const openUpdateModal = (t) => {
    setType(t.type);
    setValue(t.value);
    setCategory(t.category);
    setDescription(t.description);
    setDate(t.date);
    setEssential(t.essential);
    setId(t.id);
    setUpdateModalIsOpen(true);
  }

  function closeUpdateModal() {
    setUpdateModalIsOpen(false);
    setValue('');
    setCategory('');
    setDescription('');
    setDate('');
    setType('');
    setEssential(false);
    setId('');
  }

  const selectRef = useRef('');

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.value = type;
    }
  }, [type]);

  const handleSubmit = (e) => {

    e.preventDefault();

    setProblem('');
    setSuccess('');

    const transaction = Transaction(type, value, essential, category, description, date, userId);

    TransactionService.executeRegister(transaction).then(function () {

      cleanData();
      setSuccess('Cadastrado com sucesso!');

      let uncheck = document.getElementById('check');
      uncheck.checked = false;

    }).catch(function (error) {
      if (error.response) {

        setProblem(error.response.data.message);

      }
    });

  }

  const getTransactionList = (e) => {

    e.preventDefault();

    setProblem('');
    setSuccess('');
    setTransactionList('');
    setToBeDeleted([]);

    TransactionService.getTransactions(
      userId, DateFormat.formatDate(dateFrom), DateFormat.formatDate(dateTo)
    ).then(function (response) {

      const list = [];

      response.data.data.forEach((t) => {

        const transaction = TransactionList(t.id, t.type, t.value, t.essential, t.category, t.description, t.date);

        list.push(transaction);

      });

      setTransactionList(list);

    }).catch(function (error) {
      if (error.response) {

        setProblem(error.response.data.message);

      }
    });
  }

  const handleDelete = (e) => {

    e.preventDefault();

    setSuccess('');
    setProblem('');

    if (toBeDeleted.length === 0) {
      setProblem('Selecione uma transação para deletar.')
    } else {

      TransactionService.deleteTransactions(toBeDeleted).then(function () {

        toBeDeleted.forEach((t) => {
          transactionList.forEach((t2) => {
            if (t2.id === t) {
              transactionList.splice(transactionList.indexOf(t2), 1);
            }
          })
        });

        setSuccess('Deletado com sucesso')

      }).catch(function (error) {

        setProblem(error.response.data.message);

      });
    }

    setToBeDeleted([]);

    let uncheck = document.getElementById('checkdel');
    uncheck.checked = false;

  }

  const handleUpdate = (e) => {

    e.preventDefault();

    setProblem('');
    setSuccess('');

    const transaction = UpdateTransaction(
      id, type, value, essential, category, description, DateFormat.formatDate(date), userId
    );

    const list = [];

    TransactionService.updateTransaction(transaction, DateFormat.formatDate(dateFrom), DateFormat.formatDate(dateTo)).then(function (response) {

      setSuccess('Atualizado com sucesso.');

      response.data.data.forEach((t) => {

        const transaction = TransactionList(t.id, t.type, t.value, t.essential, t.category, t.description, t.date);

        list.push(transaction);

      });

    }).catch(function (error) {

      if (error.response.data.message === 'Não há transações na data informada.') {
        setSuccess('Atualizado com sucesso.');

      }

      setProblem(error.response.data.message);

    });

    setTransactionList(list);

  }

  return (
    <div className={styles.transactions}>
      <NavBar />

      <h1>Tela de transações</h1>
      <h2>Gerencie aqui as transações realizadas para que os relatórios sejam gerados.</h2>

      <div className={styles.block}>
        <div className={styles.text}>
          <h1 className={styles.ext}>Registro</h1>
          <p>Faça o cadastro das suas transações financeiras aqui.</p>
          <button onClick={() => setRegisterModalIsOpen(true)}>Acesse</button>
        </div>
        <div>
          <img src={register} alt='Register' className={styles.register} />
        </div>
      </div>

      <div className={styles.block}>
        <div className={styles.text}>
          <h1 className={styles.ext}>Alteração</h1>
          <p className={styles.txtedit}>Edite os registros das transações financeiras aqui.</p>
          <button onClick={() => setEditModalIsOpen(true)}>Acesse</button>
        </div>
        <div>
          <img src={edit} alt='Edit' className={styles.register} />
        </div>
      </div>

      <div className={styles.block}>
        <div className={styles.text}>
          <h1 className={styles.ext}>Remoção</h1>
          <p>Delete os registros das transações financeiras aqui.</p>
          <button onClick={() => setDeleteModalIsOpen(true)}>Acesse</button>
        </div>
        <div>
          <img src={deleteimg} alt='Register' className={styles.delete} />
        </div>
      </div>

      <div className={styles.contact}>
        <h1>Dúvidas ou sugestões</h1>
        <h2>Para nos contatar utilize o e-mail: contato.financenow@hotmail.com</h2>
        <h3>PeraltaSolutions{'\u00a9'}</h3>
      </div>

      <Modal
        isOpen={registerModalIsOpen}
        onRequestClose={closeRegisterModal}
        className={styles.RegisterModal}>
        <h1>Registrar Transação</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.first}>
            <label>
              <select required onChange={(e) => setType(e.target.value)}>
                <option value="CREDIT">Receita</option>
                <option value="DEBIT">Despesa</option>
              </select>
            </label>
            <label>
              <span>Essencial: </span>
              <input type="checkbox"
                id='check'
                onClick={() => setEssential(!essential)} />
            </label>
          </div>
          <label>
            <input type="number"
              step='0.01'
              onChange={(e) => setValue(e.target.value)}
              value={value}
              placeholder='Valor (R$)'
              required />
          </label>
          <label>
            <input type="text"
              maxLength={20}
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              placeholder='Categoria'
              required />
          </label>
          <label>
            <textarea cols="22"
              rows="2"
              maxLength={50}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder='Descrição'
              required />
          </label>
          <label>
            <input type="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              required />
          </label>
          <input type="submit" value="Registrar" />
          {problem && <h3>Erro! Tente novamente mais tarde.</h3>}
          {success && <h2>{success}</h2>}
        </form>
      </Modal>

      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        className={styles.DeleteModal}>
        <h1>Editar Transações</h1>
        <form onSubmit={getTransactionList}>
          <div className={styles.SearchText}>
            <p>Data Inicial:</p>
            <p>Data Final:</p>
          </div>
          <div className={styles.Search}>
            <label>
              <input type="date"
                onChange={(e) => setDateFrom(e.target.value)}
                value={dateFrom}
                required
              />
            </label>
            <label>
              <input type="date"
                onChange={(e) => setDateTo(e.target.value)}
                value={dateTo}
                required
              />
            </label>
            <input type="submit" value=' ' />
          </div>
        </form>
        {transactionList.length > 0 &&
          <table>
            <tbody>
              <tr>
                <th>Data</th>
                <th>Tipo</th>
                <th>Essencial</th>
                <th>Categoria</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Editar</th>
              </tr>
              {transactionList.map(
                t =>
                  <tr className={transactionList.indexOf(t) % 2 === 0 ? styles.second : styles.first}
                    key={t.id}>
                    <td>{DateFormat.formatDate(t.date)}</td>
                    <td>{t.type === 'CREDIT' ? '+' : '-'}</td>
                    <td>{t.essential === true ? '✓' : ''}</td>
                    <td>{t.category}</td>
                    <td>{t.description}</td>
                    <td>{`R$ ${t.value}`}</td>
                    <td>
                      <button onClick={() => openUpdateModal(t)}>✏️</button>
                    </td>
                  </tr>
              )}
            </tbody>
          </table>
        }
        {transactionList.length > 0 && problem &&
          <div className={styles.error}>
            <p>{problem}</p>
          </div>
        }
        {transactionList.length === 0 && !problem &&
          <div>
            <img src={searchnull} alt='Search null' className={styles.searchnull} />
          </div>}
        {transactionList.length === 0 && problem === 'Não há transações na data informada.' &&
          <div>
            <img src={searchempty} alt='Search empty' className={styles.searchnull} />
          </div>}
        {transactionList.length === 0 && success === 'Não há transações na data informada.' &&
          <div>
            <img src={searchempty} alt='Search empty' className={styles.searchnull} />
          </div>}
        {transactionList.length === 0 && problem === 'Data inicial maior que a final.' &&
          <div>
            <img src={searchwrong} alt='Search wrong' className={styles.searchnull} />
          </div>}
      </Modal>

      <Modal
        isOpen={updateModalIsOpen}
        onRequestClose={closeUpdateModal}
        className={styles.RegisterModal}>
        <h1>Atualizar Transação</h1>
        <form onSubmit={handleUpdate}>
          <div className={styles.first}>
            <label>
              <select ref={selectRef} required onChange={(e) => setType(e.target.value)} value={type}>
                <option value="CREDIT">Receita</option>
                <option value="DEBIT">Despesa</option>
              </select>
            </label>
            <label>
              <span>Essencial: </span>
              <input type="checkbox"
                checked={essential}
                id='check'
                onClick={() => setEssential(!essential)} />
            </label>
          </div>
          <label>
            <input type="number"
              step='0.01'
              onChange={(e) => setValue(e.target.value)}
              value={value}
              placeholder='Valor (R$)'
              required />
          </label>
          <label>
            <input type="text"
              maxLength={20}
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              placeholder='Categoria'
              required />
          </label>
          <label>
            <textarea cols="22"
              rows="2"
              maxLength={50}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder='Descrição'
              required />
          </label>
          <label>
            <input type="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              required />
          </label>
          <input type="submit" value="Salvar" />
        </form>
        {problem && problem !== 'Não há transações na data informada.' && <h5>Erro! Tente novamente mais tarde.</h5>}
        {success && <h4>{success}</h4>}
      </Modal>

      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={closeDeleteModal}
        className={styles.DeleteModal}>
        <h1>Deletar Transações</h1>
        <form onSubmit={getTransactionList}>
          <div className={styles.SearchText}>
            <p>Data Inicial:</p>
            <p>Data Final:</p>
          </div>
          <div className={styles.Search}>
            <label>
              <input type="date"
                onChange={(e) => setDateFrom(e.target.value)}
                value={dateFrom}
                required
              />
            </label>
            <label>
              <input type="date"
                onChange={(e) => setDateTo(e.target.value)}
                value={dateTo}
                required
              />
            </label>
            <input type="submit" value=' ' />
          </div>
        </form>
        {transactionList.length > 0 &&
          <table>
            <tbody>
              <tr>
                <th>Data</th>
                <th>Tipo</th>
                <th>Essencial</th>
                <th>Categoria</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Deletar</th>
              </tr>
              {transactionList.map(
                t =>
                  <tr className={transactionList.indexOf(t) % 2 === 0 ? styles.second : styles.first}
                    key={t.id}>
                    <td>{DateFormat.formatDate(t.date)}</td>
                    <td>{t.type === 'C' ? '+' : '-'}</td>
                    <td>{t.essential === true ? '✓' : ''}</td>
                    <td>{t.category}</td>
                    <td>{t.description}</td>
                    <td>{`R$ ${t.value}`}</td>
                    <td>
                      <input type="checkbox" onClick={() => handleDeteleSelection(t)} id='checkdel' />
                    </td>
                  </tr>
              )}
            </tbody>
          </table>
        }
        {transactionList.length > 0 && problem &&
          <div className={styles.error}>
            <p>{problem}</p>
          </div>
        }
        {transactionList.length > 0 &&
          <input type="button" value="Deletar" onClick={handleDelete} />
        }
        {transactionList.length === 0 && !problem && !success &&
          <div>
            <img src={searchnull} alt='Search null' className={styles.searchnull} />
          </div>}
        {transactionList.length === 0 && problem === 'Não há transações na data informada.' &&
          <div>
            <img src={searchempty} alt='Search empty' className={styles.searchnull} />
          </div>}
        {transactionList.length === 0 && !problem && success &&
          <div>
            <img src={searchempty} alt='Search empty' className={styles.searchnull} />
          </div>}
        {transactionList.length === 0 && problem === 'Data inicial maior que a final.' &&
          <div>
            <img src={searchwrong} alt='Search wrong' className={styles.searchnull} />
          </div>}
      </Modal>

    </div>
  )
}

export default Transactions
