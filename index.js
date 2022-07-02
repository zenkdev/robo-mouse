// Move the mouse across the screen as a sine wave.
const robot = require('robotjs');
var figlet = require('figlet');

const TITLE = 'Robo-mouse';
const TITLE_FONT = 'Ghost';
const MESSAGE_FONT = 'Small';
const REPEAT_TIMEOUT = 1 * 60 * 1000;

console.log(figlet.textSync(TITLE, TITLE_FONT) || TITLE);

// Speed up the mouse.
robot.setMouseDelay(0.1);

const twoPI = Math.PI * 2.0;
const screenSize = robot.getScreenSize();
const height = screenSize.height / 2 - 10;
const { width } = screenSize;

function moveMouse() {
  console.log(figlet.textSync('move', MESSAGE_FONT));
  for (let x = 0; x < width; x += 1) {
    const y = height * Math.sin((twoPI * x) / width) + height;
    robot.moveMouse(x, y);
  }
  console.log(figlet.textSync('sleep', MESSAGE_FONT));
  setTimeout(moveMouse, REPEAT_TIMEOUT);
}

setTimeout(moveMouse, REPEAT_TIMEOUT);
