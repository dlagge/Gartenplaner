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

  setCameraPositionDefault() {
    this.camera.position.set(-2.4990851024885776, 208.73425375993054, 1.393173621833383);
    this.camera.rotation.set(-1.5707963267948972, 0, 1.5707963272501375);
  }
}