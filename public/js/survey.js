/* eslint-env browser, jquery */

function onDocumentReady() {
  const $question = $('#question');
  const $choices = $('#choices');
  const $answerAnother = $('#answer-another');

  function addPostCallbackOnClick(index, choice) {
    const $choice = $(choice);

    function onClick() {
      $choices.replaceWith('Submitting ...');

      function onResponse() {
        $question.replaceWith('Answer submitted.');
        $answerAnother.show();
      }

      const responseData = {
        questionId: $question.data('question-id'),
        choiceId: $choice.data('choice-id'),
      };

      $.post('/response', responseData, onResponse);
    }

    $choice.click(onClick);
  }

  $question.find('.choice').each(addPostCallbackOnClick);

  const $addQuestionForm = $('#add-question-form');
  const $questionTitle = $('#question-title');
  const $addChoice = $('#add-choice');
  const $addQuestion = $('#add-question');
  const $submitting = $('#submitting');
  const $addAnother = $('#add-another');
  const $choiceRows = $('#choice-rows');
  const choiceTemplate = $('#choice-template').html();

  function onClickAddQuestion() {
    const questionTitle = $questionTitle.val();

    function getValue() {
      return $(this).val();
    }

    function rejectBlankChoices(choice) { return choice !== ''; }

    const choices = $addQuestionForm.find('.choice').map(getValue)
    .get()
    .filter(rejectBlankChoices);

    if (questionTitle === '') {
      alert('Question title required.');
      return;
    }

    if (choices.length === 0) {
      alert('At least one choice must not be blank.');
      return;
    }

    $addQuestionForm.remove();
    $submitting.show();

    const questionData = { questionTitle, 'choices[]': choices };

    function onResponse() {
      $submitting.hide();
      $addAnother.show();
    }

    $.post('/admin/add-question', questionData, onResponse);
  }

  $addQuestion.click(onClickAddQuestion);

  function onClickAddChoice() {
    $choiceRows.append(choiceTemplate);
  }

  $addChoice.click(onClickAddChoice);
}

$(document).ready(onDocumentReady);
