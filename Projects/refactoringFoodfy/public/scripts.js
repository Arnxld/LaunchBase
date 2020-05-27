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
