// components.js 는 필요한 이미지, 아이콘, UI 등 필요한 element를 생성합니다.
console.log('loaded_components.js')

// 절대경로 지정
const path = 'file:///Users/leeyongwoo/WebstormProjects/sourcecode/commonUXUI';

// ICON class
class ICON {
    static back() {
        const backIcon = document.createElement('img');
        backIcon.id = 'backBtn';
        backIcon.setAttribute('src', path + '/images/icons/back.svg');
        return backIcon
    }
    static home() {
        const homeIcon = document.createElement('img');
        homeIcon.setAttribute('src', path + '/images/icons/home.svg');
        return homeIcon
    }
    static menu() {
        const menuIcon = document.createElement('img');
        menuIcon.setAttribute('src', path + '/images/icons/menu.svg');
        return menuIcon
    }
}

// BANNER class
class BANNER {
    static type1() {
        const bannerType1 = document.createElement('img');
        bannerType1.setAttribute('src', path + '/images/banners/finance_banner.png');

        const bannerWrapper = document.createElement('div');
        bannerWrapper.classList.add('banner-t1');
        bannerWrapper.append(bannerType1);

        return bannerWrapper
    }
    static type2() {
    }
    static type3() {
    }
}

// UI Class
class UI {
    static headerMainType(title) {
        const header = document.createElement('header');
        header.id ='mainType';
        const headerInner = `
        <div id='NHFheader' class='d-flex w-100'>
            <div class='NHFheader-left mr-auto d-flex minw-100'></div>
            <div class='NHFheader-middle d-flex'><span>${title}</span></div>
            <div class='NHFheader-right ml-auto d-flex minw-100'></div>
        </div>
        `;
        header.innerHTML = headerInner;
        return header
    }
    static bodyTop() {
        const body = document.createElement('div');
        body.id = 'commonBodyTop';
        // const bodyInner = `<span>바디 공통탑영역 입니다.</span>`;
        // body.innerHTML = bodyInner;
        return body
    }
    static bodyBottom() {
        const body = document.createElement('div');
        body.id = 'commonBodyBottom';
        // const bodyInner = `<span>바디 공통바텀영역 입니다.</span>`;
        // body.innerHTML = bodyInner;
        return body
    }
    static footerButtonType(content, link) {
        const footer = document.createElement('footer');
        footer.id ='buttonType';
        const footerInner = `<a href='${link}'><span>${content}</span></a>`;
        footer.innerHTML = footerInner;
        return footer
    }
}

// MENU Class
class MENU {
    static content() {
        const menu = document.createElement('div');
        return menu
    }
}

// CHART class
class CHART {
    static type1() {
    }
    static type2() {
    }
    static type3() {
    }
}

// LAYERPOPUP class
class LAYERPOPUP {
    static layoutPopupContent() {
    }
}

// BUTTON class
class BUTTON {
    static back() {
    }
    static toggle() {
    }
    static process() {
    }
    static inbody() {
    }
}

// LOADING class
class LOADING {
    static loadingContent() {
    }
}

// RADIOBTN class
class RADIO {
    static type1() {
    }

    static type2() {
    }
    static type3() {
    }
}

// CHKBOX class
class CHKBOX {
    static type1() {
    }
    static type2() {
    }
    static type3() {
    }
}