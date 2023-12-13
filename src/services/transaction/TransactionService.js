import axios from 'axios';

class TransactionService {
    executeRegister(transaction) {
        return axios.post("http://localhost:8080/transaction/register", JSON.stringify(transaction), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    getTransactions(id, dateFrom, dateTo) {
        return axios.get("http://localhost:8080/transaction/list?dateFrom=" + dateFrom + "&dateTo="
            + dateTo + "&userId=" + id)
    }

    deleteTransactions(idList) {
        return axios.delete("http://localhost:8080/transaction/delete?idList=" + idList)
    }

    updateTransaction(transaction, dateFrom, dateTo) {
        return axios.post("http://localhost:8080/transaction/update?dateFrom=" + dateFrom + 
        "&dateTo=" + dateTo , JSON.stringify(transaction), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}

export default new TransactionService();