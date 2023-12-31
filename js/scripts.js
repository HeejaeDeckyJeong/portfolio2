var story = `친절한 빠른 영리한 Html css JS React jQuery js SCSS SASS FontAwsome Html css JS React jQuery js SCSS SASS FontAwsome Html css JS React jQuery js SCSS SASS FontAwsome Html css JS React jQuery js SCSS SASS FontAwsome `;
var lexicon;

var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Composite = Matter.Composite;
var Body = Matter.Body;

var engine;
var boxes = [];
var ground, wallLeft, wallRight;

function setup() {
    // create an engine
    engine = Engine.create();

    createCanvas(windowWidth, windowHeight);

    ground = Bodies.rectangle(0, height, width * 2, 60, {
        isStatic: true,
    });

    wallLeft = Bodies.rectangle(0, 0, 30, height, {
        isStatic: true,
    });

    wallRight = Bodies.rectangle(width, 0, 30, height, {
        isStatic: true,
    });

    lexicon = new RiLexicon();
    background(100);
    let words = story.split(' ');
    let xx = 0;
    textSize(200);

    for (var i = 0; i < words.length; i++) {
        push();
        let useWord = words[i];
        let tag = RiTa.getPosTags(useWord)[0];
        let useColor = '#1d1e2200';
        // console.log(tag)
        if (tag == 'nn') {
            useColor = '#1d1e2200';
            // useWord = lexicon.randomWord('nn')
        } else if (tag == 'jj') {
            useColor = '#1d1e2200';
            strokeWeight(3);
        } else if (tag == 'vb') {
            translate(5 * sin(frameCount + i), 0);

            useColor = '#1d1e2200';
        }

        let box = Bodies.rectangle(xx, 70 * int(i / 10), textWidth(useWord), 100);
        box.word = useWord;
        box.color = useColor;
        box.tag = tag;
        Body.setVelocity(box, { x: 0, y: -5 });
        boxes.push(box);

        fill(useColor);
        text(useWord, xx, 45 * int(i / 10));
        pop();
        xx += textWidth(useWord) + 10;
        if ((i + 1) % 10 == 0) {
            xx = 0;
        }
    }

    let tt = lexicon.randomWord('nn');

    // add all of the bodies to the world
    World.add(engine.world, boxes);
    World.add(engine.world, [ground, wallLeft, wallRight]);

    Engine.run(engine);
}

function draw() {
    background(20);
    // translate(200,150)
    textStyle(BOLD);

    boxes.forEach((box) => {
        // Getting vertices of each object
        var vertices = box.vertices;
        stroke(255);
        strokeWeight(2);
        noFill();

        push();
        translate(box.position.x, box.position.y);

        beginShape();
        for (var i = 0; i < vertices.length; i++) {
            vertex(vertices[i].x - box.position.x, vertices[i].y - box.position.y);
        }
        noStroke();
        fill(box.color);
        endShape(CLOSE);

        fill('skyblue');
        if (box.color == 'white') {
            fill('black');
        }
        rotate(box.angle);
        noStroke();
        textAlign(CENTER);
        noStroke();
        text(box.word, 0, 10);
        pop();
        if (box.tag == 'vb') {
            Body.setVelocity(box, { x: box.velocity.x, y: box.velocity.y - 1.2 });
        }
    });

    ellipse(mouseX, mouseY, 5, 5);
    if (mouseIsPressed) {
        let bb = boxes.find((box) =>
            inside(
                [mouseX, mouseY],
                box.vertices.map((p) => [p.x, p.y])
            )
        );
        console.log(bb);

        if (bb) {
            Body.setVelocity(bb, { x: mouseX - pmouseX, y: mouseY - pmouseY });
            Body.setPosition(bb, { x: mouseX, y: mouseY });
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function inside(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0],
        y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0],
            yi = vs[i][1];
        var xj = vs[j][0],
            yj = vs[j][1];

        var intersect = yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
    }

    return inside;
}
// 스크롤
$(window).scroll(function () {
    var height200 = parseInt($(window).height() * 1);
    var scroll = $(window).scrollTop();
    //console.log(scroll);
    if (scroll >= height200) {
        //console.log('a');
        $('.introend').addClass('change');
        $('.itemBox').addClass('show');
        $('.projectTitle').addClass('activeT');
        $('.itemBox2').addClass('show2');
        $('.project1').addClass('show3');
        $('.logo').addClass('black');
    } else {
        //console.log('a');
        $('.introend').removeClass('change');
        $('.itemBox').removeClass('show');
        $('.projectTitle').removeClass('activeT');
        $('.itemBox2').removeClass('show2');
        $('.project1').removeClass('show3');
        $('.logo').removeClass('black');
    }
});
$(window).scroll(function () {
    var height300 = parseInt($(window).height() * 5.1);
    var scroll = $(window).scrollTop();
    //console.log(scroll);
    if (scroll >= height300) {
        //console.log('a');

        $('.contact').addClass('show4');
    } else {
        //console.log('a');

        $('.contact').removeClass('show4');
    }
});
// 내비게이션 바 색깔
$(window).scroll(function () {
    var height0 = parseInt($(window).height() * 1);
    var scroll = $(window).scrollTop();
    //console.log(scroll);
    if (scroll >= height0) {
        //console.log('a');
        $('.1').removeClass('navAcitive');
        $('.2').addClass('navAcitive0');
    } else {
        //console.log('a');

        $('.1').addClass('navAcitive');
        $('.2').removeClass('navAcitive0');
    }
});
$(window).scroll(function () {
    var height0 = parseInt($(window).height() * 2);
    var scroll = $(window).scrollTop();
    //console.log(scroll);
    if (scroll >= height0) {
        //console.log('a');
        $('.2').addClass('navAcitive1');
    } else {
        //console.log('a');

        $('.2').removeClass('navAcitive1');
    }
});
$(window).scroll(function () {
    var height0 = parseInt($(window).height() * 3);
    var scroll = $(window).scrollTop();
    //console.log(scroll);
    if (scroll >= height0) {
        //console.log('a');
        $('.2').addClass('navAcitive2');
    } else {
        //console.log('a');

        $('.2').removeClass('navAcitive2');
    }
});
$(window).scroll(function () {
    var height0 = parseInt($(window).height() * 4);
    var scroll = $(window).scrollTop();
    //console.log(scroll);
    if (scroll >= height0) {
        //console.log('a');
        $('.2').removeClass('navAcitive2');
        $('.2').removeClass('navAcitive1');
        $('.2').removeClass('navAcitive0');
        $('.3').addClass('navAcitive');
    } else {
        //console.log('a');

        $('.3').removeClass('navAcitive');
    }
});
$(window).scroll(function () {
    var height0 = parseInt($(window).height() * 5);
    var scroll = $(window).scrollTop();
    //console.log(scroll);
    if (scroll >= height0) {
        //console.log('a');
        $('.3').removeClass('navAcitive');
        $('.4').addClass('navAcitive');
        $('.logo').removeClass('black');
    } else {
        //console.log('a');

        $('.4').removeClass('navAcitive');
    }
});
