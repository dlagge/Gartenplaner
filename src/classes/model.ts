import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class Model {
    model = new GLTFLoader();
    modelname: any;
    
    setModelName(modelname: string) {
        this.modelname = modelname;
    }

    getModel() {
        return this.model;
    }

    getModelName() {
        return this.modelname;
    }
}