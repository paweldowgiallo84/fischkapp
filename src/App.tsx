import { AppHeader } from "./components/Header/AppHeader";
import { AppLayout } from "./components/AppLayout";
import { AppAddCard } from "./components/AddCard/AppAddCard";
import { AppCard } from "./components/Card/AppCard";
import './App.css'

import { useState } from "react";

export interface CardData {
  cardId: number;
  cardQuestion: string;
  cardAnswer: string
}

function App() {

  const [cards, setCards] = useState<CardData[]>([])
  const [isCardAdding, setIsCardAdding] = useState(false)  

  return (
    <AppLayout>
      <AppHeader cardsAmount={cards.length} addCard={() => setIsCardAdding(true)} />
      {isCardAdding ? <AppAddCard cancelAddCard={() => setIsCardAdding(false)} cards={cards} setCards={setCards}/> : null}
      <AppCard cards={cards}/>
    </AppLayout>
  );
}

export default App;
