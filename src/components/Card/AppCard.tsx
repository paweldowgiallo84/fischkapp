import React, { useState } from "react"
import { CardData } from "../../App"
import { AppCardNormal } from "./CardNormal/AppCardNormal"
import { AppCardEdit } from "./CardEdit/AppCardEdit"

interface AppCardProps {
    _id: string;
    front: string;
    back: string;
    index: number;    
    cards: CardData[];
    setCards: (cards: CardData[]) => void;
}

export const AppCard: React.FC<AppCardProps> = ({_id, front, back, index, cards, setCards }) => {  
    const [editMode, setEditMode] = useState<boolean>(false)

    return (
        <>
            {!editMode && 
            <AppCardNormal                          
            _id={_id}
            front={front}
            back={back}
            index={index}
            cards={cards}
            runEditMode={() => setEditMode(true)} /> 
            }
            {editMode && 
            <AppCardEdit
            _id={_id}
            index={index}
            setCards={setCards} 
            cards={cards}
            stopEditMode={() => setEditMode(false)}
            />
            }
        </>
    )
}