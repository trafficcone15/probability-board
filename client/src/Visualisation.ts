import * as THREE from 'three';
import { Board } from './Board';
import { Grid } from './Grid';

export class Visualisation {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private board: Board;
  private objectMeshes: THREE.Mesh[];
  private grid: Grid;
  private gridSize: number;

  constructor(objects: ProbabilisticObject[], gridSize: number) {
    this.board = new Board(objects);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.gridSize = gridSize;

    this.grid = new Grid(gridSize);
    this.grid.nodes.forEach(node => this.scene.add(node));

    this.camera.position.set(4, 4, 4); // Adjust for a good view of the grid
    this.camera.lookAt(new THREE.Vector3(1, 1, 1));

    this.objectMeshes = [];
    this.addObjects();
    this.animate();
  }

  private addObjects(): void {
    const cubeSize = 0.9; // Slightly smaller than the grid cell
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  
    this.board.objects.forEach(obj => {
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
  
      // Correctly map linear index to 3D grid coordinates
      const x = obj.position % this.gridSize;
      const y = Math.floor((obj.position / this.gridSize) % this.gridSize);
      const z = Math.floor(obj.position / (this.gridSize * this.gridSize));
  
      // Log positions for debugging
      console.log(`Object at index ${obj.position}: x=${x}, y=${y}, z=${z}`);
  
      cube.position.set(
        x - (this.gridSize - 1) / 2,
        y - (this.gridSize - 1) / 2,
        z - (this.gridSize - 1) / 2
      );
  
      this.scene.add(cube);
      this.objectMeshes.push(cube);
    });
  }    

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.board.updatePositions();
    this.updateSceneObjects();
    this.renderer.render(this.scene, this.camera);
  }

  private updateSceneObjects(): void {
    this.objectMeshes.forEach((mesh, index) => {
      const obj = this.board.objects[index];
  
      // Convert linear index to 3D grid coordinates
      const x = obj.position % this.gridSize;
      const y = Math.floor(obj.position / this.gridSize) % this.gridSize;
      const z = Math.floor(obj.position / (this.gridSize * this.gridSize));
  
      // Update position based on grid coordinates
      mesh.position.set(
        x - (this.gridSize - 1) / 2,
        y - (this.gridSize - 1) / 2,
        z - (this.gridSize - 1) / 2
      );
    });
  }
}