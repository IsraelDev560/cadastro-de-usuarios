import { useEffect, useState, useRef } from 'react'
import './App.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
   const usersFromApi = await api.get('/usuarios')

   setUsers(usersFromApi.data)
  }

  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
      getUsers()
   }

   async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)

    getUsers()
   }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="container">
      <form action="">
        <h1>Cadastro de Usúarios</h1>
        <label htmlFor="">Nome</label>
        <input type="text" name='nome' placeholder='Digite seu nome' ref={inputName}/>
        <label htmlFor="">Idade</label>
        <input type="text" name='idade' placeholder='Idade' ref={inputAge} />
        <label htmlFor="">E-mail</label>
        <input type="email" name="email" id="" placeholder='Digite seu email' ref={inputEmail} />
        <button type="submit" onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map(user => (
        <div key={user.id} className="results">
          <div className="result-name">
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>E-mail: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home