// Create memo template
const memoTemplate = () => {
    return `
        <div class="memo" style="top: 100px; left: 100px; z-index: 1;" data-num="1">
                <span class="header-content">
                    <button class="btn_close">
                        <span class="blind">close</span>
                    </button>
                </span>
            <div class="header">
                <h1 class="blind">memo</h1>
            </div>
            <div class="content">
                <div class="textarea" contenteditable="true" style="width:200px; height:100px;">
                    Insert memo here.
                </div>
                <button class="btn_size">
                    <span class="blind">resize memo</span>
                </button>
            </div>
        </div>
        `
};

// setting local storage
const memoArray = localStorage.getItem('obj') ? JSON.parse(localStorage.getItem('obj')) : [];    // Dom
const memoTopArray = localStorage.getItem('top') ? JSON.parse(localStorage.getItem('top')) : [];    // top
const memoLeftArray = localStorage.getItem('left') ? JSON.parse(localStorage.getItem('left')) : [];    // left
const memoWidthArray = localStorage.getItem('width') ? JSON.parse(localStorage.getItem('width')) : [];    // width
const memoHeightArray = localStorage.getItem('height') ? JSON.parse(localStorage.getItem('height')) : [];    // height
const memoZ_indexArray = localStorage.getItem('z-index') ? JSON.parse(localStorage.getItem('z-index')) : [];    // z-index

// init first memo (if there is local storage value recall it else add basic template
if (memoArray.length === 0) {
    const initMemo = () => document.querySelector('.wrap').insertAdjacentHTML('afterbegin', `${memoTemplate()}`);
    initMemo();
} else {
    document.querySelector('.wrap').insertAdjacentHTML('beforeend', JSON.parse(localStorage.getItem('obj'))[0]);
}

// add first local storage value
if (memoArray.length < 1) {
    memoArray.push(`${memoTemplate()}`);
    memoTopArray.push(document.querySelector('.memo').style.top);
    memoLeftArray.push(document.querySelector('.memo').style.left);
    memoWidthArray.push(document.querySelector('.memo .textarea').style.width);
    memoHeightArray.push(document.querySelector('.memo .textarea').style.height);
    memoZ_indexArray.push(0, 1);

    localStorage.setItem('obj', JSON.stringify(memoArray));
    localStorage.setItem('top', JSON.stringify(memoTopArray));
    localStorage.setItem('left', JSON.stringify(memoLeftArray));
    localStorage.setItem('width', JSON.stringify(memoWidthArray));
    localStorage.setItem('height', JSON.stringify(memoHeightArray));
    localStorage.setItem('z-index', JSON.stringify(memoZ_indexArray));
}

document.querySelector('.wrap').addEventListener('click', e => {
    // click memo
    if (e.target.className === 'textarea') {
        // clicked memo goes to top and save to local storage
        e.target.offsetParent.offsetParent.style.zIndex = memoZ_indexArray.length.toString();

        const calcNum = e.target.offsetParent.offsetParent.dataset.num - 1;
        memoZ_indexArray.push(memoZ_indexArray.length);
        memoArray.splice(calcNum, 1, e.target.offsetParent.offsetParent.outerHTML);
        localStorage.setItem('obj', JSON.stringify(memoArray));
        localStorage.setItem('z-index', JSON.stringify(memoZ_indexArray));

        // save the content every 2 sec
        let intervalCounter = 0;
        const saveMemoEvery2sec = () => {
            if (intervalCounter <= 10) {
                memoArray.splice(calcNum, 1, e.target.offsetParent.offsetParent.outerHTML);
                localStorage.setItem('obj', JSON.stringify(memoArray));
            } else {
                clearInterval(saveMemoEvery2sec);
            }
        };
        setInterval(() => {
            saveMemoEvery2sec();
            intervalCounter++;
        }, 2000);

    // delete memo
    } else if (e.target.className === 'btn_close') {
        // delete memoe and delete local storage
        const calcNum = Number(e.target.offsetParent.offsetParent.dataset.num) - 1;
        memoArray.splice(calcNum, 1);
        memoTopArray.splice(calcNum, 1);
        memoLeftArray.splice(calcNum, 1);
        memoWidthArray.splice(calcNum, 1);
        memoHeightArray.splice(calcNum, 1);

        localStorage.setItem('obj', JSON.stringify(memoArray));
        localStorage.setItem('top', JSON.stringify(memoTopArray));
        localStorage.setItem('left', JSON.stringify(memoLeftArray));
        localStorage.setItem('width', JSON.stringify(memoWidthArray));
        localStorage.setItem('height', JSON.stringify(memoHeightArray));

        for (let i = 1; i < document.querySelectorAll('.memo').length; i++) {
            document.querySelectorAll('.memo')[i].dataset.num = i
        }
        setTimeout(e.target.offsetParent.offsetParent.remove(), 1000)
    }
});

// dragg z-index event toggle value
let z_indexToggle = false;

// drag & drop toggle value
let dragToggle = false;

// create drag & drop event object
const calc = new Object();

document.querySelector('.wrap').addEventListener('mousemove', e => {
    event.preventDefault();
    // memo header dragging
    if (e.target.className === 'header') {
        // drag & drop
        const dragMemo = (el, e) => {
            const originX = e.screenX;
            const originY = e.screenY;

            // mouse in & out event
            el.addEventListener('mousedown', mouseIn);
            el.addEventListener('mouseup', mouseOut);

            // when dragging
            if (dragToggle) {
                // destruction of object
                const {xValue, yValue} = calc;

                // onmousemove scale toggle size
                e.toElement.style.transform = 'scale(2, 10)';
                e.toElement.style.zIndex = '1';

                // clicked memo goes to top and save to local storage
                if (!z_indexToggle) {
                    e.target.offsetParent.style.zIndex = memoZ_indexArray.length;

                    memoZ_indexArray.push(memoZ_indexArray.length);
                    localStorage.setItem('z-index', JSON.stringify(memoZ_indexArray));
                }
                z_indexToggle = true;

                // adding this value(x,y)
                e.target.offsetParent.style.left = `${originX - xValue}px`;
                e.target.offsetParent.style.top = `${originY - yValue}px`;

            } else {
                e.toElement.style.transform = 'scale(1)';
                e.toElement.style.zIndex = '';
            }
        };
        dragMemo(this, event);

        // memo right bottom drag
    } else if (e.target.className === 'btn_size') {
        // resize memo
        const expandMemo = (el, e) => {
            const originX = e.clientX;
            const originY = e.clientY;

            el.addEventListener('mousedown', mouseIn);
            el.addEventListener('mouseup', mouseOut);

            if (dragToggle) {
                // destruction object
                const {paddingWidth, paddingHeight, expandBtnWidth, expandBtnHeight, sumXValue, sumYValue} = calc;

                // onmousemove resize toggle size
                e.toElement.style.transform = 'scale(10)';
                e.toElement.style.zIndex = '1';

                // clicked memo goes to top and save it to local storage
                if (!z_indexToggle) {
                    e.target.offsetParent.offsetParent.style.zIndex = memoZ_indexArray.length.toString();

                    memoZ_indexArray.push(memoZ_indexArray.length);
                    localStorage.setItem('z-index', JSON.stringify(memoZ_indexArray));
                }
                z_indexToggle = true;

                // calculated element location
                const totalMovementX = `${originX - sumXValue - (paddingWidth - expandBtnWidth)}px`;
                const totalMovementY = `${originY - sumYValue - (paddingHeight + expandBtnHeight)}px`;

                e.target.offsetParent.firstElementChild.style.width = totalMovementX;
                e.target.offsetParent.firstElementChild.style.height = totalMovementY;

            } else {
                e.toElement.style.transform = 'scale(1)';
                e.toElement.style.zIndex = '';
            }
        };
        expandMemo(this, event);
    }
});

// when  pushing the mnouse
const mouseIn = e => {
    // memo header drag
    if (e.target.className === 'header') {
        // mouse value
        const scrX = e.screenX;
        const scrY = e.screenY;

        // target value
        const eleX = Number(e.target.offsetParent.style.left.split('px')[0]);
        const eleY = Number(e.target.offsetParent.style.top.split('px')[0]);

        // target width and height
        const cliX = e.target.offsetParent.clientWidth;
        const cliY = e.target.offsetParent.clientHeight;

        // value of (0,0) to the edge of target
        const sumX = eleX + cliX;
        const sumY = eleY + cliY;

        const totalX = cliX - (sumX - scrX);
        const totalY = cliY - (sumY - scrY);

        // header object value
        calc.xValue = totalX;
        calc.yValue = totalY;
    }

    // right bottom dragging
    if (e.target.className === 'btn_size') {
        // padding value
        calc.paddingWidth = e.target.offsetParent.clientWidth - e.target.offsetParent.firstElementChild.clientWidth;
        calc.paddingHeight = e.target.offsetParent.clientHeight - e.target.offsetParent.firstElementChild.clientHeight;

        // button average value
        calc.expandBtnWidth = e.target.clientWidth / 2;
        calc.expandBtnHeight = e.target.clientHeight / 2;

        // textarea value
        calc.sumXValue = Number(e.target.offsetParent.offsetParent.style.left.split('px')[0]);
        calc.sumYValue = Number(e.target.offsetParent.offsetParent.style.top.split('px')[0]);
    }
    dragToggle = true;
};

// when mouse exit
const mouseOut = e => {
    // save memo header
    if (e.target.className === 'header' && e.target.style.transform !== '') {
        const calcNum = e.target.offsetParent.dataset.num - 1;

        memoArray.splice(calcNum, 1, e.target.offsetParent.outerHTML);
        memoTopArray.splice(calcNum, 1, `${e.target.offsetParent.offsetTop}px`);
        memoLeftArray.splice(calcNum, 1, `${e.target.offsetParent.offsetLeft}px`);

        localStorage.setItem('obj', JSON.stringify(memoArray));
        localStorage.setItem('top', JSON.stringify(memoTopArray));
        localStorage.setItem('left', JSON.stringify(memoLeftArray));
    }

    // save memo (right bottom one)
    if (e.target.className === 'btn_size') {
        const calcNum = e.target.offsetParent.offsetParent.dataset.num - 1;

        memoArray.splice(calcNum, 1, e.target.offsetParent.offsetParent.outerHTML);
        memoWidthArray.splice(calcNum, 1, e.target.offsetParent.firstElementChild.style.width);
        memoHeightArray.splice(calcNum, 1, e.target.offsetParent.firstElementChild.style.height);

        localStorage.setItem('obj', JSON.stringify(memoArray));
        localStorage.setItem('width', JSON.stringify(memoWidthArray));
        localStorage.setItem('height', JSON.stringify(memoHeightArray));
    }
    dragToggle = false;
    z_indexToggle = false;
};

// create new memo
const wrapperMemo = document.querySelector('.wrap');
wrapperMemo.oncontextmenu = e => {
    // check memo
    if (e.toElement === wrapperMemo) {
        wrapperMemo.insertAdjacentHTML('beforeend', `${memoTemplate()}`);
        document.querySelector('.memo:last-child .textarea').innerText = '';
        document.querySelector('.memo:last-child').dataset.num = document.querySelectorAll('.memo').length.toString();

        document.querySelector('.memo:last-child').style.top = `${e.clientY}px`;
        document.querySelector('.memo:last-child').style.left = `${e.clientX}px`;

        document.querySelector('.memo:last-child').style.zIndex = memoZ_indexArray.length.toString();
        memoZ_indexArray.push(memoZ_indexArray.length);
        localStorage.setItem('z-index', JSON.stringify(memoZ_indexArray));

        memoArray.push(e.target.lastElementChild.outerHTML);
        memoTopArray.push(`${e.clientY}px`);
        memoLeftArray.push(`${e.clientX}px`);
        memoWidthArray.push(`${e.target.firstElementChild.lastElementChild.firstElementChild.offsetWidth}px`);
        memoHeightArray.push(`${e.target.firstElementChild.lastElementChild.firstElementChild.offsetHeight}px`);

        localStorage.setItem('obj', JSON.stringify(memoArray));
        localStorage.setItem('top', JSON.stringify(memoTopArray));
        localStorage.setItem('left', JSON.stringify(memoLeftArray));
        localStorage.setItem('width', JSON.stringify(memoWidthArray));
        localStorage.setItem('height', JSON.stringify(memoHeightArray));

        return false;
    }
};

// recall from local storage
if (localStorage.getItem('obj')) {
    for (let i = 1; i < JSON.parse(localStorage.getItem('obj')).length; i++) {
        wrapperMemo.insertAdjacentHTML('beforeend', JSON.parse(localStorage.getItem('obj'))[i]);
    }
}

// reset button
document.getElementById('reset_localstorage').addEventListener('click', () => {
    event.preventDefault();
    localStorage.clear();
    location.reload();
});
