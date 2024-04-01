import * as THREE from 'three';

export class Grid {
    private gridSize: number;
    public nodes: THREE.Mesh[];

    constructor(gridSize: number) {
        this.gridSize = gridSize;
        this.nodes = [];

        this.createGridNodes();
    }

    private createGridNodes(): void {
        const nodeGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        const nodeMaterial = new THREE.MeshBasicMaterial({ color: '#FFFFFF'});
    
        for (let x = 0; x < this.gridSize; x++) {
            for (let y = 0; y < this.gridSize; y++) {
                for (let z = 0; z < this.gridSize; z++) {
                    const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
                    node.position.set(
                        x - (this.gridSize - 1) / 2, 
                        y - (this.gridSize - 1) / 2, 
                        z - (this.gridSize - 1) / 2
                    );
                    this.nodes.push(node);
                }
            }
        }
    }   

}