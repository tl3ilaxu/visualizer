function Shape(x, y, size) {
    this.pos = createVector(x, y);
    this.x = x;
    this.y = y;
    this.size = Math.random() * 100 + 50;
    if (size) {
        this.size = size;
    }
    this.nr_points = Math.round(Math.random() * 17) + 3;
    this.points = [];
    this.maxOff = this.size * 0.8;
    this.edges = [];
    this.axis = [];
    for (var i = 0; i < this.nr_points; i++) {
        offset = Math.random() * this.maxOff - this.maxOff;
        var theta = (i / this.nr_points) * (Math.PI * 2);
        var x = Math.cos(theta) * (this.size + offset);
        var y = Math.sin(theta) * (this.size + offset);
        this.points[i] = createVector(x, y);

        if (i > 0) {
            this.edges[i - 1] = [this.points[i - 1], this.points[i]];
            this.axis[i - 1] = this.points[i - 1].copy();
            this.axis[i - 1].sub(this.points[i]);
            //this.axis[i - 1].normalize();
        }
    }
    this.edges.push([this.points[this.points.length - 1], this.points[0]]);
    this.axis.push(this.points[this.points.length - 1].copy());
    this.axis[this.axis.length - 1].sub(this.points[0]);
    //this.axis[this.axis.length - 1].normalize();


    this.draw = function() {
        push();
        //noFill();
        stroke(171, 93, 238, 255);
        translate(this.x, this.y);
        for (var i = 0; i < this.edges.length; i++) {
            line(this.edges[i][0].x, this.edges[i][0].y, this.edges[i][1].x, this.edges[i][1].y);
        }
        //beginShape();
        //for (var i = 0; i < this.nr_points; i++) {
        //    vertex(this.points[i][0], this.points[i][1]);
        //}
        //endShape(CLOSE);
        pop();
    }

    this.collide = function(vector) {
        push();
        stroke(29, 221, 51);
        translate(this.x, this.y);
        for (var i = 0; i < this.axis.length; i++) {
            var a = this.axis[i].copy();
            a.normalize();
            var s = a.dot(vector);
            // NOTE(tleilaxu): do not compare to center 
            var ms = a.dot(this.pos);
            a.mult(s - ms);
            if(a.magSq() < this.axis[i].magSq()){
                stroke(187,67,22);
            }
            //line(this.edges[i][1].x, this.edges[i][1].y, a.x, a.y);
            line(0, 0, a.x, a.y);
        }
        pop();
    }

    this.setPos = function(x, y) {
        this.x = x;
        this.y = y;
        this.pos = createVector(x, y);
    }

}
