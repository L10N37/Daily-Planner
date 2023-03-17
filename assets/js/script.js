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

// using 'x' where index starting at 'zero' is required, index on for loop adjusted for time tense calc.
// otherwise need to run it through a huge if else or switch statement for conversion
let x = 0;
for (let i= 9; i!=18; i++) {
  // pass the setTimeTense function the for loops current index to compare against current hour of day
  // for colour coding
  createTimeBlock("div",hoursOfBusinessDay[x],"row time-block " + setTimeTense(i)) 
  // roll out the divs inner stuff!
  // Hours of day
  let innerAppend = getID(hoursOfBusinessDay[x]);
    let innerCreate= document.createElement("div");
      innerCreate.className= "col-2 col-md-1 hour text-center py-3";
       innerCreate.innerText= hoursText[x];
        innerAppend.appendChild(innerCreate);
  // text input areas
  innerCreate= document.createElement("textarea");
    innerCreate.className= "col-8 col-md-10 description";
      innerCreate.id= textEntryIDs[x];
        innerCreate.rows="3";
          innerAppend.appendChild(innerCreate);
  // button
  innerCreate= document.createElement("button");
    innerCreate.className= "temp";
      innerCreate.arialabel="save";
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
        x++;
}
x= 0;

// input text array declaration (one array element for text entry per hour of business day)
let inputText =[];
  // now we roll out our local storage into the array (if it exists)
  for (let i = 0; i < 9; i++) {
    inputText[i]= localStorage.getItem(localStorageKeys[i]);
    }
// now set the input text to what was previously entered (if anything)
  let previousEntries;
    for (let i = 0; i < 9; i++) {
      let a = getID(textEntryIDs[i]).value= localStorage.getItem(localStorageKeys[i]);
      if (a != null){
      getID(textEntryIDs[i]).value= localStorage.getItem(localStorageKeys[i]).replace(/['"]+/g, '');
      }
      else getID(textEntryIDs[i]).value= localStorage.getItem(localStorageKeys[i]);
      }
// click event listener on save button/s
document.querySelectorAll('.saveBtn').forEach(item => {
  item.addEventListener('click', event => {
    // input text capture array assignment (on click)
    for (let i = 0; i < 9; i++) {
      inputText[i] = getID(textEntryIDs[i]).value;
      }
  // test with console
  console.log(inputText);
  // Now transfer the array to local storage
    for (let i = 0; i < 9; i++) {
      localStorage.setItem(localStorageKeys[i], JSON.stringify(inputText[i]));
      }
  // test with console, just 9am entry should do
  console.log(localStorage.getItem(localStorageKeys[0]));
  })
})

function createTimeBlock(elementName,elementID,elementClass){
    let create= document.createElement(elementName);
      create.id= elementID;
        create.className= elementClass;
          getID("timeBlockContainer").appendChild(create);
          }

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