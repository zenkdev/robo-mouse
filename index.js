#!/usr/bin/env node

// Move the mouse across the screen as a sine wave.
const robot = require('robotjs');
const figlet = require('figlet');
const chalk = require('chalk');

const TITLE = 'Robo-mouse';
const TITLE_FONT = 'Ghost';
const REPEAT_TIMEOUT = 1 * 60 * 1000;

const logger = console;

// eslint-disable-next-line no-console
logger.log(figlet.textSync(TITLE, TITLE_FONT) || TITLE);

function writeLog(text) {
  const d = new Date(); // [2022-07-03T16:20:46.980]
  const year = d.getFullYear();
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  const hour = `${d.getHours()}`.padStart(2, '0');
  const minute = `${d.getMinutes()}`.padStart(2, '0');
  const second = `${d.getSeconds()}`.padStart(2, '0');
  const millisec = `${d.getMilliseconds()}`.padStart(3, '0');
  logger.log(chalk.bold(`[${year}-${month}-${day} ${hour}:${minute}:${second}.${millisec}]`), '-', text);
}

// Speed up the mouse.
robot.setMouseDelay(0);

const twoPI = Math.PI * 2.0;
const screenSize = robot.getScreenSize();
const height = screenSize.height / 2 - 10;
const { width } = screenSize;

let mousePos = robot.getMousePos();

function isMouseMoved() {
  const pos = robot.getMousePos();
  if (pos.x !== mousePos.x || pos.y !== mousePos.y) {
    mousePos = pos;
    return true;
  }
  return false;
}

function moveMouse() {
  if (!isMouseMoved()) {
    writeLog('move');
    for (let x = 0; x < width; x += 1) {
      const y = height * Math.sin((twoPI * x) / width) + height;
      robot.moveMouse(x, y);
    }
    robot.moveMouse(mousePos.x, mousePos.y);
  }
  writeLog('sleep');
  setTimeout(moveMouse, REPEAT_TIMEOUT);
}

writeLog('start');
setTimeout(moveMouse, REPEAT_TIMEOUT);
