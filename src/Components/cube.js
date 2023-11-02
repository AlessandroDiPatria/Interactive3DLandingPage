import * as THREE from 'three';
import { OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import space from "../Content/meteoritetexture.jpeg"
import moon from "../Content/background4.jpeg"
import text from "../Content/spaceimage.jpeg"
import { Link, Navigate } from 'react-router-dom';
import {useEffect,useRef} from "react";
import Environment from './Environment';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./landing.css"
import { useNavigate } from 'react-router-dom';


import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
//import spaceman from "/Users/federico/Desktop/landpage/src/spaceman/scene.gltf"
// init
const Landing = () => {

    useEffect(() => {
   
     
      
      init()
      console.log('Quante volte sto caricando ?');
     
             },[])
    let camera,scene,renderer;
    let controls;
   
    let texture;
    let planeTexture;
    let planeMaterial;
    let meshGround;
    const navigate = useNavigate();
  
    
    //let loader2 = new GLTFLoader();

    let mixer; 
    let action = "back"
    let model;
    let walkAction;
    const clock = new THREE.Clock()
    let switchRun = false
    let runAction;
    let idleAction;
    let modelReady = false
    let currentState = "run"
    let rotation  = "front"
    const canvasRef = useRef();


         
      
   

function init() {

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
    console.log(window.innerHeight)
    camera.position.z = 3;
   
    scene = new THREE.Scene();
    texture = new THREE.TextureLoader().load(text);
    scene.background = texture;
    ground();
    console.log(camera.children)
    const light = new THREE.AmbientLight("0xffffff")
    scene.add(light)
    console.log(scene.children);

    Array(200).fill().forEach(addStar)
    //renderer.render(scene, camera)
    let loader  = new GLTFLoader();
    loader.load( "Soldier.glb", function ( gltf ) {
        model = gltf.scene
        model.rotation.y =0
        model.position.z = 0
        model.position.y=-1  
        const animations = gltf.animations;
        mixer = new THREE.AnimationMixer( model );
        scene.add( model );
        walkAction = mixer.clipAction(animations[3])
        runAction = mixer.clipAction(animations[1]) 
        idleAction = mixer.clipAction(animations[0])

        modelReady = true
        console.log(animations)
        walkAction.play()
       
        animate() 
        
       
       
        document.body.onkeyup = function(e) {
            if (e.key == " " ||
                e.code == "Space" ||      
                e.keyCode == 32      
            ) {
                action = "stop"
                walkAction.stop()
                idleAction.play()
            }
            if (e.key == "ArrowUp"||
            e.code == "ArrowUp" ||      
            e.keyCode == 38
            
            ){
                idleAction.stop()
                walkAction.play()
                rotation = "up"
                //model.position.z +=0.5
                if (model.rotation.y != 0){
                    model.rotation.y = 0
                } 

                //camera.position.z +=0.5
                action = "back"
            }
            if (e.key == "ArrowDown"||
            e.code == "ArrowDown" ||      
            e.keyCode == 40
            
            ){ 
                idleAction.stop()
                model.rotation.y = 22
                rotation = "back"
                
                walkAction.play()
                switchRun = true
                action = "walk"
                
              
               
            }

            if (e.key == "ArrowLeft"||
            e.code == "ArrowLeft" ||      
            e.keyCode == 37
            
            ){ 
            idleAction.stop()
            action = "left"
            model.rotation.y =8
            //camera.position.x = -5
            walkAction.play()
            //model.position.y =4 



            }

            if (e.key == "ArrowRight"||
            e.code == "ArrowRight" ||      
            e.keyCode == 39
            
            ){ 
            idleAction.stop()
            action = "right"
            //camera.position.x = 5
            model.rotation.y = 11
            walkAction.play()
            //model.position.y =4 



            }

        
        } 

        
           
            
    
    }, undefined, function ( error ) {
        console.error( error );
       
    } );

    renderer = new THREE.WebGLRenderer( {canvas:canvasRef.current ,antialias:true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    render()  
    window.addEventListener( 'resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
        
    });
    controls = new OrbitControls(camera,canvasRef.current)
    
    
 
}



const spaceman = () => {
    
}



function animate() {
    //console.log(action)
    console.log("positions : " + ""+ camera.position.x,camera.position.y,camera.position.z)
    
    requestAnimationFrame(animate );
   
    if (modelReady) mixer.update(clock.getDelta())
    render()
    //console.log(model.position.z,camera.position.z)
    if (action == "walk"){
        
        idleAction.stop()
        walkAction.play()
        
        
        model.position.z += 0.02
        camera.position.z += 0.02}
        
    if (action == "idle" || action == "back" ){
        
        walkAction.play()
        action = "back"
        model.position.z -= 0.02
        camera.position.z -= 0.02
       
    }
    if (action == "stop") {
        //console.log("stop")

    }
    if (action == "left"){
        camera.position.x -=0.02
        model.position.x -= 0.02
    }

    if (action == "right"){
        camera.position.x +=0.02
        model.position.x += 0.02
    }

    }

    function render() {

        renderer.render(scene, camera);
    
    }



const ground = () =>{ 
    // GROUND 
    const groundTexture = new THREE.TextureLoader().load(moon)
    planeMaterial = new THREE.PlaneGeometry(80,80);
    planeTexture = new THREE.MeshToonMaterial({map:groundTexture,shininess: 2024, side: THREE.DoubleSide, wireframe:false})
   
    meshGround = new THREE.Mesh(planeMaterial,planeTexture)
    meshGround.position.y = -1
    meshGround.position.z = 0
    meshGround.position.x = 0
    meshGround.rotation.x = -Math.PI/2;
    meshGround.rotation.y = 
    meshGround.rotation.z = 0
    scene.add(meshGround)

   

}
 



// animation

function addStar() {
    texture = new THREE.TextureLoader().load(space);
    //var colors = ['#FF5733', '#1DFC7F', '#FF888CC', '#2664D9', '#F88888','#CCF888','#BE0FFB'];
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    var colors = ["0xffffff"];
    const groundTexture = new THREE.TextureLoader().load(moon)
    const geometry = new THREE.SphereGeometry(0.6,29,24)
    //color :colors[Math.floor(Math.random() * colors.length)]
    const material = new THREE.MeshStandardMaterial({map:texture});
    //const material = new THREE.MeshStandardMaterial({map:groundTexture});
    const star = new THREE.Mesh(geometry,material)
    const [x,y,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(200));
    star.position.set(x,y,z)
    scene.add(star)
    
}



/*
const shuttle = () => {
    loader.load( "shattle/scene.gltf", function ( gltf ) {
        let model = gltf.scene
        model.scale.set(0.4, 0.4, 0.4)
        model.position.y=1;
        model.position.x=5

        scene.add(model );
        animations = gltf.animations;
		//mixer = new THREE.AnimationMixer( model );

		
    
    }, undefined, function ( error ) {
    
        console.error( error );
    
    } );
}


const sphere =() => {
    sphereGeometry= new THREE.SphereGeometry(2, 20, 16 );

    sphereTexture = new THREE.MeshBasicMaterial({});
    meshSphere = new THREE.Mesh(sphereGeometry,spaceTexture);
    meshSphere.position.x = 1
    scene.add(meshSphere)

    //material = new THREE.MeshStandardMaterial({color: 0xFF6347})
}

const box = () => {
    geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );// new geometry 
    material = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh( geometry, material );
    //scene.add(mesh)
    mesh.position.y = 0
    scene.add(mesh)

}

const plane = ()  => {
    let x = 100, y = 100;
    const planeGeometry = new THREE.PlaneGeometry( 2, 2, x, y );
    const planeMaterial = new THREE.MeshPhongMaterial( {color: 'white', shininess: 2024, side: THREE.DoubleSide, wireframe:false} );
    for(let i=0; i<=x; i++){
        for(let j=0; j<=y; j++){
            const n = i*(x+1)+j;
            const xx = (2*i-x)/x;
            const yy = (2*j-y)/y;
            const r = Math.random()*0.05;
      //planeGeometry.vertices[n].z = (Math.cos(xx*7) + Math.cos(yy*7))*0.3
      planeGeometry.vertices[n].z = (xx*xx - yy*yy) + r;
    }
}
planeGeometry.computeFaceNormals();
planeGeometry.computeVertexNormals();
const mesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(mesh)
}
*/

 return (
<div className='container'>
    <h1>Explore the space with us</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
   
    <button  className="button-env" onClick= {()=>{navigate("/space")}}> Start Now</button>
    <button  className="button" onClick={() => {navigate("/environment")}}>Navigate</button>

    <canvas  ref={canvasRef}></canvas>
    <img  src={require('../Content/updown.png')} />
</div>
    
    )}

export default Landing;
