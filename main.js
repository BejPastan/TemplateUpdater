/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => MyPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  mySetting: "default"
};
var MyPlugin = class extends import_obsidian.Plugin {
  async onload() {
    await this.loadSettings();
    const statusBarItemEl = this.addStatusBarItem();
    statusBarItemEl.setText("Status Bar Text");
    this.addCommand({
      id: "open-sample-modal-simple",
      name: "Open sample modal (simple)",
      callback: () => {
        new SampleModal(this.app).open();
      }
    });
    this.addCommand({
      id: "sample-editor-command",
      name: "Sample editor command",
      editorCallback: (editor, view) => {
        console.log(editor.getSelection());
        editor.replaceSelection("Sample Editor Command");
      }
    });
    this.addCommand({
      id: "open-sample-modal-complex",
      name: "Open sample modal (complex)",
      checkCallback: (checking) => {
        const markdownView = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
        if (markdownView) {
          if (!checking) {
            new SampleModal(this.app).open();
          }
          return true;
        }
      }
    });
    this.addSettingTab(new SampleSettingTab(this.app, this));
    this.registerDomEvent(document, "click", (evt) => {
      console.log("click", evt);
    });
    this.registerInterval(window.setInterval(() => console.log("setInterval"), 5 * 60 * 1e3));
    this.registerEvent(this.app.vault.on("modify", (file) => {
      var path = file.path;
      path = path.substring(0, path.lastIndexOf("/"));
      if (path == this.settings.mySetting) {
        this.UpdateFiles(file);
      }
    }));
  }
  onunload() {
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  UpdateFiles(file) {
    var _a;
    var tFile = this.app.vault.getFileByPath(file.path);
    var tagsArray = [];
    if (tFile instanceof import_obsidian.TFile) {
      var tagsObj = (_a = this.app.metadataCache.getCache(file.path)) == null ? void 0 : _a.tags;
      tagsObj == null ? void 0 : tagsObj.forEach((tag) => {
        tagsArray.push(tag.tag);
      });
      new import_obsidian.Notice("tags collected");
      var filesWithTags = this.FindFilesWithTag(tagsArray);
      new import_obsidian.Notice(filesWithTags.length.toString());
      filesWithTags.forEach((element) => {
        if (tFile != null) {
          this.ModifyContent(element, tFile);
        } else {
          new import_obsidian.Notice("file is null");
        }
      });
    }
  }
  async ModifyContent(file, temaplte) {
    var _a, _b;
    var templateFrontmatter = (_a = this.app.metadataCache.getFileCache(temaplte)) == null ? void 0 : _a.frontmatter;
    var fileFrontmatter = (_b = this.app.metadataCache.getFileCache(file)) == null ? void 0 : _b.frontmatter;
    if (templateFrontmatter != void 0) {
      var templateProperties = Object.keys(templateFrontmatter);
      var fileContent = [];
      await Promise.resolve(this.app.vault.read(file)).then((content) => {
        new import_obsidian.Notice(content);
        fileContent = content.split("---");
      });
      var newContent = "";
      if (fileContent.length > 1) {
        new import_obsidian.Notice(fileContent[1]);
        var fileProperties = fileContent[1];
        fileProperties = fileProperties.replace("---", "");
        new import_obsidian.Notice(fileProperties);
        new import_obsidian.Notice("up is file properties");
        for (var i = 0; i < templateProperties.length; i++) {
          if (fileProperties.includes(templateProperties[i] + ":")) {
          } else {
            fileProperties += "\n" + templateProperties[i] + ":";
          }
        }
        fileProperties = "---" + fileProperties + "\n---";
        newContent = fileProperties + fileContent[2];
      } else {
        newContent = templateFrontmatter + fileContent[0];
      }
      this.app.vault.modify(file, newContent);
      new import_obsidian.Notice("file updated");
    }
  }
  FindFilesWithTag(tags) {
    var filesWithTag = [];
    this.app.vault.getMarkdownFiles().forEach((file) => {
      var _a;
      if (file.path.substring(0, file.path.lastIndexOf("/")) == this.settings.mySetting) {
      } else {
        var fileTags = (_a = this.app.metadataCache.getCache(file.path)) == null ? void 0 : _a.tags;
        if (fileTags != void 0) {
          var fileTagsArray = [];
          fileTags == null ? void 0 : fileTags.forEach((tag) => {
            fileTagsArray.push(tag.tag);
          });
          var hasAllTags = true;
          for (var i = 0; i < tags.length; i++) {
            if (fileTagsArray.includes(tags[i])) {
            } else {
              hasAllTags = false;
              break;
            }
          }
          if (hasAllTags) {
            filesWithTag.push(file);
          }
        }
      }
    });
    return filesWithTag;
  }
};
var SampleModal = class extends import_obsidian.Modal {
  constructor(app) {
    super(app);
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.setText("Woah!");
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
};
var SampleSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    new import_obsidian.Setting(containerEl).setName("Temaplte folder").setDesc("select folder where templates are stored").addText((text) => text.setPlaceholder("Template folder").setValue(this.plugin.settings.mySetting).onChange(async (value) => {
      this.plugin.settings.mySetting = value;
      await this.plugin.saveSettings();
    }));
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgQ29uc29sZSB9IGZyb20gJ2NvbnNvbGUnO1xuaW1wb3J0IHsgQXBwLCBEcm9wZG93bkNvbXBvbmVudCwgRWRpdG9yLCBNYXJrZG93blZpZXcsIE1vZGFsLCBOb3RpY2UsIFBsdWdpbiwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZywgVEFic3RyYWN0RmlsZSwgVEZpbGUgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgeyB0ZXh0IH0gZnJvbSAnc3RyZWFtL2NvbnN1bWVycyc7XG5cbi8vIFJlbWVtYmVyIHRvIHJlbmFtZSB0aGVzZSBjbGFzc2VzIGFuZCBpbnRlcmZhY2VzIVxuXG5pbnRlcmZhY2UgTXlQbHVnaW5TZXR0aW5ncyB7XG5cdG15U2V0dGluZzogc3RyaW5nO1xufVxuXG5jb25zdCBERUZBVUxUX1NFVFRJTkdTOiBNeVBsdWdpblNldHRpbmdzID0ge1xuXHRteVNldHRpbmc6ICdkZWZhdWx0J1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNeVBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG5cdHNldHRpbmdzOiBNeVBsdWdpblNldHRpbmdzO1xuXG5cdGFzeW5jIG9ubG9hZCgpIHtcblx0XHRhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xuXG5cdFx0Ly8gVGhpcyBhZGRzIGEgc3RhdHVzIGJhciBpdGVtIHRvIHRoZSBib3R0b20gb2YgdGhlIGFwcC4gRG9lcyBub3Qgd29yayBvbiBtb2JpbGUgYXBwcy5cblx0XHRjb25zdCBzdGF0dXNCYXJJdGVtRWwgPSB0aGlzLmFkZFN0YXR1c0Jhckl0ZW0oKTtcblx0XHRzdGF0dXNCYXJJdGVtRWwuc2V0VGV4dCgnU3RhdHVzIEJhciBUZXh0Jyk7XG5cblx0XHQvLyBUaGlzIGFkZHMgYSBzaW1wbGUgY29tbWFuZCB0aGF0IGNhbiBiZSB0cmlnZ2VyZWQgYW55d2hlcmVcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xuXHRcdFx0aWQ6ICdvcGVuLXNhbXBsZS1tb2RhbC1zaW1wbGUnLFxuXHRcdFx0bmFtZTogJ09wZW4gc2FtcGxlIG1vZGFsIChzaW1wbGUpJyxcblx0XHRcdGNhbGxiYWNrOiAoKSA9PiB7XG5cdFx0XHRcdG5ldyBTYW1wbGVNb2RhbCh0aGlzLmFwcCkub3BlbigpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdC8vIFRoaXMgYWRkcyBhbiBlZGl0b3IgY29tbWFuZCB0aGF0IGNhbiBwZXJmb3JtIHNvbWUgb3BlcmF0aW9uIG9uIHRoZSBjdXJyZW50IGVkaXRvciBpbnN0YW5jZVxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XG5cdFx0XHRpZDogJ3NhbXBsZS1lZGl0b3ItY29tbWFuZCcsXG5cdFx0XHRuYW1lOiAnU2FtcGxlIGVkaXRvciBjb21tYW5kJyxcblx0XHRcdGVkaXRvckNhbGxiYWNrOiAoZWRpdG9yOiBFZGl0b3IsIHZpZXc6IE1hcmtkb3duVmlldykgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhlZGl0b3IuZ2V0U2VsZWN0aW9uKCkpO1xuXHRcdFx0XHRlZGl0b3IucmVwbGFjZVNlbGVjdGlvbignU2FtcGxlIEVkaXRvciBDb21tYW5kJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0Ly8gVGhpcyBhZGRzIGEgY29tcGxleCBjb21tYW5kIHRoYXQgY2FuIGNoZWNrIHdoZXRoZXIgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIGFwcCBhbGxvd3MgZXhlY3V0aW9uIG9mIHRoZSBjb21tYW5kXG5cdFx0dGhpcy5hZGRDb21tYW5kKHtcblx0XHRcdGlkOiAnb3Blbi1zYW1wbGUtbW9kYWwtY29tcGxleCcsXG5cdFx0XHRuYW1lOiAnT3BlbiBzYW1wbGUgbW9kYWwgKGNvbXBsZXgpJyxcblx0XHRcdGNoZWNrQ2FsbGJhY2s6IChjaGVja2luZzogYm9vbGVhbikgPT4ge1xuXHRcdFx0XHQvLyBDb25kaXRpb25zIHRvIGNoZWNrXG5cdFx0XHRcdGNvbnN0IG1hcmtkb3duVmlldyA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XG5cdFx0XHRcdGlmIChtYXJrZG93blZpZXcpIHtcblx0XHRcdFx0XHQvLyBJZiBjaGVja2luZyBpcyB0cnVlLCB3ZSdyZSBzaW1wbHkgXCJjaGVja2luZ1wiIGlmIHRoZSBjb21tYW5kIGNhbiBiZSBydW4uXG5cdFx0XHRcdFx0Ly8gSWYgY2hlY2tpbmcgaXMgZmFsc2UsIHRoZW4gd2Ugd2FudCB0byBhY3R1YWxseSBwZXJmb3JtIHRoZSBvcGVyYXRpb24uXG5cdFx0XHRcdFx0aWYgKCFjaGVja2luZykge1xuXHRcdFx0XHRcdFx0bmV3IFNhbXBsZU1vZGFsKHRoaXMuYXBwKS5vcGVuKCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gVGhpcyBjb21tYW5kIHdpbGwgb25seSBzaG93IHVwIGluIENvbW1hbmQgUGFsZXR0ZSB3aGVuIHRoZSBjaGVjayBmdW5jdGlvbiByZXR1cm5zIHRydWVcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gVGhpcyBhZGRzIGEgc2V0dGluZ3MgdGFiIHNvIHRoZSB1c2VyIGNhbiBjb25maWd1cmUgdmFyaW91cyBhc3BlY3RzIG9mIHRoZSBwbHVnaW5cblx0XHR0aGlzLmFkZFNldHRpbmdUYWIobmV3IFNhbXBsZVNldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpKTtcblxuXHRcdC8vIElmIHRoZSBwbHVnaW4gaG9va3MgdXAgYW55IGdsb2JhbCBET00gZXZlbnRzIChvbiBwYXJ0cyBvZiB0aGUgYXBwIHRoYXQgZG9lc24ndCBiZWxvbmcgdG8gdGhpcyBwbHVnaW4pXG5cdFx0Ly8gVXNpbmcgdGhpcyBmdW5jdGlvbiB3aWxsIGF1dG9tYXRpY2FsbHkgcmVtb3ZlIHRoZSBldmVudCBsaXN0ZW5lciB3aGVuIHRoaXMgcGx1Z2luIGlzIGRpc2FibGVkLlxuXHRcdHRoaXMucmVnaXN0ZXJEb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJywgKGV2dDogTW91c2VFdmVudCkgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coJ2NsaWNrJywgZXZ0KTtcblx0XHR9KTtcblxuXHRcdC8vIFdoZW4gcmVnaXN0ZXJpbmcgaW50ZXJ2YWxzLCB0aGlzIGZ1bmN0aW9uIHdpbGwgYXV0b21hdGljYWxseSBjbGVhciB0aGUgaW50ZXJ2YWwgd2hlbiB0aGUgcGx1Z2luIGlzIGRpc2FibGVkLlxuXHRcdHRoaXMucmVnaXN0ZXJJbnRlcnZhbCh3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4gY29uc29sZS5sb2coJ3NldEludGVydmFsJyksIDUgKiA2MCAqIDEwMDApKTtcblxuXHRcdHRoaXMucmVnaXN0ZXJFdmVudCh0aGlzLmFwcC52YXVsdC5vbihcIm1vZGlmeVwiLCAoZmlsZSkgPT4ge1xuXHRcdFx0dmFyIHBhdGggPSBmaWxlLnBhdGg7XG5cdFx0XHRwYXRoID0gcGF0aC5zdWJzdHJpbmcoMCwgcGF0aC5sYXN0SW5kZXhPZihcIi9cIikpO1xuXHRcdFx0aWYocGF0aCA9PSB0aGlzLnNldHRpbmdzLm15U2V0dGluZylcblx0XHRcdHtcdFxuXHRcdFx0XHQvL25ldyBOb3RpY2UoXCJ0ZW1wbGF0ZSBtb2RpZmllZFwiKTtcblx0XHRcdFx0dGhpcy5VcGRhdGVGaWxlcyhmaWxlKTtcblx0XHRcdH1cblxuXG5cdFx0fSkpO1xuXHR9XG5cblx0b251bmxvYWQoKSB7XG5cblx0fVxuXG5cdGFzeW5jIGxvYWRTZXR0aW5ncygpIHtcblx0XHR0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9TRVRUSU5HUywgYXdhaXQgdGhpcy5sb2FkRGF0YSgpKTtcblx0fVxuXG5cdGFzeW5jIHNhdmVTZXR0aW5ncygpIHtcblx0XHRhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xuXHR9XG5cblx0VXBkYXRlRmlsZXMoZmlsZTogVEFic3RyYWN0RmlsZSlcblx0e1xuXHRcdHZhciB0RmlsZSA9IHRoaXMuYXBwLnZhdWx0LmdldEZpbGVCeVBhdGgoZmlsZS5wYXRoKTtcblx0XHR2YXIgdGFnc0FycmF5IDogc3RyaW5nW10gPSBbXTtcblx0XHRpZih0RmlsZSBpbnN0YW5jZW9mIFRGaWxlKVxuXHRcdHtcblx0XHRcdHZhciB0YWdzT2JqID0gdGhpcy5hcHAubWV0YWRhdGFDYWNoZS5nZXRDYWNoZShmaWxlLnBhdGgpPy50YWdzO1xuXHRcdFx0XHRcdFxuXHRcdFx0dGFnc09iaj8uZm9yRWFjaCh0YWcgPT4ge1xuXHRcdFx0XHR0YWdzQXJyYXkucHVzaCh0YWcudGFnKTtcblx0XHRcdH0pO1xuXHRcdFx0bmV3IE5vdGljZShcInRhZ3MgY29sbGVjdGVkXCIpO1xuXHRcdFx0dmFyIGZpbGVzV2l0aFRhZ3MgPSB0aGlzLkZpbmRGaWxlc1dpdGhUYWcodGFnc0FycmF5KTtcblx0XHRcdG5ldyBOb3RpY2UoZmlsZXNXaXRoVGFncy5sZW5ndGgudG9TdHJpbmcoKSk7XG5cdFx0XHRcdGZpbGVzV2l0aFRhZ3MuZm9yRWFjaChlbGVtZW50ID0+IHtcblx0XHRcdFx0XHRpZih0RmlsZSAhPSBudWxsKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRoaXMuTW9kaWZ5Q29udGVudChlbGVtZW50LCB0RmlsZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuZXcgTm90aWNlKFwiZmlsZSBpcyBudWxsXCIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0YXN5bmMgTW9kaWZ5Q29udGVudChmaWxlOiBURmlsZSwgdGVtYXBsdGU6IFRGaWxlKVxuXHR7XG5cdFx0dmFyIHRlbXBsYXRlRnJvbnRtYXR0ZXIgPSB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZSh0ZW1hcGx0ZSk/LmZyb250bWF0dGVyO1xuXHRcdHZhciBmaWxlRnJvbnRtYXR0ZXIgPSB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZShmaWxlKT8uZnJvbnRtYXR0ZXI7XG5cdFx0aWYodGVtcGxhdGVGcm9udG1hdHRlciAhPSB1bmRlZmluZWQpXG5cdFx0e1xuXHRcdFx0Ly90aGlzIGlzIGFycmF5XG5cdFx0XHR2YXIgdGVtcGxhdGVQcm9wZXJ0aWVzID0gT2JqZWN0LmtleXModGVtcGxhdGVGcm9udG1hdHRlcik7XG5cdFx0XHR2YXIgZmlsZUNvbnRlbnQgOiBzdHJpbmdbXSA9IFtdO1xuXG5cdFx0XHRhd2FpdCBQcm9taXNlLnJlc29sdmUodGhpcy5hcHAudmF1bHQucmVhZChmaWxlKSkudGhlbigoY29udGVudCkgPT4ge1xuXHRcdFx0XHRuZXcgTm90aWNlKGNvbnRlbnQpO1xuXHRcdFx0XHRmaWxlQ29udGVudCA9IGNvbnRlbnQuc3BsaXQoXCItLS1cIik7XG5cdFx0XHR9KTtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gXCJcIjtcblx0XHRcdGlmKGZpbGVDb250ZW50Lmxlbmd0aCA+IDEpXG5cdFx0XHR7XG5cdFx0XHRcdC8vaGVyZSBJIG5lZWQgdG8gYWRkIHByb3BlcnRpZXMgdG8gZmlsZVxuXHRcdFx0XHRuZXcgTm90aWNlKGZpbGVDb250ZW50WzFdKTtcblx0XHRcdFx0dmFyIGZpbGVQcm9wZXJ0aWVzID0gZmlsZUNvbnRlbnRbMV1cblx0XHRcdFx0ZmlsZVByb3BlcnRpZXMgPSBmaWxlUHJvcGVydGllcy5yZXBsYWNlKFwiLS0tXCIsIFwiXCIpO1xuXHRcdFx0XHRuZXcgTm90aWNlKGZpbGVQcm9wZXJ0aWVzKTtcblx0XHRcdFx0bmV3IE5vdGljZShcInVwIGlzIGZpbGUgcHJvcGVydGllc1wiKTtcblx0XHRcdFx0Ly9jaGVja2luZyB3aGljaCBwcm9wZXJ0aWVzIGZyb20gdGVtcGxhdGUgYXJlIG5vdCBpbiBmaWxlXG5cdFx0XHRcdGZvcih2YXIgaSA9IDA7IGk8dGVtcGxhdGVQcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYoZmlsZVByb3BlcnRpZXMuaW5jbHVkZXModGVtcGxhdGVQcm9wZXJ0aWVzW2ldICsgXCI6XCIpKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8vcHJvcGVydHkgaXMgYWxyZWFkeSBpbiBmaWxlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvL3Byb3BlcnR5IGlzIG5vdCBpbiBmaWxlXG5cdFx0XHRcdFx0XHRmaWxlUHJvcGVydGllcyArPSBcIlxcblwiICsgdGVtcGxhdGVQcm9wZXJ0aWVzW2ldICsgXCI6XCI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGZpbGVQcm9wZXJ0aWVzID0gXCItLS1cIiArIGZpbGVQcm9wZXJ0aWVzICsgXCJcXG4tLS1cIjtcblx0XHRcdFx0bmV3Q29udGVudCAgPSBmaWxlUHJvcGVydGllcyAgKyBmaWxlQ29udGVudFsyXTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0Ly9oZXJlIEkganVzdCBuZWVkIHRvIHBhc3RlIHRoZSBjb250ZW50IG9mIHRoZSB0ZW1wbGF0ZSB0byB0aGUgZmlsZVxuXHRcdFx0XHRuZXdDb250ZW50ID0gdGVtcGxhdGVGcm9udG1hdHRlciArIGZpbGVDb250ZW50WzBdO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmFwcC52YXVsdC5tb2RpZnkoZmlsZSwgbmV3Q29udGVudCk7XG5cdFx0XHRuZXcgTm90aWNlKFwiZmlsZSB1cGRhdGVkXCIpO1xuXHRcdH1cblx0fVxuXG5cdEZpbmRGaWxlc1dpdGhUYWcodGFnczogc3RyaW5nW10pXG5cdHtcblx0XHR2YXIgZmlsZXNXaXRoVGFnIDogVEZpbGVbXSA9IFtdO1xuXG5cdFx0dGhpcy5hcHAudmF1bHQuZ2V0TWFya2Rvd25GaWxlcygpLmZvckVhY2goZmlsZSA9PiB7XG5cdFx0XHRpZihmaWxlLnBhdGguc3Vic3RyaW5nKDAsIGZpbGUucGF0aC5sYXN0SW5kZXhPZihcIi9cIikpID09IHRoaXMuc2V0dGluZ3MubXlTZXR0aW5nKVxuXHRcdFx0e1xuXHRcdFx0XHRcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dmFyIGZpbGVUYWdzID0gdGhpcy5hcHAubWV0YWRhdGFDYWNoZS5nZXRDYWNoZShmaWxlLnBhdGgpPy50YWdzO1xuXG5cdFx0XHRcdGlmKGZpbGVUYWdzICE9IHVuZGVmaW5lZClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHZhciBmaWxlVGFnc0FycmF5IDogc3RyaW5nW10gPSBbXTtcblx0XHRcdFx0XHRmaWxlVGFncz8uZm9yRWFjaCh0YWcgPT4ge1xuXHRcdFx0XHRcdFx0ZmlsZVRhZ3NBcnJheS5wdXNoKHRhZy50YWcpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHZhciBoYXNBbGxUYWdzID0gdHJ1ZTtcblx0XHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGFncy5sZW5ndGg7IGkrKylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZihmaWxlVGFnc0FycmF5LmluY2x1ZGVzKHRhZ3NbaV0pKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0aGFzQWxsVGFncyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYoaGFzQWxsVGFncylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRmaWxlc1dpdGhUYWcucHVzaChmaWxlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gZmlsZXNXaXRoVGFnO1xuXHR9XG59XG5cbmNsYXNzIFNhbXBsZU1vZGFsIGV4dGVuZHMgTW9kYWwge1xuXHRjb25zdHJ1Y3RvcihhcHA6IEFwcCkge1xuXHRcdHN1cGVyKGFwcCk7XG5cdH1cblxuXHRvbk9wZW4oKSB7XG5cdFx0Y29uc3Qge2NvbnRlbnRFbH0gPSB0aGlzO1xuXHRcdGNvbnRlbnRFbC5zZXRUZXh0KCdXb2FoIScpO1xuXHR9XG5cblx0b25DbG9zZSgpIHtcblx0XHRjb25zdCB7Y29udGVudEVsfSA9IHRoaXM7XG5cdFx0Y29udGVudEVsLmVtcHR5KCk7XG5cdH1cbn1cblxuY2xhc3MgU2FtcGxlU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuXHRwbHVnaW46IE15UGx1Z2luO1xuXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IE15UGx1Z2luKSB7XG5cdFx0c3VwZXIoYXBwLCBwbHVnaW4pO1xuXHRcdHRoaXMucGx1Z2luID0gcGx1Z2luO1xuXHR9XG5cblx0ZGlzcGxheSgpOiB2b2lkIHtcblx0XHRjb25zdCB7Y29udGFpbmVyRWx9ID0gdGhpcztcblxuXHRcdGNvbnRhaW5lckVsLmVtcHR5KCk7XG5cblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdC5zZXROYW1lKCdUZW1hcGx0ZSBmb2xkZXInKVxuXHRcdFx0LnNldERlc2MoJ3NlbGVjdCBmb2xkZXIgd2hlcmUgdGVtcGxhdGVzIGFyZSBzdG9yZWQnKVxuXHRcdFx0LmFkZFRleHQoKHRleHQpID0+XG5cdFx0XHRcdHRleHRcblx0XHRcdFx0XHQuc2V0UGxhY2Vob2xkZXIoJ1RlbXBsYXRlIGZvbGRlcicpXG5cdFx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLm15U2V0dGluZylcblx0XHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5teVNldHRpbmcgPSB2YWx1ZTtcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHRcdH0pKTtcblx0fVxufSJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQSxzQkFBcUk7QUFTckksSUFBTSxtQkFBcUM7QUFBQSxFQUMxQyxXQUFXO0FB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
