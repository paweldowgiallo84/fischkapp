import React, { useState } from "react"
import { CardData } from "../../../App"
import styles from './AppCardNormal.module.css'
import editIcon from '../../../images/editIcon.svg'

interface AppCardNormalProps {
    key: number;
    id: number;
    question: string;
    answer: string;
    index: number;
    cards: CardData[];
    runEditMode: () => void
}

export const AppCardNormal: React.FC<AppCardNormalProps> = ({ key, question, answer, runEditMode }) => {
    const [isFliped, setIsFliped] = useState<boolean>(false)
    
    return (
        <>
            <div key={key} className={styles.card} onClick={() => setIsFliped(current => !current)}>
                <img src={editIcon} className={styles.editIcon} alt="edit icon" onClick={() => runEditMode()}/>
                <p className={styles.cardContent}>{isFliped ? question : answer}</p>
            </div>
        </>
    )
}