const fn = {
    averageTime(clearWordList) {
        let averageTime = 0;
        let sumTime = 0;
        // 입력 평균 값 계산 
        if(Array.isArray(clearWordList) &&clearWordList.length >0) {
            clearWordList.forEach(obj=>{
                sumTime += obj.successTime;
            })
            averageTime = sumTime / clearWordList.length;
        }
       
        return averageTime.toFixed(2);
    },
    nextWord(posts,wordCount) { // 다음 문제 호출
        wordCount += 1;
        if(wordCount >= posts.length) {
            return '/#/result';
        }
        return posts[wordCount];
    },
     timer(callback,wordTime,passFlag) { // 시간 감소 1초.
        setTimeout(function(){
            if(passFlag) {
                passFlag = false;
                callback('pass');
            }
            // wordTime.innerHTML -= 1;
            wordTime -= 1; 
        
            if(wordTime > 0){
                callback('finish');
                //timer();
            } else {// 타이머 0 시 다음 단어 호출 
                callback('next');
                // totalScore -= 1; // 점수 감점 
                // wordTotal.innerHTML = totalScore;
                // nextWord();
            }
        }, 1000);
    },
    inputKeyup(event,wordText,inputText) {
        if(event === 'Enter'){
            if(wordText === wordTinputText){ // 정답 시 
                const {second,text} = posts[wordCount-1];
                const successTime = second - wordTime.innerHTML;
                const clearWord = {text, successTime};

                clearWordList.push(clearWord); // 클리어 단어 목록 추가 (평균시간 계산 시 사용)

                // 정답 시 이미 실행 된 타이머 함수 처리 안되도록...
                passFlag = true;

                nextWord();
            }
            // input 초기화 
            wordInput.value = '';
        }
    }
};
module.exports = fn;