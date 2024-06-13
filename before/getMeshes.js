import * as THREE from "three";

function getBody() {
  const size = 0.5;
  const range = 2;
  let x = Math.random() * range - range * 0.5;
  let y = Math.random() * range - range * 0.5 + 0;
  let z = Math.random() * range - range * 0.5;
  const geometry = new THREE.IcosahedronGeometry(size, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x000,
    wireframe: true
  });
  const wireMesh = new THREE.Mesh(geometry, wireMat);
  wireMesh.scale.setScalar(1.001);
  mesh.add(wireMesh);
  return { mesh };
}

function getMouseBall() {
  const mouseSize = 0.25;
  const geometry = new THREE.IcosahedronGeometry(mouseSize, 8);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
  });
  const mouseLight = new THREE.PointLight(0xffffff, 2);
  const mouseMesh = new THREE.Mesh(geometry, material);
  mouseMesh.add(mouseLight);

  function update(mousePos) {
    let { x, y, z } = { x: mousePos.x * 5, y: mousePos.y * 5, z: 1 };
    mouseMesh.position.set(x, y, z);
  }
  return { mesh: mouseMesh, update };
}


function getLayer({ hue, numSprites, opacity, radius, size, z }) {
  const layer = new THREE.Group();
  
  for (let i = 0; i < numSprites; i++) {
    const spriteMaterial = new THREE.SpriteMaterial({
      color: new THREE.Color(`hsl(${hue * 360}, 100%, 50%)`),
      opacity: opacity,
      transparent: true,
    });

    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(size, size, 1);

    const angle = (i / numSprites) * Math.PI * 2;
    sprite.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      z
    );

    layer.add(sprite);
  }

  return layer;
}


export { getBody, getMouseBall, getLayer};