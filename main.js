document.querySelector('.control button').onclick = function () {
       let userName = prompt('What Your Name?');
       if (userName == null || userName == '') {
              document.querySelector('.name span').innerHTML = 'Unknown';
       } else {
              document.querySelector('.name span').innerHTML = userName;
       }
       document.querySelector('.control').remove();
};

let duration = 1000;

let allBlocks = document.querySelector('.game-area-blocks');

let blocks = Array.from(
       document.querySelectorAll('.game-area-blocks .game-block')
);

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((block, index) => {
       block.style.order = orderRange[index];

       block.addEventListener('click', function () {
              flipCard(block);
       });
});

function shuffle(array) {
       let current = array.length,
              random,
              temp;

       for (; current > 0; ) {
              random = Math.floor(Math.random() * current);
              current--;
              temp = array[current];
              array[current] = array[random];
              array[random] = temp;
       }
}

function flipCard(cardFlip) {
       cardFlip.classList.add('transfer');

       let allCardFlipped = blocks.filter((e) =>
              e.classList.contains('transfer')
       );

       if (allCardFlipped.length === 2) {
              stopClicking();
              checkedAllBlocks(allCardFlipped[0], allCardFlipped[1]);
       }
}

function stopClicking() {
       allBlocks.classList.add('no-click');

       setTimeout(function () {
              allBlocks.classList.remove('no-click');
       }, duration);
}

function checkedAllBlocks(firstBlock, secondBlock) {
       if (firstBlock.dataset.tech == secondBlock.dataset.tech) {
              firstBlock.classList.remove('transfer');
              secondBlock.classList.remove('transfer');

              firstBlock.classList.add('matched');
              secondBlock.classList.add('matched');
       } else {
              let wrongTries = document.querySelector('.wrong span');

              wrongTries.innerHTML = parseInt(wrongTries.innerHTML) + 1;
              setTimeout(() => {
                     firstBlock.classList.remove('transfer');
                     secondBlock.classList.remove('transfer');
              }, duration);
       }
}
