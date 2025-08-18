import STARLINK from "./config.mjs"

import * as sheets from "./sheet/module.mjs"
import * as dataModels from "./data/module.mjs"
import {registerModuleData} from "./utils/module-registration.mjs";

globalThis.starlink = {
    config: STARLINK,
    dataModels: dataModels
}

Hooks.once("init", function () {
    globalThis.starlink = game.starlink = Object.assign(game.system, globalThis.starlink);

    CONFIG.STARLINK = STARLINK;

    registerModuleData();

    CONFIG.Actor.dataModels = dataModels.actor;

    const DocumentSheetConfig = foundry.applications.apps.DocumentSheetConfig;
    DocumentSheetConfig.registerSheet(Actor, "starlink", sheets.Ship, {
        types: ["ship"],
        makeDefault: true,
        label: "STARLINK.Sheet.Ship"
    });
    DocumentSheetConfig.registerSheet(Actor, "starlink", sheets.Character, {
        types: ["character"],
        makeDefault: true,
        label: "STARLINK.Sheet.Character"
    });
})