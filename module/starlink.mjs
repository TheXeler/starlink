import STARLINK from "./config.mjs"

import * as sheets from "./sheet/module.mjs"
import * as dataModels from "./data/module.mjs"
//import * as documents from "./document/module.mjs"
import {registerModuleData} from "./utils.mjs";

globalThis.starlink = {
    config: STARLINK,
    dataModels: dataModels,
    //documents: documents
}

Hooks.once("init", function () {
    globalThis.starlink = game.starlink = Object.assign(game.system, globalThis.starlink);

    CONFIG.STARLINK = STARLINK;
    Object.assign(CONFIG.Actor.dataModels, dataModels.actor);
    Object.assign(CONFIG.Item.dataModels, dataModels.item);

    registerModuleData();

    //CONFIG.Actor.dataModels = dataModels.actor;
    //CONFIG.Item.dataModels = dataModels.item;

    const DocumentSheetConfig = foundry.applications.apps.DocumentSheetConfig;
    DocumentSheetConfig.unregisterSheet(Actor, "core", foundry.appv1.sheets.ActorSheet);
    DocumentSheetConfig.registerSheet(Actor, "starlink", sheets.Ship, {
        types: ["starlink.ship"],
        makeDefault: true,
        label: "STARLINK.Sheet.Ship"
    });
    DocumentSheetConfig.registerSheet(Actor, "starlink", sheets.Character, {
        types: ["starlink.character"],
        makeDefault: true,
        label: "STARLINK.Sheet.Character"
    });


})