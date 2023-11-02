import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
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
const Space = () => {

    useEffect(() => {
   
     
      
      init()
      console.log('Quante volte sto caricando ?');
     
             },[])
    let camera,scene,renderer;
    let controls;
    let model2;
    let texture;
    let planeTexture;
    let planeMaterial;
    let meshGround;
    const navigate = useNavigate();
  
    
    //let loader2 = new GLTFLoader();

    let mixer; 
    let action = "left"
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
    camera.position.z =5  ; 
    const groundTexture = new THREE.TextureLoader().load(moon)
    const material = new THREE.MeshStandardMaterial({map:groundTexture});
    
   
    scene = new THREE.Scene();
    //texture = new THREE.TextureLoader().load(text);
    scene.background  = texture;
    const light2 = new THREE.AmbientLight( 0xffffff,0.9);
    light2.position.set( 50, 50, 50 );
    scene.add( light2 );
    //ground();
    console.log(camera.children)
    const light = new THREE.AmbientLight("0x404040",0.5)
    const bulbLight = new THREE.PointLight( 0xffee88, 1, 100, 2 );
    scene.add(bulbLight)
    //scene.add(light)
    console.log(scene.children);

    //Array(200).fill().forEach(addStar)
    //renderer.render(scene, camera)
    let loader  = new GLTFLoader();
    let loader2= new GLTFLoader()
    loader.load( "businessman.glb", function ( gltf ) {
        model = gltf.scene
        model.scale.x =1.4
        model.scale.y = 1.3 
        model.rotation.y =11
        model.position.z = -1
        model.position.y=-2 
        
        const animations = gltf.animations;
        mixer = new THREE.AnimationMixer( model );
        scene.add( model );
        walkAction = mixer.clipAction(animations[24])
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
                if (model.rotation.y !=22){
                    model.rotation.y = 22
                } 

                //camera.position.z +=0.5
                action = "back"
            }
            if (e.key == "ArrowDown"||
            e.code == "ArrowDown" ||      
            e.keyCode == 40
            
            ){ 
                idleAction.stop()
                model.rotation.y = 0
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
            model.rotation.y = 11
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
            model.rotation.y = 8
            walkAction.play()
            //model.position.y =4 
 


            }
           
       

        
        } 

    
    }, undefined, function ( error ) {
        console.error( error );
       
    } );
    loader2.load( "vr_gallery_no_5_building_with_artwork_by_drcg.glb", function ( gltf ) {
        model2 = gltf.scene
        model2.rotation.y =0
        model2.position.z = 0
        model2.position.y = -2
        const animations = gltf.animations;
       
        scene.add( model2 );
        

        modelReady = true
       
        //walkAction.play()
       
        animate() 
        
   
    
    }, undefined, function ( error ) {
        console.error( error );
       
    } );
    const fbxLoader = new FBXLoader()






    renderer = new THREE.WebGLRenderer( {canvas:canvasRef.current ,antialias:true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    render()  
    window.addEventListener( 'resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix( );
        renderer.setSize( window.innerWidth, window.innerHeight );
        
    });
     //controls = new OrbitControls(camera,canvasRef.current)
    //controls = new PointerLockControls(camera, renderer.domElement)
    
    
 
}







function animate() {
    //console.log(action)
    //console.log("positions : " + ""+ camera.position.x,camera.position.y,camera.position.z)
    requestAnimationFrame(animate );
    if (modelReady) mixer.update(clock.getDelta())
    render()

    if (action == "walk"){
        
        idleAction.stop()
        walkAction.play()
        
        
        model.position.z += 0.01
        camera.position.z += 0.01

        if (model.position.z>2) {
            model.rotation.y = 22
            action = "back"

        }
    
    
    }
        
    if (action == "idle" || action == "back" ){
        
        walkAction.play()
        action = "back"
        model.position.z -= 0.01
        camera.position.z -= 0.01

        if (model.position.z<-5) {
            model.rotation.y = 0
            action = "walk"

        }
       
    }
    if (action == "stop") {
        //console.log("stop")

     }
    if (action == "left"){
      
        camera.position.x -=0.01
        model.position.x -= 0.01
        model.rotation.y = 11
        
        if (model.position.x <= -14)
        action = "right"
    }

    if (action == "right"){
        camera.position.x +=0.01
        model.position.x += 0.01
        model.rotation.y = 8
        if (model.position.x >= 7 )
        action = "left" 
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
    <button  className="button-back" onClick={() => {navigate("/")}}>  Back </button>

    <canvas  ref={canvasRef}></canvas>
    <img className="img-env" src={require('../Content/commands .jpeg')} />
</div>
    
    )}

export default Space;
