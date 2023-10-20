import React from "react"
import { CardData } from "../../../App"
import styles from './AppCardNormal.module.css'
import editIcon from '../../../images/editIcon.svg'

interface AppCardNormalProps {
    id: number;
    question: string;
    answer: string;
    index: number;
    cards: CardData[];    
}

export const AppCardNormal: React.FC<AppCardNormalProps> = ({question, cards}) => {
    return (
        <>
            <div className={styles.card}>
                <img src={editIcon} className={styles.editIcon} alt="edit icon" />
                <p className={styles.cardContent}>{question}</p>
            </div>
        </>

    )
}