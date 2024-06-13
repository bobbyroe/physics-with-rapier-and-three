import * as THREE from "three";

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

  export { getLayer};