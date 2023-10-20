import React, { useState } from "react"
import { CardData } from "../../App"
import { AppCardNormal } from "./CardNormal/AppCardNormal"
import { AppCardEdit } from "./CardEdit/AppCardEdit"

interface AppCardProps {
    id: number;
    question: string;
    answer: string;
    index: number;
    key: number;
    cards: CardData[];
    setCards: (cards: CardData[]) => void;
}

export const AppCard: React.FC<AppCardProps> = ({id, question, answer, index, key, cards, setCards }) => {  
    const [editMode, setEditMode] = useState<boolean>(false)

    // console.log(key)   

    return (
        <>
            {!editMode && 
            <AppCardNormal
            key={key}                
            id={id}
            question={question}
            answer={answer}
            index={index}
            cards={cards}
            runEditMode={() => setEditMode(true)} /> 
            }
            {editMode && 
            <AppCardEdit
            index={index}
            setCards={setCards} 
            cards={cards}
            stopEditMode={() => setEditMode(false)}
            />
            }
        </>
    )
}