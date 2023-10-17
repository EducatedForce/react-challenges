"use client";

import React, {useEffect, useState} from 'react';
import styles from "./page.module.css";

//Duration constants in seconds
const GREEN_LIGHT_DURATION = 6;
const GREEN_LIGHT_BLINK_DURATION = 4;
const GREEN_LIGHT_BLINK_SPEED = 0.5;
const YELLOW_LIGHT_DURATION = 3;
const RED_LIGHT_DURATION = 10;

const TrafficLight = () => {
  const [trafficLightOn, setTrafficLightOn] = useState(true);
  const [trafficLightDirection, setTrafficLightDirection] = useState<"down" | "up">("down");
  const [redLight, setRedLight] = useState(true);
  const [yellowLight, setYellowLight] = useState(false);
  const [greenLight, setGreenLight] = useState({
    continuous: false,
    blinking: false,
    blink: false,
  });
  const handleClick = () => {
    setTrafficLightOn((prevState) => {
      if (!prevState) {
        setRedLight(true);
      } else {
        setRedLight(false);
        setYellowLight(false);
        setGreenLight((prevState) => {
          return {
            ...prevState,
            continuous: false,
            blinking: false,
            blink: false
          };
        });
      }
      return !prevState;
    });
  };

  useEffect(() => {
    //Collect timer IDs for cleanup later
    const timers: NodeJS.Timeout[] = [];

    if (redLight) {
      const timer1 = setTimeout(() => {
        setRedLight(false);
        setYellowLight(true);
      }, RED_LIGHT_DURATION * 1000);
      timers.push(timer1);
    }
    if (yellowLight && trafficLightDirection === "down") {
      const timer2 = setTimeout(() => {
        setYellowLight(false);
        setGreenLight((prevState) => {
          return {...prevState, continuous: true};
        });
      }, YELLOW_LIGHT_DURATION * 1000);
      timers.push(timer2);
    }
    if (yellowLight && trafficLightDirection === "up") {
      const timer3 = setTimeout(() => {
        setYellowLight(false);
        setTrafficLightDirection("down");
        setRedLight(true);
      }, YELLOW_LIGHT_DURATION * 1000);
      timers.push(timer3);
    }
    if (greenLight.continuous) {
      const timer4 = setTimeout(() => {
        setGreenLight((prevState) => {
          return {...prevState, continuous: false, blinking: true};
        });
      }, GREEN_LIGHT_DURATION * 1000);
      timers.push(timer4);
    }
    if (greenLight.blinking) {
      const blinks =
        GREEN_LIGHT_BLINK_DURATION / GREEN_LIGHT_BLINK_SPEED < 1
          ? 1
          : Math.ceil(GREEN_LIGHT_BLINK_DURATION / GREEN_LIGHT_BLINK_SPEED);
      let intervalRanTimes = 0;
      const interval = setInterval(() => {
        if (intervalRanTimes < blinks) {
          setGreenLight((prevState) => {
            return {...prevState, blink: !prevState.blink};
          });
          intervalRanTimes += 1;
        } else {
          setGreenLight((prevState) => {
            return {...prevState, blinking: false};
          });
          setYellowLight(true);
          setTrafficLightDirection("up");
          clearInterval(interval);
        }
      }, GREEN_LIGHT_BLINK_SPEED * 1000);
    }
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [redLight, yellowLight, greenLight.continuous, greenLight.blinking, trafficLightDirection]);

  return (
    <div className={styles.main}>
      <div className={styles.trafficLightContainer}>
        <span
          className={`${styles.trafficLight} ${redLight ? styles.red : styles.turnedOff}`}></span>
        <span
          className={`${styles.trafficLight} ${yellowLight ? styles.yellow : styles.turnedOff}`}></span>
        <span
          className={`${styles.trafficLight} ${greenLight.continuous || greenLight.blink ? styles.green : styles.turnedOff}`}></span>
      </div>
      <button
        onClick={handleClick}>{trafficLightOn ? "Turn traffic light off" : "Turn traffic light on"}</button>
    </div>
  );
};

export default TrafficLight;
