"use client";

import React, {useState} from 'react';
import styles from "./page.module.css";
import 'material-symbols';

import useIsLargeScreen from "@/hooks/useIsLargeScreen";
import CheckboxOption from "@/components/move-checked/CheckboxOption";

const mockOptions = [
  {id: 1, title: "One"},
  {id: 2, title: "Two"},
  {id: 3, title: "Three"},
  {id: 4, title: "Four"}
];

const MoveChecked = () => {

  const {isLargeScreen} = useIsLargeScreen();
  const [checkedOptions, setCheckedOptions] = useState<number[]>([]);
  const [boxOptions, setBoxOptions] = useState<{
    id: number,
    displaySide: "right" | "left",
    title: string
  }[]>(mockOptions.map((option) => {
    return {
      id: option.id,
      displaySide: "left",
      title: option.title,
    };
  }));

  const handleOptionChange = (id: number) => {
    if (checkedOptions.includes(id)) {
      setCheckedOptions(checkedOptions.filter((optionId) => optionId !== id));
    } else {
      setCheckedOptions([...checkedOptions, id]);
    }
  };

  const onOptionDelete = (id: number) => {
    const deleteOptionIndex = boxOptions.map(option => option.id).indexOf(id);
    if (deleteOptionIndex !== undefined && deleteOptionIndex >= 0) {
      const newOptions = boxOptions.toSpliced(deleteOptionIndex, 1);
      setBoxOptions(newOptions);
    }
  };
  const handleTransferClick = (direction: string) => {
    if (checkedOptions.length > 0) {
      if (direction === "left") {
        const newState = boxOptions.map(obj => {
          if (checkedOptions.includes(obj.id)) {
            return {...obj, displaySide: "left" as const};
          }
          return obj;
        });
        setBoxOptions(newState);
      } else {
        const newState = boxOptions.map(obj => {
          if (checkedOptions.includes(obj.id)) {
            return {...obj, displaySide: "right" as const};
          }
          return obj;
        });
        setBoxOptions(newState);
      }
      setCheckedOptions([]);
    }
  };

  return (
    <main className={styles.main}>
      <div className={`${styles.items} ${styles.checkboxes}`}>
        {boxOptions.length > 0
          ? boxOptions.some((option) => option.displaySide === "left")
            ? boxOptions.map((option) => (
              option.displaySide === "left" &&
              <CheckboxOption
                key={option.id}
                title={option.title}
                id={option.id}
                isChecked={checkedOptions.includes(option.id)}
                onChange={handleOptionChange}
                onDelete={onOptionDelete}
              />
            )) : "No items yet"
          : "No items yet"
        }
      </div>
      <div className={`${styles.items} ${styles.buttons}`}>
        <button onClick={() => handleTransferClick("right")}>{isLargeScreen
          ? <>Move right <span
            className="material-symbols-outlined">arrow_forward</span></>
          : <>Move down <span
            className="material-symbols-outlined">arrow_downward</span></>}
        </button>
        <button onClick={() => handleTransferClick("left")}>{isLargeScreen
          ? <>Move left <span
            className="material-symbols-outlined">arrow_back</span></>
          : <>Move up <span
            className="material-symbols-outlined">arrow_upward</span></>}
        </button>
      </div>
      <div className={`${styles.items} ${styles.checkboxes}`}>
        {boxOptions.length > 0
          ? boxOptions.some((option) => option.displaySide === "right")
            ? boxOptions.map((option) => (
              option.displaySide === "right" &&
              <CheckboxOption
                key={option.id}
                title={option.title}
                id={option.id}
                isChecked={checkedOptions.includes(option.id)}
                onChange={handleOptionChange}
                onDelete={onOptionDelete}
              />
            )) : "No items yet"
          : "No items yet"
        }
      </div>
    </main>
  );
};


export default MoveChecked;
