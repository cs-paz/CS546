$('#palendromeForm').submit((event) => {

    const isPalendrome = (str) => {
      for(var i = 0; i < (str.length - 1)/2; i++) {
        let forward = str[i];
        let backward = str[(str.length - 1) - i];
        if( forward != backward) {
          return false;
        }
      }
      return true;
    }

    event.preventDefault();
    const str = $('#phrase').val().trim();
    if (str) {
      const modifiedStr = str.replace(/\W/g, '').toLowerCase();

      // $('#error').hide();
      // $('#formLabel').removeClass('error');
      $('#phrase').removeClass('inputClass');
      const li = `<li class="${isPalendrome(modifiedStr) ? "is-palindrome" : "not-palindrome"}">${str}</li>`;
      $('#attempts').append(li);
      $('#palendromeForm').trigger('reset');
      $('#phrase').focus();
    } 
    else {
      // $('#error').show();
      // $('#error').html('You must enter an input value');
      $('#formLabel').addClass('error');
      $('#phrase').addClass('inputClass');
          $('#phrase').focus();
          $('#phrase').value= "";
    }
  });