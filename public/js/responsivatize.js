// Defines
var colores = ['ffffff', 'e1e1e1', 'cccccc', 'b7b7b7', 'a1a1a1', '898989', '707070', '555555', '363636', '111111', '000000'];
var dimensiones = [ //[240,320, '(Small phone)'],
                  [320,480, '(iPhone 3X)'],
                  [360,640, '(Nokia / Symbian)'],
                  [480,800, '(Small tablet / Blackberry)'],
                  [640,960, '( ~ iPhone 4S / Galaxy Tab)'],
                  [768,1024,'(iPad)']
                  ];
// It seems that its better to add some extra space for the scrollbar
var iframe_margin = 15;

$(function() {

  // Functions & utils
  var equalizeH = function() {
    $('.frame').css({'height':''}); // reset h
    if (!$('#btn-vertical-layout').is(':checked')) {
      var maxHeight = 0;
      $('.frame').each(function(i, item){
        if ($(item).is(':visible')) {
          if ($(item).height() > maxHeight) { maxHeight = $(item).height(); }
        }
      });
      $('.frame').height(maxHeight);
      console.log(maxHeight + ' h');
    }
  };

  var autoResizeW = function() {
    var totalW = 0;
    $('.frame').css({'width':''}); // reset w
    $('.frame').each(function(i, item) {
      if ($(item).is(':visible')) {
        if ($('#btn-vertical-layout').is(':checked')) {
          // Si el layout ES vertical busca el más ancho
          if ( $(item).width() > totalW ) { totalW = $(item).width(); }
        } else {
          // Si el layout no es vertical los suma todos
          totalW = totalW + $(item).outerWidth();
        }
      }
    });

    if ($('#btn-vertical-layout').is(':checked')) {
      $('.frame').width(totalW+1);
    } else {
      $('#frames').width(totalW+1);
    }
    console.log(totalW + ' w');
    equalizeH();
  }

  var rand = function() {
    return Math.random().toString(36).substr(2); // remove '0.'
  };

  var token = function(largo) {
    var token = rand() + rand(); // to make it longer
    token = token.substr(0, largo);
    return token;
  };

  // Element creation
  // Although there are more elegant ways to create new elements in JQuery seems that
  // the one used below its the fastest one... :-|

  // Colors
  $.each(colores, function(i, item){
    $('<div id="c_' + item + '" class="color" style="background:#' + item +'"><a href="javascript:void(0);" class="js_bgcolor" data-color="' + i + '" id="a_' + item + '"></a></div>').appendTo('.colors');
  });

  // Checkboxes
  $.each(dimensiones, function(i, item){
    // Checks
    $('<label><input type="checkbox" data-w="' + item[0] + '" data-h="' + item[1] + '" id="_' + item[0] + 'x' + item[1] + '" class="resolution" checked/> ' + item[0] + 'x' + item[1] + '</label>').appendTo('.options');
    // Divs + Iframes
    var object = $('<div id="d_' + item[0] + 'x' + item[1] + '" class="frame"><h2><input type="button" value=" R " data-id="' + i + '" id="r_' + item[0] + 'x' + item[1] + '" class="btn_rotate"> <span class="res-text">' + item[0] + ' x ' + item[1] + '</span> <span>' + item[2] + '</span></h2><iframe id="if_' + item[0] + 'x' + item[1] + '" sandbox="allow-same-origin allow-forms allow-scripts" seamless width="' + (item[0]+iframe_margin) + '" height="' + item[1] + '" class="iframes" src="'+url+'"></iframe></div>');
    object.appendTo('#frames');
    //object.data('ow', object.outerWidth()); // still not used
    //object.data('oh', object.outerHeight());
  });

  // Color switcher
  $('.js_bgcolor').click(function(event) {
    if (event.ctrlKey) {
     // Left mouse button pressed + Ctrl
     $('header, .frame, iframe').css('border-color', '#' + colores[$(this).attr('data-color')]);
     $('body').css('color', '#' + colores[$(this).attr('data-color')]);
    } else {
      // Left mouse button pressed
      $('#responsivator, header').css('background-color', '#' + colores[$(this).attr('data-color')]);
    }
  });

  // Hide resolution <div> onclick
  $("input.resolution").click(function() {
    $('#d' + $(this).attr('id')).toggleClass('hidden');
    autoResizeW();
  });

  // Rotate iframe
  $(".btn_rotate").click(function() {
    var tempD =  dimensiones[$(this).attr('data-id')];
    var e = $('#if_' + tempD[0] + 'x' + tempD[1]);
    var w = $(e).width();
    var h = $(e).height();
    if ( w > h ) {
      $(e).width(tempD[0] + iframe_margin);
      $(e).height(tempD[1]);
      $('#d_' + tempD[0] + 'x' + tempD[1] + ' span.res-text').html(tempD[0] + 'x' + tempD[1]);
    } else {
      $(e).width(tempD[1] + iframe_margin);
      $(e).height(tempD[0]);
      $('#d_' + tempD[0] + 'x' + tempD[1] + ' span.res-text').html(tempD[1] + 'x' + tempD[0]);
    }
    autoResizeW();

    // Force reload of iframe content
    var iframe_src = $(e).attr('src') + '#' + token(4); // "bnh5yzdirjinqaorq0ox1tf383nb3xr"
    $(e).attr('src', iframe_src);
  });

  // Vertical layout
  $("#btn-vertical-layout").click(function() {
    $('.frame').toggleClass('horizontal');
    autoResizeW();
  });

  // Init
  autoResizeW();

});
