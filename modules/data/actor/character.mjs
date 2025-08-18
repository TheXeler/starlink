/**
 * The DataModel for a Character in the custom system.
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

export default class CharacterDataModel extends foundry.abstract.DataModel {
    /** @inheritdoc */
    static defineSchema() {
        const fields = foundry.data.fields;

        return {
            // 从父类继承的字段
            ...super.defineSchema(),

            // 角色基本属性
            attributes: new fields.SchemaField({
                health: new fields.NumberField({
                    initial: 10,
                    integer: true,
                    min: 0,
                    label: "STARLINK.CHARACTER.Health.Label",
                    hint: "STARLINK.CHARACTER.Health.Hint"
                }),
                strength: new fields.NumberField({
                    initial: 1,
                    integer: true,
                    min: 0,
                    label: "STARLINK.CHARACTER.Strength.Label",
                    hint: "STARLINK.CHARACTER.Strength.Hint"
                }),
                dexterity: new fields.NumberField({
                    initial: 1,
                    integer: true,
                    min: 0,
                    label: "STARLINK.CHARACTER.Dexterity.Label",
                    hint: "STARLINK.CHARACTER.Dexterity.Hint"
                }),
                constitution: new fields.NumberField({
                    initial: 1,
                    integer: true,
                    min: 0,
                    label: "STARLINK.CHARACTER.Constitution.Label",
                    hint: "STARLINK.CHARACTER.Constitution.Hint"
                })
            }),

            // 技能表
            skills: new fields.ArrayField(
                new fields.SchemaField({
                    name: new fields.StringField({
                        initial: "",
                        label: "STARLINK.CHARACTER.Skill.Name.Label",
                        hint: "STARLINK.CHARACTER.Skill.Name.Hint"
                    }),
                    value: new fields.NumberField({
                        initial: 0,
                        integer: true,
                        min: 0,
                        label: "STARLINK.CHARACTER.Skill.Value.Label",
                        hint: "STARLINK.CHARACTER.Skill.Value.Hint"
                    })
                }),
                {
                    label: "STARLINK.CHARACTER.Skills.Label",
                    hint: "STARLINK.CHARACTER.Skills.Hint"
                }
            ),

            // 插槽
            skillSlots: new fields.SchemaField({
                max: new fields.NumberField({
                    initial: 3,
                    integer: true,
                    min: 0,
                    label: "STARLINK.CHARACTER.SkillSlots.Max.Label",
                    hint: "STARLINK.CHARACTER.SkillSlots.Max.Hint"
                }),
                used: new fields.NumberField({
                    initial: 0,
                    integer: true,
                    min: 0,
                    label: "STARLINK.CHARACTER.SkillSlots.Used.Label",
                    hint: "STARLINK.CHARACTER.SkillSlots.Used.Hint"
                })
            })
        };
    }

    prepareDerivedData() {
        // 确保已用技能槽位不超过最大值
        this.skillSlots.used = Math.min(
            this.skillSlots.used,
            this.skillSlots.max
        );

        // 确保技能数量不超过已用槽位
        if (this.skills.length > this.skillSlots.used) {
            this.skills.length = this.skillSlots.used;
        }
    }
}
