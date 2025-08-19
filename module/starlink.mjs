import {default as STARLINK} from "./config.mjs"

import * as sheets from "./sheet/module.mjs"
import * as dataModels from "./data/module.mjs"
//import * as documents from "./document/module.mjs"
import {log} from "./utils.mjs";

globalThis.starlink = {
    config: STARLINK,
    dataModels: dataModels,
    //documents: documents
}

Hooks.once("init", function () {
    globalThis.starlink = game.starlink = Object.assign(game.system, globalThis.starlink);

    CONFIG.STARLINK = STARLINK;

    log("Data assign...")
    Object.assign(CONFIG.Actor.dataModels, dataModels.actor);
    Object.assign(CONFIG.Item.dataModels, dataModels.item);

    //CONFIG.Actor.dataModels = dataModels.actor;
    //CONFIG.Item.dataModels = dataModels.item;

    log("Registering sheets...")
    const DocumentSheetConfig = foundry.applications.apps.DocumentSheetConfig;
    DocumentSheetConfig.unregisterSheet(Actor, "core", foundry.appv1.sheets.ActorSheet);
    DocumentSheetConfig.registerSheet(Actor, "starlink", sheets.Ship, {
        types: ["starlink.Ship"],
        makeDefault: true,
        label: "STARLINK.Sheet.Ship"
    });
    DocumentSheetConfig.registerSheet(Actor, "starlink", sheets.Character, {
        types: ["starlink.Character"],
        makeDefault: true,
        label: "STARLINK.Sheet.Character"
    });


})