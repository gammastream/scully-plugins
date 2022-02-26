import { HandledRoute, log, registerPlugin } from "@scullyio/scully";
import { JSDOM } from "jsdom";

const Scroll2Section = "s2section";

export const scroll2Section = async (html: string, route: HandledRoute) => {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  await addScrollScript(doc, route);
  await scrollSeting(doc, route);
  return Promise.resolve(dom.serialize());
};

const addScrollScript = async (doc: Document, route) => {
  let script = doc.createElement("script");
  script.innerHTML = `
    function scrollSection(sectionId) {
      let elm = document.getElementById(sectionId);
      elm.scrollIntoView({ behavior: 'smooth', block: 'start'});
    }
  `;
  doc.head.appendChild(script);
};

const scrollSeting = async (doc: Document, route) => {
  try {
    const atagEl = doc.getElementsByTagName("a");
    for (var i = 0; i < atagEl.length; i++) {
      let content = atagEl[i].href;
      if (content.startsWith("about:blank#")) {
        let id = content.slice(12);
        log("Scroll correct process:" + id);
        atagEl[i].href = `javascript:scrollSection('${id}')`;
      }
    }
  } catch (e) {
    log("Error Happened:" + e);
  }
};

const validator = async (conf) => [];
registerPlugin("postProcessByHtml", Scroll2Section, scroll2Section, validator);

export const getScrollToSection = () => Scroll2Section;
