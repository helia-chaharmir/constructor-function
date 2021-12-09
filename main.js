function faceFactory(centerPointX, centerPointY, size) {
  return {
    centerPointX: centerPointX,
    centerPointY: centerPointY,
    size: size,
    draw() {
      const centerPoint = {
        x: this.centerPointX,
        y: this.centerPointY,
      };
      drawCircle(centerPoint, this.size);
    },
  };
}

function eyeFactory(centerPointX, centerPointY, size) {
  return {
    centerPointX: centerPointX,
    centerPointY: centerPointY,
    size: size,
    draw() {
      const centerPoint = {
        x: this.centerPointX,
        y: this.centerPointY,
      };
      drawCircle(centerPoint, this.size);
      drawCircle(centerPoint, this.size / 3);
    },
  };
}

function noseFactory(centerPointX, centerPointY, size) {
  return {
    centerPointX: centerPointX,
    centerPointY: centerPointY,
    size: size,
    fat: 5,
    draw() {
      const startPoint = {
        x: this.centerPointX,
        y: this.centerPointY - this.size / 2,
      };
      const endPoint = {
        x: this.centerPointX,
        y: this.centerPointY + this.size / 2,
      };
      const rightCornerPoint = {
        x: this.centerPointX + this.fat,
        y: this.centerPointY + (this.size / 2 - this.fat),
      };
      const leftCornerPoint = {
        x: this.centerPointX - this.fat,
        y: this.centerPointY + (this.size / 2 - this.fat),
      };
      drawLine(startPoint, endPoint);
      drawLine(endPoint, rightCornerPoint);
      drawLine(endPoint, leftCornerPoint);
    },
  };
}

function lipFactory(centerPointX, centerPointY, size) {
  function drawPokerFace(centerPointX, centerPointY, size) {
    const startPoint = {
      x: centerPointX - size / 2,
      y: centerPointY,
    };
    const endPoint = {
      x: centerPointX + size / 2,
      y: centerPointY,
    };
    drawLine(startPoint, endPoint);
  }

  function drawScaryFace(centerPointX, centerPointY, size) {
    drawCircle(
      {
        x: centerPointX,
        y: centerPointY,
      },
      size / 5
    );
  }

  return {
    centerPointX: centerPointX,
    centerPointY: centerPointY,
    size: size,
    status: "scary",
    draw() {
      if (this.status === "poker") {
        drawPokerFace(this.centerPointX, this.centerPointY, this.size);
      } else if (this.status === "scary") {
        drawScaryFace(this.centerPointX, this.centerPointY, this.size);
      }
    },
  };
}

function emojiFactory() {
  function calcEyePosition(centerFaceX, centerFaceY, side) {
    return {
      x: side === "left" ? centerFaceX - 40 : centerFaceX + 40,
      y: centerFaceY - 50,
    };
  }

  const centerPointX = 400;
  const centerPointY = 250;

  let leftEyePosition = calcEyePosition(centerPointX, centerPointY, "left");
  let rightEyePosition = calcEyePosition(centerPointX, centerPointY, "right");

  return {
    items: {
      face: faceFactory(centerPointX, centerPointY, 100),
      leftEye: eyeFactory(leftEyePosition.x, leftEyePosition.y, 10),
      rightEye: eyeFactory(rightEyePosition.x, rightEyePosition.y, 10),
      nose: noseFactory(centerPointX, centerPointY - 10, 30),
      lips: lipFactory(centerPointX, centerPointY + 40, 80),
    },
    render() {
      clearPage();
      for (let item of Object.values(this.items)) {
        item.draw();
      }
    },
    makeFaceScary() {
      this.items.lips.status = "scary";
      this.render();
    },
    makeFacePoker() {
      this.items.lips.status = "poker";
      this.render();
    },
    sayLie() {
      ++this.items.nose.fat;
      ++this.items.nose.size;
      this.render();
    },
  };
}

const myEmoji = emojiFactory();

myEmoji.render();
