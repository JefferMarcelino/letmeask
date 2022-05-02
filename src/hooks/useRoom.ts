import { useEffect, useState } from "react"
import { ref, database, push, onValue } from "../services/firebase"

type Question = {
    id: string,
    author: {
        name: string,
        avatar: string
    },
    content: string,
    isHighLighted: boolean,
    isAnswered: boolean

}

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string
    },
    content: string,
    isHighLighted: boolean,
    isAnswered: boolean
}>

export function useRoom(roomId?: string) {
    const [ questions, setQuestions ] = useState<Question[]>([])
    const [ title, setTitle ] = useState("")

    useEffect(() => {
        const roomRef = ref(database, `rooms/${roomId}`)

        onValue(roomRef, (snapshot) => {
            const databaseRoom = snapshot.val()
            const firebaseQuestions = databaseRoom.questions as FirebaseQuestions

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered
                }
            })

            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
          });
    }, [roomId])

    return { questions, title }
}