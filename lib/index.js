var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 100);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(innerWidth,innerHeight);
document.body.appendChild(renderer.domElement);
cam.position.z = 35;
renderer.render(scene, cam);



// Orbit Controls
let controls = new THREE.OrbitControls(cam,renderer.domElement);


// Skybox Underwater
// From opengameart.org
// Here's the link : https://opengameart.org/content/ocean-hdriskybox

// Converter Link : https://matheowis.github.io/HDRI-to-CubeMap/
let skybox_loader  = new THREE.CubeTextureLoader();
let skybox = skybox_loader.load([
    'skybox/px.png',
    'skybox/nx.png',
    'skybox/py.png',
    'skybox/ny.png',
    'skybox/pz.png',
    'skybox/nz.png',
]);
scene.background = skybox;

// Model White Shark 
// From 3D Viewer
let white_shark;
let ws_animation;
let ws_mixer; 

let ws_loader = new THREE.GLTFLoader().load('../model/Swimming_shark.glb', function(result) {
    // console.log(result);
    ws_animation = result.animations;
    ws_mixer = new THREE.AnimationMixer(result.scene);
    let ws_action = ws_mixer.clipAction(ws_animation[1]);
    ws_action.play();


    white_shark = result.scene.children[0];
    
    scene.add(white_shark);
});

let ws_clock = new THREE.Clock();

// Model White Shark 
// From 3D Viewer
let white_shark2;
let ws_animation2;
let ws_mixer2; 

let ws_loader2 = new THREE.GLTFLoader().load('../model/Swimming_shark.glb', function(result) {
    // console.log(result);
    ws_animation2 = result.animations;
    ws_mixer2 = new THREE.AnimationMixer(result.scene);
    let ws_action2 = ws_mixer2.clipAction(ws_animation2[1]);
    ws_action2.play();


    white_shark2 = result.scene.children[0];
    white_shark2.position.x = 10;
    white_shark2.position.y= -20;
    
    scene.add(white_shark2);
});

let ws_clock2 = new THREE.Clock();


// Model School of Fish
// From 3D Viewer
let fishes;
let f_animation;
let f_mixer;

let f_loader = new THREE.GLTFLoader().load('../model/School_of_fish.glb',function(result){
    // console.log(result);
    f_animation = result.animations;
    f_mixer = new THREE.AnimationMixer(result.scene);
    let f_action = f_mixer.clipAction(f_animation[0]);
    f_action.play();

    fishes = result.scene.children[0];
    scene.add(fishes);
});

let f_clock = new THREE.Clock();


// Model School of Fish
// From 3D Viewer
let fishes2;
let f_animation2;
let f_mixer2;

let f_loader2 = new THREE.GLTFLoader().load('../model/School_of_fish.glb',function(result){
    // console.log(result);
    f_animation2 = result.animations;
    f_mixer2 = new THREE.AnimationMixer(result.scene);
    let f_action2 = f_mixer2.clipAction(f_animation[0]);
    f_action2.play();

    fishes2 = result.scene.children[0];
    fishes2.position.y=-20;
    scene.add(fishes2);
});

let f_clock2 = new THREE.Clock();





// Lighting 
var ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);

// Sounds
// Audio From Youtube 
// Here's the link : https://youtu.be/aImknWMoQIY

// Converter Link : https://ytmp3.mobi/id3/

let pendengar = new THREE.AudioListener();
    cam.add(pendengar);

    let sound1 = new THREE.Audio(pendengar);
    let soundsloader = new THREE.AudioLoader().load('../audio/Underwater_sound.mp3',
    (hasil) => {
        sound1.setBuffer(hasil);
        sound1.play();
        sound1.setLoop(true);
    });

function draw (){
    if (ws_mixer){
        ws_mixer.update(ws_clock.getDelta());
    }

    if (ws_mixer2){
        ws_mixer2.update(ws_clock2.getDelta());
    }

    if (f_mixer){
        f_mixer.update(f_clock.getDelta());
    }

    if (f_mixer2){
        f_mixer2.update(f_clock2.getDelta());
    }
    renderer.render(scene,cam);
    requestAnimationFrame(draw);
}

draw();

