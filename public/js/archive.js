// search string
let searchString = "";

// priview array
let previews = [];

// Sorted BY
let sortBy = 'date';

// represents a preview of an interview
class Preview {
    constructor(artist, interviewer, date, imageUrl, url, tags, visible) {
    this.artist = artist;
    this.interviewer = interviewer;
    this.date = date;
    this.imageUrl = imageUrl;
    this.url = url;
    this.tags = tags;
    this.visible = visible;
    }
}

// Event Handlers -----------------------------------------------------------------

/**
 * sorts previews according to Date and updates the page
 * @param event<click> onClick event
 */
function sortDate(event) {
    sortBy = 'date';
    previews = sortPreviews(previews);
    writePreviews();
}
// add event listener
document.getElementById("dateButton").addEventListener("click", sortDate);

/**
 * sorts previews according to artist and updates the page
 * @param event<click> onClick event
 */
function sortArtist(event) {
    sortBy = 'artist';
    previews = sortPreviews(previews);
    writePreviews();
}
// add event listener
document.getElementById("artistButton").addEventListener("click", sortArtist);

/**
 * sorts previews according to interviewer and updates the page
 * @param event<click> onClick event
 */
function sortInterviewer(event) {
    sortBy = 'interviewer';
    previews = sortPreviews(previews);
    writePreviews();
}
// add event listener
document.getElementById("interviewerButton").addEventListener("click", sortInterviewer);

/**
 * updates previews according to search parameters
 * @param event<input> searchbar's content
 */
function handleSearch(event) {
    searchString = event.target.value.trim();
    previews.forEach(p => p.visible = shouldShowPreview(p));
    writePreviews();
}
// add event listener 
document.getElementById("searchBar").addEventListener("input", handleSearch);

/**
 * loads all previews
 */
function loadPreviews() {
    previews = sortPreviews(getPreviews().map(p => makePreview(p)));
    writePreviews()    
}

 /**
 * gets previews from page text
 */
function getPreviews() {
    let elements = Array.from(document.getElementsByClassName('articleInfo'));
    elements = elements.map(x => {
        let p = new Preview;
        const children = Array.from(x.childNodes);
        children.forEach(y => {
            if (y.className === "artist") {
                p.artist = y.innerHTML;
            }
            if (y.className === "interviewer") {
                p.interviewer = y.innerHTML;
            }
            if (y.className === "imageLink") {
                p.imageUrl = y.innerHTML;
            }
            if (y.className === "date") {
                p.date = y.innerHTML.slice(0,15);
            }
            if (y.className === "tags") {
                p.tags = y.innerHTML.split("~~~");
            }
            if (y.className === "url") {
                p.url = y.innerHTML;
            }
        });
        p.visible = true;
        return p;
    });
    return elements;
}

/**
 * makes a Preview from the data recieved from the server
 * 
 * @param p<JSON> JSON representing the preview's data
 * 
 * @return<Preview> the Preview
 */
function makePreview(p) {
    p.visible = shouldShowPreview(p);
    return p;
}

/**
 * true iff a preview should be visible (is included in the search parameters)
 * 
 * @param p<Preview> the preview to be tested
 * 
 * @return<Boolean> true iff should be visible
 */
function shouldShowPreview(p) {
    let show = searchString === "";
    show = show || p.interviewer.includes(searchString);
    show = show || p.artist.includes(searchString);
    p.tags.forEach(t => show = show || t.includes(searchString));
    return show;
}

/**
 * sorts an array of previews according to sortBy
 * 
 * @param l<[Preview]> the previews to be sorted
 * 
 * @return<[Preview]> the sorted array
 */
function sortPreviews(l) {
    let compare = (x, y) => new Date(y.date) - new Date(x.date);
    if (sortBy == 'artist') {
        compare = (x, y) => {
            if (x.artist < y.artist) { 
                return -1;
            } else { 
                return 1;
            }
        };
    }
    if (sortBy == 'interviewer') {
        compare = (x, y) => {
            if (x.interviewer < y.interviewer) { 
                return -1;
            } else { 
                return 1;
            }
        };
    } 
    return l.sort(compare);
}

/**
 * writes previews to the document
 */
function writePreviews() {
    const conetentContainer = document.getElementById('contentContainer');
    while (conetentContainer.firstChild) {
        conetentContainer.removeChild(conetentContainer.firstChild);
    }
    previews.forEach(p => conetentContainer.appendChild(formatPreview(p)));
}

/**
 * returns a preview as a DOM element
 * 
 * @param p<Preview> a Preview 
 * 
 * @return<<div>...</div>> the given preview as a DOM element
 */
function formatPreview(p) {
    let preview = document.createElement("div");
    
    // set preview visibility
    if (p.visible) {
        preview.className = "visiblePreview";
    } else {
        preview.className = "invisiblePreview";
    }

    // container for the preview image
    let imageContainer = document.createElement('div');
    imageContainer.className = "previewImageContainer";

    // preview image
    let l = document.createElement("a");
    l.href = p.url;
    let image = document.createElement("img");
    image.setAttribute('src', p.imageUrl);
    image.setAttribute('alt', 'preview image for article');
    image.className = "previewImage";
    l.appendChild(image);
    imageContainer.appendChild(l);
    preview.appendChild(imageContainer);

    // container for the preview's textual content
    let previewContent = document.createElement('div');
    previewContent.className = "previewContent";

    // the artist
    let previewArtist = document.createElement('div');
    previewArtist.className = "previewArtist";
    previewArtist.innerHTML = p.artist;
    previewContent.appendChild(previewArtist);

    // the interviewer
    let previewInterviewer = document.createElement('div');
    previewInterviewer.className = "previewInterviewer";
    previewInterviewer.innerHTML = p.interviewer;
    previewContent.appendChild(previewInterviewer);

    // the date
    let date = document.createElement('div');
    date.className = "previewDate";
    date.innerHTML = p.date;
    previewContent.appendChild(date);

    // button linking to the full interview
    let previewLinkContainer = document.createElement('div');
    previewLinkContainer.className = "previewLinkContainer";
    let previewLink = document.createElement('a');
    previewLink.className = "previewLink";
    previewLink.href = p.url;
    previewLink.innerHTML = "read »";
    previewLinkContainer.appendChild(previewLink);
    previewContent.appendChild(previewLinkContainer);

    // append previewContent to preview and return that preview
    let previewContentContainer = document.createElement('div');
    previewContentContainer.className = "previewContentContainer";
    previewContentContainer.appendChild(previewContent);
    preview.appendChild(previewContentContainer);

    let previewContainer = document.createElement('div');
    previewContainer.className = "previewContainer";
    previewContainer.appendChild(preview);
    return previewContainer;
}

// loads previews when page is opened
loadPreviews();