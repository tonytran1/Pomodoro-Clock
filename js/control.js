let sessionTime = 25;
let restTime = 5;
let timeStarted = false;
let sessionInterval;
let restInterval;

$('.change-session').on('click', function(event) {
  let type = $(this).html();
  changeTime('session', type);
});

$('.change-rest').on('click', function(event) {
  let type = $(this).html();
  changeTime('rest', type);
});

$('#toggle-start').on('click', function(event) {
  let toggle = $('#toggle-start').html() === 'START' ? "RESET" : "START";
  $('#toggle-start').html(toggle);
  if (!timeStarted) {
    alarmSound();
    timeStarted = true;
    startSession();
  } else {
    $('#timer').html(sessionTime + ":00");
    $('#page-title').html('Timer');
    $('.progress-bar').css('width', '1%');
    timeStarted = false;
    clearInterval(sessionInterval);
    clearInterval(restInterval);
  }
});

function startSession() {
  $('#current-timer').html('Session');
  let fullTime = sessionTime;
  let minutes = sessionTime;
  let seconds = 0;
  sessionInterval = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        alarmSound();
        clearInterval(sessionInterval);
        startRest();
      } else {
        minutes--;
        seconds = 60;
      }
    } else {
      seconds--;
      updateProgressBar((minutes * 60) + seconds, (fullTime * 60));
      let timeLeft = (seconds < 10) ? (minutes + ":0" + seconds) : (minutes + ":" + seconds);
      $('#timer').html(timeLeft);
      $('#page-title').html(`( ${ timeLeft } ) Rest Timer`);
    }
  }, 1000);
}

function startRest() {
  $('#current-timer').html('&nbsp;Rest !');
  let fullTime = restTime;
  let minutes = restTime;
  let seconds = 0;
  restInterval = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        alarmSound();
        clearInterval(restInterval);
        startSession();
      } else {
        minutes--;
        seconds = 60;
      }
    } else {
      seconds--;
      updateProgressBar((minutes * 60) + seconds, (fullTime * 60));
      let timeLeft = (seconds < 10) ? (minutes + ":0" + seconds) : (minutes + ":" + seconds);
      $('#timer').html(timeLeft);
      $('#page-title').html(`( ${ timeLeft } ) Session Timer`);
    }
  }, 1000);
}

function updateProgressBar(timeLeft, fullTime) {
  let percent = (100 - parseInt((timeLeft / fullTime) * 100));
  $('.progress-bar').css('width', percent + '%');
}

function alarmSound() {
  let audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  audio.play();
}

function changeTime(timer, type) {
  switch (timer) {
    case 'rest':
      if (type.includes('-')) {
        if (restTime === 1) { return; }
        restTime--;
      } else {
        restTime++;
      }
      $('#rest-time').html(restTime);
      break;
    case 'session':
      if (type.includes('-')) {
        if (sessionTime === 1) { return }
        sessionTime--;
      } else {
        sessionTime++;
      }
      $('#session-time').html(sessionTime);
      if (!timeStarted) {
        $('#timer').html(sessionTime + ':00');
      }
  }
}
