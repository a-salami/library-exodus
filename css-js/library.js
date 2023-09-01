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
    "The Wildwood Chronicles", "The Chronicles of Narnia", "Percy Jackson & The Olympians", "The Legend of Zelda", "Tales of the Wide Awake Princess", //4
    "The Heroes of Olympus", "Emily Windsnap", "Anne of Green Gables", "UGLIES", "His Dark Materials", "Perfected", //10
    "The Hunger Games", "Archie Comics", "Books of Ember", "The Giver Quartet", "Harry Potter" //15
    ];

    //holds repeat authors
    authors = [
        ["C. S.", "Lewis"], ["Rick", "Riordan"], ["Gail Carson", "Levine"], ["Susane", "Colasanti"], ["John", "Green"], ["E. D.", "Baker"], //5
        ["Scott", "Westerfeld"], ["Phillip", "Pullman"], ["Kate Jarvic", "Birch"], ["Suzanne", "Collins"], ["Wendy", "Mass"], //10
        ["J. K.", "Rowling"]
    ];

    genres = [ //holds all genres
        "Fantasy", "Realistic Fiction", "YA", "Romance", "Manga/Comic", "Historical Fiction", //5
        "Children's", "Science Fiction", "Fiction", "Dystopian", "Memoir", //10
        "Animal Fiction", "Health and Wellness", "Cooking", "Mystery", "Christianity", //15
        "War Fiction"
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
        ["Wonder Struck", "Brian", "Selznick", `${genres[0]}, ${genres[5]}`, 627],
        ["Emily Windsnap and the Monster from the Deep", "Liz", "Kessler", `${genres[6]}, ${genres[0]}`, 218, series[6]],
        ["Emily Windsnap and the Land of the Mindnight Sun", "Liz", "Kessler", `${genres[6]}, ${genres[0]}`, 272, series[6]],
        ["Anne of Green Gables (Books 1-3)", "L. M.", "Montgomery", genres[5], 634, series[7]],
        ["Anne of Green Gables (Collector's)", "L. M.", "Montgomery", genres[5], 371, series[7]],
        ["The Mysterious Benedict Society", "Trenton Lee", "Stewart", genres[7], 485],
        ["For One More Day", "Mitch", "Albom", genres[8], 197],
        ["Museum of Thives", "Lian", "Tanner", genres[9], 312],
        ["Pretties", authors[6][0], authors[6][1], `${genres[2]}, ${genres[9]}`, 370, series[8]],
        ["Uglies", authors[6][0], authors[6][1], `${genres[2]}, ${genres[9]}`, 425, series[8]],
        ["Specials", authors[6][0], authors[6][1], `${genres[2]}, ${genres[9]}`, 372, series[8]],
        ["Extras", authors[6][0], authors[6][1], `${genres[2]}, ${genres[9]}`, 417, series[8]],
        ["The Life of Pi", "Yann", "Martel", genres[8], 401],
        ["The Amber Spyglass", authors[7][0], authors[7][1], genres[0], 518, series[9]],
        ["The Golden Compass", authors[7][0], authors[7][1], genres[0], 399, series[9]],
        ["Grandma's Magical Storybook", "", "", `${genres[6]}, ${genres[0]}`,189],
        ["The Subtle Knife", authors[7][0], authors[7][1], genres[0], 326, series[9]],
        ["DUNE", "Frank", "Herbert", genres[7], 794],
        ["A Garden in Lucca", "Paul", "Gervais", genres[10], 309],
        ["The Star Wars Trilogy", "George", "Lucas", genres[7], 705],
        ["The Help", "Kathryn", "Stockett", genres[5], 522],
        ["The Colussus Rises", "Peter", "Lerangis", genres[0], 348, "Seven Wonders"],
        ["Inkheart", "Cornelia", "Funke", genres[0], 534],
        ["Between the Bridge and the River", "Craig", "Ferguson", genres[8], 329],
        ["Between, Georgia", "Joshilyn", "Jackson", genres[8], 294],
        ["A Thread of Sky", "Deanna", "Fei", genres[8], 351],
        ["Everything, Everything", "Nicola", "Yoon", `${genres[2]}, ${genres[3]}`, 305],
        ["An Abundance of Katherines", authors[4][0], authors[4][1], `${genres[2]}, ${genres[3]}`, 215],
        ["The Girl Who Could Fly", "Victoria", "Forester", genres[0], 328],
        ["Gamer Girl", "Mari", "Mancusi", `${genres[2]}, ${genres[3]}`, 248],
        ["Tuesdays with Morrie", "Mitch", "Albom", genres[10], 199],
        ["The Silver Star", "Jeannette", "Walls", genres[8], 267],
        ["The Lost Hero", authors[1][0], authors[1][1], genres[0], 553, series[5]],
        ["Stargirl", "Jerry", "Spinelli", `${genres[2]}, ${genres[3]}`, 186],
        ["Out of My Mind", "Sharon M.", "Draper", genres[8], 295],
        ["The Wide-Awake Princess", authors[5][0], authors[5][1], genres[0], 261, series[4]],
        ["A Question of Magic", authors[5][0], authors[5][1], genres[0], 262],
        ["Counting by 7s", "Holly Goldberg", "Sloan", genres[8], 378],
        ["The Glass Castle", "Jeannette", "Walls", genres[10], 288],
        ["Fin & Lady", "Cathleen", "Schine", genres[8], 273],
        ["Not if I See You First", "Eric", "Lindstrom", `${genres[2]}, ${genres[3]}`, 310],
        ["The Underneath", "Kathi", "Appelt", genres[11], 311],
        ["Perfected", authors[8][0], authors[8][1], `${genres[2]}, ${genres[9]}`, 281, series[10]],
        ["Tarnished", authors[8][0], authors[8][1], `${genres[2]}, ${genres[9]}`, 299, series[10]],
        ["All I Need", authors[3][0], authors[3][1], `${genres[2]}, ${genres[3]}`, 212],
        ["Eleanor & Park", "Rainbow", "Rowell", `${genres[2]}, ${genres[3]}`, 328],
        ["The Hunger Games", authors[9][0], authors[9][1], `${genres[2]}, ${genres[9]}`, 374, series[11]],
        ["The Signature of All Things", "Elizabeth", "Gilbert", genres[5], 499],
        ["Cavedweller", "Dorothy", "Allison", genres[8], 434],
        ["Complete Well-Being", "", "", genres[12], 249],
        ["Hope was Here", "Joan", "Bauer", genres[8], 186],
        ["Fantastic 4: The Photo Novel", "", "", genres[4], 92],
        ["Archie Super 3 Pack [314]", "", "", genres[4], "?", series[12]],
        ["Archie Jumbo Comics [103]", "", "", genres[4], "?", series[12]],
        ["Betty and Veronica: Jumbo Comics [287]", "", "", genres[4], "?", series[12]],
        ["Archie Jumbo Comics [314]", "", "", genres[4], "?", series[12]],
        ["Laugh Digest Magazine [150]", "", "", genres[4], "?", series[12]],
        ["Archie's Pals 'n' Ga's Double Digest [58]", "", "", genres[4], "?", series[12]],
        ["Betty and Veronica Digest [120]", "", "", genres[4], "?", series[12]],
        ["Archie's Double Digest [152]", "", "", genres[4], "?", series[12]],
        ["Jughead's Double Digest [60]", "", "", genres[4], "?", series[12]],
        ["Archie Digest [166]", "", "", genres[4], "?", series[12]],
        ["Archie Digest [162]", "", "", genres[4], "?", series[12]],
        ["Betty and Verionica Double Digest [91]", "", "", genres[4], "?", series[12]],
        ["Jughead's Double Digest [139]", "", "", genres[4], "?", series[12]],
        ["Archie Digest [223]", "", "", genres[4], "?", series[12]],
        ["Jughead's Double Digest [67]", "", "", genres[4], "?", series[12]],
        ["Archie Jumbo Comics [333]", "", "", genres[4], "?", series[12]],
        ["Emily Windsnap and the Castle in the Midst", "Liz", "Kessler", `${genres[6]}, ${genres[0]}`, 204, series[6]],
        ["The Tail of Emily Windsnap", "Liz", "Kessler", `${genres[6]}, ${genres[0]}`, 209, series[6]],
        ["Amorelle", "Grace Livingston", "Hill", `${genres[5]}, ${genres[3]}`, 265],
        ["Project Mulberry", "Linda Sue", "Park", `${genres[6]}, ${genres[1]}`, 225],
        ["Muffins", "Elizabeth", "Alston", genres[13], 88],
        ["Ella Enchanted", authors[3][0], authors[3][1], genres[0], 232],
        ["Kira-Kira", "Cynthia", "Kadohata", genres[1], 244],
        ["Wild Wings", "Gill", "Lewis", `${genres[5]}, ${genres[1]}`, 283],
        ["The City of Ember", "Jeanne", "DuPrau", genres[9], 270, series[13]],
        ["Tuesday Mooney Talks to Ghosts", "Kate", "Racculia", genres[8], 357],
        ["Son", "Lois", "Lowry", genres[9], 393, series[14]],
        ["Gathering Blue", "Lois", "Lowry", genres[9], 241, series[14]],
        ["The Giver", "Lois", "Lowry", genres[9], 225, series[14]],
        ["Nobody's Prize", "Esther", "Friesner", genres[5], 306],
        ["Nobody's Princess", "Esther", "Friesner", genres[5], 305],
        ["The Secret Garden", "Frances Hodgson", "Burnett", genres[5], 276],
        ["Jane Eyre", "Charlotte", "Brontë", genres[5], 527],
        ["To Kill a Mockingbird", "Harper", "Lee", genres[5], 376],
        ["Every Soul a Star", authors[10][0], authors[10][1], genres[8], 322],
        ["Sleeping Beauty", authors[10][0], authors[10][1], `${genres[6]}, ${genres[0]}`, 172],
        ["Rapunzel", authors[10][0], authors[10][1], `${genres[6]}, ${genres[0]}`, 205],
        ["The Last Present", authors[10][0], authors[10][1], `${genres[6]}, ${genres[0]}`, 246],
        ["13 Gifts", authors[10][0], authors[10][1], `${genres[6]}, ${genres[0]}`, 339],
        ["12 Finally", authors[10][0], authors[10][1], `${genres[6]}, ${genres[0]}`, 296],
        ["11 Birthdays", authors[10][0], authors[10][1], `${genres[6]}, ${genres[0]}`, 267],
        ["Pish Posh", "Ellen", "Potter", `${genres[14]}, ${genres[8]}`, 166],
        ["It's a Mall World After All", "Janette", "Rallison", genres[8], 230],
        ["The Sky is Everywhere", "Jandy", "Nelson", `${genres[6]}, ${genres[1]}`, 311],
        ["Miss Spitfire", "Sarah", "Miller", genres[5], 208],
        ["Unlocking the Spell", authors[5][0], authors[5][1], `${genres[6]}, ${genres[0]}`, 261, series[4]],
        ["The Phantom Tollbooth", "Norton", "Juster", `${genres[6]}, ${genres[0]}`, 256],
        ["The Tale of Desperaux", "Kate", "DiCamillo",`${genres[0]}, ${genres[11]}`, 269],
        ["Redwall", "Brian", "Jaques", `${genres[0]}, ${genres[11]}`, 351],
        ["A Mind Awake", authors[0][0], authors[0][1], genres[15], 296],
        ["Counter Culture", "David", "Platt", genres[15], 280],
        ["Chasing Vermeer", "Blue", "Balliett", genres[14], 254],
        ["The House on the Cerulean Sea", "TJ", "Klune", genres[0], 396],
        ["Ender's Shadow", "Orson Scott", "Card", genres[7], 467],
        ["Harry Potter and the Goblet of Fire", authors[11][0], authors[11][1], genres[0], 734, series[15]],
        ["Tesla's Attic", "Neal Shusterman, ", "Eric Elfman", genres[7], 246],
        ["The Friday Night Knitting Club", "Kate", "Jacobs", genres[8], 356],
        ["The Lies about Truth", "Courtney C.", "Stevens", genres[8], 326],
        ["Because of Mr. Terupt", "Rob", "Buyea", genres[1], 268],
        ["My Grandmother Asked Me to Tell You She's Sorry", "Fredrik", "Backman", genres[1], 370],
        ["Between Shades of Gray", "Ruta", "Sepetys", genres[16], 338],
        ["The Night Circus", "Erin", "Morgenstern", genres[8], 512],
        ["My Sister's Keeper", "Jodi", "Picoult", genres[1], 423],
        ["The Dangerous Days of Daniel X", "James", "Patterson", genres[7], 238],
        ["Fangirl", "Rainbow", "Rowell", genres[1], 433],
        ["Harry Potter and the Deathly Hallows", authors[11][0], authors[11][1], genres[0], 759],
        ["Wilde Like Me", "Louise", "Pentland", genres[1], 385],
        ["The Indigo King", "James A.", "Owen", genres[0], 372],
        ["John Carter of Mars: The First Five Novels", "Edgar Rice", "Burroughs", genres[0], 929],
        ["The Samantha American Girl Series", "", "", `${genres[6]}, ${genres[5]}`, "?"],
        ["Coral Island", "R. M.", "Ballantyne", `${genres[6]}, ${genres[5]}`, 184],
        ["So Much Closer", authors[4][0], authors[4][1], `${genres[3]}, ${genres[4]}`, 241],
        ["Just Listen", "Sarah", "Dessen", `${genres[1]}, ${genres[2]}`, 371],
        ["That Summer", "Sarah", "Dessen", `${genres[1]}, ${genres[2]}`, 198]
        ];
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

    if (criteria == "favorite-books"){
        favBooks = value => ["Fangirl", "The Phantom Tollbooth", "Pish Posh", "The Underneath", "The Voyage of the Dawn Treader", "Fangirl"].some(element => value[0].includes(element)); //filter full book information from books[] into favBooks[] if the title of value[0] contains value
        return books.filter(favBooks).sort(); //returned filtered array
    }
    else if (criteria == ("a-z-authFirst" || "z-a-authFirst")){ //if the criteria is sorting by author's first name (a-z/z-a is handled by tableSort())
        sortIndex = 1; //that correlates to index 5 in books[]
    }
    else if (criteria == ("a-z-authLast" || "z-a-authLast")){ //if the criteria is sorting by author's last name
        sortIndex = 2; //that correlates to index 6 in books[]
    }
    else if (criteria == "genre"){ //if the criteria is sorting by author's last name
        sortIndex = 3; //that correlates to index 6 in books[]
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
        else if (sortType == "favorite-books"){ //if requested sort is by page count
            books = bookSortBy(books, "favorite-books"); //sort books[] by ascending page count
            document.getElementById("sortText").innerHTML = "Chosen Sort > Favorite Books"; //change display text to reflect the chosen sort
        }
        else if (sortType == "genre"){ //if requested sort is by page count
            books = bookSortBy(books, "genre"); //sort books[] by ascending page count
            document.getElementById("sortText").innerHTML = "Chosen Sort > Genre"; //change display text to reflect the chosen sort
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

    content = `<table> <tr> <th colspan = "6">BOOKS (` + books.length + `)</th> </tr>`; //adding a row to the table for the title
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

       if (books[book].length < 6) { content += "<td></td>"; } //adds an empty td section for books missing a series; helps CSS' td:hover
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
            ["I'll Give You the Sun", "Jandy Nelson"],
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