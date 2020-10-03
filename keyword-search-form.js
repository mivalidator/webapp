export default {
  props: ['value'],
  data: function() {
    return {
      text: this.value
    };
  },
  template: `
    <b-form inline @submit.prevent="$emit('search', text)">
      <label class="sr-only" :for="'keyword-' + _uid">{{ i18next.t('keywordSearchForm.keywordInput') }}</label>
      <b-input-group>
        <b-input :id="'keyword-' + _uid" type="text" :placeholder="i18next.t('keywordSearchForm.keywordInput')" v-model="text" />
        <b-input-group-append>
          <b-button type="submit" :title="i18next.t('keywordSearchForm.title')" variant="secondary">
            <b-icon icon="search" />
            <span class="sr-only">{{ i18next.t('keywordSearchForm.title') }}</span>
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form>
  `
}
