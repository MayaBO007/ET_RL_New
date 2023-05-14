
// move to main function
function timeline() {
    platform.getAllSessions().then((data) => {
        if ((typeof data == "undefined") || (studySessionData.doneInstructions == "")) {
            let updatedDates = updateDates();
            let goIns = async function () {
                let doneInstructions = await startFirstDay();
                studySessionData.doneInstructions = "stratIns";
                if (doneInstructions == "doneInstructions") {
                    studySessionData.doneInstructions = "doneInstructions";
                    studySessionData.expDaysDate = updatedDates.fullDate;
                    studySessionData.startDate = startDate;
                    deleteFromSessionData();
                    platform.saveSession(studySessionData, true);
                } else {
                    moveToDay()
                }
            }
            goIns();
        }
    })

}


