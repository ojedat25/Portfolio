//Waits until DOM is fully loaded
$(loadPage);

var eventRecords = [{ imgClicked: false }];

function loadPage() {
  loadEventListeners();
  $(window).scroll(ScrollEvent);
}

function ScrollEvent() {
  const mainNode = $('body,html').children(); //list of direct children
  const nodes = document.querySelectorAll('.progressBar');
  const screenTop = $(window).scrollTop(); //how far we have scrolled from the top
  const screenBottom = screenTop + $(window).innerHeight();
  const nodeTop = $('#Skills').offset().top;
  const nodeBottom = $('#Skills').outerHeight() + nodeTop;
  nodes.forEach((node) => {
    const width = Math.min(parseInt(node.textContent.substring(0, 2)), screenTop);
    if (screenBottom > nodeTop && screenTop < nodeBottom) {
      node.style.width = width - 22 + '%';
      
    } else {
      node.style.width = 0 + '%';
      
    }
  });
  // console.log("SectionTop: "+ sectionTop);
  // console.log("SectionBottom: "+sectionBottom);
  // console.log("ScrollY: "+scroll);
  for (let i = 3; i < mainNode.length - 1; i++) {
    const sectionTop = $(mainNode[i]).offset().top;
    const sectionBottom = sectionTop + $(mainNode[i]).outerHeight(); //getting the sections bottom position

    if (screenBottom > sectionTop && screenTop < sectionBottom) {
      if ($(mainNode[i]).attr('id') == 'Home') {
        $(mainNode[3]).children('.animatedDiv').removeClass('divAnimation');
      } else {
        $(mainNode[5]).children('.animatedDiv').removeClass('divAnimation');
      }
    } else if ($(mainNode[i]).attr('id') != 'Skills') {
      $(mainNode[i]).children('.animatedDiv').addClass('divAnimation');
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
          right: '+=70vw',
        },
        300,
        function () {
          $topTextBox.show('slow');
          next();
        }
      );
    });
  } else {
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
          right: '-=70vw',
        },
        300,
        function () {
          $topTextBox.show('slow');
        }
      );
      next();
    });
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
