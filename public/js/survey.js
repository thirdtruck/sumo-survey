$(document).ready(function() {
  var $question = $('#question');
  $question.find('.choice').each(function(index, choice) {
    var $choice = $(choice);

    $choice.click(function() {
      $.post('/response',
        {
          questionId: $question.data('question-id'),
          choiceId: $choice.data('choice-id')
        },
        function(data) {
          console.log("Response: ", data);
        }
      );
    });
  });
});
