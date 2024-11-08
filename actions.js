//Waits until DOM is fully loaded
$(loadPage);

function loadPage(){
    let $resumeOption = $("resume");
    $resumeOption.click(selectedHandler);
    
}

function selectedHandler(){
    if(this.text() == "resume"){
        $("object").data = "ResumeFinal.pdf";
    }
}