$(document).ready(function () {
  calculateLoanCost();
  $(".calculator-input .custom-form-range")
    .on('input', calculateLoanCost)
    .on('input', ajdustRangeColor)
    .each(function () {
      $(this).trigger('input');
    });
});

$(window).on('scroll', function () {
  if ($(this).scrollTop() > 0) {
    $('header .navbar').addClass('shrinked');
  } else {
    $('header .navbar').removeClass('shrinked');
  }
});

function calculateLoanCost() {
  var map = {
    500: [41, 311.80],
    1000: [79, 294.62],
    1500: [79, 598.65],
    2000: [79, 320.84],
    2500: [79, 213.41],
    3000: [79, 158.30],
    3500: [79, 125.24],
    4000: [79, 103.37],
    4500: [79, 87.87],
    5000: [95, 87.88],
    5500: [95, 77.50],
    6000: [95, 69.28],
    6500: [95, 62.62],
    7000: [95, 57.11],
    7500: [95, 52.49],
    8000: [95, 48.55],
    8500: [95, 45.16],
    9000: [95, 42.71],
    9500: [95, 39.62],
    10000: [95, 37.33],
  };
  var $amountInput = $('#loan-amount');
  var $durationInput = $('#loan-duration');
  var principalAmount = parseInt($amountInput.val());
  var durationInMonths = parseInt($durationInput.val());
  var monthlyCost = map[principalAmount][0];
  var interestRate = map[principalAmount][1];
  var originationFee = principalAmount > 1000 ? 595 : 0;
  var totalCost = principalAmount + originationFee + monthlyCost * durationInMonths;
  // console.log({
  //   principalAmount: principalAmount,
  //   durationInMonths: durationInMonths,
  //   monthlyCost: monthlyCost,
  //   interestRate: interestRate,
  //   originationFee: originationFee,
  //   totalCost: totalCost,
  // });
  $amountInput.prev().find('span').text(principalAmount);
  $durationInput.prev().find('span').text(durationInMonths);
  $('#interest-rate').text(interestRate.toFixed(2));
  $('#monthly-cost').text(monthlyCost);
  $('#total-cost').text(totalCost);
};

function ajdustRangeColor() {
  var $input = $(this);
  var value = parseInt(($input.val() - $input.prop('min')) / ($input.prop('max') - $input.prop('min')) * 100);
  //console.log({
  //  inputValue: $input.val(),
  //  inputMin: $input.prop('min'),
  //  inputMax: $input.prop('max'),
  //  value: value,
  //});
  $input.css({'background': 'linear-gradient(to right, #ffc200 0%, #f22764 ' + value + '%, #cacaca ' + value + '%, #cacaca 100%)'});
};
