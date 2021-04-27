
const getPostsList = async () => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch(`https://my-json-server.typicode.com/kakaopay-fe/resources/words`, options)
       const json = await response.json();
       return json
   } catch (err) {
       console.log('Error ', err)
   }
}

const Main = {
   render :  () => {
       const view =  /*html*/`
       <div class="header_height">
            <div class="row font_md bold">
                <div class="col-xs-4 align_center">
                    <label>남은시간 </label>
                </div>
                <div class="col-xs-4 align_center">
                    <label >단어 </label>
                </div>
                <div class="col-xs-4 align_center">
                    <label >점수 </label>
                </div>
            </div>
            <div class="row height_sm">
                <div class="col-xs-4 font_sm align_center">
                        <label id="wordTime"></label>
                </div>
                <div class="col-xs-4 font_sm align_center">
                        <label id="wordText"></label>
                </div>
                <div class="col-xs-4 font_sm align_center">
                        <label id="wordTotal"></label>
                </div>
            </div>
       </div>
       <div class="row align_center">
            <label class="font_md">단어를 입력하세요.</label>
       </div>
       <div class="row align_center">
            <input class="font_md" id="wordInput" placeholder='입력'/>
       </div>
       <div class="row align_center ">
            <button id="playButton" class="button playButton">
                시작
            </button>
            <button id="resetButton" class="button playButton">
                초기화
            </button>
       </div>
       `
       return view
   }
   , after_render: async () => {
    const posts = await getPostsList()
    const wordTime = document.getElementById("wordTime");
    const wordText = document.getElementById("wordText");
    const wordTotal = document.getElementById("wordTotal");
    let wordCount = 0;
    let passFlag= false;

    // init();
    inputEvent();

    function onPlay() {
        // total 
        totalScore = posts.length;
        wordTotal.innerHTML = totalScore;

        // 시작 버튼 숨김처리 / 초기화 버튼 표시 
        document.getElementById("playButton").style.display ='none';
        document.getElementById("resetButton").style.display ='initial';

        // 문제 표시    
        nextWord();
    }
    function onReset(){
        // 변수 초기화
        wordCount = 0;
        totalScore = 0;
        passFlag= true;
        clearWordList = [];
        // 화면에 표시 된 문제 공백 처리
        wordTime.innerHTML = '';
        wordText.innerHTML = '';
        wordTotal.innerHTML = '';

        // 시작 버튼 숨김처리 / 초기화 버튼 표시 
        document.getElementById("resetButton").style.display ='none';
        document.getElementById("playButton").style.display ='initial';
    }
    function inputEvent() {
        const wordInput = document.getElementById("wordInput");
    
        wordInput.addEventListener("keyup",inputKeyup)
        document.getElementById("playButton").addEventListener ("click", onPlay);
        document.getElementById("resetButton").addEventListener ("click", onReset);
    }
    function inputKeyup(event) {
        if(event.key === 'Enter'){
            if(wordInput.value === wordText.innerHTML){ // 정답 시 
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
    function nextWord() { // 다음 문제 호출
        if(wordCount >= posts.length) {
            location.href="/#/result";
            return;
        }
        const { second, text } = posts[wordCount]
        wordTime.innerHTML = second;
        wordText.innerHTML = text;
        wordCount += 1;
        timer();
    }
    function timer() { // 시간 감소 1초.
        setTimeout(function(){
            if(passFlag) {
                passFlag = false;
                return;
            }
            wordTime.innerHTML -= 1;
        
            if(wordTime.innerHTML > 0){
                timer();
            } else {// 타이머 0 시 다음 단어 호출 
                totalScore -= 1; // 점수 감점 
                wordTotal.innerHTML = totalScore;
                nextWord();
            }
        }, 1000);
    }
}
}

export default Main;