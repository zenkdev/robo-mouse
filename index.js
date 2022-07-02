#!/usr/bin/env node

// Move the mouse across the screen as a sine wave.
const robot = require('robotjs');
const figlet = require('figlet');

const TITLE = 'Robo-mouse';
const TITLE_FONT = 'Ghost';
const MESSAGE_FONT = 'Small';
const REPEAT_TIMEOUT = 1 * 60 * 1000;

const logger = console;

logger.log(figlet.textSync(TITLE, TITLE_FONT) || TITLE);

// Speed up the mouse.
robot.setMouseDelay(1);

const twoPI = Math.PI * 2.0;
const screenSize = robot.getScreenSize();
const height = screenSize.height / 2 - 10;
const { width } = screenSize;

function moveMouse() {
  logger.log(figlet.textSync('move', MESSAGE_FONT));
  for (let x = 0; x < width; x += 1) {
    const y = height * Math.sin((twoPI * x) / width) + height;
    robot.moveMouse(x, y);
  }
  logger.log(figlet.textSync('sleep', MESSAGE_FONT));
  setTimeout(moveMouse, REPEAT_TIMEOUT);
}

setTimeout(moveMouse, REPEAT_TIMEOUT);
