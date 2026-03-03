import * as THREE from 'three';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, HostListener } from "@angular/core";
import { Camera } from '../classes/camera';
import { Scene } from '../classes/scene';
import { Renderer } from '../classes/renderer';
import { Controls } from '../classes/controls';
import { Lights } from '../classes/lights';
import { Geometry } from '../classes/geometry';
import { Model } from '../classes/model';
import { NewplantbuttonComponent } from './newplantbutton/newplantbutton.component';

@Component({
  selector: 'app-root',
  imports: [NewplantbuttonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppComponent implements AfterViewInit {
  title = 'Gartenplaner';
  camera = new Camera();
  scene = new Scene();
  renderer = new Renderer();
  lights = new Lights();
  ground = new Geometry();
  controls = new Controls(this.camera.getCamera(), this.renderer.getRenderer().domElement);
  meshposition = new THREE.Vector3();
  pointer = new THREE.Vector2();
  raycaster = new THREE.Raycaster();
  visibleobjects: any[] = [];
  mesh: any = '';
  modelname: string = '';
  ground_width: number = 150;
  ground_length: number = 300;
  mixer!: THREE.AnimationMixer;
  clock = new THREE.Clock();
  hovered: THREE.Object3D | null = null;
  found: THREE.Object3D | null = null;
  
mixers: THREE.AnimationMixer[] = [];

rafId?: number;
isAnimating = false;


  ngAfterViewInit(): void {
    this.init();
  }

  onResize(event: { target: { innerWidth: number; innerHeight: number; }; }) {
    this.camera.getCamera().aspect = event.target.innerWidth / event.target.innerHeight;
    this.camera.getCamera().updateProjectionMatrix();
    this.renderer.getRenderer().setSize(event.target.innerWidth, event.target.innerHeight);
  }

  onMouseMove() {
    this.render();
  }

  init() {
    this.ground.createGround(this.ground_width, this.ground_length);
    this.generateGarden();
    this.scene.getScene().add(
      this.ground.getGround(),
      this.ground.getPlane(),
      this.lights.getAmbientLight(),
      this.lights.getDirLight1(),
      this.lights.getDirLight2()
    );
    this.visibleobjects.push(this.ground.getPlane());
  }

  render() {
    this.renderer.getRenderer().render(this.scene.getScene(), this.camera.getCamera());
  }

  // Lädt das Model auf die Szene
  createModel(modelname: any, modelid: any, plantmodel: boolean, positionx: number = 0, positiony: number = 0, positionz: number = 0) {
    let model = new Model();
    this.modelname = modelname;

    if (plantmodel) {
      model.setModelName('/assets/plant_models/' + this.modelname + '.glb');
      model.getModel().load(model.getModelName(), (gltf) => {
        this.mesh = gltf.scene;
        this.mesh.position.set(positionx, positiony, positionz);
        this.mesh.userData["plantmodel"] = plantmodel;
        this.scene.getScene().add(this.mesh);
      });
    } else {
      model.setModelName('/assets/general_models/' + this.modelname + '.glb');
      model.getModel().load(model.getModelName(), (gltf) => {
        let mesh = gltf.scene;
        mesh.position.set(positionx, positiony, positionz);
        mesh.userData["id"] = modelid;
        mesh.userData["plantmodel"] = plantmodel;
        this.scene.getScene().add(mesh);
        this.visibleobjects.push(mesh);
      });
    }
  }

  // Lädt das Model mit Animationen drin auf die Szene
  createModelWithAnimation(modelname: any, positionx: number = 0, positiony: number = 0, positionz: number = 0) {
    let model = new Model();
    model.setModelName('/assets/general_models/' + modelname + '.glb');
    model.getModel().load(model.getModelName(), (gltf) => {
      let mesh = gltf.scene;
      mesh.position.set(positionx, positiony, positionz);
      this.scene.getScene().add(mesh);
      const mixer = new THREE.AnimationMixer(mesh);
      this.mixers.push(mixer);
      const clips = gltf.animations ?? [];;
      clips.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.play();
      });
      this.startAnimateLoop();
    });
  }

  private startAnimateLoop() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    const tick = () => {
      const delta = this.clock.getDelta();
      for (const mixer of this.mixers) {
        mixer.update(delta);
      }
      this.render();
      this.rafId = requestAnimationFrame(tick);
    };
    tick();
  }


  generateGarden() {
    // Pavillon
    this.createModel('pavillon', 'pavillon', false, -50, 17, 125);

    // Beet 1-6
    this.createModel('beet', 'beet1', false, -40, 6, 85);
    this.createModel('beet', 'beet2', false, -40, 6, 53);
    this.createModel('beet', 'beet3', false, -40, 6, 21);
    this.createModel('beet', 'beet4', false, -8, 6, 85);
    this.createModel('beet', 'beet5', false, -8, 6, 53);
    this.createModel('beet', 'beet6', false, -8, 6, 21);

    // Langbeet
    this.createModel('langbeet', 'langbeet', false, 15, 6, -80);

    // Metallhochbeete
    this.createModel('hochbeet_metall', 'hochbeet_metall1', false, -11, 7, -60);
    this.createModel('hochbeet_metall', 'hochbeet_metall2', false, -11, 7, -78);
    this.createModel('hochbeet_metall', 'hochbeet_metall3', false, -11, 7, -96);

    // Holzhochbeete
    this.createModel('hochbeet_holz', 'hochbeet_holz', false, 60, 7, -60);

    // Gewächshäsuer
    this.createModel('gewhaus1', 'gewhaus1', false, -45, 5, -125);
    this.createModel('gewhaus2', 'gewhaus2', false, 35, 6, 100);

    // Bodenplatten
    this.createModel('bodenplatten', 'bodenplatten', false, 3, 3, -45.1);

    // Meerschweinchen
    this.createModelWithAnimation('meerschweinchen', 10, 5.4, -120);

    // Meerschweinchenstall
    this.createModelWithAnimation('meerschweinchenstall', 24.8, 4.8, -128);
    //this.createModel('meerschweinchenstall', 'meerschweinchenstall', false, 24.8, 4.8, -128);

  }

  setMeshBlank() {
    this.mesh = '';
  }

  setMeshVisible() {
    if (this.mesh !== '') {
      this.mesh.visible = true;
    }
  }

  setMeshHide() {
    if (this.mesh !== '') {
      this.mesh.visible = false;
    }
  }

  // Der Raycaster baut ein Mapping zwischen Mauszeiger und Position auf der Gartenfläche, während man den Mauszeiger bewegt.
  @HostListener("window:mousemove", ["$event"])
  onPointerMoveObject(event: MouseEvent) {
    this.pointer.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    this.raycaster.setFromCamera(this.pointer, this.camera.getCamera());
    const intersects = this.raycaster.intersectObjects(this.visibleobjects);

    if (intersects.length > 0 && this.mesh !== '' && (intersects[0].faceIndex == 0 || intersects[0].faceIndex == 1)) {
      let intersect: any = intersects[0];
      this.mesh.position.copy(intersect.point).add(intersect.face.normal);
      this.meshposition = this.mesh.position;
    }

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      const target = this.findParentWithId(hit, 'plantmodel');
      if (target?.userData['plantmodel'] === false || hit.name === '') {
        document.body.style.cursor = 'default'
      } else {
        document.body.style.cursor = 'pointer'
      }
      if (this.hovered !== hit) {
        // if (this.hovered !== hit && target?.userData['plantmodel'] !== false) {
        if (this.hovered) this.resetDarken(this.hovered);
        this.hovered = hit;
        this.applyDarken(this.hovered);
      }
    } else {
      if (this.hovered) {
        this.resetDarken(this.hovered);
        this.hovered = null;
      }
    }
  }

  // Schwärzt das Objekt, wenn man drüberhovert
  private applyDarken(obj: THREE.Object3D) {
    obj.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;

      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((mat: any, idx: number) => {
        if (!mat || !mat.color) return;

        // Originalfarbe nur einmal speichern
        if (!mat.userData?.__origColor) {
          // clone, damit spätere Änderungen nicht referenziell “durchschlagen”
          mat.userData = mat.userData || {};
          mat.userData.__origColor = mat.color.clone();
        }

        // Abdunkeln (z.B. 70%)
        mat.color = mat.color.clone(); // Materialinstanz farblich isolieren
        mat.color.multiplyScalar(0.3);

        // Optional: für klare Wirkung bei PBR-Materialien
        if ('emissive' in mat) {
          if (!mat.userData.__origEmissive) {
            mat.userData.__origEmissive = mat.emissive.clone();
          }
          // leichte negative “Gegenleuchte” ist physikalisch nicht sinnvoll; lieber neutral lassen
          // oder minimal abdunkeln über color reicht meist aus
        }

        mat.needsUpdate = true;
      });
    });
  }

  // Entchwärzt das Objekt, wenn man drüberhovert
  private resetDarken(obj: THREE.Object3D) {
    obj.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;

      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((mat: any) => {
        if (!mat) return;

        if (mat.userData?.__origColor) {
          mat.color.copy(mat.userData.__origColor);
        }
        if (mat.userData?.__origEmissive && 'emissive' in mat) {
          mat.emissive.copy(mat.userData.__origEmissive);
        }
        mat.needsUpdate = true;
      });
    });
  }

  // Objekte werden auf die Gartenfläche gesetzt bzw. kopiert, wenn es einen Linksmausklick gibt.
  @HostListener("window:mousedown", ["$event"])
  onPointerDownObject(event: { button: number }) {

    // Objekte in den Boden rein setzen
    let floorvec = new THREE.Vector3(0, 9, 0);
    let meshposx = this.meshposition.x;
    let meshposy = this.meshposition.y;
    let meshposz = this.meshposition.z;

    // Wenn die Objekte gesetzt wurden, kann man sie anwählen
    const intersects = this.raycaster.intersectObjects(this.visibleobjects);
    if (intersects.length > 0) {
      const hit = intersects[0].object;

      const target = this.findParentWithId(hit, 'id');
      if (target === null && this.mesh !== '') {
        floorvec = new THREE.Vector3(0, 11, 0);
      }
      if (target && this.mesh !== '') {
        console.log(this.modelname + " wurde auf " + target.userData['id'] + " gesetzt");

        // Die hinteren Zahlen der id streichen, um alle gleichen Gartensachen anzusprechen
        /*
        switch (target.userData['id'].replace(/\d+$/, '')) {
          case 'gewhaus':
            floorvec = new THREE.Vector3(0, 5, 0);
        } */
      }
    }

    // Objekte setzen
    if (this.mesh !== '' && event.button == 0) {
      let model_placed = new Model();
      model_placed.setModelName('/assets/plant_models/' + this.modelname + '.glb');
      model_placed.getModel().load(model_placed.getModelName(), (gltf) => {
        let mesh_placed = gltf.scene;
        mesh_placed.position.set(meshposx, meshposy, meshposz).sub(floorvec);
        this.scene.getScene().add(mesh_placed);
        this.visibleobjects.push(mesh_placed);
      });
    }
  }

  // Sucht in den Parents nach einem Attribut in userData
  findParentWithId(obj: THREE.Object3D | null, attribute: string): THREE.Object3D | null {
    while (obj) {
      if (obj.userData && obj.userData[attribute] != null) return obj;
      obj = obj.parent;
    }
    return null;
  }
}