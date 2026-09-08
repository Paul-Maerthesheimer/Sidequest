const yesButton = document.querySelector("#yesButton");
const noButton = document.querySelector("#noButton");

const showQuestsButton = document.querySelector(
  "#showQuestsButton"
);

const dateContinueButton = document.querySelector(
  "#dateContinueButton"
);

const dateBackButton = document.querySelector(
  "#dateBackButton"
);

const acceptButton = document.querySelector("#acceptButton");
const backButton = document.querySelector("#backButton");

const introBackButton = document.querySelector(
  "#introBackButton"
);

const restartButton = document.querySelector(
  "#restartButton"
);

const screens = document.querySelectorAll(".screen");

const introScreen = document.querySelector("#introScreen");

const celebrationScreen = document.querySelector(
  "#celebrationScreen"
);

const choiceScreen = document.querySelector("#choiceScreen");
const dateScreen = document.querySelector("#dateScreen");
const detailScreen = document.querySelector("#detailScreen");

const detailQuest = document.querySelector("#detailQuest");

const detailDescription = document.querySelector(
  "#detailDescription"
);

const detailMode = document.querySelector("#detailMode");

const detailDifficulty = document.querySelector(
  "#detailDifficulty"
);

const detailLocation = document.querySelector(
  "#detailLocation"
);

const continueToDateButton = document.querySelector(
  "#continueToDateButton"
);

const detailBackButton = document.querySelector(
  "#detailBackButton"
);
const resultScreen = document.querySelector("#resultScreen");

const acceptedScreen = document.querySelector(
  "#acceptedScreen"
);

const questCards = document.querySelectorAll(".questCard");

const selectedQuest = document.querySelector(
  "#selectedQuest"
);

const selectedDescription = document.querySelector(
  "#selectedDescription"
);

const selectedDate = document.querySelector("#selectedDate");
const acceptedQuest = document.querySelector("#acceptedQuest");
const acceptedDate = document.querySelector("#acceptedDate");

const resultMode = document.querySelector("#resultMode");

const resultDifficulty = document.querySelector(
  "#resultDifficulty"
);

const resultLocation = document.querySelector(
  "#resultLocation"
);

const dateInput = document.querySelector("#dateInput");
const noMessage = document.querySelector("#noMessage");
const prayingPhoto = document.querySelector("#prayingPhoto");

const stepLabel = document.querySelector("#stepLabel");
const progressFill = document.querySelector("#progressFill");

let chosenQuest = "";
let formattedDate = "";
let noClickCount = 0;

const questDetails = {
  "Opening Move":
    "Kaffee / Tee, Schach, Gespräche & vielleicht Spazieren",

  "New Map Unlocked":
    "Wir entdecken zsm. eine neue Stadt, die wir beide noch nicht besucht haben. Kann übrigens auch außerhalb von Deutschland liegen",

  "Limited-Time Loot":
  "Wir gehen zsm. auf den Flohmarkt & vielleicht halt einfach noch durch Nürnberg",

  "Secret Option":
  "Du hast wahrscheinlich nicht so viel Zeit. Verstehe ich. Wenn du möchtest können wir auch gerne mehrere Quests zsm. würfeln, einen anderen Flohmarkt suchen, oder was ganz anderes machen. "

    
};

const questInformation = {
  "Opening Move": {
    mode: "Chillige Zeit",
    difficulty: "Leicht",
    location: "Heidenheim / Erlangen / ?"
  },

  "New Map Unlocked": {
    mode: "Entdeckung / Abenteuer",
    difficulty: "Medium - Schwer",
    location: "Europa"
  },

  "Limited-Time Loot": {
    mode: "Loot-Grabbing",
    difficulty: "Leicht-Medium",
    location: "Nürnberg"
  },
  "Limited-Time Loot": {
  mode: "Loot-Grabbing",
  difficulty: "Leicht-Medium",
  location: "Nürnberg" 
  },
  "Secret Option": {
  mode: "Mix & Match",
  difficulty: "Unberechenbar",
  location: "Mal schauen"
}
};

const noMessages = [
  "Sicher?",
  "Wirklich ganz sicher?",
  "Du lässt mir keine Wahl: Ich muss wohl auf Voodoo zurückgreifen",
  "Kerze an, Schicksal beschworen, Ausreden wurden leider verloren. Doch frei bleibt Wille, Herz und Hand: Wird dieses Date hier anerkannt?",
  "Hmmm... hat anscheinend nicht geklappt...",
  "Biiiiiiiiiiiiitttttttttttteeeeeeeeeeee",
  "Okay... letzter Trick. (insert fieses Lachen)",
  "Error67. Neeee nicht gefunden",
  "Error67. Neeee nicht gefunden",
  "Error67. Neeee nicht gefunden",
  "Du klickst ja ganz schön oft auf Nein... och...",
  "Error67. Neeee nicht gefunden",
  "Error67. Neeee nicht gefunden",
  "Error67. Neeee nicht gefunden",
  "Error67. Neeee nicht gefunden",
  "Error67. Neeee nicht gefunden",
  "Error67. Neeee nicht gefunden",
  "Error67. Neeee nicht gefunden",
  "Error67. Neeee nicht gefunden",
  "Error67. Neeee nicht gefunden",
  "Error67. Neeee nicht gefunden",
  "Error67. Neeee nicht gefunden",
  "Error67. Neeee nicht gefunden",
  "Error67. Neeee nicht gefunden",
  "Error67. Neeee nicht gefunden",
  "Error67. Neeee nicht gefunden",
  "Error67. Neeee nicht gefunden",
  "Error67. Neeee nicht gefunden",
  "Error67. Neeee nicht gefunden",
  "Error67. Neeee nicht gefunden",
  "Error67. Neeee nicht gefunden",
  "Error67. Neeee nicht gefunden"
];

/* Verhindert die Auswahl vergangener Tage */
const today = new Date();

today.setMinutes(
  today.getMinutes() - today.getTimezoneOffset()
);

dateInput.min = today.toISOString().split("T")[0];

/* Wechselt zwischen den verschiedenen Seiten */
function showScreen(screenToShow, step) {
  screens.forEach(function (screen) {
    screen.classList.remove("active");
  });

  screenToShow.classList.add("active");

  stepLabel.textContent = `QUEST 0${step} / 04`;
  progressFill.style.width = `${(step / 4) * 100}%`;
}

/* Betendes Foto anzeigen */
function showPrayingPhoto() {
  if (prayingPhoto === null) {
    return;
  }

  prayingPhoto.classList.add("visible");
  prayingPhoto.setAttribute("aria-hidden", "false");
}

/* Betendes Foto ausblenden */
function hidePrayingPhoto() {
  if (prayingPhoto === null) {
    return;
  }

  prayingPhoto.classList.remove("visible");
  prayingPhoto.setAttribute("aria-hidden", "true");
}

/* Positive Antwort */
yesButton.addEventListener("click", function () {
  noClickCount = 0;
  noMessage.textContent = "";
  noButton.textContent = "Nah";

  hidePrayingPhoto();
  showScreen(celebrationScreen, 1);
});

/* Der Nein-Button fragt immer wieder nach */
noButton.addEventListener("click", function () {
  const messageIndex = noClickCount % noMessages.length;

  noMessage.textContent = noMessages[messageIndex];
  noClickCount += 1;

  noButton.textContent = "Neeee";

  if (noClickCount >= 3) {
    showPrayingPhoto();
  }
});

/* Freudenbildschirm → Sidequest-Auswahl */
showQuestsButton.addEventListener("click", function () {
  showScreen(choiceScreen, 2);
});

/* Sidequest auswählen */
questCards.forEach(function (questCard) {
  questCard.addEventListener("click", function () {
    chosenQuest = questCard.dataset.quest;

    const information = questInformation[chosenQuest];

    detailQuest.textContent = chosenQuest;
    detailDescription.textContent =
      questDetails[chosenQuest];

    detailMode.textContent = information.mode;
    detailDifficulty.textContent =
      information.difficulty;
    detailLocation.textContent =
      information.location;

    showScreen(detailScreen, 3);
  });
});

/* Detailseite → Datumsauswahl */
continueToDateButton.addEventListener(
  "click",
  function () {
    showScreen(dateScreen, 3);
  }
);

/* Detailseite → Sidequest-Auswahl */
detailBackButton.addEventListener(
  "click",
  function () {
    showScreen(choiceScreen, 2);
  }
);

/* Kalender-Button aktivieren */
dateInput.addEventListener("input", function () {
  dateContinueButton.disabled = dateInput.value === "";
});

/* Datum bestätigen */
dateContinueButton.addEventListener("click", function () {
  if (dateInput.value === "") {
    return;
  }

  const date = new Date(
    `${dateInput.value}T12:00:00`
  );

  formattedDate = new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(date);

selectedQuest.textContent = chosenQuest;
selectedDescription.textContent =
  questDetails[chosenQuest];

selectedDate.textContent = formattedDate;

const information = questInformation[chosenQuest];

resultMode.textContent = information.mode;
resultDifficulty.textContent = information.difficulty;
resultLocation.textContent = information.location;

showScreen(resultScreen, 5);
});

/* Zusammenfassung → endgültige Annahme */
acceptButton.addEventListener("click", function () {
  acceptedQuest.textContent = chosenQuest;
  acceptedDate.textContent = formattedDate;

  showScreen(acceptedScreen, 4);
});

/* Zusammenfassung → Kalender */
backButton.addEventListener("click", function () {
  showScreen(dateScreen, 3);
});

/* Kalender → Sidequest-Auswahl */
dateBackButton.addEventListener("click", function () {
  showScreen(detailScreen, 3);
});

/* Sidequest-Auswahl → Anfang */
introBackButton.addEventListener("click", function () {
  showScreen(introScreen, 1);
});

/* Website vollständig zurücksetzen */
restartButton.addEventListener("click", function () {
  chosenQuest = "";
  formattedDate = "";
  noClickCount = 0;

  noMessage.textContent = "";
  noButton.textContent = "Nah";

  hidePrayingPhoto();

  dateInput.value = "";
  dateContinueButton.disabled = true;

  showScreen(introScreen, 1);
});

/* Richtigen Anfangszustand herstellen */
showScreen(introScreen, 1);