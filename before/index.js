import * as THREE from "three";
import { getBody, getMouseBall } from "./getMeshes.js";
import { getLayer } from "./getLayer.js";
import RAPIER from 'https://cdn.skypack.dev/@dimforge/rapier3d-compat@0.11.2';
import { EffectComposer } from "jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "jsm/postprocessing/UnrealBloomPass.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

let mousePos = new THREE.Vector2();

const numBodies = 1;
const bodies = [];
for (let i = 0; i < numBodies; i++) {
  const body = getBody();
  bodies.push(body);
  scene.add(body.mesh);
}

const mouseBall = getMouseBall();
scene.add(mouseBall.mesh);

const hemiLight = new THREE.HemisphereLight(0x00bbff, 0xaa00ff);
scene.add(hemiLight);

const sprites = getLayer({
  hue: 0.0,
  numSprites: 8,
  opacity: 0.02, 
  radius: 10,
  size: 24,
  z: -10.5,
});

scene.add(sprites);


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  //controls.update();
}

animate();

function handleWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);

// mouse move handler
function handleMouseMove (evt) {
  mousePos.x = (evt.clientX / window.innerWidth) * 2 - 1;
  mousePos.y = -(evt.clientY / window.innerHeight) * 2 + 1;
}
window.addEventListener('mousemove', handleMouseMove, false);

