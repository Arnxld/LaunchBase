const modalOverlay = document.querySelector(".modal-overlay")
const cards = document.querySelectorAll(".card")
const closeModal = document.querySelector(".close-modal")

for (let card of cards) {
    card.addEventListener("click", function() {
        const imgID = card.getAttribute("id")
        const modalContent = modalOverlay.querySelector(".modal-content")
        modalOverlay.classList.add("active")
        modalOverlay.querySelector('img').src = `/assets/${imgID}.png`
        modalContent.innerHTML = card.querySelector(".card-info").innerHTML
        console.log(modalContent)
    })
}

document.querySelector(".close-modal").addEventListener("click", function() {
    modalOverlay.classList.remove("active")
})