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
  let toggle = $('#toggle-start').html() === 'START' ? "STOP" : "START";
  $('#toggle-start').html(toggle);
  if (!timeStarted) {
    alarmSound();
    timeStarted = true;
    startSession();
  } else {
    $('#timer').html(sessionTime + ":00");
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
      }
      minutes--;
      seconds = 60;
    }
    seconds--;
    updateProgressBar((minutes * 60) + seconds, (fullTime * 60));
    $('#timer').html(minutes + ":" + seconds);
  }, 1000);
}

function startRest() {
  $('#current-timer').html('Rest');
  let fullTime = restTime;
  let minutes = restTime;
  let seconds = 0;
  restInterval = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        alarmSound();
        clearInterval(restInterval);
        startSession();
      }
      minutes--;
      seconds = 60;
    }
    seconds--;
    updateProgressBar((minutes * 60) + seconds, (fullTime * 60));
    $('#timer').html(minutes + ":" + seconds);
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
      $('#rest-time').html(`Rest: ${ restTime }`);
      break;
    case 'session':
      if (type.includes('-')) {
        if (sessionTime === 1) { return }
        sessionTime--;
      } else {
        sessionTime++;
      }
      $('#session-time').html(`Session: ${ sessionTime }`);
  }
}
