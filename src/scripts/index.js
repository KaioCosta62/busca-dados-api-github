

const btn = document.querySelector('.btn-search')

btn.addEventListener('click', () => {
    const inputName = document.querySelector('.input-search')
    const userName = inputName.value
    
    async function user(userName){
        const response = await fetch(`https://api.github.com/users/${userName}`)
        return await response.json()
    }
    
    
    function getUserProfile(userName){
        user(userName).then(userData => {
            const htmlProfileData = document.querySelector('.profile-data')
            const userInfo = `
                <img src = "${userData.avatar_url}" alt = "Foto do usuário"/>
                <div class = "data">
                    <h1>${userData.name ?? 'Não possui nome cadastrado 😢'}</h1>
                    <p>${userData.bio ?? 'Não possui uma bio cadastrada 😢'} </p>
                </div>
            `
    
            htmlProfileData.innerHTML = userInfo
        })
    }

    getUserProfile(userName)
})

