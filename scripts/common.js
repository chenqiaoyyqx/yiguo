    
    // 百度搜索
var inp =  document.getElementById("search-input");
var list = document.getElementById("list1");
var showNum = 3;
inp.addEventListener("input",handlerSearch);    
var timer =null;
function handlerSearch(){
    timer = setTimeout(function(){
        var url = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${inp.value}&json=1&p=3&sid=1439_25809_21102_28132_26350_28267_22160&req=2&sc=eb&csor=0&
        cb=jQuery1102024846973884570933_1547176620844&_=1547176620847`
        jsonp(url,"cb")
        .then(function(res){
            var html =""
            console.log(res.s);
            res.s.every((item,index)=>{
                    html+=`<li>${item}</li>`
                // console.log(item);
                return index<showNum
            })
            list.innerHTML = html;
        })  
    },100)
    
    
}
// jsonp
function jsonp(url,jsonp_key){
    return new Promise(function(resolve,reject){
          var randomName = "_" + Date.now()
          window[randomName] = function(res){
                resolve(res);
          }
          var script = document.createElement("script");
          url = url + (/\?/.test(url) ? "&" : "?") + jsonp_key + "=" + randomName;
          script.src = url;
          document.body.appendChild(script);
          script.onload = function(){
                this.remove();
                window[randomName] = null;
                delete window[randomName];
          }
    })
}
    // 楼梯
    class Stair{
        constructor(){

        }
        init(){
            this.stairs = $(".stairs");
            this.btn_wrap = $(".floor-guide");
            this.btns = $(".floor-guide a");
            // console.log(this.btns);
            this.showTop = 463;
            this.stairsArray = [];
            for(var i=0; i<this.stairs.length; i++){
                var ele = this.stairs.eq(i)
                this.stairsArray.push({
                    min:ele.offset().top,
                    max:ele.offset().top+ele.height()
                })
            }
            // console.log(this.stairsArray);

            this.bindEvent();
        }
        bindEvent(){
            $(window).on("scroll",this.toggleBtn.bind(this));
            $(window).on("scroll",this.changeBtnIndex.bind(this));
            // this.btns.eq(this.btns.length - 1).on("click",this.goTop.bind(this));
            this.btns.on("click",this.changeStairs.bind(this));
        }
        toggleBtn(){
            
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            if(scrollTop > this.showTop){
                this.btn_wrap.show();
            }else{
                this.btn_wrap.hide();
            }
            // console.log(scrollTop);
        }
        changeBtnIndex(){
            if(this.animate){
                return false;
            }
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

             this.stairsArray.some((item,index)=>{
                   if(scrollTop >= item.min && scrollTop < item.max){
 
                         this.btns.removeClass("active")
                         .eq(index).addClass("active");
                         return true;
                   }
             })
        }
        changeStairs(e){
            var target = e.currentTarget;
            var index = $(target).index();
            if(index === this.stairs.length) return false;
            //    console.log(index);
            this.btns.removeClass("active")
                      .eq(index).addClass("active");
                    //   console.log(this.stairsArray[index].min)
            $("html,body").animate({
             
                  "scrollTop" : this.stairsArray[index].min
            },()=>{
                  this.animate = false;
            })
            this.animate = true;
        }
        
    }
    var stair = new Stair();
    stair.init();
