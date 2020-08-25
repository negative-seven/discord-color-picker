const LETTER_DIGIT_REPLACEMENTS = {
	'a': 'a',
	'b': 'b',
	'c': 'c',
	'd': 'd',
	'e': 'e',
	'f': 'f',
	'g': '9',
	'i': '1',
	'o': '0',
	's': '5',
	't': '7',
	'z': '2',
}

function getColors() {
	request = new XMLHttpRequest()
	request.open("GET", "https://pastebin.com/raw/ckNMBiqg")
	request.onload = () => {
		let colorsDiv = $("#colors")
		let regex = /^[abcdefizeasbtgo]{6}$/

		let colors = request.response.split('\r\n').filter(w => regex.test(w))
		for (let wordIndex = 0; wordIndex < colors.length; wordIndex++) {
			let word = colors[wordIndex];
			let newWord = "";

			for (let charIndex = 0; charIndex < word.length; charIndex++) {
				newWord += LETTER_DIGIT_REPLACEMENTS[word[charIndex]]
			}

			colors[wordIndex] = newWord
		}

		colorsDiv.html("")
		for (let color of colors) {
			colorsDiv.html(colorsDiv.html() + "<span style=\"color: #" + color + ";\">" + color + "</span><br>")
		}
	}
	request.send()
}

function setBgColor() {
	let color = $("#bg-color-select").val()
	$("body").css("background-color", color)

	let textColor
	if (color == "#ffffff") {
		textColor = "black"
	}
	else {
		textColor = "white"
	}
	$("body").css("color", textColor)
}

setBgColor()
getColors()
