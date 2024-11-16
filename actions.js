//Waits until DOM is fully loaded
$(loadPage);

function loadPage(){
    loadEventListeners();
}

function loadEventListeners(){
    $("#homeImg").mouseover(function(){
        
        $("html").css("--after-width","100%");

    })
    $("#homeImg").mouseout(function(){
        console.log("here");
        console.log($(".nameContent::after"));
        $("html").css("--after-width","0%");

    })
    $("#homeImg").click(function(){
        $(".nameContent").hide("slow").queue(function(next){
            $(".nameContent").css({
                "margin-left": "0",
                "margin-right": "15vw",
                right: 0,
                padding: "1vw 13vw 5vw 15vw"
            })
        $(".nameContent").html("");
        $("#homeImg").animate({
            right: "-=70vw"
        },300,function(){
                console.log("here")
                $(".nameContent").show("slow");
            next()
           })});
        ;
        })
        


}
    
