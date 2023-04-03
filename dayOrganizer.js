
function moveToDay() {
    platform.getAllSessions().then((data) => {
        getIndexSessionData(data).then((i) => {
            studySessionData = data[i];
            if (typeof studySessionData == "undefined") {
                document.getElementById("moveToAppButton").style.display = "none";
                document.getElementById("front").style.display = "inline";
                document.getElementById("loading").style.display = "inline";
            }
            // let div = document.getElementById("loading");
            // div.style.removeProperty("display");
            let updatedDates = updateDates();
            if (5 == Number(getTodayDate().slice(0, 2))) { // if the date of the tests day is the same as today
                platform.goToUrl("days/twoTests/twoTests.html");
            } else if ((typeof studySessionData == "undefined") || (studySessionData.doneInstructions == "")) {
                platform.goToUrl("instructions/instructions.html");
                studySessionData.doneInstructions = "stratIns";
            } else if (studySessionData.doneInstructions == "doneInstructions") {
                if ((updatedDates.fullDate.getDate() == Number(dayDate())) && (studySessionData.isDayDone != "done")) {
                    platform.goToUrl("days/training/training.html");
                } else if ((studySessionData.isDayDone != "done") && (updatedDates.fullDate.getDate() != Number(dayDate()))) {
                    document.getElementById("problem").style.display = "inline";
                } else if ((studySessionData.isDayDone == "done") && (updatedDates.fullDate.getDate() == updatedDates.yesterday.getDate())) {
                    if (window.matchMedia("(orientation: landscape)").matches) {
                        document.getElementById("fiveAM").style.display = "inline";
                    } else {
                        document.getElementById("fiveAM_hor").style.display = "inline";
                    }
                    setTimeout(() => {
                        moveToDay();
                    }, timeToFive());
                } else if ((studySessionData.isDayDone != "done") && (updatedDates.fullDate.getDate() == updatedDates.yesterdayPlusOne.getDate())) { // if the day is done and the date is the same as yesterday+1
                    if (0 <= updatedDates.fullDate.getHours() & updatedDates.fullDate.getHours() < 5) {
                        document.getElementById("fiveAM").style.display = "inline";
                        setTimeout(() => {
                            moveToDay();
                        }, timeToFiveSameDay());
                    } else {
                        deleteFromSessionData();
                        platform.goToUrl("days/training/training.html");
                    }
                } else {
                    document.getElementById("endOfGame").style.display = "inline";
                }
            } else {
                document.getElementById("problem").style.display = "inline";
            }
        })
    });
}