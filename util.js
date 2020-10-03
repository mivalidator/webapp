export function lastTag(cssPath) {
  const lastComponent = cssPath.split(" > ").pop().trim();
  const indexes = [ "#", ".", ":" ].map(str => lastComponent.indexOf(str, 1));
  const lastIndex = Math.max(...indexes)
  if (lastIndex === -1) {
    return lastComponent;
  }

  return lastComponent.slice(0, lastIndex);
}

export function sliceMap(obj, allowedKeys) {
  const ret = {};

  allowedKeys.forEach((key) => {
    ret[key] = obj[key];
  });

  return ret;
}

export function escapeCsv(text) {
  if (!text) {
    return "";
  }

  if (text.includes("\"")) {
    return "\"" + text.replace(/"/g, "\"\"") + "\"";
  }

  if (text.includes("\r") || text.includes("\n") || text.includes(",")) {
    return "\"" + text + "\"";
  }

  return text;
}

export function download(csvArray, filename) {
  const blob = new Blob([ "\uFEFF" + csvArray.join("\r\n") ], { "type" : "text/csv; charset=UTF-8" });

  const element = document.createElement("a");
  element.href = window.URL.createObjectURL(blob);
  element.download = filename

  element.click();
}

export function convertSeverityIdToName(severityId) {
  if (!severityId) {
    return i18next.t("enum.severities.all");
  }

  return i18next.t(`enum.severities.${severityId}`, i18next.t("enum.severities.all"));
}

export function normalizeText(text) {
  if (! text) {
    return "";
  }

  return text.trim();
}

const KNOWN_SEVERITY_IDS = [ "all", "essential", "warning", "userCheck", "info" ];

export function normalizeSeverity(id) {
  if (!id) {
    return "all";
  }

  id = normalizeText(id);
  if (KNOWN_SEVERITY_IDS.includes(id)) {
    return id;
  }

  return "all";
}

export function newState() {
  return Math.floor(Math.random() * 0xffffffff).toString(16) + Math.floor(Math.random() * 0xffffffff).toString(16);
}

const promises = []

export function addPromise(state, resolutionFunc, rejectionFunc) {
  promises.push([ state, resolutionFunc, rejectionFunc, Date.now() ]);
}

export function resolvePromise(state, ...resolveArgs) {
  const found = promises.findIndex((item) => item[0] === state);
  if (found < 0) {
    return;
  }

  const items = promises.splice(found, 1);
  if (!items || items.length === 0) {
    return;
  }

  const resolutionFunc = items[0][1];
  resolutionFunc(...resolveArgs);
}

export function rejectPromise(state, ...rejectArgs) {
  const found = promises.findIndex((item) => item[0] === state);
  if (found < 0) {
    return;
  }

  const items = promises.splice(found, 1);
  if (!items || items.length === 0) {
    return;
  }

  const rejectionFunc = items[0][2];
  rejectionFunc(...rejectArgs);
}
