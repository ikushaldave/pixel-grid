const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const grid = document.querySelector(".grid");
const color = document.querySelector(".color");
const submit = document.querySelector(".submit");
const download = document.querySelector(".download");

const inputObj = {};

// Fill Color to Grid

function fillColor() {
	// In Resposnive initial Point of grid

	inputObj.initialY = 132;
	inputObj.initialX = Math.floor((window.innerWidth - canvas.width) / 2);

	// Array of different mouse down point
	inputObj.gridIndexXTable = [];
	inputObj.gridIndexYTable = [];

	for (let i = 0; i < inputObj.grid; i += 1) {
		inputObj.gridIndexXTable.push({});
		inputObj.gridIndexYTable.push({});

		inputObj.gridIndexXTable[i][inputObj.initialX + i * inputObj.pixel] =
			i * inputObj.pixel;
		inputObj.gridIndexYTable[i][inputObj.initialY + i * inputObj.pixel] =
			i * inputObj.pixel;
	}

	inputObj.gridIndexXTable.reverse();
	inputObj.gridIndexYTable.reverse();

	let x = 0;
	let y = 0;

	canvas.addEventListener(
		"mousedown",
		(e) => {
			console.log(e.clientX);
			console.log(inputObj);

			x = inputObj.gridIndexXTable.find(
				(ele) => +Object.keys(ele) <= e.clientX
			);

			y = inputObj.gridIndexYTable.find(
				(ele) => +Object.keys(ele) <= e.clientY
			);

			console.log(Object.values(x)[0]);
			console.log(Object.values(x)[0]);

			ctx.fillStyle = inputObj.color;
			ctx.fillRect(
				Object.values(x)[0],
				Object.values(y)[0],
				inputObj.pixel,
				inputObj.pixel
			);
		},
		false
	);
}

function drawGrid(gridInput) {
	inputObj.pixel = gridInput.grid > 25 ? 10 : 20;

	canvas.width = inputObj.pixel * gridInput.grid;
	canvas.height = inputObj.pixel * gridInput.grid;
	ctx.strokeStyle = "black";

	for (let i = 0; i < gridInput.grid; i++) {
		for (let j = 0; j < gridInput.grid; j++) {
			ctx.strokeRect(
				i * inputObj.pixel,
				j * inputObj.pixel,
				inputObj.pixel,
				inputObj.pixel
			);
			console.log(
				i * inputObj.pixel,
				j * inputObj.pixel,
				inputObj.pixel,
				inputObj.pixel
			);
		}
	}

	fillColor();
}

// Color Input Change

color.addEventListener("input", (e) => {
	inputObj.color = e.target.value;
	console.log(inputObj);
});

// Inputs from Users

submit.addEventListener("click", (e) => {
	inputObj.grid = +(grid.value > 50 ? 50 : grid.value);
	grid.value = grid.value > 50 ? `50` : grid.value;
	inputObj.color = color.value;

	console.log(inputObj);

	drawGrid(inputObj);
});

// download button

download.addEventListener("click", (e) => {
	const dataURI = canvas.toDataURL();
	download.innerHTML = `<a href="${dataURI}" target="_blank">DOWNLOAD</a>`;
	console.log(e);
});
