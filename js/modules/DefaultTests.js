import { schema } from './Schema.js';
import { counts } from './Counts.js';
import { cleanArea, styleBtns, testSteps } from './Common.js';

export function defaultTests () {

    $.getJSON('assets/data.json', function (data) {

        const tests = data;
        
        $(tests).each( function () { $('#testcases').append(`<button class="testcase">Test n° ${this.id}</button>`) });

        let btnTestcases = $('.testcase');

        for (let i = 0; i < btnTestcases.length; i++) {
            $(btnTestcases[i]).click( () => {
                styleBtns(btnTestcases[i]);
                cleanArea();
                testSteps(tests[i].path);
                counts(tests[i].path);
                schema(tests[i].path);
            })
        }

    });

}