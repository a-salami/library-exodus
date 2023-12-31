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

function clearSearchbar(){ //leaves the search text visible until the user clicks on it again
    document.getElementById("search").value = "";//clear the search bar without reloading the page
}

function tableSort(sortType){ //sorts the books
    switch(sortType){
        case "search":
            books = booksGlobal;
            let search = document.getElementById("search").value; //save the text in the search bar
            fitsCriteria = []
            
            for (b = 0; b < books.length; b++){ //iterate through the array of books
                auth = [] //formatting the authors to display joint names
                firstnames = books[b].authorsFirst //get array of first names from json
                lastnames = books[b].authorsLast //get array of last names
                for(c = 0; c < firstnames.length; c++){
                    auth.push([`${firstnames[c]} ${lastnames[c]}`]); //format the two together for print
                }
        
                authors = auth.join(", ");
                genres = books[b].genres.sort().join(", ");

                //if any field in the book contains search, add it to fitsCriteria (as a normal array, which tableSort() accounts for)
                if (books[b].title.toLowerCase().includes(search.toLowerCase()) || authors.toLowerCase().includes(search.toLowerCase()) || genres.toLowerCase().includes(search.toLowerCase()) || String(books[b].pagecount).toLowerCase().includes(search.toLowerCase()) || books[b].series.toLowerCase().includes(search.toLowerCase())){
                    fitsCriteria.push([books[b].index, books[b].title, authors, genres, books[b].pagecount, books[b].series])
                }
            }

            books = fitsCriteria;
        break
        case "A-Z: Book Title":
            function compareTitles(a, b){ //custom sort function for json array
                if (a.title < b.title) { return -1; } //sorts via specified key
                if (a.title > b.title) { return 1; }
                return 0;
            }
            books = booksGlobal.sort(compareTitles);
        break
        case "Z-A: Book Title":
            books = booksGlobal.sort(compareTitles).reverse();
        break
        case "A-Z: Author's First Name":
            function compareAuthorsFirst(a, b){ //custom sort function for json array
                if (a.authorsFirst[0] < b.authorsFirst[0]) { return -1; } //sorts via specified key
                if (a.authorsFirst[0] > b.authorsFirst[0]) { return 1; }
                return 0;
            }
            books = booksGlobal.sort(compareAuthorsFirst);
        break
        case "Z-A: Author's First Name":
            books = booksGlobal.sort(compareAuthorsFirst).reverse();
        break
        case "A-Z: Author's Last Name":
            // document.getElementById("sortText").innerHTML += "<br>*<i>if there are multiple authors, sort is based on the first listed author</i>"
            
            function compareAuthorsLast(a, b){ //custom sort function for json array
                if (a.authorsLast[0] < b.authorsLast[0]) { return -1; } //sorts via specified key
                if (a.authorsLast[0] > b.authorsLast[0]) { return 1; }
                return 0;
            }
            books = booksGlobal.sort(compareAuthorsLast);
        break
        case "Z-A: Author's Last Name":
            books = booksGlobal.sort(compareAuthorsLast).reverse();
        break
        case "Page Count: Low -> High":
            function comparePages(a, b){ //custom sort function for json array
                if (a.pagecount < b.pagecount) { return -1; } //sorts via specified key
                if (a.pagecount > b.pagecount) { return 1; }
                return 0;
            }
            books = booksGlobal.sort(comparePages);
        break
        case "Page Count: High -> Low":
            books = booksGlobal.sort(comparePages).reverse();
        break
        case "Oldest First (default)":
            function compareIndex(a, b){ //custom sort function for json array
                if (a.index < b.index) { return -1; } //sorts via specified key
                if (a.index > b.index) { return 1; }
                return 0;
            }
            books = booksGlobal.sort(compareIndex);
        break
        case "Newest First":
            books = booksGlobal.sort(compareIndex).reverse();
        break
        case "Genre":
            function compareGenres(a, b){ //custom sort function for json array
                if (a.genres[0] < b.genres[0]) { return -1; } //sorts via specified key
                if (a.genres[0] > b.genres[0]) { return 1; }
                return 0;
            }
            books = booksGlobal.sort(compareGenres);
        break
    }

    document.getElementById("tableSpace").innerHTML = ""; //blank out the table to prepare it for the new table 
    if (sortType == "search") { setTable("tableSpace", books, true); } //call setTable with the newly sorted array
    else { setTable("tableSpace", books, false); }
}


function setTable(id, books, search = false){ //creates a table and populates it
    booksGlobal = books; //making this variable global upon pageload for use in other ufnc
    
    content = `<table> <tr> <th colspan = "6">BOOKS (` + books.length + `)</th> </tr>`; //adding a row to the table for the title
    content += `<tr><th>#</th> <th>Title</th> <th>Author</th> <th>Genre</th> <th>Pages</th><th>Series</th> </tr>`; //adding rows to the table for headings

    if (search){ //if this is a search, display the information from fitCriteria in tableSort()
        for (b = 0; b < books.length; b++){
            content += `<tr>
            <td class = "tCenter">${books[0][0]}</td>
            <td>${books[0][1]}</td>
            <td>${books[0][2]}</td>
            <td>${books[0][3]}</td>
            <td class = "tCenter">${books[0][4]}</td>
            <td>${books[0][5]}</td></tr>`;
        }
    } 
    else{ //otherwise its a normal sort type; display accordingly
        for (b = 0; b < books.length; b++){ //iterate through the array of books
            authors = [] //formatting the authors to display joint names
            firstnames = books[b].authorsFirst //get array of first names from json
            lastnames = books[b].authorsLast //get array of last names
            for(c = 0; c < firstnames.length; c++){
                authors.push([`${firstnames[c]} ${lastnames[c]}`]); //format the two together for print
            }

            authorsFormatted = authors.join(", ");
            genresFormatted = books[b].genres.sort().join(", ");
            content += `<tr>
            <td class = "tCenter">${books[b].index}</td>
            <td>${books[b].title}</td>
            <td>${authorsFormatted}</td>
            <td>${genresFormatted}</td>
            <td class = "tCenter">${books[b].pagecount}</td>
            <td>${books[b].series}</td></tr>`;
        }
    }

    content += `</table>`; //closing and completing the table
    document.getElementById(id).innerHTML += content;
    // a()
}


function wishlist(id){ //creates and populates a status <ul> for books I want
    wishes = [
        ["Ruby's Wish", "Shirin Yim Bridges"],
        ["Extra Yarn", "Mac Barnett"],
        ["The Survival Kit", "Donna Freitas"],
        ["Double Digit", "Anabel Monaghan"],
        ["Harbor Me", "Jaqueline Woodson"],
        ["Chains", "Laurie Halse Anderson"],
        ["Love that Dog", "Sharon Creese"],
        ["The Iron Ring", "Lloyd Alexander"],
        ["The Other Half of my Heart", "Sundee T. Frazier"],
        ["The Complete Persepolis", "Marjane Satrapi"],
        ["The Dragonnette Prophecy", "Tui T. Sutherland"],
        ["They Both Die at the End", "Adam Silvera"],
        ["Educated", "Terra Westover"],
        ["Fearless Series", "Francine Pascal"],
        ["Ender's Game", "Orson Scott Card"],
        ["A Lady's Guide to Mischief and Mayhem", "Manda Col"],
        ["The Memo", "Minda Hart"],
        ["The Haters", "Jesse Andrews"],
        ["Promise of Blood", "Powder Mage Series"],
        ["The Invisible Life of Addie La Rue", ""],
        ["One For All", "Lillie Lainoff"],
        ["Moon and the Mars", "Kia Corthron"],
        ["Opposite of Always", "Justin A. Reynolds"],
        ["Song of Achilles", ""],
        ["The Elephant Vanishes"],
        ["Out of My Heart", "Sharon M. Draper"],
        ["A Bloodsmoor", ""],
        ["Brown Girl Dreaming", "Jaqueline Woodson"]
    ].sort();

    content = `<ul>`;
    for (b = 0; b < wishes.length; b++){  content += `<li><b>${wishes[b][0]}</b>, ${wishes[b][1]}</li>`; } //adding to the unordered list
    content += `</ul>`; //closing and completing the table
    document.getElementById(id).innerHTML += content;
}

function setFooter(id){ //creates and populates the footer
    content = `<div class = "col-sm-7">
        <h4>This page was last updated:</h4>
        <input type = "submit" id = "modified" value = "` + pageLastModified() + `" onclick = "dateDisplay();"><br>
        <a href = "#top"><input type = "submit" value = "To Top"></a><br>
        <input type = "submit" id = "lD" value = "Change to Light Mode" onclick = "lightDarkMode();">
    </div>`;

    document.getElementById(id).innerHTML += content;
}

// function a(){
//     // series = [ //holds all series
//     // "The Wildwood Chronicles", "The Chronicles of Narnia", "Percy Jackson & The Olympians", "The Legend of Zelda", "Tales of the Wide-Awake Princess", //4
//     // "The Heroes of Olympus", "Emily Windsnap", "Anne of Green Gables", "UGLIES", "His Dark Materials", "Perfected", //10
//     // "The Hunger Games", "Archie Comics", "Books of Ember", "The Giver Quartet", "Harry Potter", //15
//     // "The Mother-Daughter Book Club", "Divergent", "The Daughters", "Shopaholic"
//     // ];

//     // //holds repeat authors
//     // authors = [
//     //     ["C. S.", "Lewis"], ["Rick", "Riordan"], ["Gail Carson", "Levine"], ["Susane", "Colasanti"], ["John", "Green"], ["E. D.", "Baker"], //5
//     //     ["Scott", "Westerfeld"], ["Phillip", "Pullman"], ["Kate Jarvic", "Birch"], ["Suzanne", "Collins"], ["Wendy", "Mass"], //10
//     //     ["J. K.", "Rowling"], ["Sarah", "Dessen"], ["Sophie", "Kinsella"]
//     // ];

//     // genres = [ //holds all genres
//     //     "Fantasy", "Realistic Fiction", "YA", "Romance", "Manga/Comic", "Historical Fiction", //5
//     //     "Children's", "Science Fiction", "Fiction", "Dystopian", "Memoir", //10
//     //     "Animal Fiction", "Health and Wellness", "Cooking", "Mystery", "Christianity", //15
//     //     "War Fiction", "Self-Help+"
//     // ]
   
//     // books2 = [ //holds all books. title, author first name, author last name, genre, page count, series
//     //     ["The Legend of Zelda: Ocarina of Time", "Akira", "Himekawa", genres[4], "?", series[3]],
//     //     ["The Legend of Zelda: Oracle of Seasons / Oracle of Ages", "Akira", "Himekawa", genres[4], "?", series[3]],
//     //     ["Where the Mountain Meeets the Moon", "Grace", "Lin", genres[0], 279],
//     //     ["The Hobbit", "J. R. R.", "Tolkien", genres[0], 300],
//     //     ["This is What Happy Looks Like", "Jennifer E.", "Smith", `${genres[2]}, ${genres[3]}`, 404],
//     //     ["Wildwood", "Colin", "Meloy", genres[0], 541, series[0]],
//     //     ["Under Wildwood", "Colin", "Meloy", genres[0], 559, series[0]],
//     //     ["Wildwood Imperium", "Colin", "Meloy", genres[0], 580, series[0]],
//     //     ["A Darker Shade of Magic", "V. E.", "Schwab", genres[0], 398, "Shades of Magic"],
//     //     ["The Star Thief", "Lindsey", "Becker", genres[0], 402],
//     //     ["It's Kind of a Funny Story", "Ned", "Vizzini", genres[1], 444],
//     //     ["The Magician's Nephew", authors[0][0], authors[0][1], genres[0], 202, series[1]],
//     //     ["The Neverending Story", "Michael", "Ende", genres[0], 511],
//     //     ["The Last Battle", authors[0][0], authors[0][1], genres[0], 211, series[1]],
//     //     ["Prince Caspian", authors[0][0], authors[0][1], genres[0], 223, series[1]],
//     //     ["The Voyage of the Dawn Treader", authors[0][0], authors[0][1], genres[0], 248, series[1]],
//     //     ["The Silver Chair", authors[0][0], authors[0][1], genres[0], 243, series[1]],
//     //     ["The Outcasts of 19 Schuyler Place", "E. L.", "Konigsburg", genres[1], 296],
//     //     ["Dinner for Two", "Mike", "Gayle", genres[1], 338],
//     //     ["Miss Invisible", "Laura Jensen", "Walker", genres[1], 306],
//     //     ["Loveboat, Taipei", "Abigail Hing", "Wen", genres[1], 414],
//     //     ["The Extraordinary Secrets of April, May, and June", "Robin", "Benway", genres[1], 281],
//     //     ["The Horse and His Boy", authors[0][0], authors[0][1], genres[0], 224, series[1]],
//     //     ["The Lion, the Witch, and the Wardrobe", authors[0][0], authors[0][1], genres[0], 189, series[1]],
//     //     ["Where She Went", "Gayle", "Forman", genres[1], 260],
//     //     ["The Lightning Thief", authors[1][0], authors[1][1], genres[0], 375, series[2]],
//     //     ["The Sea of Monsters", authors[1][0], authors[1][1], genres[0], 279, series[2]],
//     //     ["The Titan's Curse", authors[1][0], authors[1][1], genres[0], 312, series[2]],
//     //     ["The Battle of the Labyrinth", authors[1][0], authors[1][1], genres[0], 361, series[2]],
//     //     ["The Last Olympian", authors[1][0], authors[1][1], genres[0], 381, series[2]],
//     //     ["Aru Shah and the End of Time", "Roshani", "Chokshi", genres[0], 343],
//     //     ["The Two Princesses of Bamarre", authors[2][0], authors[2][1], genres[0], 239],
//     //     ["Take Me There", authors[3][0], authors[3][1], genres[3], 290],
//     //     ["Paper Towns", authors[4][0], authors[4][1], `${genres[2]}, ${genres[1]}`, 305],
//     //     ["Mandy", "Julie", "Edwards", genres[5], 279],
//     //     ["That Part Was True", "Deborah", "McKinlay", genres[1], 225],
//     //     ["Johnny Kellock Died Today", "Hadley", "Dyer", genres[5], 152],
//     //     ["The Absolutely True Diary of a Part-Time Indian", "Sherman", "Alexie", `${genres[2]}, ${genres[1]}`, 230],
//     //     ["Princess in Disguise", authors[5][0], authors[5][1], `${genres[6]}, ${genres[0]}`, 215, series[4]],
//     //     ["Third Wish Vol.1", "Robert", "Fulghum", genres[0], 501],
//     //     ["Third Wish Vol.2", "Robert", "Fulghum", genres[0], 415],
//     //     ["The House of Hades", authors[1][0], authors[1][1], genres[0], 583, series[5]],
//     //     ["The Invention of Hugo Cabret", "Brian", "Selznick", `${genres[0]}, ${genres[5]}`, 523],
//     //     ["The Marvels", "Brian", "Selznick", `${genres[0]}, ${genres[5]}`, 647],
//     //     ["Wonder Struck", "Brian", "Selznick", `${genres[0]}, ${genres[5]}`, 627],
//     //     ["Emily Windsnap and the Monster from the Deep", "Liz", "Kessler", `${genres[6]}, ${genres[0]}`, 218, series[6]],
//     //     ["Emily Windsnap and the Land of the Mindnight Sun", "Liz", "Kessler", `${genres[6]}, ${genres[0]}`, 272, series[6]],
//     //     ["Anne of Green Gables (Books 1-3)", "L. M.", "Montgomery", genres[5], 634, series[7]],
//     //     ["Anne of Green Gables (Collector's)", "L. M.", "Montgomery", genres[5], 371, series[7]],
//     //     ["The Mysterious Benedict Society", "Trenton Lee", "Stewart", genres[7], 485],
//     //     ["For One More Day", "Mitch", "Albom", genres[8], 197],
//     //     ["Museum of Thives", "Lian", "Tanner", genres[9], 312],
//     //     ["Pretties", authors[6][0], authors[6][1], `${genres[2]}, ${genres[9]}`, 370, series[8]],
//     //     ["Uglies", authors[6][0], authors[6][1], `${genres[2]}, ${genres[9]}`, 425, series[8]],
//     //     ["Specials", authors[6][0], authors[6][1], `${genres[2]}, ${genres[9]}`, 372, series[8]],
//     //     ["Extras", authors[6][0], authors[6][1], `${genres[2]}, ${genres[9]}`, 417, series[8]],
//     //     ["The Life of Pi", "Yann", "Martel", genres[8], 401],
//     //     ["The Amber Spyglass", authors[7][0], authors[7][1], genres[0], 518, series[9]],
//     //     ["The Golden Compass", authors[7][0], authors[7][1], genres[0], 399, series[9]],
//     //     ["Grandma's Magical Storybook", "", "", `${genres[6]}, ${genres[0]}`,189],
//     //     ["The Subtle Knife", authors[7][0], authors[7][1], genres[0], 326, series[9]],
//     //     ["DUNE", "Frank", "Herbert", genres[7], 794],
//     //     ["A Garden in Lucca", "Paul", "Gervais", genres[10], 309],
//     //     ["The Star Wars Trilogy", "George", "Lucas", genres[7], 705],
//     //     ["The Help", "Kathryn", "Stockett", genres[5], 522],
//     //     ["The Colussus Rises", "Peter", "Lerangis", genres[0], 348, "Seven Wonders"],
//     //     ["Inkheart", "Cornelia", "Funke", genres[0], 534],
//     //     ["Between the Bridge and the River", "Craig", "Ferguson", genres[8], 329],
//     //     ["Between, Georgia", "Joshilyn", "Jackson", genres[8], 294],
//     //     ["A Thread of Sky", "Deanna", "Fei", genres[8], 351],
//     //     ["Everything, Everything", "Nicola", "Yoon", `${genres[2]}, ${genres[3]}`, 305],
//     //     ["An Abundance of Katherines", authors[4][0], authors[4][1], `${genres[2]}, ${genres[3]}`, 215],
//     //     ["The Girl Who Could Fly", "Victoria", "Forester", genres[0], 328],
//     //     ["Gamer Girl", "Mari", "Mancusi", `${genres[2]}, ${genres[3]}`, 248],
//     //     ["Tuesdays with Morrie", "Mitch", "Albom", genres[10], 199],
//     //     ["The Silver Star", "Jeannette", "Walls", genres[8], 267],
//     //     ["The Lost Hero", authors[1][0], authors[1][1], genres[0], 553, series[5]],
//     //     ["Stargirl", "Jerry", "Spinelli", `${genres[2]}, ${genres[3]}`, 186, "Stargirl"],
//     //     ["Out of My Mind", "Sharon M.", "Draper", genres[8], 295],
//     //     ["The Wide-Awake Princess", authors[5][0], authors[5][1], genres[0], 261, series[4]],
//     //     ["A Question of Magic", authors[5][0], authors[5][1], genres[0], 262],
//     //     ["Counting by 7s", "Holly Goldberg", "Sloan", genres[8], 378],
//     //     ["The Glass Castle", "Jeannette", "Walls", genres[10], 288],
//     //     ["Fin & Lady", "Cathleen", "Schine", genres[8], 273],
//     //     ["Not if I See You First", "Eric", "Lindstrom", `${genres[2]}, ${genres[3]}`, 310],
//     //     ["The Underneath", "Kathi", "Appelt", genres[11], 311],
//     //     ["Perfected", authors[8][0], authors[8][1], `${genres[2]}, ${genres[9]}`, 281, series[10]],
//     //     ["Tarnished", authors[8][0], authors[8][1], `${genres[2]}, ${genres[9]}`, 299, series[10]],
//     //     ["All I Need", authors[3][0], authors[3][1], `${genres[2]}, ${genres[3]}`, 212],
//     //     ["Eleanor & Park", "Rainbow", "Rowell", `${genres[2]}, ${genres[3]}`, 328],
//     //     ["The Hunger Games", authors[9][0], authors[9][1], `${genres[2]}, ${genres[9]}`, 374, series[11]],
//     //     ["The Signature of All Things", "Elizabeth", "Gilbert", genres[5], 499],
//     //     ["Cavedweller", "Dorothy", "Allison", genres[8], 434],
//     //     ["Complete Well-Being", "", "", genres[12], 249],
//     //     ["Hope was Here", "Joan", "Bauer", genres[8], 186],
//     //     ["Fantastic 4: The Photo Novel", "", "", genres[4], 92],
//     //     ["Archie Super 3 Pack [314]", "", "", genres[4], "?", series[12]],
//     //     ["Archie Jumbo Comics [103]", "", "", genres[4], "?", series[12]],
//     //     ["Betty and Veronica: Jumbo Comics [287]", "", "", genres[4], "?", series[12]],
//     //     ["Archie Jumbo Comics [314]", "", "", genres[4], "?", series[12]],
//     //     ["Laugh Digest Magazine [150]", "", "", genres[4], "?", series[12]],
//     //     ["Archie's Pals 'n' Ga's Double Digest [58]", "", "", genres[4], "?", series[12]],
//     //     ["Betty and Veronica Digest [120]", "", "", genres[4], "?", series[12]],
//     //     ["Archie's Double Digest [152]", "", "", genres[4], "?", series[12]],
//     //     ["Jughead's Double Digest [60]", "", "", genres[4], "?", series[12]],
//     //     ["Archie Digest [166]", "", "", genres[4], "?", series[12]],
//     //     ["Archie Digest [162]", "", "", genres[4], "?", series[12]],
//     //     ["Betty and Verionica Double Digest [91]", "", "", genres[4], "?", series[12]],
//     //     ["Jughead's Double Digest [139]", "", "", genres[4], "?", series[12]],
//     //     ["Archie Digest [223]", "", "", genres[4], "?", series[12]],
//     //     ["Jughead's Double Digest [67]", "", "", genres[4], "?", series[12]],
//     //     ["Archie Jumbo Comics [333]", "", "", genres[4], "?", series[12]],
//     //     ["Emily Windsnap and the Castle in the Midst", "Liz", "Kessler", `${genres[6]}, ${genres[0]}`, 204, series[6]],
//     //     ["The Tail of Emily Windsnap", "Liz", "Kessler", `${genres[6]}, ${genres[0]}`, 209, series[6]],
//     //     ["Amorelle", "Grace Livingston", "Hill", `${genres[5]}, ${genres[3]}`, 265],
//     //     ["Project Mulberry", "Linda Sue", "Park", `${genres[6]}, ${genres[1]}`, 225],
//     //     ["Muffins", "Elizabeth", "Alston", genres[13], 88],
//     //     ["Ella Enchanted", authors[2][0], authors[2][1], genres[0], 232],
//     //     ["Kira-Kira", "Cynthia", "Kadohata", genres[1], 244],
//     //     ["Wild Wings", "Gill", "Lewis", `${genres[5]}, ${genres[1]}`, 283],
//     //     ["The City of Ember", "Jeanne", "DuPrau", genres[9], 270, series[13]],
//     //     ["Tuesday Mooney Talks to Ghosts", "Kate", "Racculia", genres[8], 357],
//     //     ["Son", "Lois", "Lowry", genres[9], 393, series[14]],
//     //     ["Gathering Blue", "Lois", "Lowry", genres[9], 241, series[14]],
//     //     ["The Giver", "Lois", "Lowry", genres[9], 225, series[14]],
//     //     ["Nobody's Prize", "Esther", "Friesner", genres[5], 306],
//     //     ["Nobody's Princess", "Esther", "Friesner", genres[5], 305],
//     //     ["The Secret Garden", "Frances Hodgson", "Burnett", genres[5], 276],
//     //     ["Jane Eyre", "Charlotte", "Brontë", genres[5], 527],
//     //     ["To Kill a Mockingbird", "Harper", "Lee", genres[5], 376],
//     //     ["Every Soul a Star", authors[10][0], authors[10][1], genres[8], 322],
//     //     ["Sleeping Beauty", authors[10][0], authors[10][1], `${genres[6]}, ${genres[0]}`, 172],
//     //     ["Rapunzel", authors[10][0], authors[10][1], `${genres[6]}, ${genres[0]}`, 205],
//     //     ["The Last Present", authors[10][0], authors[10][1], `${genres[6]}, ${genres[0]}`, 246],
//     //     ["13 Gifts", authors[10][0], authors[10][1], `${genres[6]}, ${genres[0]}`, 339],
//     //     ["12 Finally", authors[10][0], authors[10][1], `${genres[6]}, ${genres[0]}`, 296],
//     //     ["11 Birthdays", authors[10][0], authors[10][1], `${genres[6]}, ${genres[0]}`, 267],
//     //     ["Pish Posh", "Ellen", "Potter", `${genres[14]}, ${genres[8]}`, 166],
//     //     ["It's a Mall World After All", "Janette", "Rallison", genres[8], 230],
//     //     ["The Sky is Everywhere", "Jandy", "Nelson", `${genres[6]}, ${genres[1]}`, 311],
//     //     ["Miss Spitfire", "Sarah", "Miller", genres[5], 208],
//     //     ["Unlocking the Spell", authors[5][0], authors[5][1], `${genres[6]}, ${genres[0]}`, 261, series[4]],
//     //     ["The Phantom Tollbooth", "Norton", "Juster", `${genres[6]}, ${genres[0]}`, 256],
//     //     ["The Tale of Desperaux", "Kate", "DiCamillo",`${genres[0]}, ${genres[11]}`, 269],
//     //     ["Redwall", "Brian", "Jaques", `${genres[0]}, ${genres[11]}`, 351],
//     //     ["A Mind Awake", authors[0][0], authors[0][1], genres[15], 296],
//     //     ["Counter Culture", "David", "Platt", genres[15], 280],
//     //     ["Chasing Vermeer", "Blue", "Balliett", genres[14], 254],
//     //     ["The House on the Cerulean Sea", "TJ", "Klune", genres[0], 396],
//     //     ["Ender's Shadow", "Orson Scott", "Card", genres[7], 467],
//     //     ["Harry Potter and the Goblet of Fire", authors[11][0], authors[11][1], genres[0], 734, series[15]],
//     //     ["Tesla's Attic", "Neal Shusterman, ", "Eric Elfman", genres[7], 246],
//     //     ["The Friday Night Knitting Club", "Kate", "Jacobs", genres[8], 356],
//     //     ["The Lies about Truth", "Courtney C.", "Stevens", genres[8], 326],
//     //     ["Because of Mr. Terupt", "Rob", "Buyea", genres[1], 268],
//     //     ["My Grandmother Asked Me to Tell You She's Sorry", "Fredrik", "Backman", genres[1], 370],
//     //     ["Between Shades of Gray", "Ruta", "Sepetys", genres[16], 338],
//     //     ["The Night Circus", "Erin", "Morgenstern", genres[8], 512],
//     //     ["My Sister's Keeper", "Jodi", "Picoult", genres[1], 423],
//     //     ["The Dangerous Days of Daniel X", "James", "Patterson", genres[7], 238],
//     //     ["Fangirl", "Rainbow", "Rowell", genres[1], 433],
//     //     ["Harry Potter and the Deathly Hallows", authors[11][0], authors[11][1], genres[0], 759],
//     //     ["Wilde Like Me", "Louise", "Pentland", genres[1], 385],
//     //     ["The Indigo King", "James A.", "Owen", genres[0], 372],
//     //     ["John Carter of Mars: The First Five Novels", "Edgar Rice", "Burroughs", genres[0], 929],
//     //     ["The Samantha American Girl Series", "", "", `${genres[6]}, ${genres[5]}`, "?"],
//     //     ["Coral Island", "R. M.", "Ballantyne", `${genres[6]}, ${genres[5]}`, 184],
//     //     ["So Much Closer", authors[3][0], authors[3][1], genres[3], 241],
//     //     ["Just Listen", authors[12][0], authors[12][1], `${genres[1]}, ${genres[2]}`, 371],
//     //     ["That Summer", authors[12][0], authors[12][1], `${genres[1]}, ${genres[2]}`, 198],
//     //     ["So B. It", "Sarah", "Weeks", genres[1], 243],
//     //     ["A Girl Named Digit", "Annabel", "Monaghan", genres[14], 187],
//     //     ["The Girl Who Drank the Moon", "Kelly", "Barnhill", `${genres[6]}, ${genres[0]}`, 386],
//     //     ["Harry Potter and the Prisoner of Azkaban", authors[11][0], authors[11][1], genres[0], 435, series[15]],
//     //     ["The Hate U Give", "Angie", "Thomas", genres[1], 444],
//     //     ["The Son of Neptune", authors[1][0], authors[1][1], genres[0], 513, series[5]],
//     //     ["Halo", "Alexandra", "Adornetto", `${genres[3]}, ${genres[0]}`, 484],
//     //     ["Harry Potter and the Order of the Phoenix", authors[11][0], authors[11][1], genres[0], 870],
//     //     ["The Frog Princess", authors[5][0], authors[5][1], `${genres[6]}, ${genres[0]}`, 214, "Tales of the Frog Princess"],
//     //     ["Love, Stargirl", "Jerry", "Spinelli", `${genres[2]}, ${genres[3]}`, 274, "Stargirl"],
//     //     ["The Fault in Our Stars", authors[4][0], authors[4][1], `${genres[1]}, ${genres[2]}`, 313],
//     //     ["Althea & Oliver", "Cristina", "Moracho", `${genres[2]}, ${genres[3]}`, 364],
//     //     ["If I Stay", "Gayle", "Forman", `${genres[2]}, ${genres[3]}`, 234],
//     //     ["Harry Potter and the Sorcerer's Stone", authors[11][0], authors[11][1], genres[0], 309, series[15]],
//     //     ["The Probability of Miracles", "Wendy", "Wunder", `${genres[2]}, ${genres[3]}`, 357],
//     //     ["City of Bones", "Cassandra", "Clare", genres[0], 485],
//     //     ["The Daughters", "Joanna", "Philbin", genres[1], 297, series[18]],
//     //     ["Close to Famous", "Joan", "Bauer", genres[1], 250],
//     //     ["Learning to Swear in America", "Katie", "Kennedy", genres[1], 340],
//     //     ["Once Upon a Curse", authors[5][0], authors[5][1], `${genres[6]}, ${genres[0]}`, 244, "Tales of the Frog Princess"],
//     //     ["The Pricess Tales Vol.2", authors[2][0], authors[2][1], genres[0], 248],
//     //     ["The Great Gilly Hopkins", "Katherine", "Paterson", genres[1], 148],
//     //     ["The BFG", "Roald", "Dahl", genres[0], 208],
//     //     ["From the Mixed-Up Files of Mrs. Basil E. Frankweiler", "E. L.", "Konigsburg", genres[8], 162],
//     //     ["James and the Giant Peach", "Roald", "Dahl", genres[0], 126],
//     //     ["Harry Potter and the Chamber of Secrets", authors[11][0], authors[11][1], genres[0], 341, series[15]],
//     //     ["Much Ado About Anne", "Heather Vogel", "Frederick", genres[1], 315, series[16]],
//     //     ["The Mother-Daughter Book Club", "Heather Vogel", "Frederick", genres[1], 236, series[16]],
//     //     ["Ostrich", "Matt", "Greene", genres[1], 322],
//     //     ["Insurgent", "Veronica", "Roth", genres[9], 525, series[17]],
//     //     ["Divergent", "Veronica", "Roth", genres[9], 487, series[17]],
//     //     ["Let it Snow", "John Green, Maureen Johnson,", "Lauren Myracle", `${genres[2]}, ${genres[3]}`, 352],
//     //     ["Mosquitoland", "David", "Arnold", genres[1], 342],
//     //     ["All the Bright Places", "Jennifer", "Niven", `${genres[1]}, ${genres[2]}`, 376],
//     //     ["The Mark of Athena", authors[1][0], authors[1][1], genres[0], 574, series[5]],
//     //     ["Eleanor", "Jason", "Gurley", genres[7], 370],
//     //     ["Bad Unicorn", "Platte F.", "Clark", genres[0], 423],
//     //     ["Zip", "Ellie", "Rollins", genres[1], 323],
//     //     ["Harry Potter and the Half-Blood Prince", authors[11][0], authors[11][1], genres[0], 652, series[15]],
//     //     ["Reboot", "Amy", "Tinera", genres[9], 365],
//     //     ["Super Sad True Love Story", "Gary", "Shteyngart", `"${genres[9]}"`, 331],
//     //     ["Pay It Forward", "Catherine Ryan", "Hyde", `${genres[6]}, ${genres[8]}`,261],
//     //     ["What My Mother Doesn't Know", "Sonya", "Sones", `${genres[2]}, ${genres[3]}`, 259],
//     //     ["Get Noticed!", "Brenda Joyce", "Johnson", genres[17], 238],
//     //     ["The Daughters Join the Party", "Joanna", "Philbin", genres[1], 269, series[18]],
//     //     ["Love Wins", "Rob", "Bell", genres[15], 139],
//     //     ["Fateful", "Claudia", "Gray", genres[5], 325],
//     //     ["Something, Maybe", "Elizabeth", "Scott", `${genres[2]}, ${genres[3]}`, 217],
//     //     ["Precious", "Sapphire", "", genres[8], "?"],
//     //     ["Someone Like You", authors[12][0], authors[12][1], `${genres[2]}, ${genres[3]}`, 281],
//     //     ["The Night Tourist", "Katherine", "Marsh", genres[0], 232],
//     //     ["Can You Keep a Secret?", authors[13][0], authors[13][1], `${genres[1]}, ${genres[3]}`, 357],
//     //     ["Momo", "Michael", "Ende", genres[0], 225],
//     //     ["The Inner Self", "Raqurra", "Ishmar", genres[0], 275],
//     //     ["Emancipated", "M. G.", "Reyes", genres[8], 384],
//     //     ["This Lullaby", authors[12][0], authors[12][1], `${genres[2]}, ${genres[3]}`, 345],
//     //     ["Shopaholic Takes Manhattan", authors[13][0], authors[13][1], genres[1], 323, series[19]],
//     //     ["Confessions of a Shopaholic", authors[13][0], authors[13][1], genres[1], 310, series[19]],
//     //     ["Shopaholic Ties the Knot", authors[13][0], authors[13][1], genres[1], 327, series[19]],
//     //     ["The Bravest Princess", authors[5][0], authors[5][1], genres[0], 263, series[4]],
//     //     ["A Desirable Residence", "Madeleine", "Wickham", genres[1], 296],
//     //     ["A Ring of Endless Light", "Madeleine", "L'Engle", genres[1], 324],
//     //     ["Captive", "Brighton", "Walsh", genres[3], 274],
//     //     ["Two Way Street", "Lauren", "Barnholdt", genres[3], 288],
//     //     ["Savages", "Don", "Winslow", genres[1], 290],
//     //     ["Clout", "Jenni", "Catron", genres[15], 186],
//     //     ["Before I Go To Sleep", "S. J.", "Watson", genres[9]],
//     //     ["Instructions for a Broken Heart", "Kim", "Culbertson", genres[3], 291],
//     //     ["The False Prince", "Jennifer A.", "Nielsen", genres[0], 342],
//     //     ["Something Like Fate", authors[3][0], authors[3][1], `${genres[2]}, ${genres[3]}`, 268],
//     //     ["The Boy Who Knew Everything", "Victoria", "Forester", genres[0], 404]
//     // ];
 
//     // data = ""

//     // counter = 1;
//     // for(a = 0; a < books2.length; a++){
//     //     data += `{
//     //         "index": ${counter},
//     //         "title": "${books2[a][0]}",
//     //         "series": "${books2[a][5]}",
//     //         "authorsFirst": ["${books2[a][1]}"],
//     //         "authorsLast": ["${books2[a][2]}"],
//     //         "genres": ["${books2[a][3]}"],
//     //         "pagecount": ${books2[a][4]}
//     //         },\n`;
//     //     counter += 1
//     // }

//     // console.log(data)

//     JSON.parse(booksGlobal)
// }
