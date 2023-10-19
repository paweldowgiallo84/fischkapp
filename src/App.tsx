import { useState } from "react";
import { AppHeader } from "./components/Header/AppHeader";
import { AppLayout } from "./components/AppLayout";
import './App.css'

interface CardData {
  cardQuestion: string
  cardAnswer: string
}

const cardData: CardData[] = [{
  cardQuestion: 'W celu uniknięcia efektu Rosenthala można zastosować procedurę:',
  cardAnswer: 'podwójnie ślepej próby'
},
{
  cardQuestion: "Skala odpowiedzi typu dyferencjał semantyczny nazywana jest inaczej:",
  cardAnswer: "skala Osgooda"
},
{
  cardQuestion: "Skala odpowiedzi typu dyferencjał semantyczny nazywana jest inaczej:",
  cardAnswer: "skala Osgooda"
}
]

function App() {

  const [cards, setCards] = useState(cardData)
  const [isCardAdding, setIsCardAdding] = useState(false)

  const addingCard = () => {
    setIsCardAdding(true)
    console.log(cards)
    console.log(isCardAdding)
  }

  return (
    <AppLayout>
      <AppHeader cardsAmount={cards.length} addCard={() => addingCard()} />    
    </AppLayout>
  );
}

export default App;
