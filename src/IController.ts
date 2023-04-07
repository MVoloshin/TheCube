import * as THREE from 'three'

export interface IController {
	poll() : THREE.Quaternion;
}