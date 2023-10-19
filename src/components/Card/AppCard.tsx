import React from 'react'
import editIcon from '../../images/editIcon.svg'
import styles from './AppCard.module.css'
import { CardData } from '../../App'

interface AppCardProps {
  cards: CardData[]
}

export const AppCard: React.FC<AppCardProps> = ({ cards }) => {

cards.length === 0 ? console.log('card length = 0 ',cards.length) : console.log('card is added', cards.length)

  return (
    <>
      {cards.length === 0 ?
        <p className='emptyCard'>Add your first flashcard</p>  :
       cards.map((fischk: CardData) => {
        return (
          <div className={styles.card} key={fischk.cardId}>
            <img src={editIcon} className={styles.editIcon} alt="edit icon" />
            <p className={styles.cardContent}>{fischk.cardQuestion}</p>
          </div>
        )
       })
      }
    </>
  )
}
