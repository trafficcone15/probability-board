export class Board {
    objects: ProbabilisticObject[];

    constructor(objects: ProbabilisticObject[]) {
        this.objects = objects;
    }

    // Method to update positions based on Q and Z probabilities
    updatePositions(): void {
        this.objects.forEach(obj => {
            // Update Q position
            obj.position = this.choosePositionBasedOnProbability(obj.qProbability);

            // Update Z layer within the position
            const zProbabilityArray = obj.zLayers.map(layer => layer.probability);
            const chosenLayerIndex = this.choosePositionBasedOnProbability(zProbabilityArray);
            obj.zLayers.forEach((layer, index) => {
                layer.depth = (index === chosenLayerIndex) ? 1 : 0; // Only the chosen layer has depth 1
            });
        });
    }

    private choosePositionBasedOnProbability(probabilities: number[] | number): number {
        if (typeof probabilities === 'number') {
            // If it's a single number, assume it's a uniform distribution over 10 positions
            return Math.floor(Math.random() * 10);
        }
    
        // Convert the probabilities to a cumulative distribution
        const cumulative = probabilities.reduce((acc: number[], curr: number) => {
            if (acc.length === 0) return [curr];
            return [...acc, curr + acc[acc.length - 1]];
        }, [] as number[]);
    
        // Generate a random number and find where it falls in the cumulative distribution
        const rand = Math.random();
        const chosenIndex = cumulative.findIndex(cumulProb => rand < cumulProb);
        return chosenIndex >= 0 ? chosenIndex : probabilities.length - 1;
    }    
}