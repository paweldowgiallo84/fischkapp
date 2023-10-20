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

  const [cards, setCards] = useState<CardData[]>([])
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
