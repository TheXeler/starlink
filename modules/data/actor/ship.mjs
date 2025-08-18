/**
 * The DataModel for a Starship in the custom system.
 * @extends {foundry.abstract.DataModel}
 */

const {
    ArrayField,
    BooleanField,
    HTMLField,
    NumberField,
    SchemaField,
    StringField
} = foundry.data.fields;

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
                    min: 0,
                    label: "STARLINK.SHIP.HullPoints.Label",
                    hint: "STARLINK.SHIP.HullPoints.Hint"
                }),
                shield: new fields.NumberField({
                    initial: 5,
                    integer: true,
                    min: 0,
                    label: "STARLINK.SHIP.ShieldPoints.Label",
                    hint: "STARLINK.SHIP.ShieldPoints.Hint"
                }),
                speed: new fields.NumberField({
                    initial: 1,
                    integer: true,
                    min: 0,
                    label: "STARLINK.SHIP.Speed.Label",
                    hint: "STARLINK.SHIP.Speed.Hint"
                }),
                capacity: new fields.NumberField({
                    initial: 20,
                    integer: true,
                    min: 0,
                    label: "STARLINK.SHIP.CargoCapacity.Label",
                    hint: "STARLINK.SHIP.CargoCapacity.Hint"
                })
            }),

            // 组件槽位
            componentSlots: new fields.SchemaField({
                max: new fields.NumberField({
                    initial: 3,
                    integer: true,
                    min: 0,
                    label: "STARLINK.SHIP.ComponentSlots.Max.Label",
                    hint: "STARLINK.SHIP.ComponentSlots.Max.Hint"
                }),
                used: new fields.NumberField({
                    initial: 0,
                    integer: true,
                    min: 0,
                    label: "STARLINK.SHIP.UsedComponents.Label",
                    hint: "STARLINK.SHIP.UsedComponents.Hint"
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