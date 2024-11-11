import { RouterOutlet } from '@angular/router';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, HostListener } from "@angular/core";
import { Camera } from '../classes/camera';
import { Scene } from '../classes/scene';
import { Renderer } from '../classes/renderer';
import { Controls } from '../classes/controls';
import { Lights } from '../classes/lights';
import { Geometry } from '../classes/geometry';
import { Model } from '../classes/model'
import { animate } from '@angular/animations';
import * as THREE from 'three';
import { NewplantbuttonComponent } from './newplantbutton/newplantbutton.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NewplantbuttonComponent],
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
  ground_width: number = 150;
  ground_length: number = 150;
  pointer = new THREE.Vector2();
  raycaster = new THREE.Raycaster();
  dbobjects: any[] = [];
  mesh: any = '';

  ngAfterViewInit(): void {
    this.init();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number; innerHeight: number; }; }) {
    this.camera.getCamera().aspect = event.target.innerWidth / event.target.innerHeight;
    this.camera.getCamera().updateProjectionMatrix();
    this.renderer.getRenderer().setSize(event.target.innerWidth, event.target.innerHeight);
  }

  @HostListener("window:mousemove", ["$event"])
  @HostListener('window:mousewheel', ['$event'])
  onMouseMove() {
    this.animate();
  }

  init() {
    this.ground.createPlane(this.ground_width, this.ground_length);
    this.scene.getScene().add(
      this.ground.getPlane(),
      this.lights.getAmbientLight(),
      this.lights.getDirLight1(),
      this.lights.getDirLight2()
    );
    this.dbobjects.push(this.ground.getPlane());
  }

  animate() {
    requestAnimationFrame(animate);
    this.render();
  }

  render() {
    this.renderer.getRenderer().render(this.scene.getScene(), this.camera.getCamera());
  }

  // Lädt das Model auf die Szene
  createModel(modelname: any) {
    let model = new Model();
    model.setModelName('/assets/plant_models/' + modelname + '.glb');
    model.getModel().load(model.getModelName(), (gltf) => {
      this.mesh = gltf.scene;
      this.mesh.position.set(0, 0, 0);
      this.dbobjects.push(this.mesh);
      this.scene.getScene().add(this.mesh);
    });
  }

  // Der Raycaster baut ein Mapping zwischen Mauszeiger und Position auf der Gartenfläche, während man den Mauszeiger bewegt.
  @HostListener("window:mousemove", ["$event"])
  onPointerMoveObject(event: { srcElement: any; clientX: number; clientY: number; }) {
    this.pointer.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    this.raycaster.setFromCamera(this.pointer, this.camera.getCamera());
    const intersects = this.raycaster.intersectObjects(this.dbobjects, false);
    if (intersects.length > 0 && event.srcElement.id == "garden" && this.mesh !== '') {
      let intersect: any = intersects[0];
      this.mesh.position.copy(intersect.point).add(intersect.face.normal);
    }
    this.render();
  }

  // Objekte werden auf die Gartenfläche gesetzt, wenn es einen Linksmausklick gibt.
  @HostListener("window:mousedown", ["$event"])
  onPointerDownObject(event: { button: number; }) {

    // Bei Rechtsklick soll das Objekt nicht mehr an dem Mauszeiger hängen
    if (event.button == 2) {
      this.mesh = '';
    };
  }
}