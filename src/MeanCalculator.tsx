import React from "react";
import { useBoolean } from "@fluentui/react-hooks";
import { ThemeProvider, Button } from "@fluentui/react";
import { QuickSort } from "./QuickSort";
import "./styles.css";

export default function MeanCalculator(props) {
  const [mean, setMean] = React.useState<number>(0);
  const [median, setMedian] = React.useState<number>(0);
  const [mode, setMode] = React.useState<String>("0");
  const [range, setRange] = React.useState<number>(0);
  const [min, setMin] = React.useState<number>(0);
  const [max, setMax] = React.useState<number>(0);
  const [dataSet, setDataSet] = React.useState<String>();
  const [currentErrorMessage, setCurrentErrorMessage] = React.useState<
    string
  >();
  const [
    errorMessage,
    { setTrue: showErrorMessage, setFalse: hideErrorMessage }
  ] = useBoolean(false);

  /**
   * Calculates the mean of a given set of numbers.
   *
   * @param data
   */
  const calculateMean = (data: number[]) => {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      total += data[i];
    }
    return total / data.length;
  };

  const calculateMedian = (data: number[]) => {
    if (data.length > 1) {
      let sortedData: number[] = QuickSort(data);

      // If the data's length is even.
      if (sortedData.length % 2 !== 0) {
        return sortedData[(sortedData.length - 1) / 2];
      }

      // If the data's length is odd.
      else {
        return (
          (sortedData[(sortedData.length - 2) / 2] +
            sortedData[(sortedData.length - 2) / 2 + 1]) /
          2
        );
      }
    }

    return data[0];
  };

  /**
   * Calculates the mode of a given set of numbers.
   *
   * @param data
   */
  const calculateMode = (data: number[]) => {
    if (data.length > 1) {
      let map = {};
      let answers = [];
      let maxCount = 0;

      for (let i = 0; i < data.length; i++) {
        if (map[data[i]]) {
          // Increment the initalized count value.
          map[data[i]]++;

          // If the current count is larger than the maxCount, update it.
          if (map[data[i]] > maxCount) {
            maxCount = map[data[i]];
          }
        } else {
          // Initialize count as 1.
          map[data[i]] = 1;
        }
      }

      // Push all items equal to the max count to an array.
      for (let key in map) {
        if (map[key] === maxCount) {
          answers.push(key);
        }
      }

      return answers;
    }

    return data[0];
  };

  /**
   * Calculates the min of a given set of numbers.
   *
   * @param data
   */
  const calculateMin = (data: number[]) => {
    let min = data[0];

    for (let i = 1; i < data.length; i++) {
      if (data[i] < min) {
        min = data[i];
      }
    }
    return min;
  };

  /**
   * Calculates the max of a given set of numbers.
   *
   * @param data
   */
  const calculateMax = (data: number[]) => {
    let max = data[0];

    for (let i = 1; i < data.length; i++) {
      if (data[i] > max) {
        max = data[i];
      }
    }
    return max;
  };

  /**
   * Calculates the range of a given set of values.
   *
   * @param data
   */
  const calculateRange = (data: number[]) => {
    return calculateMax(data) - calculateMin(data);
  };

  /**
   * Parses a given String to a number array.
   *
   * @param items
   */
  const parseDataSet = (items: String) => {
    return items
      .split(/,| /)
      .filter((x) => x.trim().length && !isNaN(x))
      .map(Number);
  };

  /**
   * Calculates the solution for the equation.
   */
  const solve = () => {
    // Handles errors related to invalid values being recieved.
    if (dataSet) {
      hideErrorMessage();
      const data: number[] = parseDataSet(dataSet);

      setMean(calculateMean(data));
      setMedian(calculateMedian(data));
      setMode(calculateMode(data).toString());
      setRange(calculateRange(data));
      setMin(calculateMin(data));
      setMax(calculateMax(data));
    } else {
      setCurrentErrorMessage("Please enter a value.");
      showErrorMessage();
    }
  };

  /**
   * Clears the current values of the equation.
   */
  const clear = () => {
    setMean(0);
  };

  return (
    <ThemeProvider>
      <div className={props.className} style={props.styles}>
        <div className="calculator-content-box">
          <div className="calculator-title">
            <h3>Mean, Median, and Mode Calculator</h3>
          </div>
          <div className="calculator-input-box">
            <p className="calculator-input">
              <label className="calculator-input-label">Data Set</label>
              <textarea
                onChange={(ev) => {
                  setDataSet(ev.target.value);
                }}
                rows="4"
                cols="40"
              />
            </p>
            {errorMessage && (
              <p className="calculator-input-error-message">
                {currentErrorMessage}
              </p>
            )}
          </div>
          <div className="calculator-buttons-box">
            <Button className="calculator-buttons" onClick={clear}>
              Clear
            </Button>
            <Button className="calculator-buttons" onClick={solve}>
              Solve
            </Button>
          </div>
          <div className="calculator-answer-box">
            <h4 className="calculator-answer-title">Answer</h4>
            <hr />
            <div className="calculator-answer-text">
              <b className="calculator-answer-text-name"> Mean:</b>
              <p className="calculator-answer-text-answer">{mean}</p>
            </div>
            <div className="calculator-answer-text">
              <b className="calculator-answer-text-name"> Median:</b>
              <p className="calculator-answer-text-answer">{median}</p>
            </div>
            <div className="calculator-answer-text">
              <b className="calculator-answer-text-name"> Mode:</b>
              <p className="calculator-answer-text-answer">{mode}</p>
            </div>
            <div className="calculator-answer-text">
              <b className="calculator-answer-text-name"> Range:</b>
              <p className="calculator-answer-text-answer">{range}</p>
            </div>
            <div className="calculator-answer-text">
              <b className="calculator-answer-text-name"> Minimum:</b>
              <p className="calculator-answer-text-answer">{min}</p>
            </div>
            <div className="calculator-answer-text">
              <b className="calculator-answer-text-name"> Maximum:</b>
              <p className="calculator-answer-text-answer">{max}</p>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
