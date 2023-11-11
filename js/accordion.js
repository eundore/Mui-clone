const btns = document.querySelectorAll(".accordionSummary-root");

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const parent = btn.parentElement;
    const expanded = btn.ariaExpanded;

    if (expanded === "true") {
      parent.classList.remove("expanded");
      btn.ariaExpanded = false;
    }

    if (expanded === "false") {
      parent.classList.add("expanded");
      btn.ariaExpanded = true;
    }
  });
});
