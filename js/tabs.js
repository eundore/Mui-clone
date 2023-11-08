const btns = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');
const indicator = document.querySelector(".tabs-indicator");
indicator.style.width = `${btns[0].clientWidth}px`;

btns.forEach((btn, idx) => {
  btn.addEventListener("click", (e) => {
    const ripple = document.createElement("span");

    ripple.style.left = `${e.offsetX}px`;
    ripple.style.top = `${e.offsetY}px`;
    btn.appendChild(ripple);

    setTimeout(function () {
      btn.removeChild(ripple);
    }, 700);

    btns.forEach((btn) => {
      if (btn.ariaSelected === "true") {
        btn.ariaSelected = "false";
      }
    });

    btn.ariaSelected = "true";

    let left = 0;

    btns.forEach((btn, index) => {
      if (idx > index) {
        left += btn.clientWidth;
      }
      return false;
    });

    indicator.style.left = `${left}px`;
    indicator.style.width = `${btn.clientWidth}px`;

    const selected = btn.getAttribute("aria-controls");

    panels.forEach((panel) => {
      if (selected === panel.id) {
        panel.hidden = false;
        return;
      }

      panel.hidden = true;
    });
  });
});
