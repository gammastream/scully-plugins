import {
  HandledRoute,
  log,
  registerPlugin,
  getPluginConfig,
} from "@scullyio/scully";
import { JSDOM } from "jsdom";
import { gemojis } from "./emoji";

/**
 * The default configuration "name": "emoji"
 */
const defaultEmojiConfig = gemojis;
const defaultRegex = /\s\:(\S+)\:\s/g;

const EmojiPlugin = "emoji";
let nameToEmoji = defaultEmojiConfig;
let regx = defaultRegex;

export interface EmojiPluginConfig {
  emojiList?: Record<string, string>;
  regex?: RegExp;
}

export const emojiPlugin = async (html: string, route: HandledRoute) => {
  let config = getPluginConfig<EmojiPluginConfig>(EmojiPlugin);
  if (!!config) {
    nameToEmoji = config.emojiList ? config.emojiList : defaultEmojiConfig;
    regx = config.regex ? config.regex : defaultRegex;
  }
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  await replaceEmoji(doc, route);
  return Promise.resolve(dom.serialize());
};

const replaceEmoji = async (doc: Document, route) => {
  try {
    const imgEl = doc.getElementsByTagName("p");
    for (var i = 0; i < imgEl.length; i++) {
      let content = imgEl[i].innerHTML;
      content = content.replace(regx, (match, group) => {
        if (nameToEmoji[group] == undefined) return match;
        return ` ${nameToEmoji[group]} `;
      });
      imgEl[i].innerHTML = content;
    }
  } catch (e) {
    log("Error Happened:" + e);
  }
};

const validator = async (conf) => [];
registerPlugin("postProcessByHtml", EmojiPlugin, emojiPlugin, validator);

export const getEmojiPlugin = () => EmojiPlugin;
