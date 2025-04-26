# Three.js Project: Variations on Physics

Welcome! 👋  
This project is the codebase behind the YouTube video:  
🎥 **[Three.js Project: Variations on Physics](#)**

In this project, we combine **Three.js** real-time 3D rendering with **Rapier Physics** to create interactive, an animated 3D physics experiment.  

---

## 🛠 Features
- 🌌 Real-time 3D rendering with **Three.js**
- 🧲 Interactive physics simulation powered by **Rapier Physics Engine**
- 🎛 OrbitControls for smooth camera movement
- 🖱 Mouse-controlled physics object ("mouse ball")
- 💡 High Dynamic Range (HDR) environment lighting
- 🎨 Debug visualization of physics bodies

---

## 🧩 Technologies Used
- [Three.js](https://threejs.org/)
- [Rapier Physics Engine](https://rapier.rs/)
- [UltraHDRLoader](https://github.com/mrdoob/three.js/blob/dev/examples/jsm/loaders/UltraHDRLoader.js)
- [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls)

---

## 🧪 How It Works
1. **Scene Setup**  
   Initializes a Three.js scene with an HDR environment and OrbitControls for navigation.
   
2. **Physics World**  
   Sets up a Rapier physics world with gravity set to zero for free-floating objects.

3. **Bodies and Mouse Ball**  
   - Generates 100 physics bodies using a helper function `getBody`.
   - Creates an interactive "mouse ball" that follows mouse movement in 3D space.

4. **Raycasting**  
   Tracks mouse position using a hidden plane and raycasting, updating the "mouse ball" position in 3D coordinates.

5. **Rendering Loop**  
   - Updates and renders the scene.

6. **Debug View** *(optional)*  
   - You can uncomment `renderDebugView();` to visualize the raw physics points and debug your simulation.

---

## 🚀 Getting Started

1. Clone or download this project.
2. You’ll need a local server if loading local modules or textures:
    ```bash
    npm install -g http-server
    http-server .
    ```
3. Open your browser to `http://localhost:8080` (or whatever port your server uses).
4. Move your mouse around and watch the magic happen!

---

## ⚙️ Controls
- **Mouse Movement** → Moves the "mouse ball" through 3D space.
- **OrbitControls** → Drag to rotate the camera, scroll to zoom in/out.

---

## 🎨 Customization Ideas
- Change the number of bodies (`numBodies`) or their properties for different effects.
- Add gravity to the world for a different behavior.
- Load different HDR environments for new lighting moods.
- Load different models from SketchFab, Poly Haven, etc...

---

## 📺 Watch the Tutorial
👉 [Watch the Full YouTube Video Here!](#)

---

## 🧡 Credits
Created by **Robot Bobby**  
Inspired by the joy of mixing physics, art, and code ✨
