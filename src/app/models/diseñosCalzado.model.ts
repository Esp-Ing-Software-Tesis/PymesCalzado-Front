export interface ShoeDesign {
    reference: string;
    name: string;
    image: string;
    category: ShoeCategorys;
    description: string;
}

export interface ShoeDesignDetail {
    reference: string;
    productionLines: ProductionLines[];
    colors: ShoeColors[];
    sizes: ShoeSizes[];
}

interface ProductionLines {
    id: number;
    name: string;
    costPerPair: number;
}

interface ShoeColors {
    id: number;
    name: string;
}

interface ShoeSizes {
    id: number;
}

interface ShoeCategorys {
    id: number;
    name: string;
}

export interface ShoeDesignCreateDTO {
    name: string;
    image: string;
    category_id: number;
    description: string;
    productionLines: ShoeProductionLinesDTO[];
    colors: number[];
    sizes: number[];
}

interface ShoeProductionLinesDTO {
    id: number;
    costPerPair: number;
}