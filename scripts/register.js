$(document).ready(function() {
    checkButton();

  $('#user-email').on('input', function(){
    validateEmail($(this).val());
    checkButton();
  });
  
  $('#password-repeat').on('input', function(){
    validatePassword($(this).val());
    checkButton();
  });
  
  $('#number').on('input', function(){
    validateNumber($(this).val());
    checkButton();
  });

  $('#register').click(function(evt){
      evt.preventDefault();
      if (checkButton()) location.href = "/";
  })
  
  $("<div/>", {
        'class': "alert alert-warning col-lg-6",
        'id': "email-error",
        text: "Invalid email format!",
      })
        .appendTo('#rhs');
  $('#email-error').hide();
  
  $("<div/>", {
        'class': "alert alert-warning col-lg-6",
        'id': "password-error",
        text: "Passwords do not match!",
      })
        .appendTo('#rhs');
  $('#password-error').hide();
  
  $("<div/>", {
        'class': "alert alert-warning col-lg-6",
        'id': "number-error",
        text: "Must be an 11-digit number!",
      })
        .appendTo('#rhs');
  $('#number-error').hide();
    
  function validateEmail(email) {
    let regex = /(\w+(-|_){0,1})+@{1}\w+\.{1}\w{2}/;
    if(!regex.test(email) && !(email.trim() === "")) {
      $('#email-error').show();
      $('#user-email').removeClass('is-valid');
      $('#user-email').addClass('is-invalid');
      return false;
    }
    else if (email.trim() === "") {
      $('#email-error').hide();
      $('#user-email').removeClass('is-valid is-invalid');
      $('#user-email').removeClass('is-valid');
      return false;
    }
    $('#email-error').hide();
    $('#user-email').removeClass('is-invalid');
    $('#user-email').addClass('is-valid');
    return true;
  }
  
  function validatePassword(password) {
    if (password != $('#password').val()) {
      $('#password-error').show();
      $('#password').removeClass('is-valid');
      $('#password-repeat').removeClass('is-valid');
      $('#password-repeat').addClass('is-invalid');
      return false;
  
    }
    else if (password.trim() === "") {
      $('#password-error').hide();
      $('#password').removeClass('is-valid is-invalid');
      $('#password-repeat').removeClass('is-valid is-invalid');
      return false;
    }
    $('#password-error').hide();
    $('#password').removeClass('is-invalid');
    $('#password-repeat').removeClass('is-invalid');
    $('#password').addClass('is-valid');
    $('#password-repeat').addClass('is-valid');
    return true;
  }
  
  function validateNumber(number) {
    if (number.trim() === "") {
        $('#number-error').hide();
        $('#number').removeClass('is-valid is-invalid');
        return false;
      }
    else if (isNaN(number) || number.length < 11) {
        console.log(number);

      $('#number-error').show();
      $('#number').removeClass('is-valid');
      $('#number').addClass('is-invalid');
      return false;
    }
    $('#number-error').hide();
    $('#number').removeClass('is-invalid');
    $('#number').addClass('is-valid');
    return true
  }

  function checkButton() {
      if(validateEmail($('#user-email').val()) && validatePassword($('#password-repeat').val()) && validateNumber($('#number').val())) {
        $('#register').prop('disabled', false);
        return true
      }
      $('#register').prop('disabled', true);
      return false

  }
  })