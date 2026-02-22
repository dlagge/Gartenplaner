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

  animate = () => {
    if (this.mixer)
      this.mixer.update(this.clock.getDelta());

    requestAnimationFrame(this.animate); // ✅ correct binding
    // this.controls.getControls().update();
    this.render();
  }

  render() {
    this.renderer.getRenderer().render(this.scene.getScene(), this.camera.getCamera());
  }

  // Lädt das Model auf die Szene
  createModel(modelname: any, plantmodel: boolean, positionx: number = 0, positiony: number = 0, positionz: number = 0) {
    let model = new Model();
    this.modelname = modelname;

    if (plantmodel) {
      model.setModelName('/assets/plant_models/' + this.modelname + '.glb');
      model.getModel().load(model.getModelName(), (gltf) => {
        this.mesh = gltf.scene;
        this.mesh.position.set(positionx, positiony, positionz);
        //  this.visibleobjects.push(this.mesh);
        this.scene.getScene().add(this.mesh);
      });
    } else {
      model.setModelName('/assets/general_models/' + this.modelname + '.glb');
      model.getModel().load(model.getModelName(), (gltf) => {
        let mesh = gltf.scene;
        mesh.position.set(positionx, positiony, positionz);
        this.scene.getScene().add(mesh);
      });
    }
  }

  setModelAnimation(modelname: any, positionx: number = 0, positiony: number = 0, positionz: number = 0) {
    let model = new Model();
    this.modelname = modelname;
    model.setModelName('/assets/general_models/' + this.modelname + '.glb');
    model.getModel().load(model.getModelName(), (gltf) => {
      let mesh = gltf.scene;
      mesh.position.set(positionx, positiony, positionz);
      this.scene.getScene().add(mesh);
      this.mixer = new THREE.AnimationMixer(mesh);
      let clips = gltf.animations;
      clips.forEach((clip) => {
        let action = this.mixer.clipAction(clip);
        action.play();
      });
      this.animate();
    });
  }

  generateGarden() {
    // Pavillon
    this.createModel('pavillon', false, -50, 17, 125);

    // Beet 1-6
    this.createModel('beet', false, -40, 6, 85);
    this.createModel('beet', false, -40, 6, 53);
    this.createModel('beet', false, -40, 6, 21);
    this.createModel('beet', false, -8, 6, 85);
    this.createModel('beet', false, -8, 6, 53);
    this.createModel('beet', false, -8, 6, 21);

    // Langbeet
    this.createModel('langbeet', false, 15, 6, -80);

    // Metallhochbeete
    this.createModel('hochbeet_metall', false, -11, 7, -60);
    this.createModel('hochbeet_metall', false, -11, 7, -78);
    this.createModel('hochbeet_metall', false, -11, 7, -96);

    // Holzhochbeete
    this.createModel('hochbeet_holz', false, 60, 7, -60);

    // Gewächshäsuer
    this.createModel('gewhaus1', false, -45, 15.7, -125);
    this.createModel('gewhaus2', false, 35, 13.5, 100);

    // Bodenplatten
    this.createModel('bodenplatten', false, 3, 3, -45);

    // Meerschweinchen
    // this.createModel('meerschweinchen', false, 10, 10, 10);
    this.setModelAnimation('meerschweinchen', 10, 5.4, -120);
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
  onPointerMoveObject(event: { clientX: number; clientY: number; }) {
    this.pointer.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    this.raycaster.setFromCamera(this.pointer, this.camera.getCamera());
    const intersects = this.raycaster.intersectObjects(this.visibleobjects);
    if (intersects.length > 0 && this.mesh !== '' && (intersects[0].faceIndex == 0 || intersects[0].faceIndex == 1)) {
      let intersect: any = intersects[0];
      this.mesh.position.copy(intersect.point).add(intersect.face.normal);
      this.meshposition = this.mesh.position;
    }

    // Wenn man sich mit dem Mauszeiger oberhalb des Objekt befindet, wird es dunkel markiert.
    /*
    if (intersects.length > 1) {
      this.visibleobjects.forEach(obj => {
        obj.traverse((child: { material: { color: { setHex: (arg0: number) => void; }; }; }) => {
          if (child.material) {
            child.material.color.setHex(0xffffff);
          }
        });
      });

      let childarr: any[] = [];
      let selectorcolor = 0xb3847a;

      intersects.forEach(intersect => {
        intersect.object.traverse((child: any) => {
          if (child.material) {
            childarr.push(child);
          }
        });
      });
      childarr.forEach(child => {
        if (childarr[0].parent.position.x === child.parent.position.x && childarr[0].parent.position.y === child.parent.position.y) {
          child.material.color.setHex(selectorcolor);
        } else {
          child.material.color.setHex(0xffffff);
        }
      });
    }
*/
    this.render();
  }

  // Objekte werden auf die Gartenfläche gesetzt bzw. kopiert, wenn es einen Linksmausklick gibt.
  @HostListener("window:mousedown", ["$event"])
  onPointerDownObject(event: { button: number; srcElement: any; }) {

    // Objekte in den Boden rein setzen
    const floorvec = new THREE.Vector3(0, 3, 0);
    let meshposx = this.meshposition.x;
    let meshposy = this.meshposition.y;
    let meshposz = this.meshposition.z;

    if (this.mesh !== '' && event.button == 0 && event.srcElement.id == 'garden') {
      let model_placed = new Model();
      model_placed.setModelName('/assets/plant_models/' + this.modelname + '.glb');
      model_placed.getModel().load(model_placed.getModelName(), (gltf) => {
        let mesh_placed = gltf.scene;
        mesh_placed.position.set(meshposx, meshposy, meshposz).sub(floorvec);
        this.scene.getScene().add(mesh_placed);
        this.visibleobjects.push(mesh_placed);

        /*
        this.visibleobjects.forEach(obj => {
          obj.traverse((child: any) => {
            if(child.name == this.mesh.name) {

            }
          });
        }); */
      });
    }
  }
}