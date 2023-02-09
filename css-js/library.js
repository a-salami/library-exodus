//add a button in the footer under page last modified so it permeates across pages: "change to light mode"
//when clicked, it switches to light mode, changing the CSS to the light mode variant found in Thousand Pictures
//when clicked, the text font changes to "change to dark mode"

function dynamicRelativeReference(){
    rootFolder = ""; //holds relative file path for any href
    numSlashes = 0; //counts the number of [../] necessary to get to 'site'

    var filename = location.pathname.split("name-theory")[1]; //gets the full file path, splits it, keeps the split only after the word 'site'

    //determine number of [/] present in the root folder filepath
    for (a in filename){ //step through each character in filename
        if (filename[a] == "/"){ 
            numSlashes += 1; //count every instance of "/"
        }
    }

    // decrement 1 [/]: excludes the [/] that comes right before the filename. That's an "internal" [/]
    numSlashes -= 1;

    //creates a relative pathing string of [../]
    for (b = 0; b < numSlashes; b++){
        rootFolder += "../";
    }
    return rootFolder;
}

//creates the header for all pages
function setHeader(id){
    content = `<a href = "` + dynamicRelativeReference() + `index.html">
    <h1 id = "pageTitle">Name Theory</h1>
    <h5 id = "pageSubtitle" class = "subheader"><i>Considering whether people who share the same name share the same traits</i></h5></a>`;

    document.getElementById(id).innerHTML += content;
}

//creates the navigation bar for all pages
function setNavbar(id){
    content = `<ul>
        <li><a href = "` + dynamicRelativeReference() + `index.html">Home</a></li>
        <li><a href = "` + dynamicRelativeReference() + `pages/search.html">Search for a Name</a></li>
        <li><a href = "` + dynamicRelativeReference() + `pages/display.html">Read All Assessments</a></li>
    </ul>`;

    document.getElementById(id).innerHTML += content;
}

//customizes a greeting for the page user; called exclusively to edit setFooter()
function customizedGreeting(){
    var greeting = document.getElementById("userGreeting").value; //gets the current value of the userGreeting element in the footer
    localStorage.setItem("greeting", greeting); //assigns to local storage to ensure data retention

    if (greeting == ""){ //if the user (re)submitted a blank text field
        localStorage.setItem("greeting", "friend"); //set to 'friend'
    }

    document.getElementById("greeting").innerHTML = "Welcome, " + localStorage.getItem("greeting") + "."; //post the user's personalized/reset greeting
}

//resets the greeting for the page user; called exclusively to edit setFooter()
function resetGreeting(){
    localStorage.setItem("greeting", "friend"); //reset to 'friend'
    document.getElementById("greeting").innerHTML = "Welcome, " + localStorage.getItem("greeting") + "."; //set the userGreeting element accordingly
}

//determines when last the current page was modified; called exclusively to edit setFooter()
function pageLastModified(){
    lastModified = document.lastModified.slice(0, -3); //cutting off the seconds in the time output format hh:mm:ss

    //replacing 24hr time display with typical 12hr time display
    if(parseInt(lastModified.slice(11, 13)) > 12){ //if the hour is greater than 12
        hour = parseInt(lastModified.slice(11, 13)) - 12; //subtract 12 from it
        lastModified = lastModified.slice(0, 10) + " " + hour + ":" + lastModified.slice(14) + " p.m."; //add a p.m. to the end of the string
    }
    else{ 
        lastModified += " a.m."; //add an a.m. to the end of the string
    }

    return lastModified;
}

//switches the 'last updated' date between formats: MM/DD/YYYY hh:mm, Month DD, YYYY at hh:mm; called exclusively to edit setFooter()
function dateDisplay(){
    ogFormat = document.getElementById("modified").value;
    newFormat = "";

    if (ogFormat[0] in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]){ //if the first character is a number
        month = ogFormat.split("/")[0]; //capturing the month
        day = ogFormat.split("/")[1]; //capturing the day
        year = ogFormat.split("/")[2].split(" ")[0]; //split again to split year from time, capturing the year
        time = ogFormat.split("/")[2].split(" ")[1] + " " + ogFormat.split("/")[2].split(" ")[2]; //split again to split year from time, capturing the time
        
        switch(month){ //translate the numerical month into its written form
            case "01":
                newFormat = "January"; 
                break;
            case "02":
                newFormat = "February";
                break;

            case "03":
                newFormat = "March";
                break;

            case "04":
                newFormat = "April";
                break;

            case "05":
                newFormat = "May";
                break;

            case "06":
                newFormat = "June";
                break;

            case "07":
                newFormat = "July";
                break;

            case "08":
                newFormat = "August";
                break;

            case "09":
                newFormat = "September";
                break;
                
            case "10":
                newFormat = "October";
                break;

            case "11":
                newFormat = "Novemeber";
                break;

            case "12":
                newFormat = "December";
                break;
        }

        newFormat += " " + day + ", " + year + " at " + time;
    }
    else{ //if the first character is a character
        newFormat = pageLastModified(); //call the function that sets the original format instead of rewriting it
    }

    document.getElementById("modified").value = newFormat;
}

//switches the website theme from dark to light mode and vice versa
function lightDarkMode(){
    if (document.getElementById("lD").value == "Change to Light Mode"){ //if the text is currently about light mode
        document.getElementById("lD").value = "Change to Dark Mode"; //make it about dark mode
    }
    else{ //otherwise the text is currently about dark mode
        document.getElementById("lD").value = "Change to Light Mode"; //so make it about light mode
    }

    document.body.classList.toggle("body-light-mode"); //change the page background color
    rows = document.getElementsByClassName("row"); //gets all rows on the page and places them into an array
    for (a = 0; a < rows.length; a++){ //iterate through the array of row DOM objects
        rows[a].classList.toggle("row-light-mode"); //change the background color of all rows
        //figure out how to change the color of links in the columns of the main rows
    }
    document.getElementById("nav").classList.toggle("navbar-light-mode"); //change the navbar background color and button colors
    document.getElementById("top").classList.toggle("pageHeader-light-mode"); //change the header background color
    document.getElementById("footer").classList.toggle("pageFooter-light-mode"); //change the footer background color
}

//creates the footer for all pages
function setFooter(id){
    content = `
    <div class = "col-sm-5 greeting">
        <h4 id = "greeting">Welcome, ` + localStorage.getItem("greeting") + `.</h4>
        <h5>Want to customize this greeting?</h5>

        <form onsubmit = "customizedGreeting(); this.reset();">
            <input class = "inputText" type = "text" id = "userGreeting" placeholder = "Enter your name here..."><br>
            <input type = "submit" value = "Submit Name">
        </form>
        <input type = "submit" value = "Reset" onclick = "resetGreeting();">
    </div>

    <div class = "col-sm-7">
        <h4>This page was last updated:</h4>
        <input type = "submit" id = "modified" value = "` + pageLastModified() + `" onclick = "dateDisplay();"><br>
        <a href = "#top"><input type = "submit" value = "To Top"></a><br>
        <input type = "submit" id = "lD" value = "Change to Light Mode" onclick = "lightDarkMode();">
    </div>`;

    document.getElementById(id).innerHTML += content;
}

//capitalizes the first letter in each word. words are seperated by spaces
function capitalize(userString){
    userSplit = userString.split(" "); //split string or name into array indexes via space character
    userCapitalized = ""; //string variable to catch final capitalized word

    for (y = 0; y < userSplit.length; y++){ //iterate through each word in userSplit
        userCapitalized += userSplit[y][0].toUpperCase() + userSplit[y].slice(1) + " "; //slice 1st letter, capitalize it, paste it to rest of word
    }
    return userCapitalized.trim(); //put the capitalized name back together and return it. also trims whitespace on the end of the string
}

//getting the assessment given a user submitted name
function fetchAssessment(userName){
    assessment = ""; //variable to hold assessment text
    overallNote = ""; //note attached to the output assessement if they searched for a nonexistent name

    userName = capitalize(userName); //calling capitalize() to capitalize the names

    if (userName.length > 1){ //if the user is searching for a name and not a letter, populate overallNote with this text for potential use
        overallNote = "We don't yet have enough on " + userName + "s to provide an assessment. However, we can give you the general assessments for traits shared by all those whose names start with the letter " + userName[0] + ".<br><br>";
    }
    
    //array holding all of the names because i can't find a simple external storage unit for these
    names = [
        [ //A
            "A",
            ["Aaron", "An * is likely untrustworthy. He will, quite frankly, be bad at covering it up, but he has a way of making you overlook things.<br><br>If you're not careful, you will stop seeing the red flags and start making excuses for them. Don't go there."],
            ["Alexis Alexus", "* has much potential. She can be a fun friend and tends to be engaging in larger social gatherings. However, keep in mind that her being a fun friend doesn't make her a good friend."],
            ["Ali Alli Ally Alison Alyson Allison Allyson", "* is likely either quiet or shy and, quite honestly, a little bit annoying, but usually not to the point that you don't want to engage with her. She has a distinct personality under her shyness, quietness, or whatever annoying trait is currently keeping you from knowing her better. <br><br>She is likely holding herself hostage with her quietness or shyness. If you make the first step to engage her, she'll return the energy you give her. Give * A chance; she really might surprise you."],
            ["Aliana Alyana Aliyana", "*s can be kind of rough to deal with.<br><br>They do anything to get what they want, and will propably manipulate you into helping them.<br><br>*s also tend to be drama queens. If you're not into that, then watch your back."],
            ["Alia", "Please do yourself a favor and do not, under any circumstances, get close to an *.<br><br>She likely seems innocent enough on the outside, but she'll very quickly draw you into her mess and coerce you into 'helping' her.<br><br>If you're too kindhearted to say no, help from afar. If you're not, disengage right away and thank me later.<br><br>She's a drama queen of obscene proportions. Don't let her fool you. She may mean well, but she will drag you into a state of no longer meaning well quite easily. Be careful."],
            ["Amanda", "*s are hardheaded and stubborn, but you will love them.<br><br>They're hilariously funny, whether you share their direct sense of humor or not.<br><br>You'll need to be patient with your *- that aforementioned stubbornness can get in the way of your relationship if you let it. Work through it and you'll be golden."],
            ["Andrew", "*s are interesting men. They're not inherently bad or good to keep around, but you will need to stay aware.<br><br>They do not know how to express themselves very well despite having a lot to say. They can also be rather wishy-washy in their decision making, and it will be visible/palpable even if they do not tell you.<br><br>They're likely to be introverted and relatively softspoken, but if you establish mutual trust and are patient, your * will open up to you. They can be good friends despite their many quirks."],
            ["Andy", "*s are absolute sweethearts in every way. They have a great sense of humor and a smile for every day of the week.<br><br>Keep your * close, and be nice to him. He deserves it."],
            ["Overall", "Quite an interesting letter. Many A names a bit odd, but they tend to be endearing. They're great friends once you get to know them.<br><br>They usually hold a few traits that seem a little 'much' to handle or are simply annoying, but they are typically easy to work past. If you're willing to get to know an A on a deeper level, they're cool to hang around."]
        ],

        [ //B
            "B",
            ["B Name", "B Name assessment"],
            ["Overall", "Overall B assessment"]
        ]
    ]; 
    //finish filling out this area with the remaining names in namestorip.json

    //for loop to fetch the assessment
    for (i = 0; i < names.length; i++){ 
        if (userName[0] == names[i][0]){ //if the first letter of userName matches the first letter (first index) in a sub-array

            if (userName.length == 1){ //if userName is a single letter
                assessment = names[i][names[i].length-1][1]; //provide the overall assessment by default
                break;
            }

            for (a = 0; a < names[i].length; a++){ //iterate through that sub-array
                //using toUpperCase to avoid case issues
                if (names[i][a][0].toUpperCase().includes(userName.toUpperCase())){ //if the (array of) name(s) contains userName (i.e. a match)
                    assessment = names[i][a][1]; //catch that as the assessment value
                    return assessment;
                }

                if (names[i][a][0] == "Overall"){ //if userName is not in the array
                    assessment = names[i][a][1]; //provide the overall letter assessment
                }
            }
        }
    }
    return overallNote + assessment;
}

//displays the user inputted name's assessment on search.html
function nameDisplay(){
    userName = document.getElementById("userName").value; //gets the current value of the userName form ID
    document.getElementById("displayName").innerHTML = "-" + userName.toUpperCase() + "-"; //set the right panel's title to userName

    assessment = fetchAssessment(userName); //call fetchAssessment to fetch the assessment text
    assessment = assessment.split("*").join(capitalize(userName)); //replacing * [the mark for replacement] in the assessment text with userName

    document.getElementById("displayAssessment").innerHTML = assessment; //set the right panel's <p> to assessment

}