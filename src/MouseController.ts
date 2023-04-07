import * as THREE from 'three'
import { IController } from './IController'
/*
	Обработчики событий мыши
*/

export class MouseController  implements IController {
	private readonly AROUND_OY = new THREE.Vector3(0,1,0);
	private readonly AROUND_OX = new THREE.Vector3(1,0,0);
	private qMouseX = new THREE.Quaternion();
	private qMouseY = new THREE.Quaternion();
	private amortisation : number;
	private isDraggingNow : boolean = false;
	private prevX : number = 0;
	private prevY : number = 0;
	private dX : number = 0;
	private dY : number = 0;
	private canvas : HTMLCanvasElement;

	// Пользователь нажал ЛКМ
	private onMouseDown = (event : MouseEvent) => {
		event.preventDefault();
		this.isDraggingNow = true; // включаем захват объекта мышью
		this.prevX = event.pageX, this.prevY = event.pageY;
	};

	// Пользователь отпустил ЛКМ
	private onMouseUp = (event : MouseEvent) => {
		this.isDraggingNow = false; // выключаем захват объекта мышью
	};

	// Пользователь переместил курсор мыши
	private onMouseMove = (event : MouseEvent) => {
		if (!this.isDraggingNow) return;
		event.preventDefault();
		this.dX = (event.pageX - this.prevX) * 2 * Math.PI / this.canvas.width,
		this.dY = (event.pageY - this.prevY) * 2 * Math.PI / this.canvas.height;
		this.prevX = event.pageX, this.prevY = event.pageY;
	};

	public poll() {
		if (!this.isDraggingNow) {
			this.dX *= this.amortisation, this.dY *= this.amortisation;
		}
		this.qMouseX.setFromAxisAngle(this.AROUND_OY, this.dX);
		this.qMouseY.setFromAxisAngle(this.AROUND_OX, this.dY);
		return this.qMouseX.multiply(this.qMouseY);
	};

	// Присоединение обработчиков событий мыши
	constructor(canvasObject : HTMLCanvasElement, amortisation : number) {
		this.amortisation = amortisation;
		this.canvas = canvasObject;
		this.canvas.addEventListener("mousedown", this.onMouseDown);
		this.canvas.addEventListener("mouseup", this.onMouseUp);
		this.canvas.addEventListener("mouseout", this.onMouseUp);
		this.canvas.addEventListener("mousemove", this.onMouseMove);
	};
};