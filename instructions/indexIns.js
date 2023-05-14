
// move to main function
function timeline() {
    let updatedDates = updateDates();
    let goIns = async function () {
        studySessionData.doneInstructions = "stratIns";
        let doneInstructions = await startFirstDay();
        if (doneInstructions == "doneInstructions") {
            studySessionData.doneInstructions = "doneInstructions";
            studySessionData.expDaysDate = updatedDates.fullDate;
            studySessionData.startDate = startDate;
            platform.saveSession(studySessionData, true);
        }
    }
    goIns();
}



