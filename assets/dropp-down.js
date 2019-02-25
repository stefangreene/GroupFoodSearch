$(document).ready(function(){
    $(".dropdown dt a").on('click', function() {
    $(".dropdown dd ul").slideToggle('fast');
  });
    $(".dropdown dd ul li a").on('click', function() {
    //$(".dropdown dd ul").hide();
  });
  function getSelectedValue(id) {
    return $("#" + id).find("dt a span.value").html();
  }
  $(document).bind('click', function(e) {
    var $clicked = $(e.target);
    //if (!$clicked.parents().hasClass("dropdown")) $(".dropdown dd ul").hide();
  });
  $('.mutliSelect1 input[type="checkbox"]').on('click', function() {
      var title = $(this).closest('.mutliSelect1').find('input[type="checkbox"]').val(),
      title = $(this).val() ;
    if ($(this).is(':checked')) {
      var html = '<span title="' + title + '">' + title + '</span>';
      $('.multiSel1').append(html);
      //$(".hida").hide();
    } else {
      $('span[title="' + title + '"]').remove();
      var ret = $(".hida");
      $('.dropdown dt a').append(ret);
    }
  });

  $('.mutliSelect2 input[type="checkbox"]').on('click', function() {
    var title = $(this).closest('.mutliSelect2').find('input[type="checkbox"]').val(),
    title = $(this).val();
  if ($(this).is(':checked')) {
    var html = '<span title="' + title + '">' + title + '</span>';
        $('.multiSel2').append(html);
    //$(".hida").hide();
  } else {
    $('span[title="' + title + '"]').remove();
    var ret = $(".hida");
    $('.dropdown dt a').append(ret);
  }
});


$('.mutliSelect3 input[type="checkbox"]').on('click', function() {
  var title = $(this).closest('.mutliSelect3').find('input[type="checkbox"]').val(),
  title = $(this).val();
if ($(this).is(':checked')) {
  var html = '<span title="' + title + '">' + title + '</span>';
  $('.multiSel3').append(html);
  //$(".hida").hide();
} else {
  $('span[title="' + title + '"]').remove();
  var ret = $(".hida");
  $('.dropdown dt a').append(ret);
}
});

$('.mutliSelect4 input[type="checkbox"]').on('click', function() {
  var title = $(this).closest('.mutliSelect4').find('input[type="checkbox"]').val(),
  title = $(this).val();
if ($(this).is(':checked')) {
  var html = '<span title="' + title + '">' + title + '</span>';
  $('.multiSel4').append(html);
  //$(".hida").hide();
} else {
  $('span[title="' + title + '"]').remove();
  var ret = $(".hida");
  $('.dropdown dt a').append(ret);
}
});
$('.mutliSelect5 input[type="checkbox"]').on('click', function() {
  var title = $(this).closest('.mutliSelect5').find('input[type="checkbox"]').val(),
  title = $(this).val();
if ($(this).is(':checked')) {
  var html = '<span title="' + title + '">' + title + '</span>';
  $('.multiSel5').append(html);
  //$(".hida").hide();
} else {
  $('span[title="' + title + '"]').remove();
  var ret = $(".hida");
  $('.dropdown dt a').append(ret);
}
});
$('.mutliSelect6 input[type="checkbox"]').on('click', function() {
  var title = $(this).closest('.mutliSelect6').find('input[type="checkbox"]').val(),
  title = $(this).val();
if ($(this).is(':checked')) {
  var html = '<span title="' + title + '">' + title + '</span>';
  $('.multiSel6').append(html);
  //$(".hida").hide();
} else {
  $('span[title="' + title + '"]').remove();
  var ret = $(".hida");
  $('.dropdown dt a').append(ret);
}
});

  });