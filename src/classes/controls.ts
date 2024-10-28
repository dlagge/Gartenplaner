import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Controls {
    controls: OrbitControls;

    constructor(camera: any, rendDom: HTMLElement) {
        this.controls = new OrbitControls(camera, rendDom);
        this.controls.minDistance = 100;
        this.controls.maxDistance = 400;
        this.controls.maxPolarAngle = Math.PI / 2.5;
        this.controls.zoomToCursor = true;
        this.controls.enableZoom = true;
        this.controls.zoomSpeed = 2;
        this.controls.rotateSpeed = 0.5;
    }

    getControls() {
        return this.controls;
    }
}