$(function () {
    console.log("test");
    getEventsData();
    checkGenres();
    var i; //i for loop
    var genreArray = []; //array aanmaken die de genres gaat bijhouden
    var doelGroepArray = []; //array doelgroep
    var filterDoelGroep = []; //array van filters
    var filterGenre = []; //Filters met de naam van de active filters
    var filterDoelGroepCheck = [];
    var filterGenreCheck = []; //array met true false van de filters 
    var indexNumberDoelgroep; //index van de geklikte filters
    var indexNumberGenre;
    var filterTeller = 0; //tellen hoeveel filters er zijn, als 0 dan verdwijnt knop
    var minEvent = 0; //limiet van aantal events op pagina
    var maxEvent = 15;
    var kleinsteP = 1; //paginanummering start 1, andere wordt aangepast naargelang grootte
    var GrootsteP;


    //SEARCHBAR
    $("#searchbar").keyup(function () {
        if ($("#searchbar").val() == "") { //checken als searchbar leeg is, zo verdwijnt die als die leeg is
            $(".RequestedSearch").hide(); //hide als leeg
        } else {
            $(".RequestedSearch").show(); //tonen als niet leeg
            $(".RequestedSearch").empty(); //alles verwijderen van vorige request
            $.ajax({
                url: 'entries.json',
                method: 'GET',
                dataType: 'json',
            }).done(function (data) {
                for (let event of data.items) { //ajax call om de nieuwe data te nemen van search
                    if (event.name.includes(($("#searchbar").val()).toLowerCase())) { //kijken bij wat het past in de value in de array
                        //content plakken in div
                        $(".RequestedSearch").append(`
                    <div>
                    <a href="${event["link-to-video"].url}" ">
                    <div class="searchDescription">
                    <img src="${event.thumbnail.url}" style="width:30%">
                    <h3>${event.name}</h3>
                    <p>${event.excerpt}</p>
                    <p></p>
                    </div>
                    </a>
                </div>
                `)
                    }
                }
            });
        }
    })



    //Functie om te kijken naar de verschillende genres in heel de json
    function checkGenres() {
        $.ajax({
            url: 'entries.json',
            method: 'GET',
            dataType: 'json',
        }).done(function (data) {
            for (let event of data.items) { //checken door de items, naar de verschillende genres
                var currentDoelgroep = event.category.toUpperCase();
                var currentGenre = event['genre-v2'].toUpperCase();
                if (!doelGroepArray.includes(currentDoelgroep)) { //enkel pushen als het verschillend is (nieuw)
                    doelGroepArray.push(currentDoelgroep); //push naam van de filter
                    filterDoelGroepCheck.push("false"); //push een true false om te checken als het geklikt is of niet
                } else if (!genreArray.includes(currentGenre)) {
                    genreArray.push(currentGenre);
                    filterGenreCheck.push("false");
                }

            }
            /*console.log(doelGroepArray);
            console.log(genreArray);
            console.log(filterDoelGroepCheck);
            console.log(filterGenreCheck);*/


            //for loop om buttons toe te voegen van filters
            for (i = 0; i < doelGroepArray.length; i++) {
                $(".Doelgroep").append(`<button id="btn">${doelGroepArray[i]}</button>`)
            }

            for (i = 0; i < genreArray.length; i++) {
                $(".Genre").append(`<button id="btn">${genreArray[i]}</button>`)
            }
        })
    }


    //Klikken op buttons om te filteren, worden gecheckt (true/false) en worden gepusht in filterArrays
    $('.Doelgroep').on('click', '#btn', function () { //clicken op een button
        $(this).toggleClass("ClickedBtn"); //klasse geven aan geklikte buttons
        //console.log($(this).text()); //Kijken welk btn geklikt werd
        var geklikteFilter = ($(this).text().toUpperCase());

        //Hier had ik eerst een ander manier om te checken als het active was of niet maar er was een probleem
        //dus heb ik op een ander manier gedaan

        /*indexNumberDoelgroep = doelGroepArray.indexOf($(this).text()); //index van het geklikte filter in de array
        // console.log(indexNumberDoelgroep);
        if (filterDoelGroepCheck[indexNumberDoelgroep] == "false") { //true false aanpassen als het geklikt werd of niet
            filterDoelGroepCheck[indexNumberDoelgroep] = "true";*/
        //console.log(filterDoelGroepCheck);
        if (!filterDoelGroep.includes(geklikteFilter)) {
            filterDoelGroep.push(geklikteFilter); //tekst pushen in filter als het geklikt is
            //filterTeller = filterTeller + 1; //tellen van aantal filters
            //console.log(filterDoelGroep);
            getEventsData();
        }
        /*if (filterDoelGroep.length == 0 && filterGenre.length == 0) {
                    //filterTeller = 0; //alles resetten
                    console.log("delete");
                    filterGenre = [];
                    filterDoelGroep = []
                    $("#DeleteFilters").remove(); //verwijder btn
                    $("button").removeClass("ClickedBtn");
                } */
        /*  if (filterDoelGroepCheck[indexNumberDoelgroep] == "true") {
              filterDoelGroepCheck[indexNumberDoelgroep] = "false";*/
        else {
            filterDoelGroep.splice(filterDoelGroep.indexOf(geklikteFilter), 1); //weghalen als het teruggeklikt wordt
            //filterTeller = filterTeller - 1;
            if (filterTeller == 0) {
                $("#DeleteFilters").remove();
            }
            getEventsData();
        }
    })
    //console.log(filterDoelGroepCheck);
    //console.log(filterDoelGroep);


    $('.Genre').on('click', '#btn', function () { //clicken op een button
        $(this).toggleClass("ClickedBtn"); //klasse geven aan geklikte buttons
        //console.log($(this).text()); //Kijken welk btn geklikt werd
        var geklikteFilter = ($(this).text().toUpperCase());
        /*indexNumberGenre = genreArray.indexOf(geklikteFilter); //index van het geklikte filter in de array
        if (filterGenreCheck[indexNumberGenre] == "false") { //true false aanpassen als het geklikt werd of niet
            filterGenreCheck[indexNumberGenre] = "true";*/
        if (!filterGenre.includes(geklikteFilter)) {
            filterGenre.push(geklikteFilter);
            // filterTeller = filterTeller + 1;
            getEventsData();
            // console.log("FILTERRR" + filterDoelGroep);
        } else {
            /*filterGenreCheck[indexNumberGenre] = "false";*/
            filterGenre.splice(filterGenre.indexOf(geklikteFilter), 1);
            // filterTeller = filterTeller - 1;
            getEventsData();

        }
        //console.log(filterGenreCheck);
        // console.log(filterGenre);
        // console.log(filterTeller);
    });



    //Wisbutton dat opkomt bij het meer dan 1
    $('.filters').on('click', '#btn', function () {
        if ($('#DeleteFilters').length == 0) {
            //if (!filterTeller == 0) {
            //filterteller gaat ni anders voegt hij meerdere wisbuttons
            $(".filters").append("<button id='DeleteFilters'> FILTERS WISSEN </button>");
            //console.log("ik check");
        }
    })


    //Wissen van filters
    $('.filters').on('click', '#DeleteFilters', function () {
        //console.log("ik delete");
        filterTeller = 0; //alles resetten
        filterGenre = [];
        filterDoelGroep = []
        $("#DeleteFilters").remove(); //verwijder btn
        $("button").removeClass("ClickedBtn"); //verwijder class van geklikt filters
        /* console.log(filterTeller);
         console.log(filterGenre);
         console.log(filterDoelGroep);*/
        getEventsData();
    })


    //data events laden bij starten van website
    function getEventsData() {
        $.ajax({
            url: 'entries.json',
            method: 'GET',
            dataType: 'json',
        }).done(function (data) {
            // console.log(data.items);
            //console.log(data.items[0].category);
            $(".ContentEvents").empty(); //Verwijder de "oude" content om nieuwe op te halen (filter)
            var EventData = []; //nieuwe array van filter
            //console.log("EventData" + EventData);
            for (let event of data.items) { //alle verschillende mogelijkheden van filters
                // console.log(event);
                //console.log("Filterdg" +filterDoelGroep);
                if (filterDoelGroep.indexOf((event.category).toUpperCase()) > -1 && filterGenre == "") { //4mogelijkheden van filters
                    EventData.push(event); //nieuwe data pushen naargelang filter mogelijkheid
                    //console.log("IK PRINT")
                    console.log(EventData);
                    //toUppercase omdat mijn filter al in uppercase is, dus om te vergelijken moet het ook uppercase
                    // >1 omdat het kan dat het op index 0 is, dus zolang het in een van de indexen is dan ga je filteren
                }
                if (filterGenre.indexOf((event["genre-v2"]).toUpperCase()) > -1 && filterDoelGroep == "") {
                    EventData.push(event);
                }
                if (filterDoelGroep.indexOf((event.category).toUpperCase()) > -1 && filterGenre.indexOf((event["genre-v2"]).toUpperCase()) > -1) {
                    EventData.push(event);
                }
                if (filterDoelGroep == "" && filterGenre == "") {
                    EventData.push(event);
                }
            }


            //Filteren van aantal events (15max)
            var limitedEventData = EventData.slice(minEvent, maxEvent);
            console.log(limitedEventData);
            // console.log("EventData" + EventData);
            for (let event of limitedEventData) {
                //for (let event of data.items) { //for loop door items
                //console.log("ik doe dit");
                //De content van events in class events met de html van video, descriptions
                $('.ContentEvents').append(`
                <section class="events">
                    <div class="VideoEvent">
                        <img src=${event.thumbnail.url} style="width: 100%">
                        <div class="GenreEvent">${event["genre-v2"]}</div>
                        </div>
                    </div>
                    <div class="DescriptionEvent">
                        <h3>${event.name}</h3>
                        <p>${event.excerpt}</p>
                        <p>${event["recorded-at"]}</p>
                        <div class="playVideo">
                        <img src="Images/play.png">
                        </div>
                     </div>
                 </section>
                                 `);
            }


            //filterteller dat nakijkt als er filters ingedrukt zijn, indien niet remove button
            filterTeller = filterGenre.length + filterDoelGroep.length;
            console.log(filterTeller);
            if (filterTeller === 0) {
                //console.log("test");
                $("#DeleteFilters").remove();
            }


            //nummers van pagina's
            var limietNummer = EventData.length / 15; //tellen hoeveel pagina's er max gaan zijn
            GrootsteP = Math.floor(limietNummer); //Afronden naar beneden
            //PaginaNumemring dat aanpast bij knoppen
            $(".PaginaNummering").empty(); //reset van nummers voor dat ze aangepast worden
            $(".PaginaNummering").append(`
            <span>Pagina ${kleinsteP} van ${GrootsteP}</span>
            `)
        }).fail(function (er1, er2) {
            console.log(er1);
            console.log(er2);
        });
    }


    //Knoppen vorige en volgende
    $('.EventsBtn').on('click', '#VORIGE', function () { //geklikt op button
        if (kleinsteP > 1) { //zolang het groter is dan1 (minimum)
            $(".PaginaNummering").empty(); //resetten van nummers
            kleinsteP = kleinsteP - 1; //aanpassen van nummers en ook grootte van data
            minEvent = minEvent - 15;
            maxEvent = maxEvent - 15;
            getEventsData(); //data hernieuwen
        } else {
            console.log("Niet kleiner");
        }
    })

    $('.EventsBtn').on('click', '#VOLGENDE', function () {
        if (kleinsteP < GrootsteP) {
            $(".PaginaNummering").empty();
            kleinsteP = kleinsteP + 1;
            minEvent = minEvent + 15;
            maxEvent = maxEvent + 15;
            getEventsData();
        } else {
            console.log("max pagina")
        }
    })
});