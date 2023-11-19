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
    canvas.addEventListener("click", (ev) => {
        let m = universe.toggle_cell(Math.floor(ev.clientY/CELL_SIZE), Math.floor(ev.clientX/CELL_SIZE));
        //alert("row="+Math.floor(ev.clientY/CELL_SIZE)+" column="+Math.floor(ev.clientX/CELL_SIZE)+" uwidth="+UWIDTH+" uheight="+UHEIGHT+" togg="+m);
    })

    const ctx = canvas.getContext('2d');
      
    const drawCells = () => {
        const cells = new Uint8Array(init_out.memory.buffer, universe.cells(), UWIDTH * UHEIGHT);
      
        ctx.beginPath();
      
        for (let row = 0; row < UHEIGHT; row++) {
            for (let col = 0; col < UWIDTH; col++) {        
                ctx.fillStyle = cells[universe.get_index(row, col)] === Cell.Dead
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
        document.getElementById("universe-info").innerText = "age: "+universe.tick();
        if (universe.age()%1000==0) universe.sprincle(2);

        drawCells();
        setTimeout(() => requestAnimationFrame(renderLoop), 50);
    };

    requestAnimationFrame(renderLoop);
});



