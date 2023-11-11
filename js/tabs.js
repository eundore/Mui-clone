const tabBtns = document.querySelectorAll('[role="tab"]');
const tabPanels = document.querySelectorAll('[role="tabpanel"]');
const tabsIndicator = document.querySelector(".tabs-indicator");
tabsIndicator.style.width = `${tabBtns[0].clientWidth}px`;

let left = [0];

tabBtns.forEach((btn, idx) => {
  if (idx > 0) {
    left[idx] = left[idx - 1] + tabBtns[idx - 1].clientWidth;
  }

  btn.addEventListener("click", (e) => {
    const ripple = document.createElement("span");

    ripple.style.left = `${e.offsetX}px`;
    ripple.style.top = `${e.offsetY}px`;
    btn.appendChild(ripple);

    setTimeout(function () {
      btn.removeChild(ripple);
    }, 700);

    const currentTab = document.querySelector(
      '[role="tab"][aria-selected="true"]'
    );
    const currentPanelId = currentTab.getAttribute("aria-controls");
    const currentPanel = document.querySelector(`#${currentPanelId}`);
    currentPanel.hidden = true;
    currentTab.ariaSelected = false;

    const selectedPanelId = btn.getAttribute("aria-controls");
    const selectedPanel = document.querySelector(`#${selectedPanelId}`);
    selectedPanel.hidden = false;
    btn.ariaSelected = true;

    tabsIndicator.style.left = `${left[idx]}px`;
    tabsIndicator.style.width = `${btn.clientWidth}px`;
  });
});
