/* eslint-env browser, jquery */

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

  var $addQuestionForm = $('#add-question-form');
  var $questionTitle = $('#question-title');
  var $addChoice = $('#add-choice');
  var $addQuestion = $('#add-question');
  var $submitting = $('#submitting');
  var $addAnother = $('#add-another');
  var $choiceRows = $('#choice-rows');
  var choiceTemplate = $('#choice-template').html();

  $addQuestion.click(function() {
    var questionTitle = $questionTitle.val()

    var choices = $addQuestionForm.find('.choice').map(function() {
      return $(this).val();
    })
    .get()
    .filter(function(choice) { return choice != ''; });

    if (questionTitle == '') {
      alert('Question title required.');
      return;
    }

    if (choices.length == 0) {
      alert('At least one choice must not be blank.');
      return;
    }

    $addQuestionForm.remove();
    $submitting.show();

    $.post('/admin/add-question',
      {
        questionTitle: questionTitle,
        'choices[]': choices
      },
      function(data) {
        $submitting.hide();
        $addAnother.show();
      }
    );
  });

  $addChoice.click(function() {
    $choiceRows.append(choiceTemplate);
  });
});
