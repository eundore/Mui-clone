const ITEM_HEIGHT = 46;
const NUM_ITEMS = 200;

const virtualizedList = document.querySelector("#virtualizedList");
const virtualizedListWrapper = document.querySelector(
  ".virtualizedList-wrapper"
);

const action = () => {
  const scrollTop = virtualizedList.scrollTop;
  const windowHeight = virtualizedList.clientHeight;

  const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
  const endIndex = Math.min(
    NUM_ITEMS - 1,
    Math.floor((scrollTop + windowHeight) / ITEM_HEIGHT)
  );

  virtualizedListWrapper.replaceChildren();

  for (let i = startIndex; i <= endIndex; i++) {
    const virtualizedListItem = document.createElement("div");
    virtualizedListItem.classList += "virtualizedList-item";
    virtualizedListItem.style.top = `${ITEM_HEIGHT * i}px`;

    const virtualizedListBtn = document.createElement("div");
    virtualizedListBtn.className += "virtualizedList-item-btn";
    virtualizedListBtn.innerText = `Item ${i + 1}`;

    virtualizedListItem.appendChild(virtualizedListBtn);

    virtualizedListBtn.addEventListener("click", (e) => {
      const ripple = document.createElement("span");
      ripple.style.left = `${e.offsetX}px`;
      ripple.style.top = `${e.offsetY}px`;
      virtualizedListBtn.appendChild(ripple);

      setTimeout(function () {
        virtualizedListBtn.removeChild(ripple);
      }, 700);
    });

    virtualizedListWrapper.appendChild(virtualizedListItem);
  }
};

action();

const throttle = (callback, delay) => {
  let timer;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        callback.apply(this, arguments);
        timer = undefined;
      }, delay);
    }
  };
};

virtualizedList.addEventListener("scroll", throttle(action, 100));
