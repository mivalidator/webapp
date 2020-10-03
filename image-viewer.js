const KNOWN_IMAGE_MODES = [ "both", "source", "output" ];

function normalizeImageMode(mode) {
  if (!mode) {
    return KNOWN_IMAGE_MODES[0];
  }

  if (KNOWN_IMAGE_MODES.includes(mode)) {
    return mode;
  }

  return KNOWN_IMAGE_MODES[0];
}

export default {
  props: ['source', 'output', 'mode'],
  data: function() {
    return {
      imageMode: normalizeImageMode(this.mode)
    };
  },
  template: `
    <div>
      <div class="row">
        <div class="col">
          <b-button-group size="sm">
            <b-button :pressed="imageMode === 'source'" @click="imageMode = 'source'">
              <b-icon icon="square-half" flip-h />
            </b-button>
            <b-button :pressed="imageMode === 'both'" @click="imageMode = 'both'">
              <b-icon icon="layout-split" />
            </b-button>
            <b-button :pressed="imageMode === 'output'" @click="imageMode = 'output'">
              <b-icon icon="square-half" />
            </b-button>
          </b-button-group>
        </div>
      </div>
      <div class="row" v-if="imageMode === 'source'">
        <div class="col">
          <b-img :src="source" class="mivalidator-lowvision-image" alt="source image" />
        </div>
      </div>
      <div class="row" v-if="imageMode === 'output'">
        <div class="col">
          <b-img :src="output" class="mivalidator-lowvision-image" alt="low vision image" />
        </div>
      </div>
      <div class="row" v-if="imageMode === 'both'">
        <div class="col">
          <image-compare :before="output" :after="source"/>
        </div>
      </div>
    </div>
  `
};
