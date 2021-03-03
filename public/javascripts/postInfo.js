function editFunction(index, position){
    console.log('hji');
    if(index === 1){
        document.editForm.action="/mypage/update/"+position;
    }
    if(index === 2){
        document.editForm.action="/mypage/delete/"+position;
    }
    document.editForm.submit();
}