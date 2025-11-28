import './Convertor.css';
import React, { useState, useEffect, useRef } from "react";
import 'font-awesome/css/font-awesome.min.css';

import xbot from '../Models/xbot/xbot.glb';
import ybot from '../Models/ybot/ybot.glb';
import xbotPic from '../Models/xbot/xbot.png';
import ybotPic from '../Models/ybot/ybot.png';
import gradient from '../assets/radial-gradient.webp';

import * as words from '../Animations/words';
import * as alphabets from '../Animations/alphabets';
import { defaultPose } from '../Animations/defaultPose';

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Convert() {
  const [text, setText] = useState("");
  const [bot, setBot] = useState(ybot);
  const [speed, setSpeed] = useState(0.1);
  const [pause, setPause] = useState(800);

  const componentRef = useRef({});
  const { current: ref } = componentRef;

  let textFromAudio = React.createRef();
  let textFromInput = React.createRef();

  const {
    transcript,
    listening,
    resetTranscript,
  } = useSpeechRecognition();

  useEffect(() => {
    ref.flag = false;
    ref.pending = false;
    ref.animations = [];
    ref.characters = [];

    ref.scene = new THREE.Scene();
    ref.scene.background = new THREE.Color(0xdddddd);

    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(0, 5, 5);
    ref.scene.add(spotLight);

    ref.renderer = new THREE.WebGLRenderer({ antialias: true });
    ref.camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth * 0.57 / (window.innerHeight - 70),
      0.1,
      1000
    );

    ref.renderer.setSize(window.innerWidth * 0.57, window.innerHeight - 70);
    const canvasElement = document.getElementById("canvas");
    if (!canvasElement) return; // ✅ Check if canvas element exists
    canvasElement.innerHTML = "";
    canvasElement.appendChild(ref.renderer.domElement);

    ref.camera.position.z = 1.6;
    ref.camera.position.y = 1.4;
    // ref.scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    ref.scene = new THREE.Scene();
ref.scene.background = new THREE.Color(0xeeeeee); // Light gray background

// Add soft ambient light
ref.scene.add(new THREE.AmbientLight(0xffffff, 0.5)); // softer ambient light

// Add directional light to create shadows and depth
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(3, 10, 10);
directionalLight.castShadow = true;
ref.scene.add(directionalLight);

// Optional: Add a spotlight for more dynamic lighting
// const spotLight = new THREE.SpotLight(0xffffff, 0.8);
// spotLight.position.set(0, 5, 5);
// ref.scene.add(spotLight);

    const loader = new GLTFLoader();

    loader.load(bot, (gltf) => {
      gltf.scene.traverse((child) => {
        if (child.type === 'SkinnedMesh') {
          child.frustumCulled = false;
        }
      });
      
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            // color: 0xADD8E6, // Change this to any color
            color: new THREE.Color(0xadd8e6),
            metalness: 0.3,
            roughness: 0.7,
            skinning: true,
          });
        }
      });
      
      // Remove previous avatar from scene if it exists
      if (ref.avatar) {
        ref.scene.remove(ref.avatar);
      }
    
      ref.avatar = gltf.scene;
    
      // Add realistic person image overlay
      // const textureLoader = new THREE.TextureLoader();
      const textureLoader = new THREE.TextureLoader();
      const gradientTexture = textureLoader.load(gradient);
      
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            map: gradientTexture,
            metalness: 0.2,
            roughness: 0.8,
            skinning: true
          });
          child.material.needsUpdate = true;
        }
      
        if (child.type === 'SkinnedMesh') {
          child.frustumCulled = false;
        }
      });
      
//       const textureLoader = new THREE.TextureLoader();
// textureLoader.load(ybotPic, (texture) => {
//   const material = new THREE.MeshBasicMaterial({
//     map: texture,
//     transparent: true,
//     depthTest: false, // Helps avoid Z-fighting
//   });

//   const geometry = new THREE.PlaneGeometry(1, 1.5); // Adjusted size for a realistic overlay
//   const plane = new THREE.Mesh(geometry, material);
//   plane.name = "personOverlay";

//   // Attempt to attach to head bone
//   const headBone = gltf.scene.getObjectByName('Head') ||
//                    gltf.scene.getObjectByName('mixamorigHead') ||
//                    gltf.scene.getObjectByName('head') || 
//                    gltf.scene.getObjectByName('neck');

//   if (headBone) {
//     plane.position.set(0, 0.2, 0.3); // Position relative to head bone
//     plane.scale.set(1, 1, 1);        // Adjust if too big/small
//     headBone.add(plane);
//     console.log("✅ Overlay attached to head bone");
//   } else {
//     // If no bone found, attach to avatar directly
//     plane.position.set(0, 1.6, 0.2); // Global position
//     ref.avatar.add(plane);
//     console.warn("⚠️ Head bone not found, using fallback position.");
//   }
// });



      // textureLoader.load(ybotPic, (texture) => {
      //   const material = new THREE.MeshBasicMaterial({
      //     map: texture,
      //     transparent: true,
      //   });
      //   const geometry = new THREE.PlaneGeometry(0.6, 0.6);
      //   const plane = new THREE.Mesh(geometry, material);
      //   plane.position.set(0, 1.6, 0.2);
      //   plane.name = "personOverlay";
      //   ref.avatar.add(plane);
      // });
    
      ref.scene.add(ref.avatar);
      defaultPose(ref);
    });
    

    // loader.load(bot, (gltf) => {
    //   gltf.scene.traverse((child) => {
    //     if (child.type === 'SkinnedMesh') {
    //       child.frustumCulled = false;
    //     }
    //   });

    //   ref.avatar = gltf.scene;

    //   // Add realistic person image on avatar
    //   const textureLoader = new THREE.TextureLoader();
    //   textureLoader.load('/person.png', (texture) => {
    //     const material = new THREE.MeshBasicMaterial({
    //       map: texture,
    //       transparent: true,
    //     });
    //     const geometry = new THREE.PlaneGeometry(0.6, 0.6);
    //     const plane = new THREE.Mesh(geometry, material);
    //     plane.position.set(0, 1.6, 0.2);
    //     plane.name = "personOverlay";
    //     ref.avatar.add(plane);
    //   });

    //   ref.scene.add(ref.avatar);
    //   defaultPose(ref);
    // }, (xhr) => {
    //   console.log(xhr);
    // });
  }, [ref, bot]);

  ref.animate = () => {
    if (ref.animations.length === 0) {
      ref.pending = false;
      return;
    }
    requestAnimationFrame(ref.animate);
    if (ref.animations[0].length) {
      if (!ref.flag) {
        if (ref.animations[0][0] === 'add-text') {
          setText(text + ref.animations[0][1]);
          ref.animations.shift();
        } else {
          for (let i = 0; i < ref.animations[0].length;) {
            let [boneName, action, axis, limit, sign] = ref.animations[0][i];
            const bone = ref.avatar.getObjectByName(boneName)[action];
            if (sign === "+" && bone[axis] < limit) {
              bone[axis] = Math.min(bone[axis] + speed, limit);
              i++;
            } else if (sign === "-" && bone[axis] > limit) {
              bone[axis] = Math.max(bone[axis] - speed, limit);
              i++;
            } else {
              ref.animations[0].splice(i, 1);
            }
          }
        }
      }
    } else {
      ref.flag = true;
      setTimeout(() => { ref.flag = false; }, pause);
      ref.animations.shift();
    }
    ref.renderer.render(ref.scene, ref.camera);
  };

  const sign = (inputRef) => {
    const str = inputRef.current.value.toUpperCase();
    const strWords = str.split(' ');
    setText('');
    for (let word of strWords) {
      if (words[word]) {
        ref.animations.push(['add-text', word + ' ']);
        words[word](ref);
      } else {
        for (const [index, ch] of word.split('').entries()) {
          ref.animations.push(['add-text', ch + (index === word.length - 1 ? ' ' : '')]);
          alphabets[ch](ref);
        }
      }
    }
    ref.animate();
  };

  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();

  return (
    <div className="convertor-container">
      <div className="convertor-left">
        <label className='label-style'>Processed Text</label>
        <textarea rows={3} value={text} className='input-style' readOnly />

        <label className='label-style'>Speech Recognition: {listening ? 'on' : 'off'}</label>
        <div className='space-between'>
          <button className="btn-style" onClick={startListening}>Mic On <i className="fa fa-microphone"/></button>
          <button className="btn-style" onClick={stopListening}>Mic Off <i className="fa fa-microphone-slash"/></button>
          <button className="btn-style" onClick={resetTranscript}>Clear</button>
        </div>

        <textarea rows={3} ref={textFromAudio} value={transcript} placeholder='Speech input ...' className='input-style' />
        <button onClick={() => sign(textFromAudio)} className='btn-style btn-start'>Start Animations</button>

        <label className='label-style'>Text Input</label>
        <textarea rows={3} ref={textFromInput} placeholder='Text input ...' className='input-style' />
        <button onClick={() => sign(textFromInput)} className='btn-style btn-start'>Start Animations</button>
      </div>

      <div className="convertor-canvas" id="canvas"></div>
     


      {/* <div className="convertor-right">
        <p className='bot-label'>Select Avatar</p>
        <img src={xbotPic} className='bot-image' onClick={() => setBot(xbot)} alt='Avatar 1: XBOT' />
        <img src={ybotPic} className='bot-image' onClick={() => setBot(ybot)} alt='Avatar 2: YBOT' />
        <p className='label-style'>Animation Speed: {Math.round(speed * 100) / 100}</p>
        <p className='label-style'>Pause time: {pause} ms</p>
      </div> */}
    </div>
  );
}

export default Convert;
