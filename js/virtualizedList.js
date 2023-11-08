const ITEM_HEIGHT = 46;
const NUM_ITEMS = 200;

const container = document.querySelector(".list-container");
const wrapper = document.querySelector(".list-wrapper");

const action = () => {
  const scrollTop = container.scrollTop;
  const windowHeight = container.clientHeight;

  let startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
  let endIndex = Math.min(
    NUM_ITEMS - 1,
    Math.floor((scrollTop + windowHeight) / ITEM_HEIGHT)
  );

  wrapper.replaceChildren();

  for (let i = startIndex; i <= endIndex; i++) {
    const item = document.createElement("div");
    item.classList += "list-item";
    item.style.top = `${ITEM_HEIGHT * i}px`;

    const btn = document.createElement("div");
    btn.className += "list-item-btn";
    btn.innerText = `Item ${i + 1}`;

    item.appendChild(btn);

    btn.addEventListener("click", (e) => {
      const ripple = document.createElement("span");
      ripple.style.left = `${e.offsetX}px`;
      ripple.style.top = `${e.offsetY}px`;
      btn.appendChild(ripple);

      setTimeout(function () {
        btn.removeChild(ripple);
      }, 700);
    });

    wrapper.appendChild(item);
  }
};

action();

const throttle = (callback, delay) => {
  let timer;
  return function () {
    if (!timer) {
      timer = setTimeout((_) => {
        callback.apply(this, arguments);
        timer = undefined;
      }, delay);
    }
  };
};

container.addEventListener("scroll", throttle(action, 100));
