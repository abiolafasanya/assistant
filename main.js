import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

window.addEventListener('load', function () {
  // Create Scene
  const scene = new THREE.Scene()
  scene.background = null;
  scene.add(new THREE.AxesHelper(5))

  // Add a light
  const light = new THREE.PointLight(0xffffff, 1000)
  light.position.set(2.5, 7.5, 15)
  scene.add(light)

  // Add a camera
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set(0.8, 1.4, 1.0)

  const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
  });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( 200, 200 );

  var container = document.getElementById('canvas');
  container.appendChild( renderer.domElement );
  container.classList = 'w-[200px] h-[200px] border-none p-0 absolute top-0 left-0'

  // Add the orbit controls
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.target.set(0, 1, 0)

  var mixer
  var modelReady = false

  // Load our FBX model from the directory
  var loader = new FBXLoader();
  loader.load("Walking.fbx", function(object) {

      // Scale and position the model
      object.scale.set(0.007, 0.007, 0.007)
      object.position.set(0, 0, 0)

      // Start the default animation
      mixer = new THREE.AnimationMixer(object);
      var action = mixer.clipAction(object.animations[0]);
      action.play();

      // Add it to the scene
      scene.add(object);

      modelReady = true

  });


  // Add animation routine
  var clock = new THREE.Clock();
  function animate() {
      requestAnimationFrame( animate );

      // Call the animate on the objec
      if (modelReady) mixer.update(clock.getDelta());

      renderer.render( scene, camera );
  }


  animate();
});












// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))
