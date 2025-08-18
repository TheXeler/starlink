/**
 * The DataModel for a Starship in the custom system.
 * @extends {foundry.abstract.DataModel}
 */
export default class StarshipDataModel extends foundry.abstract.DataModel {
    /** @inheritdoc */
    static defineSchema() {
        const fields = foundry.data.fields;

        return {
            // 从父类继承的字段
            ...super.defineSchema(),

            // 飞船特有属性
            attributes: new fields.SchemaField({
                hull: new fields.NumberField({
                    initial: 10,
                    integer: true,
                    min: 1
                }),
                power: new fields.NumberField({
                    initial: 5,
                    integer: true,
                    min: 0
                }),
                speed: new fields.NumberField({
                    initial: 1,
                    integer: true,
                    min: 0
                }),
                capacity: new fields.NumberField({
                    initial: 20,
                    integer: true,
                    min: 0
                })
            }),

            // 组件槽位
            componentSlots: new fields.SchemaField({
                max: new fields.NumberField({
                    initial: 3,
                    integer: true,
                    min: 0
                }),
                used: new fields.NumberField({
                    initial: 0,
                    integer: true,
                    min: 0
                })
            })
        };
    }

    prepareDerivedData() {
        // 确保已用槽位不超过最大值
        this.componentSlots.used = Math.min(
            this.componentSlots.used,
            this.componentSlots.max
        );
    }
}