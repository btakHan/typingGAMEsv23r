

const Error404 = {
   render :  () => {
    const view =  /*html*/`
    <div class="row align_center">
        <h4> URL 주소를 확인해주세요 </h4>
    </div>
    <div class="row align_center">
        <button class="button" id="homeButton" > Home으로... </button>
    </div>
       `
       return view
   }
   , after_render: () => {
       document.getElementById("homeButton").addEventListener ("click",  () => {
            location.href="/";
       });
   }

}

export default Error404;