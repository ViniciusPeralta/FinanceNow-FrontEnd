import { useState } from 'react';

import NavBar from '../../components/navbar/NavBar.js';

import styles from './Extract.module.css';

import DateFormat from '../../utils/DateFormat';
import MoneyFormat from '../../utils/MoneyFormat.js';

import ExtractService from '../../services/extract/ExtractService';

import searchempty from '../../images/searchemptyextract.jpg'
import error from '../../images/error.jpg'
import filter from '../../images/filter.jpg'

import userStore from '../../store/user/UserStore.ts';

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

const Extract = () => {

    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [problem, setProblem] = useState('');
    const [transactionList, setTransactionList] = useState([]);
    const [balance, setBalance] = useState('');
    const [checked, setChecked] = useState('');

    const [type, setType] = useState('');
    const [essential, setEssential] = useState('');

    const { userId } = userStore();

    const handleCheck = () => {
        setChecked(!checked);
        setType('');
        setEssential('');
    }

    const handleSubmit = (e) => {

        setProblem('');
        setTransactionList([]);

        e.preventDefault();

        ExtractService.getExtract(month, year, userId, type, essential).then(function (response) {

            const list = [];

            response.data.transactions.forEach((t) => {

                const transaction = TransactionList(
                    t.id, t.type, MoneyFormat.bigDecimalToReal(t.value), 
                    t.essential, t.category, 
                    t.description, t.date
                );

                list.push(transaction);

            });

            setBalance(MoneyFormat.bigDecimalToReal(response.data.balance))
            setTransactionList(list);

        }).catch(function (error) {
            setProblem(error.response.data.message);
        })

    }

    return (
        <div className={styles.extract}>
            <NavBar />
            <div className={styles.txtcontainer}>
                <h1>Extrato Mensal</h1>
            </div>
            <form onSubmit={handleSubmit}>

                <div className={styles.filtercontainer}>
                    <img src={filter} alt='filter' className={styles.filter} />
                    <label className={checked === true ? styles.toggleon : styles.toggleoff}>
                        <div className={styles.checkmark}>
                            <input type="checkbox" className={styles.togglecheck} onClick={handleCheck} />
                        </div>
                    </label>
                </div>

                <div className={styles.monthcontainer}>
                    <input type="month" required onChange={
                        (e) => {
                            setMonth(DateFormat.formatMonth(e.target.value));
                            setYear(DateFormat.formatYear(e.target.value));
                        }} />
                    <input type="submit" value=' ' />
                </div>

                {checked === true &&
                    <div className={styles.selectcontainer}>
                        <div>
                            <p>Tipo</p>
                            <select onChange={(e) => setType(e.target.value)}
                                className={styles.selection}>
                                <option value={''}>------</option>
                                <option value='CREDIT'>Receita</option>
                                <option value='DEBIT'>Despesa</option>
                            </select>
                        </div>
                        <div>
                            <p>Essencial</p>
                            <select onChange={(e) => setEssential(e.target.value)}
                                className={styles.selection}>
                                <option value={''}>------</option>
                                <option value={true}>Sim</option>
                                <option value={false}>Não</option>
                            </select>
                        </div>
                    </div>
                }

                {transactionList.length > 0 &&
                    <table>
                        <tbody>
                            <tr>
                                <th>Data</th>
                                <th>Essencial</th>
                                <th>Categoria</th>
                                <th>Descrição</th>
                                <th>Tipo</th>
                                <th>Valor</th>
                            </tr>
                            {transactionList.map(
                                t =>
                                    <tr className={transactionList.indexOf(t) % 2 === 0 ? styles.second : styles.first}
                                        key={t.id}>
                                        <td>{DateFormat.formatDate(t.date)}</td>
                                        <td>{t.essential === true ? '✓' : ''}</td>
                                        <td>{t.category}</td>
                                        <td>{t.description}</td>
                                        <td>{t.type === 'CREDIT' ? '+' : '-'}</td>
                                        <td>{t.value}</td>
                                    </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr className={transactionList.length % 2 === 0 ? styles.second : styles.first}>
                                <td colSpan='5' className={styles.balance}>Saldo:</td>
                                <td>{balance}</td>
                            </tr>
                        </tfoot>
                    </table>
                }
                {problem === 'Não há transações na data informada.' &&
                    <div className={styles.errorcontainer}>
                        <img src={searchempty} alt='Search empty' className={styles.searchempty} />
                    </div>}
                {problem && problem !== 'Não há transações na data informada.' &&
                    <div className={styles.errorcontainer}>
                        <img src={error} alt='Error' className={styles.error} />
                    </div>}
            </form>

        </div>
    )
}

export default Extract
