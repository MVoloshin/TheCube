/// <reference lib="dom" />
import * as THREE from 'three'
import { MouseController } from "./MouseController";
import { KeyboardController } from "./KeyboardController";

var canvas = <HTMLCanvasElement>document.getElementById('app');
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({ canvas : canvas })
renderer.setSize(window.innerWidth, window.innerHeight)
/*
	Камера
*/
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 500 );

/*
	Точечный источник света
*/
var pointLight = new THREE.PointLight( 0xff00ff, 2);
camera.add(pointLight);

/*
	Куб
*/
const geometry = new THREE.BoxGeometry(200,200,200)
const material = /*new THREE.MeshPhongMaterial({color : 0x00ffff});*/new THREE.ShaderMaterial({
	uniforms: {
		surfaceTexture : new THREE.Uniform(new THREE.TextureLoader().load("image.jpg")),
		lightPos : new THREE.Uniform(camera.position),
		lightColor : new THREE.Uniform(pointLight.color),
		lightPower : new THREE.Uniform(pointLight.intensity)	
	},
	vertexShader: document.getElementById( 'vertexShader' ).textContent,
	fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
		glslVersion: THREE.GLSL3
});
var shape = new THREE.Mesh(geometry, material)

/*
	Добавление объектов на сцену
*/
scene.add(camera);
scene.add(shape)

var kc = new KeyboardController(canvas, 0.01)
var mc = new MouseController(canvas, 0.95)

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}
window.addEventListener('resize', onWindowResize)

function animate() {
	shape.applyQuaternion(kc.poll().multiply(mc.poll()))
	render();
    requestAnimationFrame(animate);
}

function render() {
    renderer.render(scene, camera)
}

canvas.focus()
animate()
