// controller.js는 component.js에서 생성된 element가 layout.js에 의해 배치된 후 공통기능 및 추가 공통함수가 들어갑니다.
console.log('loaded_controller.js')

// headerController
const headerController = () => {
    console.log('loaded_headerController')
    // 뒤로가기
    const backBtn = document.getElementById('backBtn');
    backBtn.addEventListener('click', () => {
        // 로컬환경에서는 작동 안함
        if (document.referrer) {
            history.back();
        } else {
            location.href = path + '/index.html'
        }
    })
};

// bodyController
const bodyController = () => console.log('loaded_bodyController');

// footerController
const footerController = () => console.log('loaded_footerController');

// customLayoutController
const customLayoutController = () => console.log('loaded_customLayoutController');
