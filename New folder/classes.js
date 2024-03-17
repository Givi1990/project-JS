// classes.js
import { createNewElement, listConstructor, hoverDiv, view, filterContent } from "./functions.js";

export class ElementConstructor {
    constructor(newElementTag, parentElement, idValue, classValue, typeValue) {
        this.parentElement = parentElement;
        this.newElementTag = createNewElement(newElementTag, parentElement, idValue, classValue, typeValue);
    }   
}

export class ListConstructor {
    constructor(parentElement, elementType, array, isClickable) { 
        this.isClickable = isClickable;
        this.parentElement = parentElement;
        this.elementType = elementType;
        this.array = array;
        listConstructor(parentElement, elementType, array, isClickable);
    }
}

export class HoverDiv {
    constructor(parentElement, elementType, array, someEvent, isClickable) {
        this.parentElement = parentElement;
        this.elementType = elementType;
        this.array = array;
        this.someEvent = someEvent;
        this.isClickable = isClickable;
        hoverDiv(parentElement, elementType, array, someEvent, isClickable); 
    }
}

export class ContentConstructor {
    constructor(content, API_URL) {
        this.content = content;
        this.API_URL = API_URL;
        this.viewContent();
    }
    
    viewContent() {
        view(this.content, this.API_URL);
    }
}

export class FilterConstructor {
    constructor(placesingleArray, view, d1, API_URL) {
        this.placesingleArray = placesingleArray;
        this.view = view;
        this.d1 = d1;
        this.API_URL = API_URL;
        this.filterContentMethod();
    }

    filterContentMethod() {
        filterContent(this.placesingleArray, this.API_URL); 
    }
}
