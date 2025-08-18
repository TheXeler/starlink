export default class StarshipSheet extends ActorSheetV2 {
    get template() {
        return `templates/sheet-actor-ship-${this.isEditable ? "editor" : "view"}.html`;
    }

    async getData(options = {}) {
        const context = await super.getData(options);

        // 丰富HTML内容
        context.attributes = {
            health: await TextEditor.enrichHTML(this.object.system.attributes.health, {
                async: true,
                secrets: this.object.isOwner,
                relativeTo: this.object
            }),
            shield: await TextEditor.enrichHTML(this.object.system.attributes.shield, {
                async: true,
                secrets: this.object.isOwner,
                relativeTo: this.object
            }),
            speed: await TextEditor.enrichHTML(this.object.system.attributes.speed, {
                async: true,
                secrets: this.object.isOwner,
                relativeTo: this.object
            }),
            capacity: await TextEditor.enrichHTML(this.object.system.attributes.capacity, {
                async: true,
                secrets: this.object.isOwner,
                relativeTo: this.object
            })
        };

        // 处理组件槽位信息
        context.componentSlots = {
            max: this.object.system.componentSlots.max,
            used: this.object.system.componentSlots.used
        };

        return context;
    }
}
