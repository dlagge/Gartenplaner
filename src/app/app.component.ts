import { RouterOutlet } from '@angular/router';
import { AfterViewInit, Component, HostListener } from "@angular/core";
import { Camera } from '../classes/camera';
import { Scene } from '../classes/scene';
import { Renderer } from '../classes/renderer';
import { Controls } from '../classes/controls';
import { Lights } from '../classes/lights';
import { Geometry } from '../classes/geometry';
import { animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
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
  screen_width: number = 0;

  ngAfterViewInit(): void {
    this.init();
  }

  @HostListener('window:resize', ['$event'])
	onResize(event: { target: { innerWidth: number; innerHeight: number; }; }) {
    this.camera.getCamera().aspect = event.target.innerWidth / event.target.innerHeight;
    this.camera.getCamera().updateProjectionMatrix();
    this.renderer.getRenderer().setSize(event.target.innerWidth, event.target.innerHeight);
    this.animate();
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
    this.animate();
  }

  animate() {
    requestAnimationFrame(animate);
    this.render();
  }

  render() {
    this.renderer.getRenderer().render(this.scene.getScene(), this.camera.getCamera());
  }
}

