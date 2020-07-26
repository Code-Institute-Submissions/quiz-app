/* End page */ 

const username = document.getElementById("username");
const submitScoreClick = document.getElementById("submitScoreClick")

username.addEventListener("change", () => {
    console.log(username.value);
    submitScoreClick.disabled = !username.value;
});


saveScore = function(e) {
    console.log("clicked the save button");
    e.preventDefault();
};