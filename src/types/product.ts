export interface ProductOption {
    code: number;
    name: string;
}

export interface Product {
    id: string;
    brand: string;
    model: string;
    price: string;
    imgUrl: string;
    cpu?: string;
    ram?: string;
    os?: string;
    displayResolution?: string;
    displaySize?: string;
    battery?: string;
    primaryCamera?: string[] | string;
    secondaryCmera?: string[] | string;
    dimentions?: string;
    weight?: string;
    networkTechnology?: string;
    colors?: string[];
    options?: {
        colors: ProductOption[];
        storages: ProductOption[];
    };
}

export interface ProductListItem {
    id: string;
    brand: string;
    model: string;
    price: string;
    imgUrl: string;
}

