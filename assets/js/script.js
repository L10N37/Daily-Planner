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
const textEntryIDs = ['hour-9-entry','hour-10-entry','hour-11-entry','hour-12-entry',
'hour-13-entry','hour-14-entry','hour-15-entry','hour-16-entry','hour-17-entry'];
const hoursOfBusinessDay = ['hour-9','hour-10','hour-11','hour-12','hour-13','hour-14','hour-15','hour-16','hour-17'];
const localStorageKeys = ['key1','key2','key3','key4','key5','key6','key7','key8','key9'];
// roll out the timeblocks and color code them according to the current hour of day

for (let i= 0; i<9; i++) {
  // pass the setTimeTense function the for loops current index to compare against current hour of day
  // for colour coding
  createTimeBlock("div",hoursOfBusinessDay[i],"row time-block " + setTimeTense(i+9)) 
  // roll out the divs inner stuff!
  // Hours of day
  let innerAppend = getID(hoursOfBusinessDay[i]);
    let innerCreate= document.createElement("div");
      innerCreate.className= "col-2 col-md-1 hour text-center py-3";
       innerCreate.innerText= hoursText[i];
        innerAppend.appendChild(innerCreate);
  // text input areas
  innerCreate= document.createElement("textarea");
    innerCreate.className= "col-8 col-md-10 description";
      innerCreate.id= textEntryIDs[i];
        innerCreate.rows="3";
          innerAppend.appendChild(innerCreate);
  // button
  innerCreate= document.createElement("button");
    innerCreate.className= "temp";
      innerCreate.arialabel="save";
        // Revision 1: now re-using HoursText as ID's for each save button
        // we could originally use any save button and it would save all time slot entries
        // now each save button has a unique ID for click event stuff
        innerCreate.id= hoursText[i]; 
          innerAppend.appendChild(innerCreate);
  // button inner
  innerAppend = getClass("temp");
    innerCreate= document.createElement("i");
      innerCreate.className= "fas fa-save";
        innerCreate.ariahidden="true";
          innerAppend.appendChild(innerCreate);
    // a work around where we remove temp class and assign it's proper class here
    // likely other methods, but this works (or we get 9 save buttons in the 9am time slot)
    let k = getClass("temp");
      k.className="btn saveBtn col-2 col-md-1";
}

// input text array declaration (one array element for text entry per hour of business day)
let inputText =[];
// roll out previous entries into the text input area/s
  let previousEntries;
    for (let i = 0; i < 9; i++) {
      let a = getID(textEntryIDs[i]).value= localStorage.getItem(localStorageKeys[i]);
      if (a != null){
      getID(textEntryIDs[i]).value= localStorage.getItem(localStorageKeys[i]).replace(/['"]+/g, '');
      }
      else getID(textEntryIDs[i]).value= localStorage.getItem(localStorageKeys[i]);
      }

// click event listener on save button/s
for (let i = 0; i < 9; i++) { 
getID(hoursText[i]).addEventListener("click", function(event) {
  
    // Check which save button was clicked
    console.log(hoursText[i]);

    // assign each text area input box a variable/ an element position in array
    for (let i = 0; i < 9; i++) {
      inputText[i] = getID(textEntryIDs[i]).value;
      }
  // test with console
  console.log(inputText);

  // Now transfer the corresponding array element to local storage
      localStorage.setItem(localStorageKeys[i], JSON.stringify(inputText[i]));
  })
}

function createTimeBlock(elementName,elementID,elementClass){
    let create= document.createElement(elementName);
      create.id= elementID;
        create.className= elementClass;
          getID("timeBlockContainer").appendChild(create);
          }

// calculates whether the timeblock is in the past, present or future and returns the appropriate 
// class name to colour code the time block
// pastPresentorFuture variable is == index of the for loop above rolling out the time blocks + 9
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