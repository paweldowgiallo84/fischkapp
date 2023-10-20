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
    runEditMode: () => void;
}

export const AppCardNormal: React.FC<AppCardNormalProps> = ({question, cards, runEditMode }) => {
    return (
        <>
            <div className={styles.card}>
                <img src={editIcon} className={styles.editIcon} alt="edit icon" onClick={() => runEditMode()} />
                <p className={styles.cardContent}>{question}</p>
            </div>
        </>

    )
}