// ---------------- PLANET INFO ----------------
const planetData = {
    Sun: { gravity: 274, temp: 5505, description: "A massive star. Center of our solar system." },
    Mercury: { gravity: 3.7, temp: 167, description: "Small and rocky." },
    Venus: { gravity: 8.87, temp: 464, description: "Hot and dense atmosphere." },
    Earth: { gravity: 9.81, temp: 15, description: "Our home planet." },
    Mars: { gravity: 3.71, temp: -65, description: "Red and dusty." },
    Jupiter: { gravity: 24.79, temp: -110, description: "Gas giant, massive storms." },
    Saturn: { gravity: 10.44, temp: -140, description: "Famous for its rings." },
    Uranus: { gravity: 8.69, temp: -195, description: "Icy and rotates sideways." },
    Neptune: { gravity: 11.15, temp: -200, description: "Farthest, windy and blue." },
    Pluto: { gravity: 0.62, temp: -225, description: "Tiny and cold. Dwarf planet." }
};

function showInfo(name){
    const infoBox = document.getElementById('infoBox');
    const data = planetData[name];
    document.getElementById('planetName').textContent = name;
    document.getElementById('planetInfo').textContent = 
        `Gravity: ${data.gravity} m/s² | Avg Temp: ${data.temp}°C | ${data.description}`;
    infoBox.style.display = 'block';
}

function closeInfo(){ document.getElementById('infoBox').style.display = 'none'; }

// ---------------- STARFIELD ----------------
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
let stars = [], numStars=150;

function initStars(){
    stars=[];
    for(let i=0;i<numStars;i++){
        stars.push({x:Math.random()*window.innerWidth, y:Math.random()*window.innerHeight, radius:Math.random()*1.5, alpha:Math.random(), delta:Math.random()*0.02});
    }
}

function drawStars(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let s of stars){
        ctx.beginPath();
        ctx.arc(s.x,s.y,s.radius,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,255,255,${s.alpha})`;
        ctx.fill();
        s.alpha+=s.delta;
        if(s.alpha<=0||s.alpha>=1)s.delta=-s.delta;
    }
    requestAnimationFrame(drawStars);
}

function resizeCanvas(){ canvas.width=window.innerWidth; canvas.height=window.innerHeight; initStars(); }
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); drawStars();

// ---------------- ORBIT SPEED ----------------
const slider = document.getElementById("speedSlider");
const speedDisplay = document.getElementById("speedValue");
slider.addEventListener("input",()=>{
    const speed=parseFloat(slider.value);
    speedDisplay.textContent=`${speed.toFixed(1)}x`;
    document.querySelectorAll(".planet").forEach(p=>{
        const style=window.getComputedStyle(p);
        const animationName=style.animationName;
        const baseDuration=getBaseDuration(animationName);
        if(baseDuration)p.style.animationDuration=(baseDuration/speed)+"s";
    });
});
function getBaseDuration(name){
    const durations={ orbit1:10, orbit2:15, orbit3:20, orbit4:25, orbit5:30, orbit6:35, orbit7:40, orbit8:45, orbit9:50 };
    return durations[name]||null;
}

// ---------------- DESTROY PLANETS ----------------
function destroyPlanet(className){
    const planet=document.querySelector(`.${className}`);
    if(planet) planet.remove();
}

// ---------------- GRAVITY SLINGSHOT ASTEROID ----------------
const asteroid = document.getElementById("asteroid");
const sun = document.querySelector(".sun");
const G = 6.6743e-11, SUN_MASS = 1.989e30;

let aX=window.innerWidth*0.2, aY=window.innerHeight*0.6, vX=0, vY=0, dragging=false, startX, startY;
asteroid.style.left=aX+"px"; asteroid.style.top=aY+"px";

asteroid.addEventListener("mousedown",e=>{
    dragging=true; vX=0; vY=0; startX=e.clientX; startY=e.clientY;
    asteroid.style.cursor="grabbing";
});
document.addEventListener("mousemove",e=>{
    if(!dragging) return;
    aX=e.clientX; aY=e.clientY;
    asteroid.style.left=aX+"px"; asteroid.style.top=aY+"px";
});
document.addEventListener("mouseup",e=>{
    if(!dragging) return;
    dragging=false; asteroid.style.cursor="grab";
    vX=(startX-e.clientX)*0.02; vY=(startY-e.clientY)*0.02;
});

function animateAsteroid(){
    if(!dragging){
        const sunRect=sun.getBoundingClientRect();
        const sunX=sunRect.left+sunRect.width/2, sunY=sunRect.top+sunRect.height/2;
        const dx=sunX-aX, dy=sunY-aY;
        const distSq=dx*dx+dy*dy, dist=Math.sqrt(distSq);
        const a=(G*SUN_MASS)/distSq;
        vX+=(dx/dist)*a*1e8; vY+=(dy/dist)*a*1e8;
        aX+=vX; aY+=vY;
        asteroid.style.left=aX+"px"; asteroid.style.top=aY+"px";

        // Trail
        const t=document.createElement("div"); t.className="trail";
        t.style.left=aX+"px"; t.style.top=aY+"px";
        document.body.appendChild(t);
        setTimeout(()=>t.remove(),500);
    }
    requestAnimationFrame(animateAsteroid);
}
animateAsteroid();
