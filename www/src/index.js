import init, { Universe, Cell } from "./conway_life.js";

const CELL_SIZE = Math.floor(Math.min(window.innerWidth, window.innerHeight)/180); // px
const DEAD_COLOR = "#000000";
const ALIVE_COLOR = "#ED1C24";
const UWIDTH = Math.floor(window.innerWidth/CELL_SIZE);
const UHEIGHT = Math.floor(window.innerHeight/CELL_SIZE);
//alert("sell="+CELL_SIZE+" height="+UHEIGHT+" weidth="+UWIDTH);

init().then((init_out) => {
    // Construct the universe, and get its width and height.
    const universe = Universe.new(UWIDTH, UHEIGHT);

    // Give the canvas room for all of our cells and a 1px border
    // around each of them.
    const canvas = document.getElementById("universe-canvas");
    canvas.height = CELL_SIZE*UHEIGHT;
    canvas.width = CELL_SIZE*UWIDTH;

    //eventlistener
    // let touchOn = false;
    // canvas.addEventListener("touchstart", (ev) => {
    //     universe.toggle_cell(Math.floor(ev.clientY/CELL_SIZE), Math.floor(ev.clientX/CELL_SIZE));
    //     touchOn=true;
    // });
    // canvas.addEventListener("mousedown", (ev) => {
    //     universe.toggle_cell(Math.floor(ev.clientY/CELL_SIZE), Math.floor(ev.clientX/CELL_SIZE));
    //     touchOn=true;
    // });
    // canvas.addEventListener("touchend", () => {touchOn=false;});
    // canvas.addEventListener("touchcancel", () => {touchOn=false;});
    // canvas.addEventListener("mouseup", () => {touchOn=false;});
    // canvas.addEventListener("mousemove", (ev) => {
    //     if (!touchOn) return;
    //     universe.toggle_cell(Math.floor(ev.clientY/CELL_SIZE), Math.floor(ev.clientX/CELL_SIZE));
    // });
    // canvas.addEventListener("touchmove", (ev) => {
    //     if (!touchOn) return;
    //     universe.toggle_cell(Math.floor(ev.clientY/CELL_SIZE), Math.floor(ev.clientX/CELL_SIZE));
    // });
    canvas.addEventListener("click", () => universe.sprincle(2));

    const ctx = canvas.getContext('2d');
      
    const drawCells = () => {
        const cells = new Uint8Array(init_out.memory.buffer, universe.cells(), UWIDTH * UHEIGHT);
      
        ctx.beginPath();
      
        // Alive cells.
        ctx.fillStyle = ALIVE_COLOR;
        for (let row = 0; row < UHEIGHT; row++) {
        for (let col = 0; col < UWIDTH; col++) {
            const idx = universe.get_index(row, col);
            if (cells[idx] !== Cell.Alive) {
            continue;
            }

            ctx.fillRect(
            col * (CELL_SIZE) + 1,
            row * (CELL_SIZE) + 1,
            CELL_SIZE,
            CELL_SIZE
            );
        }
        }

        // Dead cells.
        ctx.fillStyle = DEAD_COLOR;
        for (let row = 0; row < UHEIGHT; row++) {
        for (let col = 0; col < UWIDTH; col++) {
            const idx = universe.get_index(row, col);
            if (cells[idx] !== Cell.Dead) {
            continue;
            }

            ctx.fillRect(
            col * (CELL_SIZE) + 1,
            row * (CELL_SIZE) + 1,
            CELL_SIZE,
            CELL_SIZE
            );
        }
        }
      
        ctx.stroke();
    };

    const renderLoop = () => {
        document.getElementById("universe-info").innerText = "age: "+universe.tick();
        drawCells();
        setTimeout(() => requestAnimationFrame(renderLoop), 50);
    };

    requestAnimationFrame(renderLoop);
});



