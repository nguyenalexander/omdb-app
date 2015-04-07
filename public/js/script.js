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

  $('.favourite-form').on('submit', function(e){
    e.preventDefault();
    $('.fav-glyph').removeClass('glyphicon-star-empty');
    $('.fav-glyph-after').addClass('glyphicon-star')
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

if ($('.fav-glyph-after').hasClass('glyphicon-star')){
  $('.fav-glyph-after').on('click', function(e){
    e.preventDefault();
    $('.fav-glyph').removeClass('glyphicon-star');
    $('.fav-glyph-after').addClass('glyphicon-star-empty')
    var formUrl = $(this).nthChild(1).nthChild(1).attr('action')
    var thisData = $(this).serialize();
    $.ajax({
      method: 'DELETE',
      url: formUrl,
      data: thisData
    }).done(function(data){
      console.log('save complete')
    })
  })
}

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