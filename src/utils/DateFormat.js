class DateFormat {
    formatDate(date) {
        const splitedDate = date.split('-');
        return(`${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`);
    }

    formatMonth(month) {
        const splitedMonth = month.split('-');
        return(`${splitedMonth[1]}`);
    }

    formatYear(year) {
        const splitedYear = year.split('-');
        return(`${splitedYear[0]}`);
    }
}

export default new DateFormat();