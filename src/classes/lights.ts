import * as THREE from 'three';

export class Lights {
    ambientLight = new THREE.AmbientLight(0xfff2cc, 2.5);
    dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight2 = new THREE.DirectionalLight(0xffffff, 2.2);
    

    constructor() {
      //  this.createAmbientLight();
        this.positionDirLight1();
        this.positionDirLight2();
    }

    createAmbientLight() {
       // this.ambientLight = new THREE.AmbientLight(0xfff2cc, 2.5);
    }

    positionDirLight1() {
        this.dirLight.position.set(0, 100, -100);
        //this.dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
        //this.dirLight.position.set(0, 100, -100);
    }
    positionDirLight2() {
        //this.dirLight2 = new THREE.DirectionalLight(0xffffff, 2.2);
        this.dirLight2.position.set(0, 100, 100);
    }

    getAmbientLight() {
        return this.ambientLight;
    }

    getDirLight1() {
        return this.dirLight;
    }

    getDirLight2() {
        return this.dirLight2;
    }
}