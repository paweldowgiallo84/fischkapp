import { AppHeader } from "./components/Header/AppHeader";
import { AppLayout } from "./components/AppLayout";
import { AppAddCard } from "./components/AddCard/AppAddCard";
import { AppCards } from "./components/Card/AppCards";
import './App.css'

import { useState } from "react";

export interface CardData {  
  id: number
  cardQuestion: string;
  cardAnswer: string
}

function App() {
// pre-constructed board according to the requirements of the task
  const [cards, setCards] = useState<CardData[]>([  
    {id: 1, cardQuestion: 'Kto?', cardAnswer: 'Ja!'},
    {id: 2, cardQuestion: 'Dlaczego?', cardAnswer: 'Dlatego!'},
  ])
  const [isCardAdding, setIsCardAdding] = useState<boolean>(false)

  const addNewCard = (newCard: CardData) => {
    setCards(prevCards => [newCard, ...prevCards])
  }

  return (
    <AppLayout>
      <AppHeader cardsAmount={cards.length} addCard={() => setIsCardAdding(true)} />
      {isCardAdding ? <AppAddCard cancelAddCard={() => setIsCardAdding(false)} cards={cards} onAddCard={addNewCard} setCards={setCards} /> : null}
      <AppCards cards={cards} setCards={setCards}/>
    </AppLayout>
  );
}

export default App;
