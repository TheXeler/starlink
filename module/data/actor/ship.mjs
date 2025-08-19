/**
 * The DataModel for a Starship in the custom system.
 * @extends {foundry.abstract.TypeDataModel}
 */

const {
    ArrayField,
    BooleanField,
    HTMLField,
    NumberField,
    SchemaField,
    StringField
} = foundry.data.fields;

export default class StarshipDataModel extends foundry.abstract.TypeDataModel {
    /** @inheritdoc */
    static defineSchema() {
        const fields = foundry.data.fields;

        return Object.assign(super.defineSchema(),{
            // 飞船特有属性
            attributes: new fields.SchemaField({
                health: new fields.NumberField({
                    initial: 10,
                    integer: true,
                    min: 0,
                    label: "STARLINK.Ship.HealthPoints.Label",
                    hint: "STARLINK.Ship.HealthPoints.Hint"
                }),
                shield: new fields.NumberField({
                    initial: 5,
                    integer: true,
                    min: 0,
                    label: "STARLINK.Ship.ShieldPoints.Label",
                    hint: "STARLINK.Ship.ShieldPoints.Hint"
                }),
                speed: new fields.NumberField({
                    initial: 1,
                    integer: true,
                    min: 0,
                    label: "STARLINK.Ship.Speed.Label",
                    hint: "STARLINK.Ship.Speed.Hint"
                }),
                capacity: new fields.NumberField({
                    initial: 20,
                    integer: true,
                    min: 0,
                    label: "STARLINK.Ship.CargoCapacity.Label",
                    hint: "STARLINK.Ship.CargoCapacity.Hint"
                })
            }),

            // 组件槽位
            componentSlots: new fields.SchemaField({
                max: new fields.NumberField({
                    initial: 3,
                    integer: true,
                    min: 0,
                    label: "STARLINK.Ship.ComponentSlots.Max.Label",
                    hint: "STARLINK.Ship.ComponentSlots.Max.Hint"
                }),
                used: new fields.NumberField({
                    initial: 0,
                    integer: true,
                    min: 0,
                    label: "STARLINK.Ship.UsedComponents.Label",
                    hint: "STARLINK.Ship.UsedComponents.Hint"
                })
            })
        });
    }

    prepareDerivedData() {
        // 确保已用槽位不超过最大值
        this.componentSlots.used = Math.min(
            this.componentSlots.used,
            this.componentSlots.max
        );
    }
}