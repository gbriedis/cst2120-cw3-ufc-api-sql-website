const APIKey = '?key=' + 'b7919ceb3c924e7a86e5bb6accf9dfb7'

// get all UFC Events in 2021 
$.getJSON(
    `https://api.sportsdata.io/v3/mma/scores/json/Schedule/UFC/2021${APIKey}`, function(data) {
        data.forEach(element => {

            // get UFC 2021 Events details, only display fights which are Scheduled and not already finished 
            $.getJSON(
                "https://api.sportsdata.io/v3/mma/scores/json/Event/" + element.EventId + APIKey, function(eventData) {
                    if(eventData.Status !== "Final") {

                        eventData.Fights.forEach(e => {
                            if(e.Status == "Scheduled") {
                                let totalFights0 = e.Fighters[0].PreFightWins + e.Fighters[0].PreFightLosses + e.Fighters[0].PreFightDraws
                                let totalFights1 = e.Fighters[1].PreFightWins + e.Fighters[1].PreFightLosses + e.Fighters[1].PreFightDraws
                                let wlr0 = (e.Fighters[0].PreFightWins / totalFights0) * 100
                                let wlr1 = (e.Fighters[1].PreFightWins / totalFights1) * 100
                                let wlr0Dec = wlr0.toFixed(2)
                                let wlr1Dec = wlr1.toFixed(2)

                                // output HTML 
                                let event_str = 
                                "<div class='flex flex-col flex-wrap bg-gray-50 font-bold rounded-lg border shadow-md p-10 w-full mt-16 text-center'>" +
                                    "<h1 class='w-full font-bold text-gray-800 text-2xl pb-3'>" + eventData.Name + "</h1>" +
                                    "<h2 class='w-full text-sm text-gray-500 pb-3'>Date: " + eventData.DateTime + "</h2>" +
                                    "<h2 class='w-full text-sm text-gray-500 pb-3'>Status: " + eventData.Status + "</h2>" +
                                    "<span class='w-full h-0.5 rounded-md bg-gray-200 mb-5'></span>" +
                                    "<h2 class='w-full text-gray-500 pb-3'>Card Order: "+ e.Order +"</h2>"+
                                    "<h2 class='w-full text-gray-500 pb-3'>Card Segment: "+ e.CardSegment +"</h2>"+
                                    "<h2 class='w-full text-gray-500 pb-3'>Weight Class: "+ e.WeightClass +"</h2>"+
                                    "<h2 class='w-full text-gray-500 pb-3'>Rounds: "+ e.Rounds +"</h2>"+
                                    "<div class='flex flex-row mb-1'>" +
                                        "<h2 class='w-full text-xl text-gray-800'>"+ e.Fighters[0].FirstName + " " + e.Fighters[0].LastName +"</h2>"+
                                        "<h2 class='w-full text-xl text-gray-800'>"+ e.Fighters[1].FirstName + " " + e.Fighters[1].LastName +"</h2>"+
                                    "</div>"+
                                    "<div class='flex flex-row mb-6'>"+
                                        "<h2 class='w-full text-gray-500'>"+ e.Fighters[0].PreFightWins +"/"+ e.Fighters[0].PreFightDraws +"/"+ e.Fighters[0].PreFightLosses +"</h2>"+
                                        "<h2 class='w-full text-gray-500'>"+ e.Fighters[1].PreFightWins +"/"+ e.Fighters[1].PreFightDraws +"/"+ e.Fighters[1].PreFightLosses +"</h2>"+
                                    "</div>"+
                                    "<div class='flex flex-row'>"+
                                        "<h2 class='w-full text-gray-500'>W/L Ratio: "+ wlr0Dec +"</h2>"+
                                        "<h2 class='w-full text-gray-500'>W/L Ratio: "+ wlr1Dec +"</h2>"+
                                    "</div>"+
                                    "<div class='flex flex-row mb-2'>"+
                                        "<h2 class='w-full text-gray-500'>Odds: "+ e.Fighters[0].Moneyline+"</h2>"+
                                        "<h2 class='w-full text-gray-500'>Odds: "+ e.Fighters[1].Moneyline+"</h2>"+
                                    "</div>"
                                "</div>"
                                
                                $("#output-events").append(event_str);
                            }
                        });
                    }
                }
            )
        });
    }
)

