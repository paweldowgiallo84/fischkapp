import React, { useEffect, useState } from "react"
import { CardData } from "../../../App"
import styles from './AppCardEdit.module.css'
import deleteIcon from '../../../images/deleteIcon.svg'

interface AppCardEdtiProps {
    index: number;
    _id: string
    cards: CardData[];
    stopEditMode: () => void;
    setCards: (cards: CardData[]) => void
}

export const AppCardEdit: React.FC<AppCardEdtiProps> = ({ cards, _id, index, stopEditMode, setCards }) => {
    const [frontSide, setFrontSide] = useState<boolean>(true)
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string>('')
    const [isDeleting, setIsDeleting] = useState<boolean>(false)

    const flipCardSide = (cardState: boolean) => {
        setFrontSide(cardState)
    }

    const editCardData = (_id: string) => {
        if (question === '' || answer === '') { setErrorMsg('Błędnie wypełniona fiszka... popraw dane.') }
        else {
            setErrorMsg('')            
            const newCards = cards.map((card) => {
                if (card._id === _id) return {
                    ...card, front: question, back: answer
                }; else return card
            })
            setCards(newCards)
            setQuestion('')
            setAnswer('')
            setErrorMsg('')
            stopEditMode()
        }
    } 
    const deleteCardData = (_id: string) => {
            setIsDeleting(true)
            setTimeout(() => {
                const newCards = cards.filter(card => card._id !== _id)
                setCards(newCards)
                setIsDeleting(false)
                stopEditMode()
            }, 600)
        

    }

    return (
        <>
            {frontSide ?
                <div className={`${styles.card} ${frontSide ? '' : styles.notFlip}`}>
                    <input type="text" className={styles.cardInput} id='inputQuestion' placeholder={question || cards[index].front}
                        onChange={e => setQuestion(e.target.value)} value={question} />
                    <div className={styles.cardBtns}>
                        <button className={styles.cancelBackBtn} onClick={() => stopEditMode()} >Cancel</button>
                        <button className={styles.nextSaveBtn} onClick={() => flipCardSide(false)} >Next</button>
                    </div>
                </div>

                :

                <div className={`${styles.card} ${frontSide ? styles.flip : ''} ${!isDeleting ? '' : styles.cardDelete}`}>
                    <img src={deleteIcon} className={styles.deleteIcon} alt="deleteIcon" onClick={() => deleteCardData(_id)} />
                    <p className={styles.questionValue}>{question}</p>
                    <input type="text" className={styles.cardInput} id='inputAnswer' placeholder={answer || cards[index].back}
                        onChange={e => setAnswer(e.target.value)} value={answer} />
                    <p className={styles.errorMsg}>{errorMsg}</p>
                    <div className={styles.cardBtns}>
                        <button className={styles.cancelBackBtn} onClick={() => flipCardSide(true)}>Back</button>
                        <button className={styles.nextSaveBtn} onClick={() => editCardData(_id)}>Save</button>
                    </div>
                </div>
            }
        </>
    )
}