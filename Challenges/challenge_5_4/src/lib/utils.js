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

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
            
    },
    grade: function(schoolyear) {
        if (schoolyear == "5EF") {
            return schoolyear = "5º Ano do Ensino Fundamental"
        }
        else if (schoolyear == "6EF") {
            return schoolyear = "6º Ano do Ensino Fundamental"
        }
        else if (schoolyear == "7EF") {
            return schoolyear = "7º Ano do Ensino Fundamental"
        }
        else if (schoolyear == "8EF") {
            return schoolyear = "8º Ano do Ensino Fundamental"
        }
        else if (schoolyear == "9EF") {
            return schoolyear = "9º Ano do Ensino Fundamental"
        }
        else if (schoolyear == "1EM") {
            return schoolyear = "1º Ano do Ensino Médio"
        }
        else if (schoolyear == "2EM") {
            return schoolyear = "2º Ano do Ensino Médio"
        }
        else {
            return schoolyear = "3º Ano do Ensino Médio"
        }
    }
}