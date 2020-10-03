export default {
  template: `
    <b-form inline @submit.prevent="$emit('download')">
      <b-button type="submit" :title="i18next.t('downloadForm.title')" variant="secondary">
        <b-icon icon="download" />
        <span class="sr-only">{{ i18next.t('downloadForm.title') }}</span>
      </b-button>
    </b-form>
  `
}
