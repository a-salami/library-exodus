

//determines when last the current page was modified; called exclusively to edit footer()
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

//switches the 'last updated' date between formats: MM/DD/YYYY hh:mm, Month DD, YYYY at hh:mm; called exclusively to edit footer()
function dateDisplay(id){
    ogFormat = document.getElementById(id).innerHTML;
    console.log(ogFormat)
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

    document.getElementById(id).innerHTML = newFormat;
}

function setModDate(id){
    document.getElementById(id).innerHTML = `${pageLastModified()}`;
}

function footer(id){
    document.getElementById(id).innerHTML = `
    <div class = "col-sm-9">
        <h3>the library, Exodus</h3>
        <p>a catalogue of other wor(l)ds</p>
        <img href = "https://github.com/a-salami" target = "_blank" src = "gh.png" style = "height: 4%; cursor: pointer;">
    </div>
    
    <div class = "col-sm-3">
        <span>Last Update:<p style = "cursor: pointer;" onclick = "dateDisplay('modDate')" id = "modDate">${pageLastModified()}</p></span>
    </div>`;
}