//Waits until DOM is fully loaded
$(loadPage);

var eventRecords = [{ imgClicked: false }];

function loadPage() {
  loadEventListeners();
  $(window).scroll(ScrollEvent);
  ScrollEvent();
}

function ScrollEvent() {
  const mainNode = $('body,html').children(); //list of direct children
  // console.log(mainNode);
  const nodes = document.querySelectorAll('.progressBar');
  const screenTop = $(window).scrollTop(); //how far we have scrolled from the top
  const screenBottom = screenTop + $(window).innerHeight();
  for (let i = 3; i < mainNode.length; i++) {
    const sectionTop = $(mainNode[i]).offset().top;
    const sectionBottom = (sectionTop + $(mainNode[i]).outerHeight()); //getting the sections bottom position
    // console.log(`ScreenTop: ${screenTop}, ScreenBottom: ${screenBottom}`)
    // console.log(`Main Top: ${$(mainNode[3]).offset().top}, Main Bottom: ${$(mainNode[3]).offset().top + $(mainNode[3]).outerHeight()}`)
    // console.log(`Skills Top: ${$(mainNode[4]).offset().top}, Skills Bottom: ${$(mainNode[4]).offset().top + $(mainNode[4]).outerHeight()}`)
    // console.log(`Contacts Top: ${$(mainNode[5]).offset().top}, Contacts Bottom: ${$(mainNode[5]).offset().top + $(mainNode[5]).outerHeight()}`)
    if (screenBottom > sectionTop && screenTop < sectionBottom) {
      //True if the top of the screen measurement (starts at 0 and increases as you go down) is less than the bottom of the section
      if ($(mainNode[i]).attr('id') == 'Home') {
        console.log("In Home Section")
        $(mainNode[3]).children('.animatedDiv').addClass('sectionAnimation');
      } else if ($(mainNode[i]).attr('id') == 'Skills') {
        console.log("Inisde the Skills Section")
        nodes.forEach((bar) => {
          bar.classList.add("progressBarAnimation");
        });
      } else {
        console.log("In Form section")
        $(mainNode[5]).children('.animatedDiv').addClass('sectionAnimation');
      }
    } else {
      $(mainNode[i]).children('.animatedDiv').removeClass('sectionAnimation');
      // if ($(mainNode[i]).attr('id') == 'Home') {
      //   eventRecords.imgClicked = true;
      //   imgClick();
      //  }
      if ($(mainNode[i]).attr('id') == 'Skills') {
        nodes.forEach((bar) => {
          bar.classList.remove("progressBarAnimation");
        });
      }
    }
  }
}

function loadEventListeners() {
  $('#homeImg').mouseover(function () {
    //Increases the width of the nameContent div pseudo after effect ::after
    $('html').css('--after-width', '100%');
  });
  $('#homeImg').mouseout(function () {
    //Decreases the width of the nameContent div pseudo after effect ::after
    $('html').css('--after-width', '0%');
  });
  $('#homeImg').click(imgClick);
  $('#Form').on('submit', formSubmit);
}

function imgClick() {
  let $topTextBox = $('.nameContent');
  let $topImg = $('#homeImg');
  let $unclickedText = $('#unclicked');
  let $clickedText = $('#clicked');
  //sliding effect on image and text content
  
  if (eventRecords.imgClicked) {
    
    eventRecords.imgClicked = false;
    $topTextBox.hide('slow').queue(function (next) {
      $unclickedText.removeClass('hidden');
      $clickedText.addClass('hidden');
      $topTextBox.css({
        'margin-left': '15vw',
        'margin-right': '0',
        direction: 'ltr',
        right: 'initial', //resets value
      });
      $topImg.animate(
        {
          right: '0px',
        },
        300,
        function () {
          $topTextBox.show('slow');
          next();
        }
      );
    });
    console.log("top Img right: " + $topImg.css("right"));
  } else {
    console.log("clicked");
    eventRecords.imgClicked = true;
    $topTextBox.hide('slow').queue(function (next) {
      $clickedText.removeClass('hidden');
      $unclickedText.addClass('hidden');
      $topTextBox.css({
        'margin-left': '0',
        'margin-right': '15vw',
        direction: 'rtl', //changes direction the pseduo element ::after of nameContent's direction to right to left
        right: '0px',
      });

      $topImg.animate(
        {
          right: '-687.12px',
        },
        300,
        function () {
          $topTextBox.show('slow');
        }
      );
      next();
    });
    console.log("top Img right: " + $topImg.css("right"));
  }
  
}
function formSubmit(event) {
  console.log('Making Submission');
  let $result = $('#result');
  let form = document.getElementById('Form');
  $result.removeClass('hidden');
  event.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  $result.text('Please wait...');
  $.ajax({
    url: 'https://api.web3forms.com/submit',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    datatype: 'json',
    data: json,
    success: function (res) {
      console.log(res.message);
      $result.text(res.message);
    },
  }).fail(function (err) {
    $result.text('Something Went Wrong');
  });
  form.reset();
  setTimeout(function () {
    $result.addClass('hidden');
  }, 3000);
}
