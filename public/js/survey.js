$(document).ready(function() {
  var $question = $('#question');
  var $choices = $('#choices');
  var $answerAnother = $('#answer-another');

  $question.find('.choice').each(function(index, choice) {
    var $choice = $(choice);

    $choice.click(function() {
      $choices.replaceWith("Submitting ...");

      $.post('/response',
        {
          questionId: $question.data('question-id'),
          choiceId: $choice.data('choice-id')
        },
        function(data) {
          $question.replaceWith('Answer submitted.');
          $answerAnother.show();
        }
      );
    });
  });
});
