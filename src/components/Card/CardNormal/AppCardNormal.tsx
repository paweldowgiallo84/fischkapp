import React, { useState } from "react"
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

export const AppCardNormal: React.FC<AppCardNormalProps> = ({ question, answer }) => {
    const [isFliped, setIsFliped] = useState<boolean>(false)

    // const flipCard = () => {
    //     setIsFliped(current => !current)
    // }

    return (
        <>
            <div className={styles.card} onClick={() => setIsFliped(current => !current)}>
                <img src={editIcon} className={styles.editIcon} alt="edit icon" />
                <p className={styles.cardContent}>{isFliped ? question : answer}</p>
            </div>
        </>
    )
}