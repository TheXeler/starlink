import {STARLINK, CONST} from "./config.mjs"

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
    const {Actors, Items} = foundry.documents.collections;
    Actors.registerSheet(CONST.SYSTEM_ID, sheets.Ship, {
        types: ["Ship"],
        makeDefault: true,
        label: "STARLINK.Sheet.Ship"
    });
    Actors.registerSheet(CONST.SYSTEM_ID, sheets.Character, {
        types: ["Character"],
        makeDefault: true,
        label: "STARLINK.Sheet.Character"
    });

    const {DocumentSheetConfig} = foundry.applications.apps;

})