import { defineStore } from 'pinia';

export const useClipboardStore = defineStore('clipboard', {
  state: () => ({
    clipboard: [] as Array<{ path: string; name: string; type: string }>,
  }),
  actions: {
    push(clipboard: Array<{ path: string; name: string; type: string }>) {
      this.clipboard = this.clipboard.concat(clipboard);
    },
    clear() {
      this.clipboard = [];
    },
  },
  persist: true,
});
