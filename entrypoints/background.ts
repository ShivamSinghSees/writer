import { LinkedinPattern } from "@/utils/matches";

export default defineBackground(() => {
  browser.tabs.onUpdated.addListener(() => {
    async (tab: any) => {
      if (tab.id && tab.url && LinkedinPattern.test(tab.url)) {
        await browser.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["/entrypoints/content.ts"],
        });
      }
    };
  });
});
