var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 100);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(innerWidth,innerHeight);
document.body.appendChild(renderer.domElement);
cam.position.z = 1;
renderer.render(scene, cam);



// Orbit Controls
let controls = new THREE.OrbitControls(cam,renderer.domElement);


// Skybox Rainbow
// From opengameart.org
// Here's the link : https://opengameart.org/content/

// Converter Link : https://matheowis.github.io/HDRI-to-CubeMap/
let skybox_loader  = new THREE.CubeTextureLoader();
let skybox = skybox_loader.load([
    'skybox2/rainbow_rt.png',
    'skybox2/rainbow_lf.png',
    'skybox2/rainbow_up.png',
    'skybox2/rainbow_dn.png',
    'skybox2/rainbow_bk.png',
    'skybox2/rainbow_ft.png',
    
    
    
]);
scene.background = skybox;

// Model T-Rex
// From 3D Viewer
let dinosaur_Trex;
let d_animation;
let d_mixer; 

let d_loader = new THREE.GLTFLoader().load('../model/Rampaging.glb', function(result) {
    // console.log(result);
    d_animation = result.animations;
    d_mixer = new THREE.AnimationMixer(result.scene);
    let d_action = d_mixer.clipAction(d_animation[1]);
    d_action.play();


    dinosaur_Trex = result.scene.children[0];
    dinosaur_Trex.position.y= -10;
    dinosaur_Trex.position.z= -30;
    
    scene.add(dinosaur_Trex);
});

let d_clock = new THREE.Clock();

// Model Rhino
// From 3D Viewer
let rhino;
let r_animation;
let r_mixer; 

let r_loader = new THREE.GLTFLoader().load('../model/Rhino.glb', function(result) {
    // console.log(result);
    r_animation = result.animations;
    r_mixer = new THREE.AnimationMixer(result.scene);
    let r_action = r_mixer.clipAction(r_animation[0]);
    r_action.play();


    rhino = result.scene.children[0];
    rhino.position.x = 30;
    rhino.position.y= -10;
    rhino.position.z= -0;
    
    scene.add(rhino);
});

let r_clock = new THREE.Clock();







// Lighting 
var ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);


function draw (){
    if (d_mixer){
        d_mixer.update(d_clock.getDelta());
    }

    if (r_mixer){
        r_mixer.update(r_clock.getDelta());
    }
    renderer.render(scene,cam);
    requestAnimationFrame(draw);
}

draw();

