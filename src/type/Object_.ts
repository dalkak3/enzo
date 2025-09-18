import { Script } from "./Script.ts"

export interface Picture {
    id: string;
    name: string;
    dimension: {
        width: number;
        height: number;
        scaleX: number;
        scaleY: number;
    };
    scale: {
        type: number;
        default: number;
    };
    imageType?: string

    fileurl?: string;
    filename?: string;
}

export interface Sound {
    id: string;
    name: string;
    duration: number;

    fileurl?: string;
    filename?: string;
    ext?: string;
}

export interface Object_ {
    id: string;
    name: string;
    text: string;
    order: number;
    objectType: string;
    scene: string;
    active: boolean;
    lock: boolean;
    rotateMethod: string;
    entity: {
        rotation: number;
        direction: number;
        x: number;
        y: number;
        regX: number;
        regY: number;
        scaleX: number;
        scaleY: number;
        width: number;
        height: number;
        imageIndex: number;
        visible: boolean;
        colour: string;
        font: string;
        bgColor: string;
        textAlign: number;
        lineBreak: boolean;
        underLine: boolean;
        strike: boolean;
    };
    script: Script;
    sprite: {
        name: string;
        pictures: Picture[];
        sounds: Sound[];
    };
    selectedPictureId: string;
    selectedSoundId: string;
}