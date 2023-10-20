import React, { useState } from "react"
import { CardData } from "../../App"
import { AppCardNormal } from "./CardNormal/AppCardNormal"

interface AppCardProps {
    id: number;
    question: string;
    answer: string;
    index: number;
    key: number;
    cards: CardData[];
    setCards: (cards: CardData[]) => void;
}

export const AppCard: React.FC<AppCardProps> = ({id, question, answer, index, key, cards }) => {    

    return (
        <>
            
                <AppCardNormal 
                id={id}
                question={question}
                answer={answer}
                index={index}
                cards={cards}/>                     
        </>
    )
}