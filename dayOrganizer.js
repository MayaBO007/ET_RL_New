function moveToDay() {
    platform.getAllSessions().then((data) => {
        getIndexSessionData(data).then((i) => {
            const studySessionData = data[i];
            const updatedDates = updateDates();
            const todayDate = getTodayDate().slice(0, 2);

            const moveToAppButton = document.getElementById("moveToAppButton");
            const loading = document.getElementById("loading");
            const endOfGame = document.getElementById("endOfGame");
            const problem = document.getElementById("problem");

            if (todayDate === "11" && studySessionData.doneTest1 !== "doneTest1") {
                platform.goToUrl("days/twoTests/twoTests.html");
            } else if (typeof studySessionData === "undefined" || studySessionData.doneInstructions === "") {
                platform.goToUrl("instructions/instructions.html");
                studySessionData.doneInstructions = "stratIns";
            } else if (studySessionData.doneInstructions === "doneInstructions") {
                if (
                    studySessionData.isDayDone === "done" &&
                    studySessionData.doneTest1 !== "doneTest1" ||
                    updatedDates.fullDate.getDate() === Number(dayDate())) {
                    platform.goToUrl("days/training/training.html");
                } else if (
                    studySessionData.isDayDone !== "done" &&
                    updatedDates.fullDate.getDate() !== Number(dayDate())
                ) {
                    problem.style.display = "inline";
                } else if (studySessionData.doneTest1 === "doneTest1") {
                    platform.goToUrl("days/devTest/devTest.html");
                } else if (studySessionData.doneTest2 === "doneTest2") {
                    moveToAppButton.style.display = "none";
                    loading.style.display = "none";
                    endOfGame.style.display = "inline";
                }
            } else {
                moveToAppButton.style.display = "none";
                loading.style.display = "none";
                endOfGame.style.display = "inline";
            }
        })
    });
}