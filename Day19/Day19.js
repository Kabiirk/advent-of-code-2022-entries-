const fs = require('fs');
const path = require('path');

var pattern = /Blueprint (?<blueprint_no>-?\d+): Each (?<robot_1>-?\w+) robot costs (?<robot_1_ore_cost>-?\d+) ore. Each (?<robot_2>-?\w+) robot costs (?<robot_2_ore_cost>-?\d+) ore. Each (?<robot_3>-?\w+) robot costs (?<robot_3_ore_cost>-?\d+) ore and (?<robot_3_clay_cost>-?\d+) clay. Each (?<robot_4>-?\w+) robot costs (?<robot_4_ore_cost>-?\d+) ore and (?<robot_4_obsidian_cost>-?\d+) obsidian./;
const input = fs
    .readFileSync(path.join(__dirname, 'test.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n').map(
        (x) => x.match(pattern).groups
    );

// console.log(input);

var state = {
    "ore" : 0,
    "ore_robots" : 1,
    "clay" : 0,
    "clay_robots" : 0,
    "obsidian" : 0,
    "obsidian_robots" : 0,
    "geode_robots" : 0,
    "geode" : 0,
    "time":0,
}

function geode_count(minutes, blueprint){
    var ore = 0;
    var ore_robots = 1;
    var clay = 0;
    var clay_robots = 0;
    var obsidian = 0;
    var obsidian_robots = 0;
    var geode = 0;
    var geode_robots = 0;
    
    // State
    var state['ore'] = 0;
    var state['ore_robots'] = 1;
    var state['clay'] = 0;
    var state['clay_robots'] = 0;
    var state['obsidian'] = 0;
    var state['obsidian_robots'] = 0;
    var state['geode'] = 0;
    var state['geode_robots'] = 0;

    for(var i = 1; i<minutes; i++){
        ore+= ore_robots;
        // Increase resource count as per number of robots
        clay += clay_robots;
        obsidian += obsidian_robots;
        geode += geode_robots;

        // Check Ore Count
        if(ore >= blueprint.robot_2_ore_cost && clay_robots<3){
            clay_robots++;
            ore -= blueprint.robot_2_ore_cost;
        }
        // Check Clay Count
        if(ore >= blueprint.robot_3_ore_cost && clay >= blueprint.robot_3_clay_cost){
            obsidian_robots++;
            ore -= blueprint.robot_3_ore_cost;
            clay -= blueprint.robot_3_clay_cost;
        }
        // Check Obsidian Count
        if(ore >= blueprint.robot_4_ore_cost && obsidian >= blueprint.robot_4_obsidian_cost){
            geode_robots++;
            ore -= blueprint.robot_4_ore_cost;
            obsidian -= blueprint.robot_3_obsidian_cost;
        }
        console.log("=============",
                        "minute:",i, "=============","\n",
                        "Ore:", ore," ",
                        "Ore_robot:", ore_robots,"\n",
                        "clay:", clay," ",
                        "clay_robot:", clay_robots,"\n",
                        "Obsid:", obsidian," ",
                        "Obsid_robot:", obsidian_robots,"\n",
                        "Geode:", geode," ",
                        "Geode_robot:", geode_robots,"\n",
                        "=============");
    }


    return geode
}

// console.log(input[0])
console.log(geode_count(24, input[0]));

var string = 0;
