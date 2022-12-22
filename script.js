function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.body.onload = async() => {
    const contentPre = document.getElementById("content");
    const buffer = document.getElementById("buffer");

    const cursor = document.createElement("span");
    cursor.setAttribute("class", "cursor");
    cursor.innerText = "▂";

    console.log(contentPre)
    const text = await (await fetch("content.txt")).text();
    const filteredText = text.replace(/\[(.+)\]+/gm, '')
    console.log(filteredText)

    const r = /\^([^(?:\[)]+)\[(.+)\]+/gm
    let m;

    while ((m = r.exec(text)) !== null) {
        console.log(m[1])
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
        console.log(line)
        while (++textIndex < line.length) {
            const char = line[textIndex]
            console.log(inLink)
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
            await sleep(6)
        }
    }

    contentPre.appendChild(cursor);
}
