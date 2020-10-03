import { lastTag } from "./util.js";

function htmlChecker_highlightPaths(problem) {
  if (! problem.highlightTargetPaths) {
    return [];
  }
  if (problem.highlightTargetPaths.length === 0) {
    return [];
  }

  return Array.from(problem.highlightTargetPaths, (highlightTargetPath, index) => {
    return {
      id: index,
      cssPath: highlightTargetPath.cssPath,
      lastTag: lastTag(highlightTargetPath.cssPath)
    };
  });
}

function lowVision_highlightPaths(problem) {
  if (! problem.cssPath) {
    return [];
  }

  return [ { id: 0, cssPath: problem.cssPath, lastTag: lastTag(problem.cssPath) } ];
}

export default class TableData {
  static _empty = null;

  tabId = null;
  items = null;
  sourceImage = null;
  outputImage = null;
  counts = null;
  errorClass = null;
  errorMessage = null;
  errorTraces = null;
  isEmpty = true;
  isError = false;

  static empty() {
    if (! TableData._empty) {
      TableData._empty = new TableData();
      TableData._empty.items = [];
    }

    return TableData._empty;
  }

  static isEmptyProblemData(problemData) {
    return !problemData || !problemData.problems || (problemData.problems.length === 0 && !problemData.errorMessage);
  }

  static create(problemData) {
    if (TableData.isEmptyProblemData(problemData)) {
      return TableData.empty();
    }

    const highlightPaths = problemData.name === "mivalidator.htmlChecker.result" ? htmlChecker_highlightPaths : lowVision_highlightPaths
    const tableData = new TableData();
    tableData.isEmpty = false;
    tableData.isError = false;
    tableData.tabId = problemData.tabId;
    if (problemData.sourceImageDataUrl) {
      tableData.sourceImage = problemData.sourceImageDataUrl;
    }
    if (problemData.outputImageDataUrl) {
      tableData.outputImage = problemData.outputImageDataUrl;
    }
    tableData.items = Array.from(problemData.problems, (problem, index) => {
      return {
        id: index,
        severityValue: problem.severity,
        severity: problem.severityStr,
        perceivable: problem.evaluationItem["tableDataMetrics"][0],
        operable: problem.evaluationItem["tableDataMetrics"][1],
        understandable: problem.evaluationItem["tableDataMetrics"][2],
        robust: problem.evaluationItem["tableDataMetrics"][3],
        wcag2: problem.evaluationItem["tableDataGuideline"][0],
        section508: problem.evaluationItem["tableDataGuideline"][1],
        jis: problem.evaluationItem["tableDataGuideline"][2],
        techniques: problem.evaluationItem["tableDataTechniques"],
        highlightPaths: highlightPaths(problem),
        description: problem.description
      };
    });

    if (problemData.name.endsWith(".error")) {
      tableData.isError = true;
      tableData.errorClass = problemData.errorClass;
      tableData.errorMessage = problemData.errorMessage;
      tableData.errorTraces = problemData.errorTraces;
    }

    tableData.computeCounts();

    return tableData;
  }

  get isPresented() {
    return !this.isEmpty;
  }

  computeCounts() {
    this.applyFilter(null);
  }

  applyFilter(filter) {
    if (this.isEmpty) {
      return;
    }

    const filteredItems = filter && filter.text ? this.items.filter(item => item.description.includes(filter.text)) : this.items;

    this.counts = [ 0, 0, 0, 0 ];
    filteredItems.forEach((item) => {
      if (item.severityValue & 1) {
        this.counts[0] += 1;
      }
      if (item.severityValue & 2) {
        this.counts[1] += 1;
      }
      if (item.severityValue & 4) {
        this.counts[2] += 1;
      }
      if (item.severityValue & 8) {
        this.counts[3] += 1;
      }
    });
  }
}
