import React, { useState } from "react"
import { CardData } from "../../../App"
import styles from './AppCardEdit.module.css'
import deleteIcon from '../../../images/deleteIcon.svg'

interface AppCardEdtiProps {
    index: number;
    id: number
    cards: CardData[];
    stopEditMode: () => void;    
    setCards: (cards: CardData[]) => void
}

export const AppCardEdit: React.FC<AppCardEdtiProps> = ({ cards, id, index, stopEditMode, setCards }) => {
    const [frontSide, setFrontSide] = useState<boolean>(true)
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string>('')

    const flipCardSide = (cardState: boolean) => {
        setFrontSide(cardState)
    }

    const EditCardData = (id: number) => {
        if (question === '' || answer === '') { setErrorMsg('Błędnie wypełniona fiszka... popraw dane.') }
        else {
            setErrorMsg('')
            const editCard = { cardQuestion: question, cardAnswer: answer }
            const newCards = cards.map((card) => {
                if (card.id === id) return {
                    ...card, cardQuestion: question, cardAnswer: answer
                }; else return card
            })
            setCards(newCards)
            setQuestion('')
            setAnswer('')
            setErrorMsg('')
            stopEditMode()
        }

    }


    return (
        <>
            {frontSide ?
                <div className={`${styles.card} ${frontSide ? '' : styles.notFlip}`}>
                    <input type="text" className={styles.cardInput} id='inputQuestion' placeholder={question || cards[index].cardQuestion}
                        onChange={e => setQuestion(e.target.value)} value={question} />
                    <div className={styles.cardBtns}>
                        <button className={styles.cancelBackBtn} onClick={() => stopEditMode()} >Cancel</button>
                        <button className={styles.nextSaveBtn} onClick={() => flipCardSide(false)} >Next</button>
                    </div>
                </div>

                :

                <div className={`${styles.card} ${frontSide ? styles.flip : ''}`}>
                    <img src={deleteIcon} className={styles.deleteIcon} alt="deleteIcon" />
                    <p className={styles.questionValue}>{question}</p>
                    <input type="text" className={styles.cardInput} id='inputAnswer' placeholder={answer || cards[index].cardAnswer}
                        onChange={e => setAnswer(e.target.value)} value={answer} />
                    <p className={styles.errorMsg}>{errorMsg}</p>
                    <div className={styles.cardBtns}>
                        <button className={styles.cancelBackBtn} onClick={() => flipCardSide(true)}>Back</button>
                        <button className={styles.nextSaveBtn} onClick={() => EditCardData(id)}>Save</button>
                    </div>
                </div>
            }
        </>
    )
}