
import {user} from './services/user.js'
import {repositories} from './services/repositories.js'


const btn = document.querySelector('.btn-search')
const inputName = document.querySelector('.input-search')

function getUserProfile(userName) {
    user(userName).then(userData => {
        const htmlProfileData = document.querySelector('.profile-data')
        if(userData.message === 'Not Found'){
           return htmlProfileData.innerHTML = `<h3>Ops... 😞 usuário não encontrado, tente novamente</h3>`
        } 

        const userInfo = `
            <div class = "info">
                <img src = "${userData.avatar_url}" alt = "Foto do usuário"/>
                <div class = "data">
                    <h1>${userData.name ?? 'Não possui nome cadastrado 😢'}</h1>
                    <p>${userData.bio ?? 'Não possui uma bio cadastrada 😢'} </p>
                </div>
            </div>
            
        `

        htmlProfileData.innerHTML = userInfo
    })

    getUserRepositories(userName)
}

function getUserRepositories(userName) {
    const htmlProfileData = document.querySelector('.profile-data')
    repositories(userName).then(reposData => {
        let repositoriesItens = ''
        console.log(reposData)
        reposData.forEach(repo => {
            repositoriesItens += `
                <li><a href = "${repo.html_url}" target="_blank"> ${repo.name} </a></li>
            `
        })

        htmlProfileData.innerHTML += `
            <div class = "repositories section">
                <h2>Repositórios</h2>
                <ul>${repositoriesItens}</ul>
            </div>
            
        `
    })

}

function validateEmptyInput(inputName){
    if(inputName.length === 0){
        alert("Preencha o campo com o nome do usuário")
        return true
    }   
}

inputName.addEventListener('keyup', (e) => {
    const userName = inputName.value

    if (e.keyCode === 13) {
        if(validateEmptyInput(userName)){
            return
        } 
        getUserProfile(userName)      
    }

})


btn.addEventListener('click', () => {
    const userName = inputName.value

    if(validateEmptyInput(userName)){
        return
    }

    getUserProfile(userName)
})

