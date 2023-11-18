import init, { Universe, Cell } from "../pkg/conway_life.js";

const gcd = (a, b) => {
    if (!b) return a;
    return gcd(b, a % b);
}

const CELL_SIZE = gcd(window.innerWidth, window.innerHeight)*6; // px
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";
const UWIDTH = Math.floor(window.innerWidth/CELL_SIZE);
const UHEIGHT = Math.floor(window.innerHeight/CELL_SIZE);
//alert("sell="+CELL_SIZE+" height="+UHEIGHT+" weidth="+UWIDTH);

init().then((init_out) => {
    // Construct the universe, and get its width and height.
    const universe = Universe.new(UWIDTH, UHEIGHT);
    const width = UWIDTH;
    const height = UHEIGHT;

    // Give the canvas room for all of our cells and a 1px border
    // around each of them.
    const canvas = document.getElementById("game-of-life-canvas");
    canvas.height = CELL_SIZE*UHEIGHT;
    canvas.width = CELL_SIZE*UWIDTH;

    const ctx = canvas.getContext('2d');

    //stuff
    const drawGrid = () => {
        ctx.beginPath();
        ctx.strokeStyle = GRID_COLOR;
        console.log("gg")
      
        // Vertical lines.
        for (let i = 0; i <= UWIDTH; i++) {
          ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
          ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
        }
      
        // Horizontal lines.
        for (let j = 0; j <= height; j++) {
          ctx.moveTo(0,                           j * (CELL_SIZE + 1) + 1);
          ctx.lineTo((CELL_SIZE + 1) * UWIDTH + 1, j * (CELL_SIZE + 1) + 1);
        }
      
        ctx.stroke();
    };
      
    const drawCells = () => {
        const cellsPtr = universe.cells();
        const cells = new Uint8Array(init_out.memory.buffer, cellsPtr, width * height);
      
        ctx.beginPath();
      
        for (let row = 0; row < height; row++) {
          for (let col = 0; col < UWIDTH; col++) {
            const idx = universe.get_index(row, col);
      
            ctx.fillStyle = cells[idx] === Cell.Dead
              ? DEAD_COLOR
              : ALIVE_COLOR;
      
            ctx.fillRect(
              col * (CELL_SIZE + 1) + 1,
              row * (CELL_SIZE + 1) + 1,
              CELL_SIZE,
              CELL_SIZE
            );
          }
        }
      
        ctx.stroke();
    };

    const renderLoop = () => {
    universe.tick(); console.log("tick");
    drawCells();
    setTimeout(() => requestAnimationFrame(renderLoop), 0);
    };


    drawGrid();
    requestAnimationFrame(renderLoop);
});



