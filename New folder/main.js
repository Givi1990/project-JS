// main.js
import { ElementConstructor, ListConstructor, HoverDiv, ContentConstructor, FilterConstructor } from "./classes.js";
import { view } from "./functions.js";
import { searchContentMetod } from "./functions.js";
import { mainContent } from "./functions.js";


const navElement = document.getElementById("nav");
const textNav = ["მთავარი", "ჩვენს შესახებ", "კონტაქტი"];
const divNav = "div";
const isClickableNav = false;
const navUl_Instance = new ListConstructor(navElement, divNav, textNav, isClickableNav);

const userElement = document.querySelector("#user");
const userImgOneInstance = new ElementConstructor("img", userElement, "imgOneUserId", "imgUser-class", "");
const userImgTwoInstance = new ElementConstructor("img", userElement, "imgTwoUserId", "imgUser-class", "");
const user = document.querySelector("#user")

const textUser = ["Sign Up", "Log In"];
const divUser = "div";
const someEventUser = "click";
const isClickableUser = true;
const hoverDivUser_Instance = new HoverDiv(userElement, divUser, textUser, someEventUser, isClickableUser);
const header = document.getElementById("header");







const filter = document.querySelector("#filter");


const content = document.querySelector("#content");
const API_URL = "https://api2.myhome.ge/api/ka/search";
let placesingleArray = [];


document.addEventListener("DOMContentLoaded", function () {
    const API_URL = "https://api2.myhome.ge/api/ka/search";

    const content_Instance = new ContentConstructor(content, API_URL);
    const filter_Instance = new FilterConstructor(placesingleArray, view, filter, API_URL);
    mainContent(API_URL, content);

    

});





const search = document.querySelector("#search");
const searchContent = new ElementConstructor("input", search, "searchContent", "searchContent", "search");
const searchContentInput = document.querySelector("#searchContent");
searchContentInput.setAttribute("placeholder", "ჩაწერეთ საძიებო სიტყვა")
const searchContentValue = searchContentInput.value;
let searchContentMetodCalled = true;
searchContentInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        const searchContentValue = searchContentInput.value;
        const numericValue = parseFloat(searchContentValue);
        if (searchContentValue !== "") {
            searchContentMetod(searchContentValue, content);
            searchContentMetodCalled = false;
        }
        else if (!searchContentMetodCalled) {
            mainContent(API_URL, content);
            searchContentMetodCalled = true;
        }
    }
});




window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY;
    const screenWidth = window.innerWidth;
    if (screenWidth > 992) {

        if (scrollPosition > 0) {

            header.classList.add('scrolled');
            navElement.replaceWith(search);
            search.classList.add("searchUpNav");

        } else {
            header.classList.remove('scrolled');
            const upNav = this.document.querySelector("#upNav");
            upNav.insertBefore(navElement, upNav.childNodes[2]);

            const searchDiv = document.getElementById("searchDiv");
            searchDiv.insertBefore(search, searchDiv.childNodes[2]);
            search.classList.remove("searchUpNav")
        }
    }
    else {

        header.classList.add('scrolled');
        const upNav = this.document.querySelector("#upNav");
        upNav.insertBefore(navElement, upNav.childNodes[2]);

        const searchDiv = document.getElementById("searchDiv");
        searchDiv.insertBefore(search, searchDiv.childNodes[2]);
        search.classList.remove("searchUpNav")
    }
});

const searchImg = document.querySelector(".searchImg");
searchImg.addEventListener("click", function (event) {
    const searchContentValue = searchContentInput.value;
    searchContentMetod(searchContentValue, content);
});


const id43150 = document.querySelector("#id43150");
id43150.addEventListener("click", function (event) {
    location.reload();
});












