const eyesHTML = document.getElementsByClassName('eye');
const eyesArray = Array.from(eyesHTML);

const input = {
    mouseX: {
        start:0,
        end: window.innerWidth,
        current: {
            right: 0,
            left: 0
        }
    },
    mouseY: {
        start:0,
        end: window.innerHeight,
        current:{
            right: 0,
            left: 0
        }
    }
};

input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;

const output = {
    x: {
        start: -75,
        end:75,
        current: {
            right: 0,
            left: 0
        }
    },
    y: {
        start: -75,
        end:75,
        current: {
            right: 0,
            left: 0
        }
    }
};
output.x.range = output.x.end - output.x.start;
output.y.range = output.y.end - output.y.start;

const action = {
    type: "follow"
};

const handleMouseMove = function (event) {
    input.mouseX.current = event.clientX;
    input.mouseX.fraction = (input.mouseX.current - input.mouseX.start) / input.mouseX.range;

    input.mouseY.current = event.clientY;
    input.mouseY.fraction = (input.mouseY.current - input.mouseY.start) / input.mouseY.range;

    switch (action.type) {
        case "follow":
            follow();
            break;
        case "opposite":
            opposite();
            break;
        case "go crazy":
            goCrazy();
            break;
    }


    eyesArray[0].firstElementChild.style.transform = 'translate(' + output.x.current.left + 'px, ' + output.y.current.left + 'px)';

    eyesArray[1].firstElementChild.style.transform = 'translate(' + output.x.current.right + 'px, ' + output.y.current.right + 'px)';

};

const handleResize = function() {
    input.mouseX.end = window.innerWidth;
    input.mouseX.range = input.mouseX.end - input.mouseX.start;

    input.mouseY.end = window.innerHeight;
    input.mouseY.range = input.mouseY.end - input.mouseY.start;
}

const setFollow = function () {
    action.type = "follow";
}

const follow =function() {
    output.x.current.left = output.x.start + (input.mouseX.fraction * output.x.range);
    output.x.current.right = output.x.start + (input.mouseX.fraction * output.x.range);
    output.y.current.left = output.y.start + (input.mouseY.fraction * output.y.range);
    output.y.current.right = output.y.start + (input.mouseY.fraction * output.y.range);
}

const setOpposite = function() {
    action.type = "opposite";
}

const opposite = function() {
    output.x.current.left = output.x.end - (input.mouseX.fraction * output.x.range);
    output.x.current.right = output.x.end - (input.mouseX.fraction * output.x.range);
    output.y.current.left = output.y.end - (input.mouseY.fraction * output.y.range);
    output.y.current.right = output.y.end - (input.mouseY.fraction * output.y.range);
}

const setGoCrazy = function() {
    action.type = "go crazy";
}

const goCrazy = function () {
    output.x.current.left = output.x.start + (input.mouseX.fraction * output.x.range);
    output.x.current.right = output.x.end - (input.mouseX.fraction * output.x.range);
    output.y.current.left = output.y.end - (input.mouseY.fraction * output.y.range);
    output.y.current.right = output.y.start + (input.mouseY.fraction * output.y.range);
}

window.addEventListener('mousemove', handleMouseMove);

window.addEventListener('resize', handleResize);