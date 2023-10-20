import React, {useState } from 'react'
import deleteIcon from '../../images/deleteIcon.svg'
import styles from './AppAddCard.module.css'
import { CardData } from '../../App'

interface AppAddCardProps {
  cancelAddCard: () => void;
  cards: CardData[];
  setCards: (cards: CardData[]) => void
}

export const AppAddCard: React.FC<AppAddCardProps> = ({ cards, cancelAddCard, setCards }) => {
  const [frontSide, setFrontSide] = useState<boolean>(true)
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string>('')

  const flipCardSide = (cardState: boolean) => {
    setFrontSide(cardState)
  }

  const addCardData = () => {
    if (question === '' || answer === '') { setErrorMsg('Błędnie wypełniona fiszka... popraw dane.') }
    else {
      const newCard = { cardId: cards.length + 1, cardQuestion: question, cardAnswer: answer }
      const newCards = [...cards, newCard]
      setCards(newCards)
      setQuestion('')
      setAnswer('')
      setErrorMsg('')
      cancelAddCard()
    }
  }

  return (
    <>
      {frontSide ?     
        <div className={`${styles.card} ${frontSide ? '' : styles.notFlip}`}>
          <input type="text" className={styles.cardInput} id='inputQuestion' placeholder={question} onChange={e => setQuestion(e.target.value)} value={question} />
          <div className={styles.cardBtns}>
            <button className={styles.cancelBackBtn} onClick={() => cancelAddCard()} >Cancel</button>
            <button className={styles.nextSaveBtn} onClick={() => flipCardSide(false)} >Next</button>
          </div>
        </div>        

        :

        <div className={`${styles.card} ${frontSide ? styles.flip : ''}`}>
          <img src={deleteIcon} className={styles.deleteIcon} alt="deleteIcon" />
          <p className={styles.questionValue}>{question}</p>
          <input type="text" className={styles.cardInput} id='inputAnswer' placeholder={answer} onChange={e => setAnswer(e.target.value)}
            value={answer} />
          <p className={styles.errorMsg}>{errorMsg}</p>
          <div className={styles.cardBtns}>
            <button className={styles.cancelBackBtn} onClick={() => flipCardSide(true)}>Back</button>
            <button className={styles.nextSaveBtn} onClick={() => addCardData()}>Save</button>
          </div>
        </div>
      }
    </>

  )
}