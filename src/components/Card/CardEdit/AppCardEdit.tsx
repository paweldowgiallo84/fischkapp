import React, { useEffect, useState } from "react"
import { CardData, FISCHKAPP_URL, URL_AUTH_TOKEN } from "../../../App"
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
        if (question === '' || answer === '') { setErrorMsg('Incorrectly filled in fiche... Correct data.') }
        else {
            setErrorMsg('')
            const newCards = cards.map((card) => {
                if (card._id === _id) return {
                    ...card, front: question, back: answer
                }; else return card
            })
            setCards(newCards)
            const data = {
                id: _id,
                front: question,
                back: answer
            }

            fetch(`${FISCHKAPP_URL}/${_id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': URL_AUTH_TOKEN,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Server not responding')
                    }
                    return response.json()
                })
                .then(data => {
                    console.log('Update data send to server: ', data)
                    setQuestion('')
                    setAnswer('')
                    setErrorMsg('')
                    stopEditMode()
                })
                .catch(Error => {
                    console.error("Error: ", Error)
                    setErrorMsg('Failed to update card. Please try again.')
                })
        }
    }

    const deleteCardData = (_id: string) => {
        setIsDeleting(true)
        const newCards = cards.filter(card => card._id !== _id)
        setCards(newCards)

        fetch(`${FISCHKAPP_URL}/${_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': URL_AUTH_TOKEN,
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Server not responding')
                }
                return response.json()
            })
            .then(data => {
                console.log('Card deletet from server: ', data)
                setIsDeleting(false)
                stopEditMode()
            })
            .catch(Error => {
                console.error("Error: ", Error)
                setErrorMsg('Failed to delete card. Please try again.')
            })
    }

    return (
        <>
            {frontSide ?
                <div className={`${styles.card} ${frontSide ? '' : styles.notFlip}`}>
                    <textarea className={`${styles.cardInput} ${frontSide ? styles.frontSide : ''}`} id='inputQuestion' placeholder={question || cards[index].front}
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
                    <textarea className={styles.cardInput} id='inputAnswer' placeholder={answer || cards[index].back}
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