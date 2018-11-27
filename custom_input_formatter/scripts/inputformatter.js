(function(window, $) {
  
  function addDelimiters(text, blocks, delimiter) {
    var start = 0;
    var formattedText = '';

    // Format blocks
    for (var i = 0; i < blocks.length; i++) {
      formattedText += text.substring(start, start + blocks[i]) + delimiter;
      start += blocks[i];
    }

    // Remove the last delimiter
    if (text.length <= start) {
      formattedText = formattedText.substring(0, formattedText.length - delimiter.length);
    }

    // Output the rest
    formattedText += text.substring(start);

    return formattedText;
  }
  
  function inputFormatted(inputField) {
    if (typeof inputField.data('inputFormatted') !== 'undefined') {
      return true;
    }    
    inputField.data('inputFormatted', true);
    return false;
  }
  
  function formatEditableInputIfNeeded(inputField, attributes) {
    if (typeof inputField.data('inputFormatted') !== 'undefined') {
      return true;
    }    
    inputField.data('inputFormatted', true);
    new Cleave(inputField, attributes);
  }
  
  function formatReadOnlyInputIfNeeded(inputField, block){
    $(inputField).each(function() {
      if (inputFormatted($(this))){
        return;
      }
      $(this).text(addDelimiters($(this).text(), block, ' '));
    });
    }
                
   
  function formatReadOnlyInput() {
    $('.input-bank-account-readonly div.dataValueRead > span').each(function() {
      formatReadOnlyInputIfNeeded($(this), [8, 8, 8]);
    });

    $('.input-iban-readonly div.dataValueRead > span').each(function() {
      formatReadOnlyInputIfNeeded($(this), [4, 2, 2, 3]);
    });

    $('.input-swift-readonly div.dataValueRead > span').each(function() {
      formatReadOnlyInputIfNeeded($(this), [4, 4, 4, 4, 4, 4, 4]);
    });
  }
  
  function formatEditableInput() {
    $('.input-bank-account input').each(function() {
     formatEditableInputIfNeeded($(this), { blocks: [8, 8, 8], numericOnly: true} );
    });
    
    $('.input-swift input').each(function() {
      formatEditableInputIfNeeded($(this),{ blocks: [4, 2, 2, 3], numericOnly: true} );
    });
    
    $('.input-iban input').each(function() {
      formatEditableInputIfNeeded($(this),{ blocks: [4, 4, 4, 4, 4, 4, 4], uppercase: true} );
    });        
  }
  
  $(document).ready(function() {
    formatReadOnlyInput();
    formatEditableInput();
  });  


  var observer = new MutationObserver(function(mutations) {
    formatReadOnlyInput();
    formatEditableInput();
  });

  // Notify me of everything!
  var observerConfig = {
    childList: true,
    subtree: true 
  };

  // Node, config
  // In this case we'll listen to all changes to body and child nodes
  var targetNode = document.body;
  observer.observe(targetNode, observerConfig);
  
})(window, jQuery);