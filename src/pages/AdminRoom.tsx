import { FormEvent, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { ref, database, push, onValue } from "../services/firebase"
import { useAuth } from "../hooks/useAuth"
import Button from "../components/Button"
import RoomCode from "../components/RoomCode"

import logoImg from "../assets/images/logo.svg"
import deleteImg from "../assets/images/delete.svg"
import "../styles/room.scss"
import { Question } from "../components/Question"
import { useRoom } from "../hooks/useRoom"
import { remove, update } from "firebase/database"

type RoomParams = {
    id: string;
}

function AdminRoom() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const params = useParams<RoomParams>()
    const roomId = params.id
    const [ newQuestion, setNewQuestion ] = useState("")
    const { questions, title } = useRoom(roomId)

    async function handleEndRoom() {
        update(await ref(database, `rooms/${roomId}`), {
            endedAt: new Date()
        })

        navigate('/')
    }

    async function handleDeleteQuestion(questionId: string) {
        if (confirm("Tem certeza que voce deseja exluir esta pergunta?")) {
            const questionRef = await ref(database, `rooms/${roomId}/questions/${questionId}`)
            remove(questionRef)
        }
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={ logoImg } alt="Letmeask" />
                    <div>
                        <RoomCode code={ roomId } />
                        <Button 
                        isOutlined
                        onClick={ handleEndRoom }
                        >Encerrar sala</Button>
                    </div>
                </div>
            </header>
 
            <main>
                <div className="room-title">
                    <h1>Sala { title }</h1>
                    { questions.length > 0 && <span>{ questions.length } pergunta(s)</span>}
                </div>

                <div className="question-list">
                    { questions.map(question => {
                        return(
                            <Question
                            key={ question.id }
                            content={ question.content }
                            author={ question.author }
                            >
                                <button
                                type="button"
                                onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={ deleteImg } alt="Remover pergunta" />
                                </button>
                            </Question>
                        )
                    }) }
                </div>
            </main>
        </div>
    )
}

export default AdminRoom