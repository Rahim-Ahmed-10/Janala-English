
const createElement = (arr) => {
    const htmlElement = arr.map((el) => `<button class="btn">${el}</button>`);
    return htmlElement.join(" ");
}

const manageSpinner = (status) => {

    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }else{
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }

} 


const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")  // promise of response
    .then(res => res.json())  //promise of json data
    .then((json) =>  displayLessons(json.data))
} 

const removeActive = () => {
    const lessonsButton = document.querySelectorAll('.lessons-btn');
    lessonsButton.forEach((btn) => btn.classList.remove("active"));
}

const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
    removeActive();  //remove all active class

        // clickBtn-active-ar
        const clickBtn = document.getElementById(`lessons-btn ${id}`);
        clickBtn.classList.add("active")   //add active class
        displayLevelWord(data.data)
    });
}

const loadWordDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}

        //     {
        // "word": "Brisk",
        // "meaning": "চটপটে / দ্রুত",
        // "pronunciation": "ব্রিস্ক",
        // "level": 3,
        // "sentence": "He took a brisk walk in the morning.",
        // "points": 3,
        // "partsOfSpeech": "adjective",
        // "synonyms": [
        // "quick",
        // "energetic"
        // ],
        // "id": 27
        // }

const displayWordDetails = (word) => {
        //1.get the container.
        const detailsContainer = document.getElementById("details-container");
        detailsContainer.innerHTML = `
        <div class="">
                <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>    :${word.pronunciation})</h2>
              </div>

               <div class="">
                <h2 class="font-bold">Meaning</h2>
                <p>${word.meaning}</p>
               </div>

               <div class="">
                <h2 class="font-bold">Example</h2>
                <p>${word.sentence}</p>
               </div>

               <div class="">
                <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
                 <div class="">${createElement(word.synonyms)}</div>
               </div>
        `;
        document.getElementById("word_modal").showModal();
}

const displayLevelWord = (words) => {
    //1.Get the container & empty.
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if(words.length == 0){
        wordContainer.innerHTML = `
        <div class="text-center col-span-full py-10 space-y-6 font-bangla">
        <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <p class=" font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="text-3xl font-bold">নেক্সট Lesson এ যান</h2>
      </div>
        `;
        manageSpinner(false);
        return;
    }

     //2.Get into every lessons.
    words.forEach(word => {
        //3.create Element.
        console.log(word);
        const card = document.createElement('div');
        card.innerHTML = `
          <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
          <h2 class="font-bold text-2xl">${word.word ? word.word : "No Words Found"}</h2>
          <p class="font-semibold">Meaning /Pronounciation</p>

          <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "Not Found"} / ${word.pronunciation ? word.pronunciation : "NO pronunciation"}"</div>
          <div class="flex justify-between items-center">
            <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
          </div>

        </div>
        `;
        //4.append into container.
        wordContainer.append(card);
    });
    manageSpinner(false);
}

const displayLessons = (lessons) => {
    //1.Get the container & empty.
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    //2.Get into every lessons.
    for(let lesson of lessons){
        //3.create Element.
        console.log(lesson);
       const  btnDiv = document.createElement("div");
       btnDiv.innerHTML = `
            <button id="lessons-btn ${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lessons-btn">
            <i class="fa-brands fa-leanpub"></i> Lessons - ${lesson.level_no}
            </button>
       `;
        //4.append into container.
        levelContainer.append(btnDiv);
    } 

}

loadLessons();