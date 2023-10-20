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

  const [cards, setCards] = useState<CardData[]>([
    { 
      id: 0,     
      cardQuestion: 'kto',      // editMode WIP
      cardAnswer: 'ja'
    },
    { 
      id: 1,     
      cardQuestion: 'dlaczego',      // editMode WIP
      cardAnswer: 'bo tak'
    }
  ])
  const [isCardAdding, setIsCardAdding] = useState<boolean>(false)

  return (
    <AppLayout>
      <AppHeader cardsAmount={cards.length} addCard={() => setIsCardAdding(true)} />
      {isCardAdding ? <AppAddCard cancelAddCard={() => setIsCardAdding(false)} cards={cards} setCards={setCards} /> : null}
      <AppCards cards={cards} setCards={setCards}/>
    </AppLayout>
  );
}

export default App;
