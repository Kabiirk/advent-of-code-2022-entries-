const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

// console.log(input)

var test = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

var test = test.trim().split('\n')

const simulate_sand = (filled, max_y) => {
    // Sand Fall Origin
    let [x, y] = [500, 0]

    while(y<=max_y){
        // drop straight down
        if(!filled.has(`${x},${y+1}`)){
            y++;
            continue;
        }
        // drop to left
        if(!filled.has(`${x-1},${y+1}`)){
            x--;
            y++;
            continue;
        }
        // drop to right
        if(!filled.has(`${x+1},${y+1}`)){
            x++
            y++;
            continue;
        }

        // Standstill
        filled.add(`${x},${y}`);
        return true;
    }

    // Fallen into Abyss
    return false;
}

const filled = new Set();

for(const line of input){
    const coords = [];

    for(const str_coord of line.split(' -> ')){
        const [x, y] = str_coord.split(',').map(Number)
        coords.push([x, y])
    }

    // console.log(coords);
    for (let i = 1; i < coords.length; i++) {
        const [cx, cy] = coords[i];
        // Previous coords
        const [px, py] = coords[i-1];

        if(cy !== py){
            for (let y = Math.min(cy, py); y <= Math.max(cy, py); y++) {
                filled.add(`${cx},${y}`);
            }
        }
        if(cx !== px){
            for (let x = Math.min(cx, px); x <= Math.max(cx, px); x++) {
                filled.add(`${x},${cy}`);
            }
        }
    }
}

// Last wall
const max_y = Math.max(...[...filled].map(coord => Number(coord.split(',')[1])))

// console.log(max_y);

let ans = 0;
while(true){
    const res = simulate_sand(filled, max_y);

    if(!res){
        break;
    }

    ans++;
}
console.log(ans);


var s = 0;