let canvas,
    mouse = { down: [false, false, false], x: 0, y: 0 };

/** @type {CanvasRenderingContext2D} */
let ctx;

const a = (2 * Math.PI) / 6;
const r = window.innerHeight / 8;
const startx = window.innerWidth / 2 - r * 4.5;
const starty = window.innerHeight / 2 - 30;

window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };

window.onload = () => {
    canvas = document.getElementById("canvas");

    ctx = canvas.getContext("2d", { alpha: false });

    //ctx.imageSmoothingEnabled = false;

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    document.addEventListener("mousemove", (event) => {
        (mouse.x = event.clientX), (mouse.y = event.clientY);
    });
    document.addEventListener("mousedown", (event) => {
        mouse.down[event.button] = true;
        event.preventDefault();
    });
    document.addEventListener("mouseup", (event) => {
        mouse.down[event.button] = false;
        event.preventDefault();
    });

    document.onkeydown = (event) => {
        switch (event.key) {
            case "c":
                console.log("pressed c");
                break;
        }
    };

    document.oncontextmenu = (e) => {
        e.preventDefault();
    };

    document.addEventListener("resize", () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    });

    update();
};

const drawHex = (x, y) => {
    console.log("Drawing hexagon");
    ctx.strokeStyle = "#FFFFFF";

    ctx.beginPath();
    for (var i = 0; i < 6; i++) {
        ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
    }
    ctx.closePath();
    ctx.stroke();
};

const update = () => {
    requestAnimFrame(update);

    let x = startx;
    let y = starty;

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 1; i <= 4; i++) {
        for (let j = 1; j <= 4; j++) {
            drawHex(x, y);
            ctx.font = "15px Comic Sans MS";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.fillText("Hello World a a", x, y);
            x += r + r * Math.cos(a);
            y -= r * Math.sin(a);
        }
        x = startx;
        y = starty;
        x += (r + r * Math.cos(a)) * i;
        y += r * Math.sin(a) * i;
    }
};
