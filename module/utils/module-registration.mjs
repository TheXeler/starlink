export function log(message, { color="#6e0000", extras=[], level="log" }={}) {
    console[level](
        `%cStarLink | %c${message}`, `color: ${color}; font-variant: small-caps`, "color: revert", ...extras
    );
}

export function registerModuleData() {
    for ( const manifest of [game.system, ...game.modules.filter(m => m.active), game.world] ) {
        try {
            const complete = registerMethods.map(m => m(manifest)).filter(r => r);
        } catch(err) {
            log(`Error registering ${manifest.title}\n`, { extras: [err.message], level: "error" });
        }
    }
}