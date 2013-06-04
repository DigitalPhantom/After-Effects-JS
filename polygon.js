/**
 * Calculate the coordinates of every single point in a standard polygon at each specific point in time
 * 
 * Used in conjunction with the write-on effect, draws a perfect standard polygon.
 * 
 * @author Yoel Nunez
 * @link http://www.digitalphantom.net/
 * @version 1.0
 * 
 * @param {int} sides
 * @param {int[]} center
 * @param {float} radius
 * @returns {polygon}
 */
 
function polygon(sides, center, radius) {
    this.sides = sides;
    this.center = center;
    this.radius = radius;

    this.angle = 360 / this.sides;

    this.slope = function(a, b) {
        var x = b[0] - a[0];
        var y = b[1] - a[1];

        if (x === 0) {
            return false;
        }

        return y / x;
    };

    this.angle_2_rad = function(angle) {
        return angle / 180 * Math.PI;
    };

    this.delta = function(a, b) {
        var x = b[0] - a[0];
        var y = b[1] - a[1];

        return [x, y];
    };

    this.find_coord = function(a, r, c) {
        var x = c[0] + (Math.sin(this.angle_2_rad(a)) * r);
        var y = c[1] - (Math.cos(this.angle_2_rad(a)) * r);

        return [x, y];
    };

    this.coord = function(pace) {

        if (this.sides < 3) {
            return this.center;
        }


        var ispeed = pace * time;

        var i = parseInt(ispeed);

        if (i < this.sides) {


            var c_angle = this.angle * i;
            var n_angle = this.angle * (i + 1);

            var p1 = this.find_coord(c_angle, this.radius, this.center);
            var p2 = this.find_coord(n_angle, this.radius, this.center);

            var s = this.slope(p1, p2);

            var x = p1[0], y = p1[1];

            var current_angle = this.angle * ispeed;

            var percentage = (current_angle + c_angle) / (n_angle - c_angle) % 1;

            var cpoint = this.find_coord(current_angle, radius, center);

            var delta_x = this.delta(p1, p2)[0];

            if (typeof s === "boolean") {
                x = p1[0];
                y = cpoint[1];
            }
            else {
                s *= -1;
                //x = cpoint[0];

                x = p1[0] + (percentage * delta_x);
                y = s * (p1[0] - x) + p1[1];
            }


        }
        else {
            var x = center[0] + (Math.sin(this.angle_2_rad(360)) * radius);
            var y = center[1] - (Math.cos(this.angle_2_rad(360)) * radius);
        }

        return [x, y];

    };
}