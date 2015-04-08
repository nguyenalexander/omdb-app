$(function(){
  $('.dlt-btn').on('click', function(e){
    e.preventDefault();
    var dlt = $(this);
      var dlturl = $(this).attr('href');
      console.log(dlturl)
      $.ajax({
        method: 'DELETE',
        url: dlturl
      }).done(function(data){
        dlt.closest('.item').fadeOut('slow',function(){
          $(this).remove();
        })
      })
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

  $('.comment-submit').on('submit',function(e){
    e.preventDefault();
    var commentUrl = $(this).attr('action')
    var commentData = $(this).serialize();
    $.ajax({
      method: 'POST',
      url: commentUrl,
      data: commentData
    }).done(function(data){;
      console.log('comment complete', data)
      location.href=commentUrl;
      console.log(location.href)
    })
  })


      // success: function(onSuccess){
      //
      // }


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

  $('.glyphicon-edit').on('click', function(e){
    var editUrl = $(this).parent().attr('action');
    location.href = editUrl;
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