//add a button in the footer under page last modified so it permeates across pages: "change to light mode"
//when clicked, it switches to light mode, changing the CSS to the light mode variant found in Thousand Pictures
//when clicked, the text font changes to "change to dark mode"

function dynamicRelativeReference(){
    rootFolder = ""; //holds relative file path for any href
    numSlashes = 0; //counts the number of [../] necessary to get to 'site'

    var filename = location.pathname.split("library-exodus")[1]; //gets the full file path, splits it, keeps the split only after the word 'site'

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
    <h1 id = "pageTitle">Library Exodus</h1>
    <h5 id = "pageSubtitle" class = "subheader"><i>Cataloguing the contents of my personal library</i></h5></a>`;

    document.getElementById(id).innerHTML += content;
}

//creates the navigation bar for all pages
function setNavbar(id){
    content = `<ul>
        <li><a href = "` + dynamicRelativeReference() + `index.html">Home</a></li>
        <li><a href = "` + dynamicRelativeReference() + `pages/look-books.html">Look at Books</a></li>
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

        newFormat += " " + day + ", " + year + " at " + time; //adding the captured date elements to a string formatting the text-based date format
    }
    else{ //if the first character is a character
        newFormat = pageLastModified(); //call the function that sets the original numerical format instead of rewriting it
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

//holds the array of books; returns the entire thing on call. seperated for use between tableSort and setTable
function fetchBooks(){
    books = [ //array holding all books to be displayed
        ["B1 Title", "A A", "G1", "S1", "pagecount", "A", "A"],
        ["B2 Title", "A A", "G2", "S1", "pagecount", "A", "A"],
        ["A1 Title", "A A", "G3", "S4", "pagecount", "A", "A"],
        ["B3 Title", "A B", "G1", "-", "pagecount", "A", "B"]
    ];

    return books;
}

//adds different versions of sorting for the butttons on look-books.html
function tableSort(sortType){
    books = fetchBooks(); //fetching the default-sorted array of books

    if (sortType == "a-z-title"){
        books = books.sort();
        
    }
    //put in the rest of the sorting categories here

    document.getElementById("tableSpace").innerHTML = ""; //blank out the display div to prepare it for the new table 
    setTable("tableSpace", books); //call setTable with the newly sorted array
}

//creates a table and populates it
function setTable(id, sortedBooks = ""){

    if (sortedBooks == ""){ //if sortedBooks is empty, meaning tableSort hasn't been called to re-sort the array
        books = fetchBooks(); //the fetch the books array as-is with no sorting
    } 
    else{ //in any other scenario, a sorting button on look-books.html has been pressed and tableSort() was called
        books = sortedBooks;  //tableSort() calls setTable() again after it has sorted books[] to display the proper sorting
    } //set the sorted array from tableSort() as the array to be displayed

    // document.getElementById("testing").innerHTML += books; //testing


    content = `<table> <tr> <th colspan = "5">BOOKS </th> </tr>`; //adding a row to the table for the title
    content += `<tr> <th>Title</th> 
    <th>Author</th> 
    <th>Genre</th> 
    <th>Series</th> 
    <th>Page Count</th> 
    </tr>`; //adding rows to the table for headings

    for (book = 0; book < books.length; book++){ //iterate through the array of books
        content += "<tr>"; //creating a new row for this book entry

        // document.getElementById("testing").innerHTML += "Current Book: " + books[book][0] + "<br>"; //testing


        //iterate through the info on one book held in a subarray. 
        for (info = 0; info < books[book].length - 2; info++){ //-2 to exclude authFirst and authLast; only used for sorting
            content += "<td>" + books[book][info] + "</td>";

            // document.getElementById("testing").innerHTML += "-----Current Contents: " + books[book][info] + "<br><br>"; //testing

            // content += "<td> hey </td>"; //testing
        }
        
        content += "</tr>"; //closing the row for this table entry
    }

    content += `</table>`; //closing and completing the table
    document.getElementById(id).innerHTML += content;
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