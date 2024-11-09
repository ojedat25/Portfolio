//Waits until DOM is fully loaded
$(loadPage);

function loadPage(){
    let $resumeOption = $("#resume");
    $resumeOption.click(selectedHandler);
    console.log("here")
    
}

function selectedHandler(){
    console.log("here")
    let text = $(this).text()
    
    if(text == "Resume"){
        $("object").attr("data","ResumeFinal.pdf#toolbar=0");
        console.log("here")

    }
}