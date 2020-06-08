const cards = document.querySelectorAll(".card")
const blocks = document.querySelectorAll(".block")


for (let card of cards) {
    card.addEventListener("click", function() {
        const cardId = card.getAttribute("id")
        window.location.href = `/recipes/${cardId}`
    })
}

for (let block of blocks) {
    const button = block.querySelector(".hide")
    const text = block.querySelector(".text")

    button.addEventListener("click", function() {
        if(text.style.display == "none") {
            text.style.display = "block"
            button.innerText = "Esconder"
        } else {
            text.style.display = "none"
            button.innerText = "Mostrar"
        }
    })
}

function addIngredient() {
    const ingredients = document.querySelector("#ingredients")
    const fieldContainer = document.querySelectorAll('.ingredient')

    // Clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false
    
    // Deixa o valor do input vazio
    newField.children[0].value = "";
    ingredients.appendChild(newField)
}


function addStep() {
    const preparation = document.querySelector("#preparation")
    const fieldContainer = document.querySelectorAll('.preparation')

    // Clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false
    
    // Deixa o valor do input vazio
    newField.children[0].value = "";
    preparation.appendChild(newField)
}

document.querySelector(".add-ingredient").addEventListener("click", addIngredient)
document.querySelector(".add-step").addEventListener("click", addStep)

// a

