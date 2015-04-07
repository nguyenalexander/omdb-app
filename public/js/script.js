$(function(){
  $('.dlt-btn').on('click', function(e){
    e.preventDefault();
    var dlt = $(this);
    if(confirm('Are you sure you want to remove this item?')){
      var dlturl = $(this).attr('href');
      $.ajax({
        method: 'DELETE',
        url: dlturl
      }).done(function(data){
        dlt.closest('.item').fadeOut('slow',function(){
          $(this).remove();
        })
      })
    }
  })

  $('.favourite-form').on('click', function(e){
    e.preventDefault();
    $('.fav-glyph').removeClass('glyphicon-star-empty');
    $('.fav-glyph-after').addClass('glyphicon-star').css('display','visible');
    var formUrl = $(this).attr('action')
    var thisData = $(this).serialize();
    $.ajax({
      method: 'POST',
      url: formUrl,
      data: thisData
    }).done(function(data){
      console.log('save complete')
    })
  })


  $('.fav-glyph-after').on('click', function(e){
    e.preventDefault();
    $('.fav-glyph').addClass('glyphicon-star-empty');
    $('.fav-glyph-after').removeClass('glyphicon-star')
    var formUrl = $('.fav-glyph-after').closest('.favourite-form').attr('action');
    console.log('This is the returned value of formUrl:',formUrl);
    $.ajax({
      method: 'DELETE',
      url: formUrl
    }).done(function(data){
      console.log('deletion complete')
    })
  })


  $('.item').on('mouseover',function(){
    $(this).children('.dlt-overlay').show();
  })
  $('.item').on('mouseout',function(){
    $(this).children('.dlt-overlay').hide();
  })
  $('.item').on('mouseover',function(){
    $(this).children('.fav-button').show();
  })
  $('.item').on('mouseout',function(){
    $(this).children('.fav-button').hide();
  })
})