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
