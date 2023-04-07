import * as THREE from 'three'
import { IController } from './IController'
/*
	����������� ������� ����������
*/

export class KeyboardController implements IController  {
	private direction = new THREE.Vector3(0,0,0);
	private qKeyboardXY = new THREE.Quaternion();
	// ����� ������ ("������" - ������, "����" - ��������)
	private keyMap = new Map<string, boolean>();
	private stepAngle : number;

	// ������� �������
	private onKeyDown = (event : KeyboardEvent) => {
		this.keyMap.set(event.key, true);
	};

	// ���������� �������
	private onKeyUp = (event : KeyboardEvent) => {
		this.keyMap.set(event.key, false);
	};

	// ������ ��������� ������ (��������� ��� �������)
	private onBlur = () => {
		this.keyMap.forEach((value, key) => this.keyMap.set(key, false));
	};

	public poll() {
		this.direction.set(0,0,0);
		if(this.keyMap.get("ArrowDown")) {
			this.direction.x = 1; // ������� ������ ���������� ��� ��
		}
		if(this.keyMap.get("ArrowUp")) {
			this.direction.x = -1; // ������� ������ ���������� ��� ��
		}
		if(this.keyMap.get("ArrowLeft")) {
			this.direction.y = -1; // ������� ������ ���������� ��� ��
		}
		if(this.keyMap.get("ArrowRight")) {
			this.direction.y = 1;  // ������� ������ ���������� ��� ��
		}
		return this.qKeyboardXY.setFromAxisAngle(this.direction.normalize(), this.stepAngle);
	};

	// ������������� ������������ ������� ����������
	constructor(canvasObject : HTMLCanvasElement, stepAngle : number) {
		this.stepAngle = stepAngle;
		canvasObject.addEventListener('keydown', this.onKeyDown);
		canvasObject.addEventListener('keyup', this.onKeyUp);
		canvasObject.addEventListener('blur', this.onBlur);
	};
}