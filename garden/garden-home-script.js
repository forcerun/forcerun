window.addEventListener("load", function () {
  const vineMarkup =
    '<svg viewBox="0 0 100 780" preserveAspectRatio="xMaxYMax meet" style="width: 100%; height: 100%; overflow: visible;">' +
      // Extended stem from bottom (y=780) all the way near the top (y=25)
      '<path class="garden-vine-stem" pathLength="100" d="M 65 780 C 40 675, 85 590, 55 485 C 30 390, 80 300, 52 205 C 32 125, 75 65, 50 25" fill="none" stroke="#2E4A36" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"></path>' +
      
      // Bottom-to-Top Leaves & Warm Terracotta Berries (11 nodes total)
      '<g class="vine-node" data-x="54" data-y="710" data-side="-1" data-max="1.0"  data-at="0.09" transform="translate(54, 710) scale(0)"><path d="M 0 0 C 14 -14, 34 -10, 40 0 C 34 10, 14 14, 0 0 Z" fill="#7A947E" stroke="#2E4A36" stroke-width="1.5"></path></g>' +
      '<g class="vine-node" data-x="68" data-y="645" data-side="1"  data-max="0.9"  data-at="0.18" transform="translate(68, 645) scale(0)"><path d="M 0 0 C 14 -14, 34 -10, 40 0 C 34 10, 14 14, 0 0 Z" fill="#7A947E" stroke="#2E4A36" stroke-width="1.5"></path></g>' +
      '<g class="vine-node" data-x="64" data-y="575" data-side="-1" data-max="1.05" data-at="0.27" transform="translate(64, 575) scale(0)"><path d="M 0 0 C 14 -14, 34 -10, 40 0 C 34 10, 14 14, 0 0 Z" fill="#7A947E" stroke="#2E4A36" stroke-width="1.5"></path></g>' +
      '<g class="vine-node" data-x="55" data-y="505" data-side="1"  data-max="0.85" data-at="0.36" transform="translate(55, 505) scale(0)"><circle cx="12" cy="-4" r="6" fill="#C46D4E" stroke="#2E4A36" stroke-width="1.5"></circle></g>' +
      '<g class="vine-node" data-x="47" data-y="435" data-side="-1" data-max="1.05" data-at="0.45" transform="translate(47, 435) scale(0)"><path d="M 0 0 C 14 -14, 34 -10, 40 0 C 34 10, 14 14, 0 0 Z" fill="#7A947E" stroke="#2E4A36" stroke-width="1.5"></path></g>' +
      '<g class="vine-node" data-x="60" data-y="365" data-side="1"  data-max="0.95" data-at="0.54" transform="translate(60, 365) scale(0)"><path d="M 0 0 C 14 -14, 34 -10, 40 0 C 34 10, 14 14, 0 0 Z" fill="#7A947E" stroke="#2E4A36" stroke-width="1.5"></path></g>' +
      '<g class="vine-node" data-x="63" data-y="295" data-side="-1" data-max="0.85" data-at="0.63" transform="translate(63, 295) scale(0)"><circle cx="12" cy="-4" r="6" fill="#C46D4E" stroke="#2E4A36" stroke-width="1.5"></circle></g>' +
      '<g class="vine-node" data-x="53" data-y="225" data-side="1"  data-max="0.95" data-at="0.72" transform="translate(53, 225) scale(0)"><path d="M 0 0 C 14 -14, 34 -10, 40 0 C 34 10, 14 14, 0 0 Z" fill="#7A947E" stroke="#2E4A36" stroke-width="1.5"></path></g>' +
      '<g class="vine-node" data-x="46" data-y="155" data-side="-1" data-max="0.9"  data-at="0.80" transform="translate(46, 155) scale(0)"><path d="M 0 0 C 14 -14, 34 -10, 40 0 C 34 10, 14 14, 0 0 Z" fill="#7A947E" stroke="#2E4A36" stroke-width="1.5"></path></g>' +
      '<g class="vine-node" data-x="59" data-y="95"  data-side="1"  data-max="0.8"  data-at="0.88" transform="translate(59, 95) scale(0)"><circle cx="12" cy="-4" r="5.5" fill="#C46D4E" stroke="#2E4A36" stroke-width="1.5"></circle></g>' +
      '<g class="vine-node" data-x="55" data-y="48"  data-side="-1" data-max="0.75" data-at="0.95" transform="translate(55, 48) scale(0)"><path d="M 0 0 C 14 -14, 34 -10, 40 0 C 34 10, 14 14, 0 0 Z" fill="#7A947E" stroke="#2E4A36" stroke-width="1.5"></path></g>' +
    '</svg>';

  // 1. Right-side tall vine container
  const rightContainer = document.createElement("div");
  rightContainer.id = "garden-vine-right";
  rightContainer.className = "garden-vine-container";
  rightContainer.style.cssText =
    "position: fixed; bottom: 0; right: 16px; width: 95px; height: 98vh; pointer-events: none; z-index: 9999; overflow: visible;";
  rightContainer.innerHTML = vineMarkup;

  // 2. Left-side tall vine container (mirrored)
  const leftContainer = document.createElement("div");
  leftContainer.id = "garden-vine-left";
  leftContainer.className = "garden-vine-container";
  leftContainer.style.cssText =
    "position: fixed; bottom: 0; left: 16px; width: 95px; height: 98vh; pointer-events: none; z-index: 9999; overflow: visible; transform: scaleX(-1);";
  leftContainer.innerHTML = vineMarkup;

  document.body.appendChild(rightContainer);
  document.body.appendChild(leftContainer);

  // 3. Gather both stems and all foliage nodes
  const stems = Array.prototype.slice.call(document.querySelectorAll(".garden-vine-stem"));
  const nodeEls = Array.prototype.slice.call(document.querySelectorAll(".vine-node"));

  const foliage = nodeEls.map(function (el) {
    return {
      el: el,
      x: parseFloat(el.getAttribute("data-x")),
      y: parseFloat(el.getAttribute("data-y")),
      side: parseFloat(el.getAttribute("data-side")),
      max: parseFloat(el.getAttribute("data-max")),
      at: parseFloat(el.getAttribute("data-at")),
      current: 0
    };
  });

  // 4. Smooth 3.6-second growth animation for the taller height
  let startTime = null;
  const duration = 3600;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const rawProgress = Math.min(1, elapsed / duration);
    const growth = 1 - Math.pow(1 - rawProgress, 3);
    const offset = (100 * (1 - growth)).toFixed(2);

    stems.forEach(function (stem) {
      stem.setAttribute("stroke-dashoffset", offset);
    });

    foliage.forEach(function (item) {
      if (growth >= item.at && item.current < item.max) {
        item.current = Math.min(item.max, item.current + 0.06);
        const scaleX = (item.side * item.current).toFixed(3);
        const scaleY = item.current.toFixed(3);
        item.el.setAttribute(
          "transform",
          "translate(" + item.x + ", " + item.y + ") scale(" + scaleX + ", " + scaleY + ")"
        );
      }
    });

    if (rawProgress < 1 || foliage.some(function (f) { return f.current < f.max; })) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
});
