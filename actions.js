// Waits until the DOM is fully loaded
$(loadPage);

// Object to track event states
var eventRecords = { imgClicked: false };

// Main function called after DOM is loaded
function loadPage() {
  loadEventListeners(); // Attach all event listeners
  $(window).scroll(ScrollEvent); // Trigger ScrollEvent on scroll
  ScrollEvent(); // Trigger ScrollEvent once initially

  $(".projectImg").click(function () {
    $("#videoSrc").attr("src", $(this).data("video")); //retrieves the data from the data-video attribute
    $("#videoPlayer")[0].load() //reloads the videoplayer to show the new video
    $(".videoWindow").css({display: "flex", opacity: "0"}).animate({ opacity: "1" },300); //makes the video window visible
    $("#videoPlayer")[0].play()
  })
  $(".closeBtn").click(closeVideo);
  $(".videoWindow").click(function (event) {
    if ($(event.target).is($(".videoWindow"))) { //uses the jQuery .is() to check if the selected element (event.target) is equal to the videoWindow, if so it calls the closeVideo function
      $(".videoWindow").animate({ opacity: "0" }, 300, closeVideo)
    }
  });

  
}
function closeVideo(){
  $(".videoWindow").css("display", "none");
  const videoPlayer = $("#videoPlayer")[0];
  videoPlayer.pause();
    videoPlayer.currentTime = 0;
  
}
// Function to handle scroll events
function ScrollEvent() {
  const sections = $("body,html").children(); // Get list of all direct children of <body> and <html>
  const progressBars = document.querySelectorAll(".progressBar"); // Select all progress bars
  const screenTop = $(window).scrollTop(); // Distance scrolled from the top of the viewport
  const screenBottom = screenTop + $(window).innerHeight(); // Bottom of the viewport

  // Iterate over sections starting from index 3
  for (let i = 3; i < sections.length; i++) {
    const sectionTop = $(sections[i]).offset().top; // Top position of the section
    const sectionBottom = sectionTop + $(sections[i]).outerHeight(); // Bottom position of the section

    // Check if the section is within the viewport
    if (screenBottom > sectionTop && screenTop < sectionBottom) {
      // Handle animations for the Home section
      if ($(sections[i]).attr("id") == "Home") {
        $(sections[4]).children(".animatedDiv").addClass("sectionAnimation");
      }
      // Handle progress bar animations for the Skills section
      else if ($(sections[i]).attr("id") == "Skills") {
        progressBars.forEach((bar) => {
          bar.classList.add("progressBarAnimation");
        });
      }
      else if ($(sections[i]).attr("id") == "Projects") {
        $(".projectContainer").addClass("sectionAnimation");
      }
      // Handle animations for other sections
      else {
        $(sections[7]).children(".animatedDiv").addClass("sectionAnimation");
      }
    }
    // If the section is not in the viewport, remove animations
    else {
      $(sections[i]).children(".animatedDiv").removeClass("sectionAnimation");
      if ($(sections[i]).attr("id") == "Projects") {
        $(".projectContainer").removeClass("sectionAnimation");
      }
      // Trigger imgClick behavior if the image has been clicked
      if (eventRecords.imgClicked) {
        imgClick();
      }
      if ($(sections[i]).attr("id") == "Projects" && $(".videoWindow").css("display") == "flex") {
        closeVideo();
      }
      // Remove progress bar animations for the Skills section
      if ($(sections[i]).attr("id") == "Skills") {
        progressBars.forEach((bar) => {
          bar.classList.remove("progressBarAnimation");
        });
      }
    }
  }
}

// Attach event listeners for various interactions
function loadEventListeners() {
  $("section").click(function () {
    $(".navContainer").removeClass("expand");
  })
  $(".navBtn").click(function () {
    $(".navContainer").toggleClass("expand");
  });
  $("#homeImg").mouseover(function () {
    // Expands the width of the ::after pseudo-element in the nameContent div
    $("html").css("--after-width", "100%");
  });

  $("#homeImg").mouseout(function () {
    // Shrinks the width of the ::after pseudo-element in the nameContent div
    $("html").css("--after-width", "0%");
  });

  $("#homeImg").click(imgClick); // Trigger imgClick on image click
  $("#Form").on("submit", formSubmit); // Handle form submission
}

// Toggles the sliding animation and content updates for the home image
function imgClick() {
  let $topTextBox = $(".nameContent"); // Text content above the image
  let $topImg = $("#homeImg"); // The main image
  let $unclickedText = $("#unclicked"); // Text shown when not clicked
  let $clickedText = $("#clicked"); // Text shown when clicked

  // If the image is currently clicked
  if (eventRecords.imgClicked) {
    eventRecords.imgClicked = false; // Reset state
    $topTextBox.hide("slow").queue(function (next) {
      $unclickedText.removeClass("hidden");
      $clickedText.addClass("hidden");
      $topTextBox.css({
        "margin-left": "15vw",
        "margin-right": "0",
        direction: "ltr", // Reset text direction to left-to-right
        right: "initial", // Reset positioning
      });
      $topImg.animate(
        {
           // Slide the image back to its original position
          left: "2vw"
        },
        300,
        function () {
          $topTextBox.show("normal"); // Show the text content after the animation
        }
      );
      next();
    });
  }
  // If the image is not clicked
  else {
    eventRecords.imgClicked = true; // Set state
    $topTextBox.hide("slow").queue(function (next) {
      $clickedText.removeClass("hidden");
      $unclickedText.addClass("hidden");
      $topTextBox.css({
        "margin-left": "0",
        "margin-right": "15vw",
        direction: "rtl", // Change text direction to right-to-left
        right: "0px",
      });
      $topImg.animate(
        {
          left: "72vw", // Slide the image out of view
          
        },
        300,
        function () {
          $topTextBox.show("normal"); // Show the text content after the animation
        }
      );
      next();
    });
  }
}

// Handles the form submission process
function formSubmit(event) {
  console.log("Making Submission");
  let $result = $("#result"); // Element to display form submission result
  let form = document.getElementById("Form"); // Form element
  $result.removeClass("hidden"); // Show the result area
  event.preventDefault(); // Prevent default form submission behavior

  // Collect form data
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  $result.text("Please wait..."); // Show waiting message

  // Send form data via AJAX
  $.ajax({
    url: "https://api.web3forms.com/submit", // Form submission endpoint
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    datatype: "json",
    data: json,
    success: function (res) {
      console.log(res.message); // Log the server response
      $result.text(res.message); // Display the server response
    },
  }).fail(function (err) {
    $result.text("Something Went Wrong"); // Show error message on failure
  });

  form.reset(); // Reset the form fields

  // Hide the result message after 3 seconds
  setTimeout(function () {
    $result.addClass("hidden");
  }, 3000);
}
