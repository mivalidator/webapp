const MODAL_ID_BASE = "column-setting-modal";

const ColumnSettingModal = {
  props: ['id', 'fields'],
  template: `
    <b-modal :id="id" :title="i18next.t('columnSettingForm.title')" lazy @ok="$emit('ok');" @cancel="$emit('cancel');" @close="$emit('close');">
      <b-container fluid>
        <b-row v-for="field in fields" :key="field.key">
          <b-col>{{ field.label }}</b-col>
          <b-col>
            <b-form-checkbox v-model="field.visible" :name="field.key" switch>{{ field.visible ? i18next.t('enum.fieldStates.show') : i18next.t('enum.fieldStates.hide') }}</b-form-checkbox>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  `
};

export default {
  props: ['fields'],
  components: {
    "mivalidator-column-setting-modal": ColumnSettingModal
  },
  methods: {
    modalId: function() {
      return MODAL_ID_BASE + "-" + this._uid;
    },
    openModal: function() {
      this.$bvModal.show(this.modalId());
    }
  },
  template: `
    <b-form inline @submit.prevent="openModal()">
      <b-button type="submit" :title="i18next.t('columnSettingForm.title')" variant="secondary" @click="openModal()">
        <b-icon icon="table" />
        <span class="sr-only">{{ i18next.t('columnSettingForm.title') }}</span>
      </b-button>

      <mivalidator-column-setting-modal :id="modalId()" :fields="fields" @ok="$emit('column-setting-change');"></mivalidator-column-setting-modal>
    </b-form>
  `
};
