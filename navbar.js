const MODAL_ID_BASE = "application-setting-modal";

const ApplicationSettingModal = {
  props: ['id', 'setting'],
  template: `
    <b-modal :id="id" :title="i18next.t('navbar.setting')" lazy ok-only size="lg" @ok="$emit('ok')">
      <template v-slot:modal-ok>{{i18next.t('navbar.close')}}</template>

      <b-container fluid>
        <b-row>
          <b-col cols="3">{{i18next.t('navbar.eyesight')}}</b-col>
          <b-col>
            <b-form-checkbox v-model="setting.lowVision.eyesight" name="low-vision-eyesight" switch />
          </b-col>
          <b-col cols="6">
            <b-form-input v-model="setting.lowVision.eyesightDegree" name="low-vision-eyesight-degree" type="range" min="0.0" max="1.0" step="0.1" />
          </b-col>
          <b-col>
            <span>{{setting.lowVision.eyesightDegree}}</span>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">{{i18next.t('navbar.cvd')}}</b-col>
          <b-col>
            <b-form-checkbox v-model="setting.lowVision.cvd" name="low-vision-cvd" switch />
          </b-col>
          <b-col cols="6">
            <b-form-radio-group v-model="setting.lowVision.cvdType" name="low-vision-cvd-type">
              <b-form-radio value="protan">{{i18next.t('enum.cvd.protan')}}</b-form-radio>
              <b-form-radio value="deutan">{{i18next.t('enum.cvd.deutan')}}</b-form-radio>
              <b-form-radio value="tritan">{{i18next.t('enum.cvd.tritan')}}</b-form-radio>
            </b-form-radio-group>
          </b-col>
          <b-col></b-col>
        </b-row>
        <b-row>
          <b-col cols="3">{{i18next.t('navbar.filter')}}</b-col>
          <b-col>
            <b-form-checkbox v-model="setting.lowVision.colorFilter" name="low-vision-color-filter" switch />
          </b-col>
          <b-col cols="6">
            <b-form-input v-model="setting.lowVision.colorFilterDegree" name="low-vision-color-filter-degree" type="range" min="0.6" max="1.0" step="0.05" />
          </b-col>
          <b-col>
            <span>{{setting.lowVision.colorFilterDegree}}</span>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3"></b-col>
          <b-col></b-col>
          <b-col cols="6">
          {{i18next.t('navbar.filterDescription')}}
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-container>
    </b-modal>
  `
};

export default {
  props: ['setting'],
  components: {
    "mivalidator-application-setting-modal": ApplicationSettingModal
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
    <b-navbar toggleable="sm" class="border-bottom shadow-sm mb-3">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">mivalidator</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-text>html5 accessibility and low vision linter</b-nav-text>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-button variant="outline-secondary" @click="openModal();">
            <b-icon icon="gear" />
            {{i18next.t('navbar.setting')}}
          </b-button>
          <b-button variant="outline-danger" class="ml-sm-2 mt-2 mt-sm-0" @click="$emit('quit-application');">
            <b-icon icon="power" />
            {{i18next.t('navbar.quit')}}
          </b-button>
        </b-navbar-nav>
      </b-collapse>

      <mivalidator-application-setting-modal :id="modalId()" :setting="setting" @ok="$emit('application-setting-change');"></mivalidator-application-setting-modal>
    </b-navbar>
  `
};
