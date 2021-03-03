function check() {
    const password = document.querySelector('#password').value;
    const checkPassword = document.querySelector('#passwordCheck').value;
    let result = document.querySelector('#result');

    if (password === '') {
        result.style.color = "red";
        result.innerHTML = '비밀번호를 입력해주세요';
    } else if (checkPassword === '') {
        result.style.color = "red";
        result.innerHTML = '비밀번호 확인을 입력해주세요';
    } else if (password !== checkPassword) {
        result.style.color = "red";
        result.innerHTML = '비밀번호가 틀립니다';
    } else {
        result.style.color = "blue";
        result.innerHTML = '비밀번호 확인 됐습니다';
    }
}

function registerCheck(){
    const id = document.querySelector('#id').value;
    const password = document.querySelector('#password').value;
    const checkPassword = document.querySelector('#passwordCheck').value;

    if(id === ''){
        // console.log('아이디확인')
        alert('아이디를 확인하세요');
    }else if(password !== checkPassword ){
        alert('비밀번호를 확인하세요');
    }else {

        alert('회원가입성공');
    }
}