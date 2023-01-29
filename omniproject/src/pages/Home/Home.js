import React from 'react'
import { useState } from 'react'
import { useAuthentication } from "../../hooks/useAuthentication"
import Modal from 'react-modal';
import "./Home.css"
import Axios from 'axios'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '',
    transform: 'translate(-50%, -50%)',
  },
};

const Home = () => {

    //Projeto
    const[name, setName] = useState("")
    const[password, setPassword] = useState("")
    const[error, setError] = useState("")
    const [margemhoras, setMargemhoras] = useState("")
    const [datainicio, setDatainicio] = useState("")
    const [saldodehoras, setSaldodehoras] = useState("")
    const [horasprevistas, setHorasprevistas] = useState("")

    const [task, setTask] = useState([])
    //Tarefa
    const [nametarefa, setNametarefa] = useState("")
    const [respon, setRespon] = useState("")
    const [horasprevtarefas, setHorasprevtarefa] = useState("")
    const [horasclientetarefa, setHorasclientetarefa] = useState("")
    const [margemhorastarefa, setMargemhorastarefa] = useState("")
    const [horastrabtarefa, setHorastrabtatefa] = useState("")
    const [porcentarefa, setPorcentarefa] = useState("")

    const{login, error: authError, loading} = useAuthentication()

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
      const id = Math.floor(Math.random() * 1000)

      setTask(
        [id,
        nametarefa,
        respon,
        horasprevtarefas,
      ]) 

      Axios.post("http://localhost:3001/register",
      {
        
      })
    

      console.log(task)
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()

        setError("")

        const projeto = {
            name,
            password,
            margemhoras
        }
        console.log(projeto)
    }

  return (
    <div className="projetos">
        <h1>Cadastro de Projeto</h1>
        <form onSubmit={handleSubmit}>
         
            <label>
                <span>Nome do Projeto:</span>
                <input value={name} onChange={(e) => setName(e.target.value)} type="name" name="name" required placeholder="Nome do Projeto"/>
            </label>

            <label>
                <span>Responsável:</span>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="name" name="name" required placeholder="Senha do usuário"/>
            </label>

            <label>
              <span>Data de Inicio:</span>
              <input value={datainicio} onChange={(e) => setDatainicio(e.target.value)} type="date" name="data" required placeholder='Data de Inicio'  />
            </label>

            <button onClick={openModal}>Adicionar Tarefas</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Adicionar Tarefa</h2>
        <button onClick={closeModal}>Adicionar Tarefa</button>
        <form>
          <label>Nome da Tarefa:</label>
          <input value={nametarefa} onChange={(e) => setNametarefa(e.target.value)} type="name" name="nametarefa" required placeholder="Nome da Tarefa"/>
          <label>Responsavel pela tarefa:</label>
          <input value={respon} onChange={(e) => setRespon(e.target.value)} type="name" name="respon" required placeholder='Responsavel pela tarefa' />
          <label>Horas Previstas:</label>
          <input value={horasprevtarefas} onChange={(e) => setHorasprevtarefa(e.target.value)} type="number" name="horasprevtarefa" required placeholder='Horas Previstas Da tarefa' />
          <label>Margem de Horas:</label>
          <input value={margemhorastarefa} onChange={(e) => setMargemhorastarefa(e.target.value)} type="number" name="margemhorastarea" required placeholder='Margem de Horas da tarefa'/>
        </form>
      </Modal>
      {task.map((tasks, i) =>{
        <span key={i} >{tasks}</span>
      } )}
      <label>
        <span>{nametarefa}</span>
        </label>
            <label>
              <span>Margem de Horas:</span>
              <input value={margemhoras} onChange={(e) => setMargemhoras(e.target.value)} type="hour" name='margemhoras' required placeholder='Margem de Horas'/>
            </label>

            <label>
              <span>Horas previstas:</span>
              <input value={horasprevistas} onChange={(e) => setHorasprevistas(e.target.value)} type="hour" name='horasprevistas' required placeholder='Horas Previstas'/>
            </label>

            <label>
              <span>Saldo de Horas:</span>
              <input value={saldodehoras} onChange={(e) => setSaldodehoras(e.target.value)} type="hour" name='saldodehoras' required placeholder='Saldo de Horas'/>
            </label>

            
            {!loading &&<button className="btn">Cadastrar Projeto</button>}
            {loading && <button className="btn" disable>Aguarde...</button>}
            {error && <p className="error">{error}</p>}
            
            
        </form>
    </div>
  )
}

export default Home