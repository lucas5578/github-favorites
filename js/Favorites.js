export class GithubUser {
    static search(username) {
        const endpoint = `https://api.github.com/users/${username}`

        return fetch(endpoint)
        .then(data => data.json())
        .then(({ login, name, public_repos, followers }) => ({
            login,
            name,
            public_repos,
            followers
        }))
    }
}


export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()

        GithubUser.search('nikolasmarlon').then(user => console.log(user))
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem
        ('@github-favorites:')) || []
      }

      delete(user) {
        const filteredEntries = this.entries.filter(entry => entry.login !== user.login)

        this.entries = filteredEntries
        this.update()
      } 

}

export class FavoritesView  extends Favorites {
    constructor(root) {
        super(root)

        this.tbody = this.root.querySelector('table tbody')

        this.update()
    }

    update() {
      this.removeALLTr()

    this.entries.forEach( user => {
           const row = this.createRow()

           row.querySelector('.user img').src = `https://github.com/${user.login}.png`
           row.querySelector('.user img').alt = `Imagem de ${user.name}`
           row.querySelector('.user p').textContent = user.name
           row.querySelector('.user span').textContent = user.login
           row.querySelector('.repositories').textContent = user.public_repos
           row.querySelector('.followers').textContent = user.followers

           row.querySelector('.remove').onclick = () => {
            const isOk = confirm('Tem certeza que deseja deletar essa linha?')
            if(isOk) {
                this.delete(user)
            }
           }


           this.tbody.append(row)
    }) 
       
    
  }

createRow() {
    const tr = document.createElement('Tr')

    tr.innerHTML = `
    <tr>
    <td class="user">
        <img src="https://github.com/lucasyuripaz.png" alt="Imagem de lucasyuripaz">
        <a href="https://github.com/lucasyuripaz" target="_blank">
        <p>Lucas yuri</p>
        <span>lucasyuripaz</span>
        </a>
    </td>
        <td class="repositories">
            1
    </td>
        <td class="followers">
            1
    </td>
        <td>
            <button class="remove">&times;</button>
        </td>
    </tr>
    `

    return tr
}

    removeALLTr() {   
        this.tbody.querySelectorAll('tr')
        .forEach((tr) => {
         tr.remove()
        })
    }
}
