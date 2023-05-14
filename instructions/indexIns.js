
// move to main function
function timeline() {
    let updatedDates = updateDates();
    let goIns = async function () {
        studySessionData.doneInstructions = "stratIns";
        platform.saveSession(studySessionData, true);
        let doneInstructions = await startFirstDay();
        if (doneInstructions == "doneInstructions") {
            studySessionData.doneInstructions = "doneInstructions";
            studySessionData.expDaysDate = updatedDates.fullDate;
            studySessionData.startDate = startDate;
            platform.saveSession(studySessionData);
        }
    }
    goIns();
}



