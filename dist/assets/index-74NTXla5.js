(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();let c=document.querySelector(".game__board"),i=document.querySelector(".game__slider");const d=document.querySelector(".game__board-size"),u=document.querySelector(".game__start-button"),a=()=>{const r=i.value;d.textContent=`${r}x${r}`},f=()=>{c.innerHTML="";const r=i.value;c.style.gridTemplateColumns=`repeat(${r}, 1fr)`;for(let o=0;o<r*r;o++){const n=document.createElement("div");n.classList.add("cell"),c.appendChild(n)}};u.addEventListener("click",f);i.addEventListener("input",a);