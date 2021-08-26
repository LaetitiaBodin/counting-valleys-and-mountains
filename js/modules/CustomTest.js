import { schema } from './Schema.js';
import { counts } from './Counts.js';
import { cleanArea, styleBtns, testSteps } from './Common.js';

export function customTest () {

    $('#testcases').append(`<button id="testcustom">Custom</button>`);

    $('#testcustom').click( () => {
        styleBtns('#testcustom');
        cleanArea();
        addCustomTest();
    });

}

function addCustomTest () {

    $('#testcases').after(`
        <div id="customDiv">
            <div id="customTest">
                <input type="text" maxlength="100" id="customInput"/>
                <button id="customBtn">Test</button>
            </div>
            <div id="customWarn"></div>
        </div>
    `);
    
    $('#customInput').on('input', () => {

        $('#steps, #customWarn, #counts, #schema').empty();

        if ($('#customInput').val().length == 100) {
            $('#customWarn').append(`<p id="sizeWarn">100 characters max reached!</p>`);
        }
        if ($('#customInput').val().match(/[^(D|U)]/g)) {
            $('#customWarn').append(`<p id="charWarn">Only use 'D' or 'U'!</p>`);
        }

    });

    $('#customBtn').click( () => {

        $('#steps, #customWarn, #counts, #schema').empty();

        let chars = {
            'D' : $('#customInput').val().match(/D/g),
            'U' : $('#customInput').val().match(/U/g),
            'others' : $('#customInput').val().match(/[^(D|U)]/g)
        };

        if ($('#customInput').val() == '') {
            $('#customWarn').append(`<p id="charWarn">Empty testcase!</p>`);
        } else if ((chars['D'] == null || chars['U'] == null || chars['D'].length != chars['U'].length) && chars['others'] == null) {
            $('#customWarn').append(`<p id="charWarn">Invalid testcase! You must start and end on sea level!</p>`);
        } else if (chars['others']) {
            $('#customWarn').append(`<p id="charWarn">Invalid testcase! Only use 'D' or 'U'!</p>`);
        } else {
            testSteps($('#customInput').val());
            counts($('#customInput').val());
            schema($('#customInput').val());
            $('#customInput').val('');
        }

    });

}