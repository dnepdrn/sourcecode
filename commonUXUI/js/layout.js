// layout.js 는 components.js에서 생성된 element를 배치 content를 수정합니다.
console.log('loaded_layout.js')

// LAYOUT Class
class LAYOUT {
    static prepend(where, from) {
        where.prepend(from)
    }

    static append(where, from) {
        where.append(from)
    }

    static after(where, from) {
        where.after(from)
    }

    static before(where, from) {
        where.before(from)
    }

    static innerHTML(target, content) {
        target.innerHTML = content
    }

    static innerText(target, content) {
        target.innerText = content
    }
}

// 공통 레이아웃, 사용법: LAYOUT.function(where, target)

// header layout
function header() {
    return new Promise(resolve => resolve(LAYOUT.prepend(document.body, UI.headerMainType('자산관리'))));
}

function headerInner() {
    return new Promise(resolve => resolve(
        LAYOUT.prepend(document.querySelector('.NHFheader-left'), ICON.back()),
        LAYOUT.prepend(document.querySelector('.NHFheader-right'), ICON.home()),
        LAYOUT.prepend(document.querySelector('.NHFheader-right'), ICON.menu())
    ))
}

async function initHeader() {
    const priorityFunc = await header();
    const nextFunc = await headerInner();
    priorityFunc;
    nextFunc;
    headerController();
}

// body layout
function body() {
    return new Promise(resolve => resolve(LAYOUT.prepend(document.querySelector('.main-basic'), UI.bodyTop())))
}

function bodyInner() {
    return new Promise(resolve => resolve())
}

async function initBody() {
    const priorityFunc = await body();
    const nextFunc = await bodyInner();
    priorityFunc;
    nextFunc;
    bodyController();
}

// footer layout
function footer() {
    return new Promise(resolve => resolve())
}

function footerInner() {
    return new Promise(resolve => resolve())
}

async function initFooter() {
    const priorityFunc = await footer();
    const nextFunc = await footerInner();
    priorityFunc;
    nextFunc;
    footerController();
}

// custom layout
function customLayout() {
    // 공통 레이아웃 내 커스텀 레이아웃 설정
    if (window.location.href.indexOf('index.html') !== -1) {
        return new Promise(resolve => resolve(
            LAYOUT.append(document.getElementById('commonBodyTop'), BANNER.type1()),
            LAYOUT.append(document.body, UI.footerButtonType('연결하기', path + '/pages/page1.html'))
        ))
    }
    if (window.location.href.indexOf('page1.html') !== -1) {
        return new Promise(resolve => resolve(
            LAYOUT.innerHTML(document.querySelector('.NHFheader-middle span'), '페이지1')
        ))
    }
}

function customLayoutInner() {
    // 공통 레이아웃Inner 내 페이지별 커스텀 레이아웃 설정
    return new Promise(resolve => resolve())
}

async function initCustomLayout() {
    const priorityFunc = await customLayout();
    const nextFunc = await customLayoutInner();
    priorityFunc;
    nextFunc;
    customLayoutController();
}

// 공통 레이아웃 순차적 소환 및 공통 레이아웃 내 커스텀 레이아웃 발동
window.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initBody();
    initFooter();
    initCustomLayout();
});

