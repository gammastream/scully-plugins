import { HandledRoute, log, registerPlugin } from "@scullyio/scully";
import { JSDOM } from "jsdom";

const LazyDisplay = "lzDisplay";

export const lazyDisplay = async (html: string, route: HandledRoute) => {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  await addLazyScript(doc);
  return Promise.resolve(dom.serialize());
};

const addLazyScript = async (doc: Document) => {
  let script = doc.createElement("script");
  script.innerHTML = `
    function loadLazyDisplay() {
      let options = {
        root: null,
        rootMargin: '0px',
        threshold: 0
      }
      
      let callback = (entries, observer) => {
        entries.forEach(entry => {
        if(!entry.isIntersecting) entry.target.style.visibility = 'hidden';
        else entry.target.style.visibility = 'visible';
        });
      };
      
      let observer = new IntersectionObserver(callback, options);
      let target = document.getElementById('scully-content');
      let items = [];
      if(target != null) {
        items = target.querySelectorAll(':scope > *');
      }
      
      items.forEach(targ => {
          observer.observe(targ);
      }); 
    }
  `;
  doc.head.appendChild(script);
};

const validator = async (conf) => [];
registerPlugin("postProcessByHtml", LazyDisplay, lazyDisplay, validator);

export const getLazyDisplay = () => LazyDisplay;
