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
} from "./counterSlice";
import styles from "./Counter.module.css";

export function Counter() {
  const count = useAppSelector(selectCount);
  const status = useAppSelector(selectStatus);
  const imageArray = useAppSelector(selectImageArray);
  const index = useAppSelector(selectIndex);

  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;

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
        {/* <button
          className={styles.button}
          aria-label="Pervious"
          onClick={() => dispatch(pervious())}
        >
          Pervious
        </button> */}
        <img src={imageArray[index]} alt="puppy1" />
        {/* <button className={styles.button} aria-label="Next" onClick={onNext}>
          Next
        </button> */}
        <button className={clsx(styles.button, styles.angel)} onClick={onNext}>
          <FaAngleRight />
        </button>
      </div>
      <div className={styles.row}>
        <span className={styles.value}>{index + 1}</span>
        <span className={styles.value}>{status}</span>
      </div>
    </div>
  );
}
