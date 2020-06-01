module.exports = {
    age: function(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if(month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
            age -= 1
        }

        return age
    },
    degree: function(degree) {
        if(degree == "high_school") {
            return degree = "Ensino médio completo"
        } else if (degree == "college") {
            return degree = "Ensino superior completo"
        } else if (degree == "master") {
            return degree = "Mestrado"
        } else if (degree == "doctor") {
            return degree = "Doutorado"
        }
    },
    date: function(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return `${year}-${month}-${day}`
    }
}