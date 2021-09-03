import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { FaAngleRight, FaAngleLeft, FaGithub } from "react-icons/fa";
import clsx from "clsx";
import {
  pervious,
  next,
  incrementAsync,
  selectImageArray,
  selectIndex,
  indexUpdate,
  clear,
} from "../redux/puppySlice";
import styles from "../styles/Style.module.css";

export function RandomPuppy() {
  const imageArray = useAppSelector(selectImageArray);
  const index = useAppSelector(selectIndex);
  const dispatch = useAppDispatch();

  let count: string;

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

  count = index + 1 + " av " + imageArray.length;

  const change = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    // const name = evt.target.name;
    const newValue = evt.target.value;
    dispatch(indexUpdate(+newValue));
  };
  const onClear = () => {
    dispatch(clear());
    dispatch(incrementAsync());
  };

  return (
    <div>
      <div className={styles.row}>
        <h3>Valpar</h3>
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
            <option value={i} key={i}>
              {i + 1} valp
            </option>
          ))}
        </select>
      </div>
      <div className={styles.row}>
        <button
          className={clsx(styles.button, styles.normalButton)}
          onClick={onClear}
        >
          Rensa histori
        </button>
      </div>
      <br />
      <div className={styles.row}>
        <a href="https://github.com/gegeemaa/happypuppies" target="_blank">
          <FaGithub />
        </a>
      </div>
    </div>
  );
}
