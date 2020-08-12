# Quiz App

Welcome to my project and thank you for checking it out! This will be an online quiz app that should provide some lighthearted fun to anybody
who wishes to use it. If you have any questions, please feel free to reach out and I will be happy to discuss. 

## Contents: 

* [Planning](#planning)
    * [Wireframes - Website Design](*#wireframes-website-design)
    * [Flowchart - Website Structure](*flowchart-website-structure)
* [UX](#ux)
    * [Overall Project Goals](#overall-project-goals)
    * [User Goals](#user-goals)
    * [User Stories](#user-stories)
    * [Design Decisions](#design-decisions)
        * [Fonts](#fonts)
        * [Icons](#icons)
        * [Colours](#colours)
* [Technologies Used](#technologies-used)
    * [Languages](#languages)
    * [Libraries and Tools](#libraries-and-tools)
* [Testing](#testing)
* [Bugs](#bugs) 
* [Deployment](#deployment)
* [Closing Notes](#closing-notes)
* [Credits](#credits)
* [Copyright and Disclaimer](#copyright-and-disclaimer)

## Planning 
### Wireframes
### Flowchart

## UX 
### Overall Project Goals 

The overall objective of this project is to **provide users with an enjoyable and educational quiz app** that can be easily accessed online. 
This website should be easy to navigate, providing users with a seamless experience as they move from question to question. The website
should be fully responsive and accessible from all devices and screen sizes. 


### User Goals
* **Educational website** that allows users to answer questions on general knowledge.
* **Well placed calls to action** which allow the user to easily navigate to a game or view the high scores.
* Ability to **view high scores** for some added healthy competition.
* **Seamless UX experience for the user** via a planned design with contrasting colours to allow high readability.
* Use the website across all screen sizes, from desktop to mobile. **Fully responsive design**.

### User Stories
Each of the following user stories contributed to the design of the website, to ensure the user had the most effortless experience;
* As a user I would expect to be able to **see my progress as I worked through the questions presented on screen.** This was achieved by
incorporating a progress bar into the design of the quiz. 
* As a user I would enjoy seeing **high scores on the leaderboard for the quiz**. This was achieved by adding a high scores section
that each user can click into. 
* As a user I would expect to be able to **see each potential multi choice answer clearly**, so I could confidently
select whichever option I thought was correct. This was achieved through the design of the multichoice answers, where each
option had a clear border and was labelled A, B, C or D, depending on it's position. 
* As a user I would expect the **multiple choice options to display in random order each time**, i.e. don't show the correct answer
in the same position each time. Logic was implemented to achieve random order for each question displayed.

### Design Decisions
#### Fonts
The chosen font for this project was <a href="https://fonts.google.com/specimen/Inconsolata?query=inc">Inconsolata which was provided by Google fonts.</a>
This is a monospaced font, which were widely used in earlier computers. Based on this, it gave an authentic old school feel
to the quiz app, which is why it was selected for this project.

#### Icons
#### Colours
* **Primary: #27496d "Dark Navy"** - This colour will be shown as the background throughout the game. It is quite a dark colour
which is paired with white text to allow contrast for readability. 
* **Secondary: #00909e** - This is a dark turqioise, which compliments the dark navy. 
* Inspiration was taken here from the online tool <a href="https://colorhunt.co/">Color Hunt</a>, where <a href="https://colorhunt.co/palette/180289">this dark 
navy inspired palette</a> was chosen for colours throughout the website.

### Technologies Used
#### Languages
* <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">HTML</a>
* <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">CSS</a>
* <a href="https://www.w3schools.com/js/">JavaScript</a>


#### Libraries and Tools
* <a href="https://getbootstrap.com/">Bootstrap</a>
* <a href="https://fonts.google.com/">Google Fonts</a>
* <a href="https://git-scm.com/">Git</a>
* <a href="https://colorhunt.co/">Color Hunt</a>

### Testing

### Bugs

Problem: When clicking the answer options they wouldn't always respond. If you clicked them, they would sometimes just highlight in grey but no action would be taken.
Solution: It turned out that the click event was added to the actual p tag within the button, rather than the full button. The click event needed to be moved to the whole button.
This way there would be a response, regardless of whether the user clicked the actual text or not, as long as it was in the button.

Problem: When using the API, some characters are not appearing properly. For example, "world's" is appearing as "world&#039;s" . This happens throughout the questions, in situations 
where commas or apostrophes are used. After some research, it turned out that this was because the HTML entities need to be decoded. 

Problem: There was an error in the console that was appearing "Uncaught ReferenceError: questions is not defined at startQuiz (script.js:73), at script.js:139". 
Solution: This was because there was a reference to questions when it had not been defined. This caused some confusion, as it was actually defined within the js file. However, I needed to 
add it to the global scope. Based on this, I added an empty array titled questions, but this seemed to break functionality and the API questions were no longer pulling through. After a lot 
of investigating with debugger tools, and some help from tutor support, we realised that it wasn't working because I called another function startQuiz at the end of my code, 
which was running that function before the server returns the questions. This meant that when an if statement was checked, the questions did not return the intended value. 
I removed the function from the end of the code, and placed it within the correct location. This did the trick!

Problem: On the page where you would select the answers to the question, there was a delay (separate from the delay above) when clicking the answers.

Problem: When the user finished a game and clicked home and then start, the question counter and the user score would not reset. This meant that the user started the second game with a 
question count of 4/3 and it would end immediately after that first question. 
Solution: After some investigation, it seemed that the problem was stemming from the fact the page was just showing and hiding elements - the score or counter was thus never refreshed. 
I added a location.reload(); to a click event for the button "Home". This had the effect of restarting the game each time, with the user score and counter to 0. 

Problem: In order to style the page positioning, I used CSS flexbox. This had the effect of centre aligning the content both vertically and horizontally. However, as I was also using 
jQuery to show and hide sections, flexbox was using "display:none;" for styling, while jQuery was adding "display: none;" and "display:block;" to different sections. 
Solution: After experimenting with dev tools, I realized that this was causing the broken styling issue. To solve this I added another div that wrapped the content, so there would be a div
enclosing each section which had an id showing which section - jQuery would use this. Then for the styling, then was another div with the id "container". 

### Deployment

### Closing Notes

### Credits 

### Copyright and Disclaimer
This website was originally built for education purposes only.
