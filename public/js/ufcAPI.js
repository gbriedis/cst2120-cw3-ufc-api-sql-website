const APIKey = '?key=' + 'b7919ceb3c924e7a86e5bb6accf9dfb7'

// get all UFC Events in 2021 
$.getJSON(
    "https://api.sportsdata.io/v3/mma/scores/json/Schedule/UFC/2021" + APIKey, function(data) {
        data.forEach(element => {

            // get UFC 2021 Events details, only display fights which are Scheduled and not already finished 
            $.getJSON(
                "https://api.sportsdata.io/v3/mma/scores/json/Event/" + element.EventId + APIKey, function(eventData) {
                    if(eventData.Status !== "Final") {

                        // output HTML 
                        let event_str = 
                        "<div class='flex flex-col flex-wrap bg-gray-50 font-bold rounded-lg border shadow-md p-10 w-full mt-16'>" +
                            "<div class='flex flex-row flex-wrap justify-items-stretch w-full'>" +
                                "<h1 class='w-full font-bold text-black text-xl pb-3'>" + eventData.Name + "</h1>" +
                                "<h2 class='w-full text-sm text-gray-600 pb-3'>Date: " + eventData.DateTime + "</h2>" +
                                "<h2 class='w-full text-sm text-gray-600 pb-3'>Status: " + eventData.Status + "</h2>" +
                            "</div>" +
                            "<span class='w-full h-px bg-gray-200 mb-5'></span>" +
                            "<div id='output-fighters'></div>"+
                        "</div>"

                        eventData.Fights.forEach(e => {
                            console.log(e)

                            let fighters_str = 
                            "<div>"+ e.CardSegment +"</div>" +
                            "<div>"+ e.Order +"</div>"

                            $("#output-fighters").append(fighters_str);

                        });



                        $("#output-events").append(event_str);

                    }
                }
            )
        });
    }
)
