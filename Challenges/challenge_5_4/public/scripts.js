const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems) {
    if(currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}

                             // paginação

// lógica para criar o array de paginas
function paginate(selectedPage, totalPages) {
    let pages = [],
    oldPage

    for(let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const firstAndLastPage = currentPage == 1 || currentPage == 2 || currentPage == totalPages || currentPage == totalPages - 1
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 1
        const pagesAfterSelectedPage = currentPage <= selectedPage + 1
        
        
        if(firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
            if(oldPage && currentPage - oldPage > 2) {
                pages.push("...")
            }

            if(oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }

            pages.push(currentPage)
            oldPage = currentPage
        }
    
    }

    console.log(pages)
    return pages
}

// função que renderiza o array de pagina
function createPagination(pagination) {
    const page = +pagination.dataset.page // pega a página selecionada, o + transforma em numero
    const total = +pagination.dataset.total
    const filter = pagination.dataset.filter
    const pages = paginate(page, total) // cria o array de páginas

    let elements = "" // isso será o conteúdo da div pagination

    for(let page of pages) {
        if(String(page).includes("...")) { // o includes só funciona em strings
            elements += `<span>${page}</span>` // com o span, as reticências não são clicáveis
        } else {
            if(filter) { // se tiver um filtro, quando clicar, a query do filtro continuará
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            } else {
                elements += `<a href="?page=${page}">${page}</a>`
            }
        }
    }

    pagination.innerHTML = elements // coloca o elements dentro da div.pagination
}


const pagination = document.querySelector(".pagination")

if(pagination) {
    createPagination(pagination)
}