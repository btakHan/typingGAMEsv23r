
const Result = {
   render :  () => {
       const view =  /*html*/`
       <div class="row align_center">
            <label class="font_md"> Mission Complete!! </label>
       </div>
       <div class="row align_center">
            <label class="font_lg"> Total Score :</label>
            <label class="font_lg"> ${totalScore} </label>
       </div>
       <div class="row align_center">
            <label class="font_md"> 단어당 평균 입력 시간 : </label>
            <label class="font_md" id="averageTimeLabel"/>
       </div>
       <div class="row align_center">
            <button class="button" id="resultRestartButton" > ReGame </button>
       </div>
       `
       return view
   }
   , after_render: () => {
        init(); 
        buttonClickEvent();
        
        function init(){
            const averageTimeLabel = document.getElementById("averageTimeLabel");
            let averageTime = 0;
            let sumTime = 0;
            // 입력 평균 값 계산 
            if(Array.isArray(clearWordList) &&clearWordList.length >0) {
                clearWordList.forEach(obj=>{
                    sumTime += obj.successTime;
                })
                averageTime = sumTime / clearWordList.length;
            }
            averageTimeLabel.innerHTML = averageTime.toFixed(2);
        }

        function buttonClickEvent() {
            document.getElementById("resultRestartButton").addEventListener ("click",  () => {
                location.href="/";
            });
        }
   }

}

export default Result;