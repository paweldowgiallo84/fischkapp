import React, { useState } from 'react'
import { CardData } from '../../App'
import { AppCard } from './AppCard'
import styles from './AppCards.module.css'

interface AppCardsProps {
  cards: CardData[]
  setCards: (cards: CardData[]) => void
}

export const AppCards: React.FC<AppCardsProps> = ({ cards, setCards }) => {

  return (
    <>
      {cards.length === 0 &&
        <p className={styles.emptyCard}>Add your first flashcard</p>
      }
      {cards.map((card, index) => {
        return (
          <AppCard 
            key={card.id}
            index={index}
            id={card.id}
            question={card.cardQuestion}
            answer={card.cardAnswer}
            cards={cards}
            setCards={setCards}
          />
        )
      })}
    </>
  )
}
