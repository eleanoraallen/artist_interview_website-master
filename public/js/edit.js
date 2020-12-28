const page = document.getElementById("HtmlContainer");

const pageArtist = String(page.getElementsByClassName('interviewArtist')[0].innerHTML);
document.getElementById('artistInput').value = pageArtist;

const pageInterviewer = String(page.getElementsByClassName('interviewInterviewer')[0].innerHTML);
document.getElementById('interviewerInput').value = pageInterviewer;

const pageThumbnail = String(page.getElementsByClassName('interviewImage')[0].src);
document.getElementById('previewImageSource').value = pageThumbnail;

const pageThumbnailAlt = String(page.getElementsByClassName('interviewImage')[0].alt);
document.getElementById('previewImageAlt').value = pageThumbnailAlt;

const pageThumbnailCaption = String(page.getElementsByClassName('interviewImageTitle')[0].innerHTML);
document.getElementById('previewImageCaption').value = pageThumbnailCaption;

const pageDescription = String(page.getElementsByClassName('interviewDescription')[0].innerHTML);
document.getElementById('descriptionInput').value = pageDescription;

const elems = Array.from(document.getElementById('contentContainer').childNodes);

let i = 0;
let seenPreview = false;

while (i < elems.length) {
    if (elems[i].className == 'interviewQuestion') {
        addInterviewer(elems[i].innerHTML);
    }
    if (elems[i].className == 'interviewAnswer') {
        addArtist(elems[i].innerHTML);
    }
    if (elems[i].className !== undefined && elems[i].className.includes('interviewAudioContainer')) {
        let src = String(elems[i].firstChild.childNodes[1].src);
        let alt = getAlt(i);
        let cap = getCap(i);
        addAudio(src, alt, cap);
    }
    if (elems[i].className !== undefined && elems[i].className.includes('interviewVideoIframeContainer')) {
        let src = String(elems[i].firstChild.src);
        let alt = getAlt(i);
        let cap = getCap(i);
        addVideo(src, alt, cap);
    }
    if (elems[i].className !== undefined && elems[i].className.includes('interviewVideoContainer')) {
        let src = String(elems[i].firstChild.childNodes[1].src);
        let alt = getAlt(i);
        let cap = getCap(i);
        addVideo(src, alt, cap);
    }
    if (elems[i].className !== undefined && elems[i].className.includes('interviewImageContainer')) {
        if (seenPreview) {
            let src = String(elems[i].firstChild.src);
            let alt = String(elems[i].firstChild.alt);;
            let cap = getCap(i);
            addImage(src, alt, cap);
        } else {
            seenPreview = true;
        }
    }
    if (elems[i].className !== undefined && elems[i].className.includes('embedContainer')) {
        let src = String(elems[i].firstChild.innerHTML);
        let alt = String(elems[i].childNodes[1].innerHTML);;
        let cap = getCap(i);
        addEmbed(src, alt, cap);
    }
    i++;
}

document.getElementById("HtmlContainer").innerHTML = '';


function getAlt(i) {
    let alt = '';
    if (elems[i+2] !== undefined && elems[i+2].className == 'interviewMediaAlt') {
        alt = String(elems[i+2].innerHTML);
        alt = ''
    }
    if (elems[i+1] !== undefined && elems[i+1].className == 'interviewMediaAlt') {
        alt = String(elems[i+1].innerHTML);
        alt = ''
    }
    return alt;
}

function getCap(i) {
    let cap = '';
    if (elems[i+3] !== undefined && elems[i+3].className == 'interviewImageTitle') {
        cap = String(elems[i+3].innerHTML);
    }
    if (elems[i+2] !== undefined && elems[i+2].className == 'interviewImageTitle') {
        cap = String(elems[i+2].innerHTML);
    }
    if (elems[i+1] !== undefined && elems[i+1].className == 'interviewImageTitle') {
        cap = String(elems[i+1].innerHTML);
    }
    return cap;
}



// add tags
const tags = document.getElementById("TagContainer").innerHTML.split('~~~').filter(x => x !== '');
tags.forEach(t => addTag(t));
document.getElementById("TagContainer").innerHTML = '';


/**
 * adds an artest statement to the document
 */
function addArtist(t) {
    let artistID = Math.floor(Math.random() * 1000000000);
    let container = document.createElement('div');
    container.id = `artist${artistID}`;
    container.className = "elementContainer";
    let field = document.createElement('textarea');
    field.className="inputField artistField interviewElement";
    field.placeholder="enter artist statement";
    if (t !== undefined) {
        field.value = t;
    }
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
function addInterviewer(t) {
    let interviewerID = Math.floor(Math.random() * 1000000000);
    let container = document.createElement('div');
    container.id = `interviewer${interviewerID}`;
    container.className = "elementContainer";
    let field = document.createElement('textarea');
    field.className="inputField interviewerField interviewElement";
    field.placeholder="enter interviewer statement";
    if (t !== undefined) {
        field.value = t;
    }
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
function addImage(t, a, c) {
    let imageID = Math.floor(Math.random() * 1000000000);
    let container = document.createElement('div');
    container.id = `image${imageID}`;
    container.className = "elementContainer";
    let inputContainer = document.createElement('div');
    inputContainer.className = "mediaInputContainer imageInputContainer interviewElement";
    let srcInput = document.createElement('input');
    srcInput.className="inputBar srcInput";
    srcInput.placeholder="enter image url";
    if (t !== undefined) {
        srcInput.value = t;
    }
    let captionInput = document.createElement('input');
    captionInput.className="inputBar captionInput";
    captionInput.placeholder="enter image caption";
    if (c !== undefined) {
        captionInput.value = c;
    }
    let altInput = document.createElement('input');
    altInput.className="inputBar altInput";
    altInput.placeholder="enter image alternant text";
    if (a !== undefined) {
        altInput.value = a;
    }
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
function addAudio(t, a, c) {
    let audioID = Math.floor(Math.random() * 1000000000);
    let container = document.createElement('div');
    container.id = `audio${audioID}`;
    container.className = "elementContainer";
    let inputContainer = document.createElement('div');
    inputContainer.className = "mediaInputContainer audioInputContainer interviewElement";
    let srcInput = document.createElement('input');
    srcInput.className="inputBar srcInput";
    srcInput.placeholder="enter share link or .mp3 .ogg or .wav file";
    if (t !== undefined) {
        srcInput.value = t;
    }
    let captionInput = document.createElement('input');
    captionInput.className="inputBar captionInput";
    captionInput.placeholder="enter audio caption";
    if (c !== undefined) {
        captionInput.value = c;
    }
    let altInput = document.createElement('input');
    altInput.className="inputBar altInput";
    altInput.placeholder="enter audio alternant text";
    if (a !== undefined) {
        altInput.value = a;
    }
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
function addVideo(t, a, c) {
    let videoID = Math.floor(Math.random() * 1000000000);
    let container = document.createElement('div');
    container.id = `video${videoID}`;
    container.className = "elementContainer";
    let inputContainer = document.createElement('div');
    inputContainer.className = "mediaInputContainer videoInputContainer interviewElement";
    let srcInput = document.createElement('input');
    srcInput.className="inputBar srcInput";
    srcInput.placeholder="enter share link, embed link, or .mp4 .ogg or .webm file";
    if (t !== undefined) {
        srcInput.value = t;
    }
    let captionInput = document.createElement('input');
    captionInput.className="inputBar captionInput";
    captionInput.placeholder="enter video caption";
    if (c !== undefined) {
        captionInput.value = c;
    }
    let altInput = document.createElement('input');
    altInput.className="inputBar altInput";
    altInput.placeholder="enter video alternant text";
    if (a !== undefined) {
        altInput.value = a;
    }
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
function addEmbed(t, a, c) {
    let embedID = Math.floor(Math.random() * 1000000000);
    let container = document.createElement('div');
    container.id = `embed${embedID}`;
    container.className = "elementContainer";
    let inputContainer = document.createElement('div');
    inputContainer.className = "mediaInputContainer embedInputContainer interviewElement";
    let field = document.createElement('textarea');
    field.className="inputField embedField interviewField";
    field.placeholder="enter HTML";
    if (t !== undefined) {
        field.value = t;
    }
    let captionInput = document.createElement('input');
    captionInput.className="inputBar embedInput captionInput";
    captionInput.placeholder="enter embed caption";
    if (c !== undefined) {
        captionInput.value = c;
    }
    let altInput = document.createElement('input');
    altInput.className="inputBar embedInput altInput";
    altInput.placeholder="enter embed alternant text";
    if (a !== undefined) {
        altInput.value = a;
    }
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
function addTag(t) {
    let tagID = Math.floor(Math.random() * 1000000000);
    let container = document.createElement('div');
    container.id = `tag${tagID}`;
    container.className = "elementContainer";
    let field = document.createElement('input');
    field.className="inputBar tagInput";
    field.placeholder="enter tag";
    if (t !== undefined) {
        field.value = t;
    }
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
    h = h + `<div class="interviewInterviewer">interviewed by ${String(document.getElementById('interviewerInput').value)}</div>`;
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
            h = h + `<div class="embedContainer"><div class="interviewEmbed mediaContainer">${src}</div><div class="interviewMediaAlt">${alt}</div></div>`;
            if (caption !== "") {
                h = h + `<div class="interviewImageTitle">${caption}</div>`;
            }
        }
    });
    h = h + `</div></main>`;

    return h;
}