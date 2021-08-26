export function styleBtns (button) {
    $('button').removeClass('active');
    $(button).addClass('active');
}

export function cleanArea () {
    $('#customDiv').remove();
    $('#steps, #counts, #schema').empty();
}

export function testSteps (steps) {
    $('#steps').html(`<p>Path: ${steps}</p>`);
}