//Waits until DOM is fully loaded
$(loadPage);

function loadPage(){
    let pdfObject = $("object")
    pdfObject.data = "ResumeFinal.pdf";
    console.log(pdfObject.data);
}