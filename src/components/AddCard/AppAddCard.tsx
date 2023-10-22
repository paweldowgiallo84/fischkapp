import React, { useState } from 'react'
import deleteIcon from '../../images/deleteIcon.svg'
import styles from './AppAddCard.module.css'
import { FISCHKAPP_URL, URL_AUTH_TOKEN } from '../../App';

interface AppAddCardProps {
  cancelAddCard: () => void;  
}

export const AppAddCard: React.FC<AppAddCardProps> = ({ cancelAddCard }) => {
  const [frontSide, setFrontSide] = useState<boolean>(true)
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string>('')

  
  const addCardData = () => {
    if (question === '' || answer === '') { setErrorMsg('Incorrectly filled in fiche... Correct data.') }
    else {
      const data = { front: question, back: answer }

      fetch(FISCHKAPP_URL, {
        method: 'POST',        
        headers: {
          'Authorization': URL_AUTH_TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(respons => {
          if (!respons.ok) {
            throw new Error('Server not responding')
          }
          return respons.json()
        })
        .then(data => {
          console.log('Send data: ', data)
          setQuestion('')
          setAnswer('')
          setErrorMsg('')
          cancelAddCard()
        })
        .catch(Error => {
          console.error('Error: ', Error)
          setErrorMsg('Failed to add card. Please try again.')
        })
    }
  }

  const flipCardSide = (cardState: boolean) => {
    setFrontSide(cardState)
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
