/**
 * vaibring — wire prev / random / next on your own markup
 *
 * Put three links (or buttons wrapped in <a>) in your HTML, then load this
 * script after them. It fetches the ring and sets each element's href.
 *
 *   <a data-vaibring="prev" href="#">←</a>
 *   <a data-vaibring="random" href="#">?</a>
 *   <a data-vaibring="next" href="#">→</a>
 *   <script
 *     src="https://v8v88v8v88.github.io/vaibring/webring/minimal.js"
 *     data-ring="https://v8v88v8v88.github.io/vaibring/webring/sites.json"
 *     async
 *   ></script>
 *
 * Optional: data-prev, data-next, data-random (CSS selectors).
 */

;(function () {
  'use strict'

  const SCRIPT = document.currentScript
  if (!SCRIPT) return

  const RING_URL =
    SCRIPT.getAttribute('data-ring') ||
    'https://v8v88v8v88.github.io/vaibring/webring/sites.json'

  const SEL_PREV = SCRIPT.getAttribute('data-prev') || '[data-vaibring="prev"]'
  const SEL_NEXT = SCRIPT.getAttribute('data-next') || '[data-vaibring="next"]'
  const SEL_RANDOM =
    SCRIPT.getAttribute('data-random') || '[data-vaibring="random"]'

  function normalise(url) {
    try {
      const u = new URL(url)
      return (u.host.replace(/^www\./, '') + u.pathname)
        .toLowerCase()
        .replace(/\/+$/, '')
    } catch {
      return url.toLowerCase().replace(/\/+$/, '')
    }
  }

  function findCurrent(sites) {
    const here = normalise(window.location.href)
    let idx = sites.findIndex((s) => normalise(s.url) === here)
    if (idx === -1) {
      const hereHost = new URL(window.location.href).host
        .replace(/^www\./, '')
        .toLowerCase()
      idx = sites.findIndex((s) => {
        try {
          return new URL(s.url).host.replace(/^www\./, '').toLowerCase() === hereHost
        } catch {
          return false
        }
      })
    }
    return idx
  }

  function randomIndex(len, exclude) {
    if (len <= 1) return 0
    let r
    do {
      r = Math.floor(Math.random() * len)
    } while (r === exclude)
    return r
  }

  function setLink(el, href, title) {
    if (!el) return
    el.setAttribute('href', href)
    el.setAttribute('rel', 'noopener')
    if (title) el.setAttribute('title', title)
  }

  function apply(sites) {
    const prevEl = document.querySelector(SEL_PREV)
    const nextEl = document.querySelector(SEL_NEXT)
    const randEl = document.querySelector(SEL_RANDOM)

    if (!prevEl && !nextEl && !randEl) {
      console.warn(
        '[vaibring] minimal.js: no elements matched. Use data-vaibring="prev|next|random" or data-prev / data-next / data-random.'
      )
      return
    }

    if (!sites || sites.length === 0) return

    const idx = findCurrent(sites)
    const len = sites.length

    let prevIdx
    let nextIdx
    let randIdx

    if (idx === -1) {
      prevIdx = 0
      nextIdx = len > 1 ? 1 : 0
      randIdx = randomIndex(len, -1)
    } else {
      prevIdx = (idx - 1 + len) % len
      nextIdx = (idx + 1) % len
      randIdx = randomIndex(len, idx)
    }

    setLink(prevEl, sites[prevIdx].url, sites[prevIdx].name)
    setLink(nextEl, sites[nextIdx].url, sites[nextIdx].name)
    setLink(randEl, sites[randIdx].url, 'Visit a random site')
  }

  function run() {
    fetch(RING_URL, { cache: 'no-cache' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status)
        return res.json()
      })
      .then(function (data) {
        if (!Array.isArray(data)) throw new Error('Invalid ring data')
        const valid = data.filter(
          (s) => s && typeof s.url === 'string' && s.url.trim() !== ''
        )
        apply(valid)
      })
      .catch(function (err) {
        console.warn('[vaibring] minimal.js failed to load ring:', err)
      })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run)
  } else {
    run()
  }
})()
