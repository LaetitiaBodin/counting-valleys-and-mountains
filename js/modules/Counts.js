export function counts (str) {

    let mountains = 0;

    let valleys = 0;

    let level = 0;

    for (let i = 0; i < str.length; i++) {

        if (str[i] == 'U') {
            level++;
            if (level == 0) {
                valleys++;
            }
        } else if (str[i] == 'D') {
            level--;
            if (level == 0) {
                mountains++;
            }
        }
        
    }

    $('#counts').html(`
        <p>Number of mountains: <span class="negLevels">${mountains}</span></p>
        <p>Number of valleys: <span class="posLevels">${valleys}</span></p>
    `);

}