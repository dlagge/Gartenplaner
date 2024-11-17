import * as THREE from 'three';

export class Geometry {
    ground: any;
    plane: any;
    colors: any[] = [];
    width: any;
    length: any;
    
    createGround(width: number, length: number) {
        this.width = width;
        this.length = length;
        let geometry = new THREE.BoxGeometry(this.width, this.length, 10).toNonIndexed();
        geometry.rotateX(- Math.PI / 2);
        const material = new THREE.MeshBasicMaterial({ vertexColors: true });
        
        const color = new THREE.Color();
        const dunkelbraun = new THREE.Color(0xEFA477);
        const braun = new THREE.Color(0xedae87);

        for(let i=0; i<8;i++) {
            color.set(dunkelbraun);
            this.createColors(this.colors, color);
        }
        for(let i=0; i<2;i++) {
            color.set(braun);
            this.createColors(this.colors, color);
        }
        for(let i=0; i<2;i++) {
            color.set(dunkelbraun);
            this.createColors(this.colors, color);
        }
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(this.colors, 3));

        this.ground = new THREE.Mesh(geometry, material);

        this.createPlane();
    }

    createColors(colors: any[], color: THREE.Color) {
        colors.push(color.r, color.g, color.b);
        colors.push(color.r, color.g, color.b);
        colors.push(color.r, color.g, color.b);
    }

    createPlane() {
        let geometry_plane = new THREE.PlaneGeometry( this.width, this.length );
        geometry_plane.rotateX(- Math.PI / 2);
        const material = new THREE.MeshBasicMaterial( {color: 0x000000, transparent: true, opacity: 0} );
        this.plane = new THREE.Mesh( geometry_plane, material );
        this.plane.position.set(0, 7, 0);
    }

    getGround() {
        return this.ground;
    }

    getPlane() {
        return this.plane;
    }
}