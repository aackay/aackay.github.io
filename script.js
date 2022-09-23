function updateBuffer() {
	const bufferL = document.getElementById("bufferLeft");
	const pfp = document.getElementsByClassName("mainpfp")[0];
	const text = document.getElementsByClassName("text")[0];

	if ((pfp.offsetTop + pfp.offsetHeight) > text.offsetTop) {
		bufferL.style.display = "none";
		text.style.textAlign = "left";
		
	} else {
		bufferL.style.display = "inline-block";
		text.style.textAlign = "center";
	}
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

addEventListener('resize', updateBuffer);

window.onload = () => {
	updateBuffer();
	fetch("/titles.txt").then(r => r.text())
		.then(data => {
			(async () => {
				const titles = data.split("\n");
				const titleElement = document.getElementById("titles");
				let i = 0;
				console.log(titles)
				setInterval(async () => {
					titleElement.setAttribute("class", "fadeout");
					titleElement.style.opacity = '0%';
					await delay(500);
					titleElement.innerText = titles[i % titles.length];
					i += 1;
					titleElement.setAttribute("class", "fadein");
					titleElement.style.opacity = '100%';
					await delay(500);
				}, 4000);
			})();

		});
}





// adam easter-egg
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

const target = "adam".split("");
let current = [];
let enabled = false;

document.body.onkeypress = e => {
	if (enabled) {
		return
	}
	current.push(e.key);
	if (arraysEqual(current, target)) {
		document.body.innerHTML += "<style>*{background: url('https://i.imgur.com/5P0FT9x.jpeg'); background-size: cover}</style>";
		enabled = true;
	} else if (current.length >= target.length) {
		current = [];
	} else if (current[current.length - 1] != target[current.length - 1]) {
		current = [];
	}
}
