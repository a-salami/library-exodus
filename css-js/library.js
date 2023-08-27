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
        <li><a href = "` + dynamicRelativeReference() + `pages/want-books.html">Books Wishlist</a></li>
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
    series = [ //holds all series
    "The Wildwood Chronicles", "The Chronicles of Narnia", "Percy Jackson & The Olympians", "The Legend of Zelda", "A Tale of the Wide Awake Princess",
    "The Heroes of Olympus"
    ];

    //holds repeat authors
    authors = [
        ["C. S.", "Lewis"],
        ["Rick", "Riordan"],
        ["Gail Carson", "Levine"],
        ["Susane", "Colasanti"],
        ["John", "Green"],
        ["E. D.", "Baker"] //5
    ];

    genres = [ //holds all genres
        "Fantasy", "Realistic Fiction", "YA", "Romance", "Manga/Comic", "Historical Fiction", 
        "Children's"
    ]

    books = [ //holds all books. title, author first name, author last name, genre, page count, series
        ["The Legend of Zelda: Ocarina of Time", "Akira", "Himekawa", genres[4], "?", series[3]],
        ["The Legend of Zelda: Oracle of Seasons / Oracle of Ages", "Akira", "Himekawa", genres[4], "?", series[3]],
        ["Where the Mountain Meeets the Moon", "Grace", "Lin", genres[0], 279],
        ["The Hobbit", "J. R. R.", "Tolkien", genres[0], 300],
        ["This is What Happy Looks Like", "Jennifer E.", "Smith", `${genres[2]}, ${genres[3]}`, 404],
        ["Wildwood", "Colin", "Meloy", genres[0], 541, series[0]],
        ["Under Wildwood", "Colin", "Meloy", genres[0], 559, series[0]],
        ["Wildwood Imperium", "Colin", "Meloy", genres[0], 580, series[0]],
        ["A Darker Shade of Magic", "V. E.", "Schwab", genres[0], 398, "Shades of Magic"],
        ["The Star Thief", "Lindsey", "Becker", genres[0], 402],
        ["It's Kind of a Funny Story", "Ned", "Vizzini", genres[1], 444],
        ["The Magician's Nephew", authors[0][0], authors[0][1], genres[0], 202, series[1]],
        ["The Neverending Story", "Michael", "Ende", genres[0], 511],
        ["The Last Battle", authors[0][0], authors[0][1], genres[0], 211, series[1]],
        ["Prince Caspian", authors[0][0], authors[0][1], genres[0], 223, series[1]],
        ["The Voyage of the Dawn Treader", authors[0][0], authors[0][1], genres[0], 248, series[1]],
        ["The Silver Chair", authors[0][0], authors[0][1], genres[0], 243, series[1]],
        ["The Outcasts of 19 Schuyler Place", "E. L.", "Konigsburg", genres[1], 296],
        ["Dinner for Two", "Mike", "Gayle", genres[1], 338],
        ["Miss Invisible", "Laura Jensen", "Walker", genres[1], 306],
        ["Loveboat, Taipei", "Abigail Hing", "Wen", genres[1], 414],
        ["The Extraordinary Secrets of April, May, and June", "Robin", "Benway", genres[1], 281],
        ["The Horse and His Boy", authors[0][0], authors[0][1], genres[0], 224, series[1]],
        ["The Lion, the Witch, and the Wardrobe", authors[0][0], authors[0][1], genres[0], 189, series[1]],
        ["Where She Went", "Gayle", "Forman", genres[1], 260],
        ["The Lightning Thief", authors[1][0], authors[1][1], genres[0], 375, series[2]],
        ["The Sea of Monsters", authors[1][0], authors[1][1], genres[0], 279, series[2]],
        ["The Titan's Curse", authors[1][0], authors[1][1], genres[0], 312, series[2]],
        ["The Battle of the Labyrinth", authors[1][0], authors[1][1], genres[0], 361, series[2]],
        ["The Last Olympian", authors[1][0], authors[1][1], genres[0], 381, series[2]],
        ["Aru Shah and the End of Time", "Roshani", "Chokshi", genres[0], 343],
        ["The Two Princesses of Bamarre", authors[2][0], authors[2][1], genres[0], 239],
        ["Take Me There", authors[3][0], authors[3][1], genres[3], 290],
        ["Paper Towns", authors[4][0], authors[4][1], `${genres[2]}, ${genres[1]}`, 305],
        ["Mandy", "Julie", "Edwards", genres[5], 279],
        ["That Part Was True", "Deborah", "McKinlay", genres[1], 225],
        ["Johnny Kellock Died Today", "Hadley", "Dyer", genres[5], 152],
        ["The Absolutely True Diary of a Part-Time Indian", "Sherman", "Alexie", `${genres[2]}, ${genres[1]}`, 230],
        ["Princess in Disguise", authors[5][0], authors[5][1], `${genres[6]}, ${genres[0]}`, 215, series[4]],
        ["Third Wish Vol.1", "Robert", "Fulghum", genres[0], 501],
        ["Third Wish Vol.2", "Robert", "Fulghum", genres[0], 415],
        ["The House of Hades", authors[1][0], authors[1][1], genres[0], 583, series[5]],
        ["The Invention of Hugo Cabret", "Brian", "Selznick", `${genres[0]}, ${genres[5]}`, 523],
        ["The Marvels", "Brian", "Selznick", `${genres[0]}, ${genres[5]}`, 647],
        ["Wonder Struck", "Brian", "Selznick", `${genres[0]}, ${genres[5]}`, 627]
        ];
    //["", "", "", "", ] //template
    return books;
}

//searches for specific books and returns them if found. for use with tableSort()
function fetchSearch(search){
    searchFound = []; //array that will hold books found from the search criteria

    for (book = 0; book < books.length; book++){ //iterate through books[]
        for (info = 0; info < books[book].length; info++){ //iterate through the chosen book
            if (String(books[book][info]).toUpperCase().search(search.toUpperCase()) != -1){ //if 'search' appears anywhere in this book (toUpperCase()-es used to mitigate case sentitivity, String() used so pagecount can be searched on)
                searchFound.push(books[book]); //push the entire book entry into searchFound[]
                break; //break and search the next book entry
            }
        }
    }

    if (searchFound.length > 0){ //if at least one book was found
        if (searchFound.length == 1){ //if only one book was found
            //display the search return string with "result" instead of "results"
            document.getElementById("searchDisplay").innerHTML = 'Your search "' + search + '" yielded ' + searchFound.length + " result, displayed in the table below.";
        }
        else{ //if more than one book was found
            //display the search return string with "results"
            document.getElementById("searchDisplay").innerHTML = 'Your search "' + search + '" yielded ' + searchFound.length + " results, displayed in the table below."; 
        }
        return searchFound; //only returns if something was found
    }
    else{ //otherwise, no return. this will not replace the current contents of books[] and will display every book in 'default' sort order
        document.getElementById("searchDisplay").innerHTML = 'Your search "' + search + '" yielded no results.';
    }
}

//duplicates the index of the sorting crieteria to the front of books[] and sorts by that, then removes the duplicate. for use with tableSort()
function bookSortBy(books, criteria){
    duplicateBooks = [] //array to hold the duplicates
    sortIndex = -1; //variable to hold index of the sorting criteria to sort by

    if (criteria == ("a-z-authFirst" || "z-a-authFirst")){ //if the criteria is sorting by author's first name (a-z/z-a is handled by tableSort())
        sortIndex = 1; //that correlates to index 5 in books[]
    }
    else if (criteria == ("a-z-authLast" || "z-a-authLast")){ //if the criteria is sorting by author's last name
        sortIndex = 2; //that correlates to index 6 in books[]
    }
    else if (criteria == ("page-count-low-high" || "page-count-high-low")){ //if the criteria is sorting by author's last name
        sortIndex = 4; //that correlates to index 4 in books[]
    }

    //create an array that will be sorted by the criteria variable
    for (book = 0; book < books.length; book++){ //iterate through books[]
        newBook = []; //clearing a new array to be populated and placed as a subarray in duplicateBooks[]
        newBook.push(books[book][sortIndex]); //pushing the sorting criteria into newBook[] as the first index

        for (info = 0; info < books[book].length; info++){ //iterate through the chosen book
            newBook.push(books[book][info]); //pushing the rest of the information into newBook[] as normal
        }
        duplicateBooks.push(newBook); //pushing newBook[] to the end of duplicateBooks[]
    }
    duplicateBooks.sort(); //sort the array alphabetically via the sorting criteria index in front

    //can now remove the duplicate sorting index in front
    for (dupeBook = 0; dupeBook < duplicateBooks.length; dupeBook++){ //iterate through duplicateBooks[]
        duplicateBooks[dupeBook].shift(); //removing the first element in each sub array
    }

    return duplicateBooks;
}

//adds different versions of sorting for the butttons on look-books.html
function tableSort(sortType){
    books = fetchBooks(); //fetching the default-sorted array of books

    if (sortType == "search"){ //if requested sort is via a user search from the search bar
        document.getElementById("sortText").innerHTML = "Chosen Sort > -"; //blank out the sort display text

        search = document.getElementById("search").value; //save the text in the search bar
        document.getElementById("search").value = "";//clear the search bar without reloading the page
        books = fetchSearch(search); //call fetchSearch() to fetch all books with the search string present in any data category. returned array replaced books[]
    } //the search bar is attached to tableSort() to make displaying search results more intuitive; it's already handled by this function

    else{ //if sorttype is any other request, it's a sort request and not a search request
        document.getElementById("searchDisplay").innerHTML = ""; //so clear the search bar display <p> without reloading the page

        if (sortType == "a-z-title" || sortType == "z-a-title"){ //if requested sort is by title
            books = books.sort(); //sort books[] by alphabetical title order
            document.getElementById("sortText").innerHTML = "Chosen Sort > A-Z: Book Title"; //change display text to reflect the chosen sort
    
            if (sortType[0] == "z"){ //if the sort request is z-a (if the first letter is z and not a)
                document.getElementById("sortText").innerHTML = "Chosen Sort > Z-A: Book Title"; //reverse the display text
                books.reverse(); //reverse books[]
            }
        }
    
        else if (sortType == "a-z-authFirst" || sortType == "z-a-authFirst"){ //if requested sort is by author's first name
            books = bookSortBy(books, "a-z-authFirst"); //sort books[] by ascending alphabetical author's first name
            document.getElementById("sortText").innerHTML = "Chosen Sort > A-Z: Author's First Name"; //change display text to reflect the chosen sort
    
            if (sortType[0] == "z"){ //if the sort request is z-a (if the first letter is z and not a)
                document.getElementById("sortText").innerHTML = "Chosen Sort > Z-A: Author's First Name"; //reverse the display text
                books.reverse(); //reverse books[]
            }
        }
    
        else if (sortType == "a-z-authLast" || sortType == "z-a-authLast"){ //if requested sort is by author's last name
            books = bookSortBy(books, "a-z-authLast"); //sort books[] by ascending alphabetical author's last name
            document.getElementById("sortText").innerHTML = "Chosen Sort > A-Z: Author's Last Name"; //change display text to reflect the chosen sort
    
            if (sortType[0] == "z"){ //if the sort request is z-a (if the first letter is z and not a)
                document.getElementById("sortText").innerHTML = "Chosen Sort > Z-A: Author's Last Name"; //reverse the display text
                books.reverse(); //reverse books[]
            }
        }
    
        else if (sortType == "page-count-low-high" || sortType == "page-count-high-low"){ //if requested sort is by page count
            books = bookSortBy(books, "page-count-low-high"); //sort books[] by ascending page count
            document.getElementById("sortText").innerHTML = "Chosen Sort > Page Count: Low to High"; //change display text to reflect the chosen sort
    
            if (sortType[11] == "h"){ //if the sort request is high to low
                document.getElementById("sortText").innerHTML = "Chosen Sort > Page Count: High to Low"; //reverse the display text
                books.reverse(); //reverse books[]
            }
        }
    
        else if (sortType == "default"){ //if requested sort is the default / page load version
            document.getElementById("sortText").innerHTML = "Chosen Sort > Default"; //don't sort books[], change display text
        }

        //add categories favorite books and favorite authors
    }
    
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

    content = `<table> <tr> <th colspan = "6">BOOKS </th> </tr>`; //adding a row to the table for the title
    content += `<tr> <th>Title</th> 
    <th>Author</th> 
    <th>Genre</th> 
    <th>Page Count</th>
    <th>Series</th> 
    </tr>`; //adding rows to the table for headings

    for (book = 0; book < books.length; book++){ //iterate through the array of books
        content += "<tr>"; //creating a new row for this book entry

        //iterate through the info on one book held in a subarray
        for (info = 0; info < books[book].length; info++){
            if (info == 1){ //if the current info is author's first name
                content += "<td>" + books[book][info] + " "; //start the table data html section; add a space for the last name
            }
            else if (info == 2){ //if the current info is author's last name
                content += books[book][info] + "</td>"; //include the last name and close the table data html section
            }
            else{ //otherwise it has nothing to do with the author; start the table data html section, add the data, and end the section all at once
                content += "<td>" + books[book][info] + "</td>";
            }
        }
        content += "</tr>"; //closing the row for this table entry
    }

    content += `</table>`; //closing and completing the table
    document.getElementById(id).innerHTML += content;
}

//creates and populates a static table for books I want and don't have. used on want-books.html
function setWantedBooks(id, age = "adult"){
    if (age == "kids"){
        wantedBooks = [
            ["Ruby's Wish", "Shirin Yim Bridges"],
            ["Extra Yarn", "Mac Barnett"]
        ];
    }
    else {
        wantedBooks = [
            ["The Survival Kit", "Donna Freitas"],
            ["Double Digit", "Anabel Monaghan"],
            ["Harbor Me", "Jaqueline Woodson"],
            ["Chains", "Laurie Halse Anderson"],
            ["Love that Dog", "Sharon Creese"],
            ["The Iron Ring", "Lloyd Alexander"],
            ["Shadow and Bone", "Leigh Bardugo"],
            ["The Other Half of my Heart", "Sundee T. Frazier"],
            ["The Complete Persepolis", "Marjane Satrapi"],
            ["The Dragonnette Prophecy", "Tui T. Sutherland"],
            ["They Both Die at the End", "Adam Silvera"],
            ["Educated", "Terra Westover"],
            ["Fearless Series", "Francine Pascal"],
            ["Books 2, 3, and 4 of  the Ember Series", "Jeanne DuPrau"],
            ["Aru Shah Series", "Riordan?"],
            ["Ender's Game", "Orson Scott Card"],
            ["A Lady's Guide to Mischief and Mayhem", "Manda Col"],
            ["The Memo", "Minda Hart"],
            ["The Haters", "Jesse Andrews"],
            ["Promise of Blood", "Powder Mage Series"],
            ["The Invisible Life of Addie La Rue"],
            ["One For All", "Lillie Lainoff"],
            ["Moon and the Mars", "Kia Corthron"],
            ["Opposite of Always", "Justin A. Reynolds"],
            ["Song of Achilles"],
            ["The Elephant Vanishes"],
            ["Out of My Heart", "Sharon M. Draper"],
            ["A Bloodsmoor"],
            ["Brown Girl Dreaming", "Jaqueline Woodson"]
        ];
    }

    wantedBooks = wantedBooks.sort();
    content = `<table> <tr> <th>Title</th> <th>Author</th> </tr>`; //adding rows to the table for headings

    for (book = 0; book < wantedBooks.length; book++){ //iterate through the array of books
        content += "<tr>"; //creating a new row for this book entry

        //iterate through the info on one book held in a subarray. 
        for (info = 0; info < wantedBooks[book].length; info++){
            content += "<td>" + wantedBooks[book][info] + "</td>";
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