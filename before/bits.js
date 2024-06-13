// 1) post-processing
import { EffectComposer } from "jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "jsm/postprocessing/UnrealBloomPass.js";

// post-processing
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 1.5, 0.4, 100);
bloomPass.threshold = 0.002;
bloomPass.strength = 2.0;
bloomPass.radius = 0;
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

// 2) Orbit controls
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
//
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;
// render
controls.update();

// 3) physics
import { getBody, getMouseBall } from "./getBodies.js";
//
const body = getBody(RAPIER, world);
const mouseBall = getMouseBall(RAPIER, world);
scene.add(mouseBall.mesh);
// render 
bodies.forEach((b) => {
    b.update();
  });
  mouseBall.update(mousePos);

// 4) physics
import RAPIER from 'https://cdn.skypack.dev/@dimforge/rapier3d-compat@0.11.2';
//
await RAPIER.init();
let gravity = { x: 0.0, y: 0, z: 0.0 };
let world = new RAPIER.World(gravity);
// render 
world.step();
/*
  1) basic scene
  2) populate with geometry
  3) wire up mouse controls
  4) add physics
  5) add Orbit Controls
  6) add post processing
*/