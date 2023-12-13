import axios from 'axios';

class TransactionService {
    getExtract(month, year, user, type, essential) {
        let request = 'http://localhost:8080/transaction/extract?' +
        'month=' + month +
        '&year=' + year +
        '&user=' + user;

        if (type !== '') {
            request = request.concat('&type=' + type);
        }
        if (essential !== '') {
            request = request.concat('&essential=' + essential);
        } 
        
        return axios.get(request);
    }
}

export default new TransactionService();