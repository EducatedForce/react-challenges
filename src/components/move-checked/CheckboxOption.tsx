import styles from "@/app/move-checked/page.module.css";
import React from "react";

const CheckboxOption = ({title, id, isChecked, onChange, onDelete}: {
  title: string,
  id: number,
  isChecked: boolean,
  onChange: (id: number) => void
  onDelete: (id: number) => void
}) => {
  return <div className={styles.inputContainer}>
    <input
      className={styles.itemCheckbox}
      type="checkbox"
      id={`${id}`}
      checked={isChecked}
      onChange={() => onChange(id)}
    />
    <p>{title}</p>
    <button onClick={() => onDelete(id)}>Delete</button>
  </div>;
};

export default CheckboxOption;
