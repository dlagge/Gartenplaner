import * as THREE from 'three';

export class Renderer {
    renderer: THREE.WebGLRenderer;

    constructor() {
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.domElement.id = 'garden';
        document.body.appendChild(this.renderer.domElement);
    }

    getRenderer() {
        return this.renderer;
    }
}