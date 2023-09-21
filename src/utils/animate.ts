import { useEffect, useState } from 'react';

// function for  animation scroll
const useStickyEffect = (elementId: string, topOffset = 0) => {
    const [elementWidth, setElementWidth] = useState(undefined)
    const [elementTop, setElementTop] = useState(undefined)
  
    useEffect(() => {
      const element = document.getElementById(elementId)
      if(element) {
      const rect = element.getBoundingClientRect();
      setElementWidth(rect.width)
      setElementTop(rect.top)
      }
    }, [elementId])
  
    const isSticky = () => {
      if (window.innerWidth >= 768) {
        const element = document.getElementById(elementId)
        const scrollTop = window.scrollY
        if(element) {
        const elementParentBottom = elementTop + element.parentElement.getBoundingClientRect().height
        if (
          scrollTop >= elementTop - topOffset &&
          scrollTop <= elementParentBottom + elementParentBottom * 0.025 ) {
          element.style.position = 'fixed'
          element.style.top = `${topOffset}px`
        } else {
          element.style.position = 'static'
        }
      }
    }
  }

    useEffect(() => {
      if (!elementTop) return
  
      window.addEventListener('scroll', isSticky)
      return () => {
        window.removeEventListener('scroll', isSticky)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [elementTop])
    return { elementWidth }
  }

export const fadeAnimate = () => {
const targets = document.querySelectorAll<HTMLElement>(".fadeIn-on-scrool");

const callback: IntersectionObserverCallback = function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("motion-safe:animate-fadeIn");
    } else {
      entry.target.classList.remove("motion-safe:animate-fadeIn");
    }
  });
};
const observer = new IntersectionObserver(callback);
targets.forEach(function(target) {
  target.classList.add("opacity-0");
  observer.observe(target);
});
}

export const animateOnScroll = () => {
  const targets = document.querySelectorAll<HTMLElement>('.fadeIn-on-scrool');
  targets.forEach((target) => {
    const rect = target.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      target.classList.add('motion-safe:animate-fadeIn');
    }
  });
};

export default useStickyEffect;
