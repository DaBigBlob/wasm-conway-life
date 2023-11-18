import init, { Universe, Cell } from "./conway_life.js";

const gcd = (a, b) => {
    if (!b) return a;
    return gcd(b, a % b);
}

const CELL_SIZE = gcd(window.innerWidth, window.innerHeight)*7; // px
const DEAD_COLOR = "#000000";
const ALIVE_COLOR = "#ED1C24";
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
        universe.tick(); console.log("tick");
        drawCells();
        setTimeout(() => requestAnimationFrame(renderLoop), 50);
    };

    requestAnimationFrame(renderLoop);
});


