// Mouse Interactivity
const raycaster = new THREE.Raycaster();
const pointerPos = new THREE.Vector2(0, 0);
const mousePos = new THREE.Vector3(0, 0, 0);

const mousePlaneGeo = new THREE.PlaneGeometry(48, 48, 48, 48);
const mousePlaneMat = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: 0x00ff00,
  transparent: true,
  opacity: 0.0
});
const mousePlane = new THREE.Mesh(mousePlaneGeo, mousePlaneMat);
mousePlane.position.set(0, 0, 0.2);
scene.add(mousePlane);


window.addEventListener('mousemove', (evt) => {
  pointerPos.set(
    (evt.clientX / window.innerWidth) * 2 - 1,
    -(evt.clientY / window.innerHeight) * 2 + 1
  );
});

let cameraDirection = new THREE.Vector3();
function handleRaycast() {
  // orient the mouse plane to the camera
  camera.getWorldDirection(cameraDirection);
  cameraDirection.multiplyScalar(-1);
  mousePlane.lookAt(cameraDirection);

  raycaster.setFromCamera(pointerPos, camera);
  const intersects = raycaster.intersectObjects(
    [mousePlane],
    false
  );
  if (intersects.length > 0) {
    mousePos.copy(intersects[0].point);
  }
}

const glbLoader = new GLTFLoader();
const glbPaths = ["duck.glb"]; // Add more paths as needed

async function loadGLTFModels() {
  const promises = glbPaths.map((path) =>
    new Promise((resolve, reject) => {
      glbLoader.load(
        `glb/${path}`,
        (gltf) => {
          const model = gltf.scene;
          model.traverse((child) => {
            if (child.isMesh) {
              geometries.push(child.geometry);
            }
          });
          resolve();
        },
        undefined,
        (error) => reject(error)
      );
    })
  );

  try {
    await Promise.all(promises);
    console.log("All GLTF models loaded successfully.");
  } catch (error) {
    console.error("Error loading GLTF models:", error);
  }
}

await loadGLTFModels();

// const colorPallete = [0x780000, 0xc1121f, 0xfdf0d5, 0x003049, 0x669bbc];
const colorPallete = [0x0067b1, 0x4e99ce, 0x9bcbeb, 0x55d7e2, 0xffffff, 0x9ca9b2, 0x4e6676, 0xf69230, 0xf5d81f];
// const colorPallete = [0xff6d00, 0xff7900, 0xff8500, 0xff9100, 0xff9e00, 0x240046, 0x3c096c, 0x5a189a, 0x7b2cbf, 0x9d4edd];




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