import React, { useState, useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import clsx from "clsx";

import {
  decrement,
  increment,
  incrementByAmount,
  reset,
  pervious,
  next,
  incrementAsync,
  incrementIfOdd,
  selectCount,
  selectStatus,
  selectImageArray,
  selectIndex,
  indexUpdate,
} from "./counterSlice";
import styles from "./Counter.module.css";

export function Counter() {
  const imageArray = useAppSelector(selectImageArray);
  const index = useAppSelector(selectIndex);
  const dispatch = useAppDispatch();

  let count: number | string;

  // const [incrementAmount, setIncrementAmount] = useState("2");

  // const incrementValue = Number(incrementAmount) || 0;

  const onNext = () => {
    if (imageArray.length > index + 1) {
      dispatch(next());
    } else {
      dispatch(incrementAsync());
    }
  };
  useEffect(() => {
    // Should not ever set state during rendering, so do this in useEffect instead.
    dispatch(incrementAsync());
  }, []);

  if (imageArray.length > index + 1) {
    count = index + 1 + " of " + imageArray.length;
  } else {
    count = index + 1;
  }

  const change = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    // const name = evt.target.name;
    const newValue = evt.target.value;
    dispatch(indexUpdate(+newValue));
  };

  return (
    <div>
      <div className={styles.row}>
        <h3>Puppies</h3>
      </div>

      <div className={styles.row}>
        <button
          className={clsx(styles.button, styles.angel)}
          onClick={() => dispatch(pervious())}
        >
          <FaAngleLeft />
        </button>
        <img src={imageArray[index]} alt="puppy1" />
        <button className={clsx(styles.button, styles.angel)} onClick={onNext}>
          <FaAngleRight />
        </button>
      </div>
      <div className={styles.row}>
        <span className={styles.value}>{count} </span>
      </div>
      <div className={styles.row}>
        <span className={styles.value}>Välj från histori: </span>
        <select
          name="puppy"
          className={styles.selectBox}
          value={index}
          onChange={change}
        >
          {imageArray.map((image, i) => (
            <option value={i}>{i + 1} puppy</option>
          ))}
        </select>
      </div>
      <div className={styles.row}>
        <button className={clsx(styles.button, styles.normalButton)}>
          Rensa histori
        </button>
      </div>
    </div>
  );
}
