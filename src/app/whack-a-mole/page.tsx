"use client";

import React, {useEffect, useState} from 'react';
import styles from "./page.module.css";


const GRID_LENGTH = 3;

const generateTemplateColumnsStyle = (columnsQty: number) => {
  const gridTemplateFragments = [];
  for (let i = 0; i < columnsQty; i++) {
    gridTemplateFragments.push("1fr");
  }
  return gridTemplateFragments.join(" ");
};

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};


const MoleGame = () => {
  const [stats, setStats] = useState<{
    score: number,
    moles: number
  }>({score: 0, moles: 0});
  const [triggerMole, setTriggerMole] = useState(true);
  const [displayMole, setDisplayMole] = useState(false);
  const [displayedMoleIndex, setDisplayedMoleIndex] = useState(0);
  const [gameRun, setGameRun] = useState(true);

  const gridSize = [];
  for (let i = 0; i < GRID_LENGTH ** 2; i++) {
    gridSize.push(i);
  }

  const handleClick = () => {
    setGameRun((prevState) => {
      if (!prevState) setStats((prevState) => {
        return {...prevState, score: 0, moles: 0};
      });
      return !prevState;
    });
  };

  useEffect(() => {
    if (triggerMole && gameRun) {
      setDisplayMole(true);
      setTimeout(() => {
        setDisplayMole(false);
      }, 750);
    }
  }, [triggerMole, gameRun]);

  useEffect(() => {
    if (!displayMole && gameRun) {
      setTriggerMole(false);
      setDisplayedMoleIndex(getRandomInt(0, GRID_LENGTH ** 2));
      setStats((prevState) => {
        const newTotalMoles = prevState.moles + 1;
        return {...prevState, moles: newTotalMoles};
      });
      setTimeout(() => {
        setTriggerMole(true);
      }, 2000);
    }
  }, [displayMole, gameRun]);

  useEffect(() => {
    if (stats.moles >= 20){
      setGameRun(false)
    }
  }, [stats]);

  return (
    <div className={styles.main}>
      <p>Total moles seen: {`${stats.moles}`}</p>
      <p>You whacked: {`${stats.score} moles`}</p>
      <div className={styles.gameBoard}
           style={{gridTemplateColumns: `${generateTemplateColumnsStyle(GRID_LENGTH)}`}}>
        {gridSize.map((elementPos) => {
          return <div key={elementPos} className={styles.burrow}>
            {displayMole && displayedMoleIndex === elementPos &&
              <div className={styles.mole}
                   onClick={() => setStats((prevState) => {
                     const newScore = prevState.score + 1;
                     return {...prevState, score: newScore};
                   })}
              />}
          </div>;
        })}
        {!gameRun && <div className={styles.gameOver}><p>Game over</p></div>}
      </div>
      <button
        onClick={handleClick}>{gameRun ? "Stop Game" : "Start Game"}</button>
    </div>
  );
};

export default MoleGame;
