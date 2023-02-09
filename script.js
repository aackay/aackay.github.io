let startTime = 0;
let dt = 0;

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


document.body.onload = async () => {
	const contentPre = document.getElementById("content");
	const buffer = document.getElementById("buffer");

	const cursor = document.createElement("span");
	cursor.setAttribute("class", "cursor");
	cursor.innerText = "▂";
	const text = await (await fetch(window.location.pathname + "content.txt")).text();
	const filteredText = text.replace(/\[(.+)\]+/gm, '')

	const r = /\^([^(?:\[)]+)\[(.+)\]+/gm;
	let m;

	while ((m = r.exec(text)) !== null) {
	}

	buffer.innerText = filteredText;
	lines = filteredText.split("\n");
	let lineIndex = -1;



	while (++lineIndex < lines.length) {
		let inLink = false;
		let textIndex = -1;
		const line = lines[lineIndex]
		const lineElem = document.createElement("span");
		contentPre.appendChild(lineElem);
		let link;
		if (lineIndex < lines.length - 1) contentPre.appendChild(document.createElement("br"));
		while (++textIndex < line.length) {
			startTime = Date.now()
			const char = line[textIndex]
			if (char == " ") {
				const space = document.createElement("span");
				space.innerHTML = "&nbsp;";
				lineElem.appendChild(space);

				if (inLink) inLink = false;
			} else if (char == "^") {
				inLink = true;
				link = document.createElement("a");
				link.setAttribute("href", r.exec(text)[2])
				lineElem.appendChild(link);

			} else if (inLink) {
				link.innerHTML += char;
			} else {
				lineElem.innerHTML += char;
			}
			await sleep(Math.max(1 - dt, 0));
			dt = Date.now() - startTime;
		}
	}

	contentPre.appendChild(cursor);
}
