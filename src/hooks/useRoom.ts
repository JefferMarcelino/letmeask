import { async } from "@firebase/util"
import { getDatabase, onValue, ref, off } from "firebase/database"
import { useEffect, useState } from "react"
import { useAuth } from "./useAuth"

type Question = {
    id: string,
    author: {
        name: string,
        avatar: string
    },
    content: string,
    isHighLighted: boolean,
    isAnswered: boolean,
    likeCount: number,
    likeId: string | undefined
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string
    },
    content: string,
    isHighLighted: boolean,
    isAnswered: boolean,
    likes: Record<string, {
        authorId: string;
    }>;
}>

export function useRoom(roomId?: string) {
    const { user } = useAuth()

    const [ questions, setQuestions ] = useState<Question[]>([])
    const [ title, setTitle ] = useState("")

    const database = getDatabase()

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
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
                }
            })
            
            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        });

          return () => {
            off(roomRef)
          }
    }, [roomId, user?.id])

    return { questions, title }
}