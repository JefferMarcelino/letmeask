import { useNavigate } from "react-router-dom"
import { FormEvent, useState } from "react"

import { ref, get, database } from "../services/firebase"
import { useAuth } from "../hooks/useAuth"
import Button from "../components/Button"

import IllustationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import googleIconImg from "../assets/images/google-icon.svg"

import "../styles/auth.scss"

function Home() {
    const navigate = useNavigate()
    const { user, signInWithGoogle } = useAuth()
    const [ roomCode, setRoomCode ] = useState("")
 
    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        } 
        
        navigate('/rooms/new')
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault()

        if (roomCode.trim() === ""){
            return;
        }

        const db = database
        const roomRef = get(ref(db, `rooms/${roomCode}`))

        if(!(await roomRef).exists()) {
            alert("Room does not exists.")
            return
        }

        navigate(`/rooms/${roomCode}`)
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={ IllustationImg } alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiencia em tempo-real</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={ logoImg } alt="Letmeask logo" />
                    <Button onClick={ handleCreateRoom } className="create-room">
                        <img src={ googleIconImg } alt="Logo do Google" />
                        Crie sua sala com a Google
                    </Button>
                    <div className="separator">ou entre em um sala</div>
                    <form onSubmit={ handleJoinRoom }>
                        <input 
                        type="text"
                        placeholder="Digite o código da sala"
                        onChange={ event => setRoomCode(event.target.value) }
                        value={ roomCode }
                         />
                         <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Home