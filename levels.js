var level1 = [
    // Start, Gap, Type
    [0, 5000, 'small'],
    [0, 5000, 'medium'],
    [0, 5000, 'medium2'],
    [0, 5000, 'large'],
    [0, 1000, 'turtle'],
    [0, 4000, 'yellow'],
    [0, 4000, 'green'],
    [0, 4000, 'blue'],
    [0, 4000, 'white'],
    [0, 4000, 'brown']
];

var Level = function (levelData, callback) {
    this.levelData = [];
    for (var i = 0; i < levelData.length; i++) {
        this.levelData.push(Object.create(levelData[i]));
    }
    this.t = 0;
    this.callback = callback;
}

Level.prototype.draw = function (ctx) {}

Level.prototype.step = function (dt) {
    var idx = 0,
        remove = [],
        curShip = null;
    // Update the current time offset
    this.t += dt * 1000;
    // Example levelData
    // Start, End, Gap, Type, Override
    // [[ 0, 4000, 500, 'step', { x: 100 } ]
    while ((curShip = this.levelData[idx]) &&
        (curShip[0] < this.t + 2000)) {
        if (curShip[0] < this.t) {
            if(idx < 5){
            // Get the enemy definition blueprint
            var enemy = trunks[curShip[2]];
            // Add a new enemy with the blueprint and override
            this.board.add(new Trunk(enemy, {}));
            }
            else
            {
                var enemy = cars[curShip[2]];
                // Add a new enemy with the blueprint and override
                this.board.add(new Car(enemy, {}));
            }
            // Increment the start time by the gap
            curShip[0] += curShip[1];
        }
        idx++;
    }
    // Remove any objects from the levelData that have passed
    for (var i = 0, len = remove.length; i < len; i++) {
        var idx = this.levelData.indexOf(remove[i]);
        if (idx != -1) this.levelData.splice(idx, 1);
    }
    // If there are no more enemies on the board or in
    // levelData, this level is done
    if (this.levelData.length == 0 && this.board.cnt[OBJECT_ENEMY] == 0) {
        if (this.callback) this.callback();
    }
}