const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .header-links a")

for(item of menuItems) { 

    if(currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}

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

const PhotosUpload = {
    input: "",
    preview: document.querySelector(".photos-preview"),
    uploadLimit: 5,
    files: [],
    handleFileInput(event) {
        const {files: fileList} = event.target
        PhotosUpload.input = event.target

        
        if(PhotosUpload.hasLimit(event)) return
        

        // transformando o fileList em array
        Array.from(fileList).forEach(file => {

            PhotosUpload.files.push(file)


            // ideia para ler os arquivos
            const reader = new FileReader()
            
            
            reader.onload = () => {
                // criando uma parte do HTML que só acontecerá quando o usuário entrar com uma foto
                const image = new Image() // <img>
                image.src = String(reader.result) // result é o resultado do readAsDataURL
            
                const div = PhotosUpload.getContainer(image)
            
                PhotosUpload.preview.appendChild(div)
            }


            reader.readAsDataURL(file)
        })


        // tirando arquivos do fileList padrão e colocando no meu
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

    },

    hasLimit(event) {
        const {uploadLimit, input, preview} = PhotosUpload
        const {files: fileList} = input

        // momento do upload
        if(fileList.length > uploadLimit) {
            event.preventDefault()
            alert(`Envie no máximo ${uploadLimit} fotos`)
            return true
        }

        // mundando fotos
        const photosDiv = []
        preview.childNodes.forEach(item => {
            if (item.classList && item.classList.value == "photo") { // apenas photo
                photosDiv.push(item)
            }
        })

        const totalPhotos = fileList.length + photosDiv.length
        if (totalPhotos > uploadLimit) {
            alert("Você atingiu o limite de fotos")
            event.preventDefault()
            return true
        }

        return false
    },

    getAllFiles() { // remover files do fileList qnd clicar na foto
        // não é possível remover coisas do fileList

        // o dataTransfer nos permite criar um "fileList" manipulável
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },

    getContainer(image) { // faz os elementos do photo-preview
        const div = document.createElement("div")
        div.classList.add('photo')

        div.onclick = PhotosUpload.removePhoto
        
        div.appendChild(image) // colocando a imagem dentro da div

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },

    getRemoveButton() { // faz o botão de excluir foto
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"

        return button
    },

    removePhoto(event) { // remove a foto do gerenciador (front-end) (não remove fotos já vindas do back na edição)
        const photoDiv = event.target.parentNode // div com a class photo <div class="photo"
        const photosArray = Array.from(PhotosUpload.preview.children) // faz um array com todas as fotos do photos-preview
        const index = photosArray.indexOf(photoDiv) // pega o index da foto que estou clicando

        PhotosUpload.files.splice(index, 1) // tirando a foto do novo fileList

        // depois de tirar é necessário atualizar
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        photoDiv.remove()
    },

    removeOldPhoto(event){
        const photoDiv = event.target.parentNode // <div class="photo"></div>
        
        if(photoDiv.id) {
            const removedFiles = document.querySelector('input[name="removed_files"]')
        
            if(removedFiles) {
                removedFiles.value += `${photoDiv.id},` // string "1,2,3,"
            }
        }

        photoDiv.remove() // tira foto do front-end
    }

    

}


