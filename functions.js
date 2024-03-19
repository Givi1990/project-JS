// functions.js

export function createNewElement(newElementTag, parentElement, idValue, classValue, typeValue) {
    var newElement = document.createElement(newElementTag);
    if (parentElement) {
        var parentClass = parentElement.getAttribute("class");
        var classValue = parentClass + "-" + newElementTag;
        var idValue;
    }
    newElement.setAttribute("id", idValue);
    newElement.setAttribute("class", classValue);
    if (typeValue) {
        newElement.setAttribute("type", typeValue);
    }

    parentElement.appendChild(newElement);
    return newElement;
}

let element;

export function hoverDiv(parentElement, elementType, array, someEvent, isClickable, hoverDivClose) {
    parentElement.addEventListener(someEvent, () => {
       
        if (!element) {
            element = listConstructor(parentElement, elementType, array, isClickable);
        }
       
        
    });
}

export function listConstructor(parentElement, elementType, array, isClickable) {
    const div = createNewElement("div", parentElement, elementType + "-" + parentElement.id, elementType + "-" + parentElement.id);
    const ul = createNewElement("ul", div, "", "", "");
    for (let index = 0; index < array.length; index++) {
        const li = createNewElement("li", ul, array[index].split(" ").join(""), elementType + "-" + ul.className, "");
        const a = createNewElement("a", li, "id" + array[index].charCodeAt(0) + index);
        a.textContent = array[index];
        a.setAttribute("href", "#")
        if (isClickable) {
            createEvent(li, "click");
        }
    }
    return div;
}

export function createEvent(element, eventTag) {

    let div;
    element.addEventListener(eventTag, function (event) {
        if (!div) {
            div = registrationForm(element);
            
        }
        
    });
}

export function registrationForm(parentElement, divElement, buttonElementClose, h3Element, userNameElement,
    phoneNumberElement, buttonElementContinue, pElement, div1Element, div2Element, div3Element, div4Element) {
    var divElement = document.querySelector("#divElementUserReg");
    if (!divElement) {
        divElement = createNewElement("div", parentElement);
        divElement.setAttribute("id", "divElementUserReg");
        
        var buttonElementClose = createNewElement("img", divElement);
        buttonElementClose.setAttribute("id", "buttonUserClose");
        buttonElementClose.setAttribute("src", "close.png");
        
        var h3Element = createNewElement("h3", divElement);
        h3Element.setAttribute("id", "h3ElementUser");
        h3Element.textContent = "Log in or sign up";
        
        var userNameElement = createNewElement("input", divElement);
        userNameElement.setAttribute("id", "userNameElementUser");
        userNameElement.classList.add("userReg")
        userNameElement.setAttribute("placeholder", "Enter your username");
        
        var phoneNumberElement = createNewElement("input", divElement);
        phoneNumberElement.setAttribute("id", "phoneNumberElementUser");
        phoneNumberElement.setAttribute("placeholder", "Enter your phone number");
        phoneNumberElement.classList.add("phoneReg")
        
        var buttonElementContinue = createNewElement("button", divElement);
        buttonElementContinue.setAttribute("id", "buttonElementContinue");
        buttonElementContinue.textContent = "Continue";
        buttonElementContinue.onclick = function () {
            saveData(userNameElement, phoneNumberElement);
        };
        
        var pElement = createNewElement("p", divElement);
        pElement.setAttribute("id", "pElementUser");
        pElement.textContent = "or";
        
        var div1Element = createNewElement("div", divElement);
        div1Element.setAttribute("id", "div1ElementUser");

        var div1ElementImg = createNewElement("img", divElement);
        div1Element.appendChild(div1ElementImg)
        div1ElementImg.setAttribute("src", "facebook.png");
        var div1ElementH5 = createNewElement("h5", divElement);
        div1Element.appendChild(div1ElementH5)
        div1ElementH5.textContent = "Continue with Facebook"

        
        
        
        buttonUserClose.addEventListener("click", function() {
            window.location.reload();
        });
    }
        
                
            
    
}

function saveData(userNameElement, phoneNumberElement) {
    var inputName = userNameElement.value;
    var inputPass = phoneNumberElement.value;
    for (var i = 0; i < sessionStorage.length; i++) {
        var key = sessionStorage.key(i);
        if (key.includes(inputName)) {
            alert("იუსერი არსებობს");
            return;
        }
    }
    sessionStorage.setItem(inputName, inputPass);
    userNameElement.value = "";
    phoneNumberElement.value = "";
}

function createData(content, child, index) {
    const elem = document.createElement("div");
    elem.className = "divElementAPI";
    content.appendChild(elem);

    const imgDiv = document.createElement("div");
    imgDiv.setAttribute("class", "imgDiv");
    const img = document.createElement("img");
    img.className = "imgElementAPI";
    img.id = "img" + index;
    img.src = "https://static.my.ge/myhome/photos/" + child.images.path + "/large/" + child.id + "_" + child.images.val + ".jpg?v=" + child.images.photo_ver;
    elem.appendChild(imgDiv);
    imgDiv.appendChild(img);

    const titleElem = document.createElement("h4");
    titleElem.textContent = child.title;
    elem.appendChild(titleElem);

    const priceElem = document.createElement("p");
    priceElem.textContent = child.price.total_price.gel + " ლარი";
    elem.appendChild(priceElem);

    const floorElem = document.createElement("p");
    floorElem.textContent = "სართული: " + child.facilities[0].label;
    elem.appendChild(floorElem);

    const addressElem = document.createElement("p");
    addressElem.textContent = child.place + ": " + child.desc_text;
    elem.appendChild(addressElem);

}

export function view(content, API_URL, place, title, desc_text, price) {
    fetch(API_URL)
        .then(response => response.json())
        .then(mas => {
            if (mas && mas.data && mas.data.children) {

                content.innerHTML = "";

                const contentArray = mas.data.children.filter(child => child.place === place);

                contentArray.forEach((child, index) => {
                    createData(content, child, index);
                });
            }
        });
}

export async function filterContent(placesingleArray, API_URL) {

    let childrenArray = [];
    for (let index = 1; index <= 1; index++) {
        const response = await fetch(API_URL + `?Page=${index}`);
        const responseData = await response.json();

        if (responseData && responseData.data && responseData.data.children) {
            const currentPageChildren = responseData.data.children;
            childrenArray.push(...currentPageChildren);
        }
    }
    processFilterButton(childrenArray, placesingleArray, API_URL, view);
}

function processFilterButton(childrenArray, placesingleArray, API_URL, view) {
    childrenArray.forEach((child) => {
        if (!placesingleArray.includes(child.place)) {
            placesingleArray.push(child.place);
        }
    });
    createFilterButton(placesingleArray, view, filter, API_URL);
}

function createFilterButton(placesingleArray, view, d1, API_URL) {
    placesingleArray.forEach((place, k) => {
        var elem = document.createElement("div");
        elem.className = "d2";
        var button = document.createElement("button");
        button.textContent = place;
        button.className = "button";
        button.addEventListener("click", function () {
            view(content, API_URL, place);
        });
        elem.appendChild(button);
        d1.appendChild(elem);
    });
}

let totalItems;
var currentPage = 0;

export function mainContent(API_URL, content) {

    var currentPage = 0;
    var itemsPerPage = 8;
    totalItems = 0;

    filterForPagination(currentPage, itemsPerPage);
    updatePagination(itemsPerPage)
}

function filterForPagination(page, itemsPerPage) {
    const API_URL = "https://api2.myhome.ge/api/ka/search";

    fetch(`${API_URL}?page=${page}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.data && data.data.children) {
                totalItems = data.data.children.length;
                content.innerHTML = '';
                data.data.children.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).forEach((child, index) => {
                    createData(content, child, index);
                });
                updatePagination(itemsPerPage);
            }
        });
}

function updatePagination(itemsPerPage) {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    for (let i = 0; i < totalPages; i++) {
        const pageNumberButton = document.createElement('button');
        pageNumberButton.textContent = i + 1;
        pageNumberButton.addEventListener('click', () => {
            currentPage = i;
            filterForPagination(currentPage, itemsPerPage);
        });
        pagination.appendChild(pageNumberButton);
    }
}

export function searchContentMetod(searchContentValue, content, currentPage, itemsPerPage) {
    const API_URL = "https://api2.myhome.ge/api/ka/search";
    var currentPage = 0;
    var itemsPerPage = 8;
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при получении данных');
            }
            return response.json();
        })
        .then(mas => {
            if (mas && mas.data && mas.data.children) {
                content.innerHTML = '';
                const children = mas.data.children.filter(child => {
                    const values = Object.values(child).filter(value => typeof value === 'string').join("");
                    return values.includes(searchContentValue);
                });
                children.forEach((child, index) => {
                    createData(content, child, index);
                });
            }

            // console.log("currentPage:", currentPage);
            // console.log("itemsPerPage:", itemsPerPage);
            // filterForPagination(currentPage, itemsPerPage);
            // updatePagination(itemsPerPage);
        })
}


