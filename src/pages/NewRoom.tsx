import { FormEvent, useState } from "react"
import { Link } from "react-router-dom"

import Button from "../components/Button"

import "../styles/auth.scss"

import IllustationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import { useAuth } from "../hooks/useAuth"
import { database, ref, push, set } from "../services/firebase"

function NewRoom() {
    const { user } = useAuth()

    const [ newRoom, setNewRoom ] = useState("")

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault()

        if (newRoom.trim() === "") {
            return;
        }

        const db = database
        const roomRef = ref(db, 'rooms');
        const firebaseRoom = await push(roomRef);
        
        set(firebaseRoom, {
            title: newRoom,
            authorId: user?.id
        });
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
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={ handleCreateRoom }>
                        <input 
                        type="text"
                        placeholder="Nome da sala"
                        onChange={ event => setNewRoom(event.target.value) }
                        value={ newRoom }
                         />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}

export default NewRoom