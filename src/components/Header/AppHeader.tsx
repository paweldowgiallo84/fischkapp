import logo from "../../images/logo.svg";
import addBtn from "../../images/addBtn.svg";
import styles from './AppHeader.module.css'
import React from "react";

interface AppHeaderProps {
  cardsAmount: number;
  addCard: () => void
}

export const AppHeader: React.FC<AppHeaderProps> = ({ cardsAmount, addCard }) => {

  return (
    <header className={styles.header}>
      <div className={styles.logoAndCounter}>
        <img className={styles.logo} src={logo} alt="Fischkapp logo" />
        <span className={styles.cardCounter}>Card: {`${cardsAmount}`}</span>
      </div>
      <div onClick={() => addCard()} className={styles.addBtn}>
        <img src={addBtn} alt="Fischkapp add button" />
      </div>
    </header>
  )
};
