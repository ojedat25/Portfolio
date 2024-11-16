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
        
        $("html").css("--after-width","100%");

    })
    $("#homeImg").mouseout(function(){
        $("html").css("--after-width","0%");

    })
    $("#homeImg").click(imgClick);
}

function imgClick(){
    let $topTextBox = $(".nameContent")
    let $topImg = $("#homeImg")
    let $unclickedText = $("#clicked")
        //sliding effect on image and text content
    if(eventRecords.imgClicked){
        eventRecords.imgClicked = false;
        console.log("1left "+$topTextBox.css("left"))
        console.log("1right "+$topTextBox.css("right"))
        $topTextBox.hide("slow").queue(function(next){
            $topTextBox.css({
                "margin-left": "15vw",
                "margin-right": "0",
                direction: "ltr",
               right:"initial"
                
                
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
        $topTextBox.css({
            "margin-left": "0",
            "margin-right": "15vw",
            direction: "rtl",
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
    
