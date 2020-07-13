module.exports = {
    date(timestamp) {
        // html espera yyyy-mm-dd
        const date = new Date(timestamp)


        // sem UTC pois no db o without time zone já está correto
        const year = date.getFullYear()
        const month = `0${date.getMonth() + 1}`.slice(-2)
        const day = `0${date.getDate()}`.slice(-2)
        const hour = date.getHours()
        const minutes = date.getMinutes()

        return {
            day,
            month,
            year,
            hour,
            minutes,
            iso:`${year}-${month}-${day}`, // valor para colocar no input date
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`

        }
        
    },
    formatPrice(price) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price/100)
    }

}