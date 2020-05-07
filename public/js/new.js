/**
 * adds an artest statement to the document
 */
function addArtist() {
    let artistID = Math.floor(Math.random() * 1000000000);
    let container = document.createElement('div');
    container.id = `artist${artistID}`;
    container.className = "elementContainer";
    let field = document.createElement('textarea');
    field.className="inputField artistField interviewElement";
    field.placeholder="enter artist statement";
    let button = document.createElement('button');
    button.className = "removeButton";
    button.innerHTML = "X";
    button.onclick = () => removeDiv('artist', artistID);
    container.appendChild(field);
    container.appendChild(button);
    let parent = document.getElementById("interviewContainer");
    parent.appendChild(container);
}

/**
 * adds an interviewer statement to the document
 */
function addInterviewer() {
    let interviewerID = Math.floor(Math.random() * 1000000000);
    let container = document.createElement('div');
    container.id = `interviewer${interviewerID}`;
    container.className = "elementContainer";
    let field = document.createElement('textarea');
    field.className="inputField interviewerField interviewElement";
    field.placeholder="enter interviewer statement";
    let button = document.createElement('button');
    button.className = "removeButton";
    button.innerHTML = "X";
    button.onclick = () => removeDiv('interviewer', interviewerID);
    container.appendChild(field);
    container.appendChild(button);
    let parent = document.getElementById("interviewContainer");
    parent.appendChild(container);
}

/**
 * adds an image input to the document
 */
function addImage() {
    let imageID = Math.floor(Math.random() * 1000000000);
    let container = document.createElement('div');
    container.id = `image${imageID}`;
    container.className = "elementContainer";
    let inputContainer = document.createElement('div');
    inputContainer.className = "mediaInputContainer imageInputContainer interviewElement";
    let srcInput = document.createElement('input');
    srcInput.className="inputBar srcInput";
    srcInput.placeholder="enter image url";
    let captionInput = document.createElement('input');
    captionInput.className="inputBar captionInput";
    captionInput.placeholder="enter image caption";
    let altInput = document.createElement('input');
    altInput.className="inputBar altInput";
    altInput.placeholder="enter image alternant text";
    inputContainer.appendChild(srcInput);
    inputContainer.appendChild(captionInput);
    inputContainer.appendChild(altInput);
    let button = document.createElement('button');
    button.className = "removeButton";
    button.innerHTML = "X";
    button.onclick = () => removeDiv('image', imageID);
    container.appendChild(inputContainer);
    container.appendChild(button);
    let parent = document.getElementById("interviewContainer");
    parent.appendChild(container);
}

/**
 * adds an audio input to the document
 */
function addAudio() {
    let audioID = Math.floor(Math.random() * 1000000000);
    let container = document.createElement('div');
    container.id = `audio${audioID}`;
    container.className = "elementContainer";
    let inputContainer = document.createElement('div');
    inputContainer.className = "mediaInputContainer audioInputContainer interviewElement";
    let srcInput = document.createElement('input');
    srcInput.className="inputBar srcInput";
    srcInput.placeholder="enter share link or .mp3 .ogg or .wav file";
    let captionInput = document.createElement('input');
    captionInput.className="inputBar captionInput";
    captionInput.placeholder="enter audio caption";
    let altInput = document.createElement('input');
    altInput.className="inputBar altInput";
    altInput.placeholder="enter audio alternant text";
    inputContainer.appendChild(srcInput);
    inputContainer.appendChild(captionInput);
    inputContainer.appendChild(altInput);
    let button = document.createElement('button');
    button.className = "removeButton";
    button.innerHTML = "X";
    button.onclick = () => removeDiv('audio', audioID);
    container.appendChild(inputContainer);
    container.appendChild(button);
    let parent = document.getElementById("interviewContainer");
    parent.appendChild(container);
}

/**
 * adds a video input to the document
 */
function addVideo() {
    let videoID = Math.floor(Math.random() * 1000000000);
    let container = document.createElement('div');
    container.id = `video${videoID}`;
    container.className = "elementContainer";
    let inputContainer = document.createElement('div');
    inputContainer.className = "mediaInputContainer videoInputContainer interviewElement";
    let srcInput = document.createElement('input');
    srcInput.className="inputBar srcInput";
    srcInput.placeholder="enter share link, embed link, or .mp4 .ogg or .webm file";
    let captionInput = document.createElement('input');
    captionInput.className="inputBar captionInput";
    captionInput.placeholder="enter video caption";
    let altInput = document.createElement('input');
    altInput.className="inputBar altInput";
    altInput.placeholder="enter video alternant text";
    inputContainer.appendChild(srcInput);
    inputContainer.appendChild(captionInput);
    inputContainer.appendChild(altInput);
    let button = document.createElement('button');
    button.className = "removeButton";
    button.innerHTML = "X";
    button.onclick = () => removeDiv('video', videoID);
    container.appendChild(inputContainer);
    container.appendChild(button);
    let parent = document.getElementById("interviewContainer");
    parent.appendChild(container);
}

/**
 * adds an embed input to the document
 */
function addEmbed() {
    let embedID = Math.floor(Math.random() * 1000000000);
    let container = document.createElement('div');
    container.id = `embed${embedID}`;
    container.className = "elementContainer";
    let inputContainer = document.createElement('div');
    inputContainer.className = "mediaInputContainer embedInputContainer interviewElement";
    let field = document.createElement('textarea');
    field.className="inputField embedField interviewField";
    field.placeholder="enter HTML";
    let captionInput = document.createElement('input');
    captionInput.className="inputBar embedInput captionInput";
    captionInput.placeholder="enter embed caption";
    let altInput = document.createElement('input');
    altInput.className="inputBar embedInput altInput";
    altInput.placeholder="enter embed alternant text";
    inputContainer.appendChild(field);
    inputContainer.appendChild(captionInput);
    inputContainer.appendChild(altInput);
    let button = document.createElement('button');
    button.className = "removeButton";
    button.innerHTML = "X";
    button.onclick = () => removeDiv('embed', embedID);
    container.appendChild(inputContainer);
    container.appendChild(button);
    let parent = document.getElementById("interviewContainer");
    parent.appendChild(container);
}

/**
 * adds a tag to the document
 */
function addTag() {
    let tagID = Math.floor(Math.random() * 1000000000);
    let container = document.createElement('div');
    container.id = `tag${tagID}`;
    container.className = "elementContainer";
    let field = document.createElement('input');
    field.className="inputBar tagInput";
    field.placeholder="enter tag";
    let button = document.createElement('button');
    button.className = "removeButton";
    button.innerHTML = "X";
    button.onclick = () => removeDiv('tag', tagID);
    container.appendChild(field);
    container.appendChild(button);
    let parent = document.getElementById("tagContainer");
    parent.appendChild(container);
}

/**
 * removes a div with an id in the form `${s}${id}`
 * 
 * @param s<String> a string that makes up the first part of the divs id 
 * @param id<Number> a number that serves as the id for the specified tags div 
 */
function removeDiv(s, id) {
    let tag = document.getElementById(String(s) + String(id));
    tag.parentNode.removeChild(tag);
}

/**
 * returns an array of strings where each string describes something wrong with the created interview (empty if no problems)
 * @return <[String]> the problems in the interview
 */
function publish() {
    let e = getErrors();
    if (e.length > 0) {
        let m = "There seems to be a problem with your interview. Please fix the following issue(s):";
        e.forEach(s => m = m + s);
        alert(m);
        return false;
    } else {
        let confirmation = confirm("Please confirm that you want to publish this.");
        if (confirmation) {
            const artist = String(document.getElementById('artistInput').value);
            const interviewer = String(document.getElementById('interviewerInput').value);
            const description = String(document.getElementById('descriptionInput').value);
            const imageUrl = String(document.getElementById('previewImageSource').value);
            const imageTitle = String(document.getElementById('previewImageCaption').value);
            const tags = Array.from(document.getElementsByClassName('tagInput')).map(x => String(x.value));
            tags.push("");
            const html = getHTML();

            document.getElementById('artist').value = artist;
            document.getElementById('interviewer').value = interviewer;
            document.getElementById('description').value = description;
            document.getElementById('thumbnail').value = imageUrl;
            document.getElementById('caption').value = imageTitle;
            document.getElementById('tags').value = "" + String(tags.reduce((x,y) => x + "~~~" + y));
            document.getElementById('pageHtml').value = html;
            return true;
        } else {
            return false;
        }
    }
}

/**
 * returns an array of strings where each string describes something wrong with the created interview (empty if no problems)
 * @return <[String]> the problems in the interview
 */
function showPreview() {
    let e = getErrors();
    if (e.length > 0) {
        let m = "There seems to be a problem with your interview. Please fix the following issue(s):";
        e.forEach(s => m = m + s);
        alert(m);
    } else {
        var wnd = window.open("about:blank", "", "_blank");
        wnd.document.write(
            `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <title><%= article.title %></title>
                <link rel="stylesheet" href="/css/webfonts/ingram-mono-regular.css" type="text/css" />
                <link rel="stylesheet" type="text/css" href="/css/style.css" />
                <link rel="stylesheet" type="text/css" href="/css/interview.css" />
            </head>
            <body>
                <a id='skipLink' href='#contentContainer'>Jump to main</a>
                <div class="pageContent">
                    <div class="header">
                        <div class="logoContainer"><a href="/articles/index" class="logoLink">/ Variables</a></div>
                        <div class="navContainer" role="navigation">
                            <nav>
                                <a class="navLink" href="/articles/about">About</a>
                                <a class="navLink" href="/articles/index">Archive</a>
                                <a class="navLink" href="/articles/contact">Contact</a>
                            </nav>
                        </div>
                        <div class="spaceDiv"></div>
                    </div>
                    ${getHTML()}
                    <div class="footer">
                        <div class="footerLogoContainer"><a href="/articles/index" class="logoLink">/</a></div>	
                    </div>
                </div>
            </body>
        </html>`);
    }
}
 
/**
 * returns an array of strings where each string describes something wrong with the created interview (empty if no problems)
 * @return <[String]> the problems in the interview
 */
function getErrors() {
    let l = [];
    if (document.getElementById('artistInput').value === "") {
        l.push(' \n  no artist name given');
    }
    if (document.getElementById('interviewerInput').value === "") {
        l.push(' \n  no interviewer name given');
    }
    if (document.getElementById('previewImageSource').value === "") {
        l.push(' \n  no preview image url given');
    }
    if (document.getElementById('previewImageCaption').value === "") {
        l.push(' \n  no preview image caption given');
    }
    if (document.getElementById('descriptionInput').value === "") {
        l.push(' \n  no interview description given');
    }
    return l; 
}

/**
 * returns a string that represents interview as html
 * @return <String> the interview html
 */
function getHTML() {
    let h = `<main><div id="contentContainer" role="main">`;
    h = h + `<div class="interviewArtist">${String(document.getElementById('artistInput').value)}</div>`;
    h = h + `<div class="interviewInterviewer">${String(document.getElementById('interviewerInput').value)}</div>`;
    h = h + `<div class="interviewImageContainer"><img class="interviewImage" 
    src="${String(document.getElementById('previewImageSource').value)}"  
    alt="${String(document.getElementById('previewImageAlt').value)}"></div>`;
    h = h + `<div class="interviewImageTitle">${String(document.getElementById('previewImageCaption').value)}</div>`;
    h = h + `<div class="interviewDescription">${String(document.getElementById('descriptionInput').value)}</div>`;

    const elements = Array.from(document.getElementsByClassName('interviewElement'));
    elements.forEach(x => {
        if (x.className.includes("artistField")) {
            h = h + `<div class="interviewAnswer">${String(x.value)}</div>`;
        }
        if (x.className.includes("interviewerField")) {
            h = h + `<div class="interviewQuestion">${String(x.value)}</div>`;
        }
        if (x.className.includes("imageInputContainer")) {
            const children = Array.from(x.childNodes);
            let src = "";
            let caption = "";
            let alt = "";
            children.forEach(c => {
                if (c.className.includes("srcInput")) {
                    src = String(c.value);
                }
                if (c.className.includes("captionInput")) {
                    caption = String(c.value);
                }
                if (c.className.includes("altInput")) {
                    alt = String(c.value);
            }});
            h = h + `<div class="interviewImageContainer"><img class="interviewImage" src="${src}" alt="${alt}"></div>`;
            if (caption !== "") {
                h = h + `<div class="interviewImageTitle">${caption}</div>`;
            }
        }
        if (x.className.includes("audioInputContainer")) {
            const children = Array.from(x.childNodes);
            let src = "";
            let caption = "";
            let alt = "";
            children.forEach(c => {
                if (c.className.includes("srcInput")) {
                    const v = String(c.value);
                    if (!v.includes(".mp3") && !v.includes(".ogg") && !v.includes(".wav")) {
                        try {
                            src = `https://docs.google.com/uc?export=download&id=${v.split('/d/')[1].split('/view')[0]}`;
                        } catch(e) {
                            src = v;
                        }
                    } else {
                        src = v;
                    }
                }
                if (c.className.includes("captionInput")) {
                    caption = String(c.value);
                }
                if (c.className.includes("altInput")) {
                    alt = String(c.value);
            }});
            h = h + `<div class="interviewAudioContainer mediaContainer"><audio class="interviewAudio" controls="controls">
            <source src="${src}"></audio></div><div class="interviewMediaAlt">${alt}</div>`;
            if (caption !== "") {
                h = h + `<div class="interviewImageTitle">${caption}</div>`;
            }
        }
        if (x.className.includes("videoInputContainer")) {
            const children = Array.from(x.childNodes);
            let src = "";
            let caption = "";
            let alt = "";
            children.forEach(c => {
                if (c.className.includes("srcInput")) {
                    const v = String(c.value);
                    if (!v.includes(".mp4") && !v.includes(".ogg") && !v.includes(".webm")) {
                        if (v.includes("/embed/")) {
                            src = v;
                        } else {
                            try {
                                src = `https://docs.google.com/uc?export=download&id=${v.split('/d/')[1].split('/view')[0]}`;
                            } catch(e) {
                                src = v;
                            }
                        }
                    } else {
                        src = v;
                    }
                }
                if (c.className.includes("captionInput")) {
                    caption = String(c.value);
                }
                if (c.className.includes("altInput")) {
                    alt = String(c.value);
            }});
            if (src.includes('/embed/')) {
                h = h +  `<div class="interviewVideoIframeContainer mediaContainer"><iframe class="interviewVideoIframe" src="${src}" /></iframe></div>
                <div class="interviewMediaAlt">${alt}</div>`;
            } else {
                h = h +  `<div class="interviewVideoContainer mediaContainer"><video class="interviewVideo" controls="controls">
                <source src="${src}"></video></div><div class="interviewMediaAlt">${alt}</div>`;
            }
            if (caption !== "") {
                h = h + `<div class="interviewImageTitle">${caption}</div>`;
            }
        }
        if (x.className.includes("embedInputContainer")) {
            const children = Array.from(x.childNodes);
            let src = "";
            let caption = "";
            let alt = "";
            children.forEach(c => {
                if (c.className.includes("embedField")) {
                   src = c.value;
                }
                if (c.className.includes("captionInput")) {
                    caption = String(c.value);
                }
                if (c.className.includes("altInput")) {
                    alt = String(c.value);
            }});
            h = h + `<div class="embedContainer mediaContainer"><div class="interviewEmbed">${src}</div><div class="interviewMediaAlt">${alt}</div></div>`;
            if (caption !== "") {
                h = h + `<div class="interviewImageTitle">${caption}</div>`;
            }
        }
    });
    h = h + `</div></main>`;

    return h;
}

