$(document).ready(() => {
  const requestConfig = {
    method: 'GET',
    url: 'http://api.tvmaze.com/shows'
  };
  $.ajax(requestConfig).then((responseMessage) => {
    var shows = $(responseMessage);
    $('#show').hide();
    $('#showList').show();
    shows.each((index, show) => { 
      const elem = `<li><a href="${show._links.self.href}">${show.name}</a></li>`;
      $('#showList').append(elem);
    });
  }); 
});

$('#showList').on('click', 'li', (event) => {
  event.preventDefault();
  const showUrl = $(event.target).attr('href');
  const requestConfig = {
    method: 'GET',
    url: showUrl
  };
  $.ajax(requestConfig).then((responseMessage) => {
    console.log(responseMessage);
  });

  $('#show').show();
  $('#showList').hide();
});

$('#searchForm').submit((event) => {
  event.preventDefault();
  const search_term = $('#search_term').val().trim();
  if (search_term && search_term.length != 0) {
    $('#reloadLink').show();
    $('#error').hide();
    $('#showList').empty();
    $('#showList').hide();
    const requestConfig = {
      method: 'GET',
      url: `http://api.tvmaze.com/search/shows?q=${search_term}`
    };
    $.ajax(requestConfig).then((responseMessage) => {
      var shows = $(responseMessage);
      if (shows.length === 0) {  
        $('#error').show();
        $('#error').text(`No results found for ${search_term}`);
      } 
      $('#show').hide();
      $('#showList').show();
      shows.each((index, show) => { 
        const elem = `<li><a href="${show.show._links.self.href}">${show.show.name}</a></li>`;
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