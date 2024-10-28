import * as THREE from 'three';

export class Camera {
  camera: THREE.PerspectiveCamera;

  constructor() {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(100, 100, -100);
    this.camera.lookAt(0, 0, 0);
  }

  getCamera() {
    return this.camera;
  }
}