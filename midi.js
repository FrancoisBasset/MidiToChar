const midi = require('midi');
const robot = require('robotjs');

const input = new midi.Input();
input.openPort(0);

const chars = {
	48: 'a',
	50: 'b',
	52: 'c',
	53: 'd',
	55: 'e',
	57: 'f',
	59: 'g',
	60: 'h',
	62: 'i',
	64: 'j',
	65: 'k',
	67: 'l',
	69: 'm',
	71: 'n',
	72: 'o',
	74: 'p',
	76: 'q',
	77: 'r',
	79: 's',
	81: 't',
	83: 'u',
	84: 'v',
	49: 'w',
	51: 'x',
	54: 'y',
	56: 'z'
};

var timer = null;
var char = '';

input.on('message', (deltaTime, message) => {
	const mode = message[0];
	const key = message[1];

	console.log(key);
	
	if (mode == 128) {
		clearInterval(timer);
		timer = null;
	}
	
	if (mode == 144) {
		if (key == 73) {
			robot.keyTap('backspace');
		} else if (key == 75) {
			robot.keyTap('enter');
		} else if (key == 78) {
			robot.keyTap('space');
		} else {
			char = chars[key]
			robot.typeString(char);

			if (timer != null) {
				clearInterval(timer);
			}
			timer = setInterval(function() {
				robot.typeString(char);
			}, 50);
		}
	}
});