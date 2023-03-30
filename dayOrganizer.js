
function moveToDay() {
    platform.getAllSessions().then((data) => {
        getIndexSessionData(data).then((i) => {
            studySessionData = data[i];
            document.getElementById("moveToAppButton").style.display = "none";
            document.getElementById("front").style.display = "inline";
            document.getElementById("loading").style.display = "inline";
            // let div = document.getElementById("loading");
            // div.style.removeProperty("display");
            let updatedDates = updateDates();
            if (30 == Number(dayDate())) { // if the date of the last training is the same as today
                platform.goToUrl("days/dayThree.html");
            } else if ((typeof studySessionData == "undefined") || (studySessionData.doneInstructions == "")) {
                platform.goToUrl("instructions/instructions.html");
                studySessionData.doneInstructions = "stratIns";
            } else if (studySessionData.doneInstructions == "doneInstructions") {
                if (updatedDates.fullDate.getDate() == Number(dayDate())) {
                    //if start date == today: go to day 1
                } else if (studySessionData.isDayDone != "done") {
                    document.getElementById("problem").style.display = "inline";
                } else if (updatedDates.fullDate.getDate() == updatedDates.yesterday.getDate()) {
                    if (window.matchMedia("(orientation: landscape)").matches) {
                        document.getElementById("fiveAM").style.display = "inline";
                    } else {
                        document.getElementById("fiveAM_hor").style.display = "inline";
                    }
                    setTimeout(() => {
                        moveToDay();
                    }, timeToFive());
                } else if (updatedDates.fullDate.getDate() == updatedDates.yesterdayPlusOne.getDate()) { //|| yesterdayPlusOne.getDate() - fullDate.getDate() > 25 ) {)
                    if (0 <= updatedDates.fullDate.getHours() & updatedDates.fullDate.getHours() < 5) {
                        document.getElementById("fiveAM").style.display = "inline";
                        setTimeout(() => {
                            moveToDay();
                        }, timeToFiveSameDay());
                    } else {
                        deleteFromSessionData();
                        platform.goToUrl("days/dayOne/dayOne.html");
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