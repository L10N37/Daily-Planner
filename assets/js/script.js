// insert the date (using Day.js as per grading requirement) into the header of the index.html
let dateAsString = dayjs().toString();
let y= document.createElement("p");
y.className= "lead";
y.id="currentDay";
y.innerHTML = dateAsString.slice(0,11);
getID("headerID").appendChild(y);

// This returns the current hour of the day (using Day.js), perfect!
console.log("Current hour of the Day: "+ dayjs().hour());

/*  
Grading requirements:
The "past" class adds a gray background color
The "present" class adds a red background color.
The "future" class adds a green background color.
The container for the time blocks is  <div class="container-fluid px-5">
Hours shown are of a standard business day, 9am to 5pm.
*/

const hoursText = ['9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM'];
const hoursOfBusinessDay = ['hour-9','hour-10','hour-11','hour-12','hour-13','hour-14','hour-15','hour-16','hour-17'];
// roll out the timeblocks and color code them according to the current hour of day

// using 'x' where index starting at 'zero' is required, index on for loop adjusted for time tense calc.
// otherwise need to run it through a huge if else or switch statement for conversion
let x = 0;
for (let i= 9; i!=18; i++) {
  // pass the setTimeTense function the for loops current index to compare against current hour of day
  // for colour coding
  createTimeBlock("div",hoursOfBusinessDay[x],"row time-block " + setTimeTense(i)) 
  // roll out the divs inner stuff
  let innerAppend = getID(hoursOfBusinessDay[x]);
  let innerCreate= document.createElement("div");
  innerCreate.className= "col-2 col-md-1 hour text-center py-3";
  innerCreate.innerText= hoursText[x];
  innerAppend.appendChild(innerCreate);
  x++;
}
x= 0;

function createTimeBlock(elementName,elementID,elementClass){
  let create= document.createElement(elementName);
  create.id= elementID;
  create.className= elementClass;
  getID("timeBlockContainer").appendChild(create);
  }

/*      <!-- Example of a past time block. The "past" class adds a gray background color. -->


      <div id="hour-9" class="row time-block past">

        <div class="col-2 col-md-1 hour text-center py-3">9AM</div>

        <textarea class="col-8 col-md-10 description" rows="3"> </textarea>

        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>


      </div>
*/

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

// calculates whether the timeblock is in the past, present or future and returns the appropriate 
// class name to colour code the time block
// pastPresentorFuture variable is == index of the for loop above rolling out the time blocks

function setTimeTense(pastPresentOrFuture){
let currentHour = dayjs().hour();
// past
if (currentHour > pastPresentOrFuture) return "past";
// future
else if (currentHour < pastPresentOrFuture) return "future";
// current
else if (currentHour == pastPresentOrFuture) return "present";
}

function getID(ID){
  return document.getElementById(ID);
}

function getClass(className){
  return document.querySelector("."+className);
}