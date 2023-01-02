

const btn = document.querySelector('.btn-search')
const inputName = document.querySelector('.input-search')

inputName.addEventListener('keyup', (e) => {
    const userName = inputName.value

    if (e.keyCode === 13) {
        async function user(userName) {
            const response = await fetch(`https://api.github.com/users/${userName}`)
            return await response.json()
        }

        async function repos(userName) {
            const response = await fetch(`https://api.github.com/users/${userName}/repos`)
            return await response.json()
        }

        function getUserProfile(userName) {
            user(userName).then(userData => {
                const htmlProfileData = document.querySelector('.profile-data')
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
        }

        function getUserRepositories(userName) {
            const htmlProfileData = document.querySelector('.profile-data')
            repos(userName).then(reposData => {
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

        getUserProfile(userName)
        getUserRepositories(userName)
    }
})

btn.addEventListener('click', () => {
    const userName = inputName.value

    async function user(userName) {
        const response = await fetch(`https://api.github.com/users/${userName}`)
        return await response.json()
    }

    async function repos(userName) {
        const response = await fetch(`https://api.github.com/users/${userName}/repos`)
        return await response.json()
    }


    function getUserProfile(userName) {
        user(userName).then(userData => {
            const htmlProfileData = document.querySelector('.profile-data')
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
    }

    function getUserRepositories(userName) {
        const htmlProfileData = document.querySelector('.profile-data')
        repos(userName).then(reposData => {
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

    getUserProfile(userName)
    getUserRepositories(userName)
})

