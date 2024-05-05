export interface Ventas {
    guid: string;
    modeloId: string;
    imei: string;
    numero: string;
    fecha: Date;
    vendedor: string;
    isActive: boolean;
}

export interface MarcaModelo {
    displayName: string;
    marcaId: string;
    modeloId: string;
}