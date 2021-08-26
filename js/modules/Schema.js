export function schema (steps) {

    let stepsArr = steps2arr(steps); // Every step is given a level value. Used for mapping.

    let levels = getLevels(stepsArr); // Lists all the levels with steps. Used for mapping.
    
    // An array only has positive indexes (starts at 0) but the steps can have negative levels values.
    // The negLevel value will be used to edit the steps' level values so that they will be all positive but keep their positions relative to one another.
        
    let negLevels = 0 - Math.min(...levels);

    let grid = steps2grid(negLevels, stepsArr, levels); // The steps are mapped into a grid.

    let string = grid2string(grid, negLevels, steps); // The grid is turned into a paragraph.

    $('#schema').html(`<p>${string}</p>`);
}

function steps2arr (steps) {

    // Every step is 'converted' into an array with two items : [step's level, step's letter].
    // They will be used to create a grid mapping the steps.
    
    let level = 0;
    let newArr = [[level, steps[0]]];

    // Positive levels would be displayed below negative levels (because of indexes) => 'U' & 'D' are used in reverse to avoid a future reversed final array.
    for (let i = 1; i < steps.length; i++) {
        if (steps[i] == 'U' && steps[i - 1] == 'U') {
            level--;
        } else if (steps[i] == 'D' && steps[i - 1] == 'D') {
            level++;
        }
        newArr.push([level, steps[i]]);
    }

    return newArr;

}
    
function getLevels (arr) {

    let tmpArr = [];

    for (let item of arr) {
        if (tmpArr.indexOf(item[0]) == -1) {
            tmpArr.push(item[0]);
        }
    }
    
    return tmpArr;

}

function steps2grid (negLevels, arr, levels) {

    if (negLevels > 0) { // If negative levels are present, all the levels are edited.
        for (let item of arr) {
            item[0] = item[0] + negLevels;
        }
    }

    let grid = [];

    for (let i = 0; i < levels.length; i++) {
        grid.push([]); // 1 level = 1 array
    }

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            grid[j].push('<span class="step">🡺</span>'); // Every item receives a placeholder '🡺'
        }
        // Steps actually made are replaced with their corresponding direction arrow.
        if (arr[i][1] == 'U') {
            grid[arr[i][0]][i] = '🡽';
        } else if (arr[i][1] == 'D') {
            grid[arr[i][0]][i] = '🡾';
        }
    }

    return grid;

}
    
function grid2string (grid, negLevels, steps) {

    // Negative and positive levels must be separated for styling.
    // Depending on the 1st step, the level 0 may be higher or lower, hence the different styles and conditions.

    function styleOne (sign, dir) {
        for (let i = 0; i < grid.length; i++) {
            if (i < grid.length - 1) {
                arr.push(`<span class="negLevels">${grid[i].join('')}</span>`);
            } else {
                arr.push(`<span class="${sign}Levels ground-${dir}">${grid[i].join('')}</span>`);
            }

        }
    }

    function styleTwo (level) {
        for (let i = 0; i < grid.length; i++) {
            if (i < level) {
                arr.push(`<span class="negLevels">${grid[i].join('')}</span>`);
            } else {
                if (i == level) {
                    arr.push(`<span class="posLevels ground-top">${grid[i].join('')}</span>`);
                } else {
                    arr.push(`<span class="posLevels">${grid[i].join('')}</span>`);
                }
            }
        }
    }

    function styleThree (level) {
        for (let i = level; i < grid.length; i++) {
            if (i == level) {
                arr.push(`<span class="posLevels ground-top">${grid[i].join('')}</span>`);
            } else {
                arr.push(`<span class="posLevels">${grid[i].join('')}</span>`);
            }
        }
    }

    let arr = [];

    if (negLevels > 0) {
        if (grid.length == negLevels + 1) {
            if (steps[0] == 'U') {
                styleOne('neg', 'bottom');
            } else if (steps[0] == 'D') {
                styleOne('pos', 'top');
            }
        } else {
            if (steps[0] == 'U') {
                styleTwo(negLevels + 1);
            } else if (steps[0] == 'D') {
                styleTwo(negLevels);
            }
        }
    } else if (negLevels == 0) {
        if (steps[0] == 'U') {
            if (grid.length == 1) {
                arr.push(`<span class="negLevels ground-bottom">${grid[0].join('')}</span>`);
            } else {
                arr.push(`<span class="negLevels">${grid[0].join('')}</span>`);
                styleThree(1);
            }
        } else if (steps[0] == 'D') {
            styleThree(0);
        }
    }

    return arr.join('<br>'); // All the lines are joined with a <br> to make a paragraph.
}