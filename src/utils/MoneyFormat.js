class MoneyFormat {
    bigDecimalToReal(value) {
        return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
}

export default new MoneyFormat();