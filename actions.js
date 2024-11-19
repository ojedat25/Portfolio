//Waits until DOM is fully loaded
$(loadPage);
var eventRecords = [
    {imgClicked: false}
]

function loadPage(){
    loadEventListeners();
}

function loadEventListeners(){
    $("#homeImg").mouseover(function(){
        //Increases the width of the nameContent div pseudo after effect ::after
        $("html").css("--after-width","100%");

    })
    $("#homeImg").mouseout(function(){
        //Decreases the width of the nameContent div pseudo after effect ::after
        $("html").css("--after-width","0%");

    })
    $("#homeImg").click(imgClick);
}

function imgClick(){
    let $topTextBox = $(".nameContent")
    let $topImg = $("#homeImg")
    let $unclickedText = $("#unclicked")
    let $clickedText = $("#clicked")
        //sliding effect on image and text content
    if(eventRecords.imgClicked){
        eventRecords.imgClicked = false;
        $topTextBox.hide("slow").queue(function(next){
            $unclickedText.removeClass("hidden")
            $clickedText.addClass("hidden")
            $topTextBox.css({
                "margin-left": "15vw",
                "margin-right": "0",
                direction: "ltr",
               right:"initial" //resets value
                
                
            })
            $topImg.animate({
                right:"+=70vw"
            },300,function(){
                $topTextBox.show("slow");
                next();
            })});

        }
    else{
        eventRecords.imgClicked = true;
        console.log("left "+$topTextBox.css("left"))
        console.log("right "+$topTextBox.css("right"))
        $topTextBox.hide("slow").queue(function(next){
            $clickedText.removeClass("hidden")
            $unclickedText.addClass("hidden")
            $topTextBox.css({
                "margin-left": "0",
                "margin-right": "15vw",
                direction: "rtl", //changes direction the pseduo element ::after of nameContent's direction to right to left
                right: "0px"

            
            
        })
        $topImg.animate({
            right: "-=70vw"
        },300,function(){
                console.log("here")
                $topTextBox.show("slow");
            
            })
        next()
        });
    
    }
        


}
    
