
const createElement = (arr) => {
    const htmlElement = arr.map((el) => `<button class="btn">${el}</button>`);
    console.log(htmlElement.join(" "));
}

const synonyms =['Hello', 'Hi', 'Hey'];
createElement(synonyms);