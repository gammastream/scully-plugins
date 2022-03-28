import { HandledRoute, log, registerPlugin } from "@scullyio/scully";
import { JSDOM } from "jsdom";

const LazyDisplay = "lazyDisplay";

export const lazyDisplay = async (html: string, route: HandledRoute) => {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  await addScrollScript(doc, route);
  return Promise.resolve(dom.serialize());
};

const addScrollScript = async (doc: Document, route) => {
  let script = doc.createElement("script");
  script.innerHTML = `
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    }
    
    let callback = (entries, observer) => {
      // console.log(entries);
      entries.forEach(entry => {
      if(!entry.isIntersecting) entry.target.style.visibility = 'hidden';
      else entry.target.style.visibility = 'visible';
      });
    };
    
    let observer = new IntersectionObserver(callback, options);
    let target = document.getElementById('scully-content').querySelectorAll(':scope > *');
    
    target.forEach(targ => {
        observer.observe(targ);
    });
  `;
  doc.head.appendChild(script);
};

const validator = async (conf) => [];
registerPlugin("postProcessByHtml", LazyDisplay, lazyDisplay, validator);

export const getLazyDisplay = () => LazyDisplay;
