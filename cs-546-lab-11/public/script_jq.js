$( document ).ready(function() {
  const requestConfig = {
    method: 'GET',
    url: 'http://api.tvmaze.com/shows'
  };

  $.ajax(requestConfig).then(function(responseMessage) {
    var shows = $(responseMessage);
    $('#show').hide();
    $('#showList').show();
    shows.each(function(index, show) { 
      const elem = `<li><a href="${show.url}">${show.name}</a></li>`;
      $('#showList').append(elem);
    });
  });
});

$('#searchForm').submit((event) => {
    event.preventDefault();
    const search_term = $('#search_term').val().trim();
    if (search_term && search_term.length != 0) {
      $('#error').hide();
      $('#showList').empty();
      $('#showList').hide();
      const requestConfig = {
        method: 'GET',
        url: `http://api.tvmaze.com/search/shows?q=${search_term}`
      };
      $.ajax(requestConfig).then(function(responseMessage) {
        var shows = $(responseMessage);
        if (shows.length === 0) {  
          $('#error').show();
          $('#error').text(`No results found for ${search_term}`);
        } 
        $('#show').hide();
        $('#showList').show();
        shows.each(function(index, show) { 
          const elem = `<li><a href="${show.show.url}">${show.show.name}</a></li>`;
          $('#showList').append(elem);
        });
      });
      $('#search_term').focus();
    } 
    else {
      $('#error').show();
      $('#error').text(`Invalid Search Input!`);
      $('#search_term').focus();
      $('#search_term').val("");
    }
  });