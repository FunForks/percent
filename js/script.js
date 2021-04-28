(function dragParent() {
  const parent = document.getElementById("parent");
  const parentP = document.querySelector("#parent > p");
  const percentP = document.querySelector("#parent div p");
  console.log("parentP:", parentP);
  const { x: parentX, y: parentY } = parent.getBoundingClientRect();
  const dragbox = document.getElementById("dragbox");
  const body = document.body;

  dragbox.onmousedown = ontouchdown = startDrag;

  function startDrag(event) {
    var target = event.target;
    var { width, height } = target.getBoundingClientRect();
    var clickX = event.pageX;
    var clickY = event.pageY;
    var startX = target.offsetLeft;
    var startY = target.offsetTop;

    console.log("width:", width, "height:", height);

    body.onmousemove = ontouchmove = drag;
    body.onmouseup = ontouchend = stopDrag;

    function drag(event) {
      const left = startX - clickX + event.pageX;
      target.style.left = left + "px";
      const top = startY - clickY + event.pageY;
      target.style.top = top + "px";

      const parentHeight = top + height + 1;
      let fontSize = Math.round(parentHeight / 4) + "px";
      parent.style.width = left + width + 1 + "px";
      parent.style.height = parentHeight + "px";
      parent.style.fontSize = fontSize;
      parentP.innerText = "Parent " + fontSize;

      fontSize = getComputedStyle(percentP).fontSize;
      percentP.innerText = "50% = " + fontSize;
    }

    function stopDrag(event) {
      body.onmousemove = ontouchmove = null;
      body.onmouseup = ontouchend = null;
    }
  }
})();
