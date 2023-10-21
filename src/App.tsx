import { useEffect, useState } from "react";
import { AppHeader } from "./components/Header/AppHeader";
import { AppLayout } from "./components/AppLayout";
import { AppAddCard } from "./components/AddCard/AppAddCard";
import { AppCards } from "./components/Card/AppCards";
import './App.css'

export const FISCHKAPP_URL = 'https://training.nerdbord.io/api/v1/fischkapp/flashcards'
export const URL_AUTH_TOKEN = 'secret_token'

export interface CardData {
  _id: string;  
  front: string;
  back: string
}

function App() {
  const [cards, setCards] = useState<CardData[]>([])
  const [isCardAdding, setIsCardAdding] = useState<boolean>(false)

  useEffect(() => {
    fetch(FISCHKAPP_URL)
      .then(respons => {
        if (!respons.ok) {
          throw new Error('Server not responding')
        }
        return respons.json()
      })
      .then(data => {    
        setCards(data)
      })
      .catch(error => {
        console.error('Error: ', error)
      })
  }, [isCardAdding])

  return (
    <AppLayout>
      <AppHeader cardsAmount={cards.length} addCard={() => setIsCardAdding(true)} />
      {isCardAdding ? <AppAddCard cancelAddCard={() => setIsCardAdding(false)} /> : null}
      <AppCards cards={cards} setCards={setCards} />
    </AppLayout>
  );
}

export default App;
