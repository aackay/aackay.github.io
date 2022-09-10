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

addEventListener('resize', updateBuffer);

window.onload = () => {
	updateBuffer();
	fetch("/titles.txt").then(r => r.text())
		.then(data => {
			const titles = data.split("\n");
			const titleElement = document.getElementById("titles");
			let i = 0;
			console.log(titles)
			setInterval(() => {
				titleElement.setAttribute("class", "fadeout");
				setTimeout(() => {
					titleElement.style.opacity = '0%';
					titleElement.innerText = titles[i % titles.length];
					i += 1;
					setTimeout(() => {
						titleElement.setAttribute("class", "fadein");
						titleElement.style.opacity = '100%';
					}, 500);
				}, 500);
			}, 4000);
		});
}