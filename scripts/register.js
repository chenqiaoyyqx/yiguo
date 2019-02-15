var pcode = document.getElementById("pcode");
// var phone = document.getElementById("phone");
var code = document.getElementById("code");
// var key = document.getElementById("key");
var skey = document.getElementById("skey");
var icode = document.getElementById("icode");
var check = document.getElementById("check");
var submit = document.getElementById("submit");
var username = document.getElementById("username");
var password = document.getElementById("password");
var list=document.getElementById("list");
list.addEventListener("submit",submitdefault);
function submitdefault(evt){
    var e=evt || window.event;
    e.preventDefault();
}
pcode.addEventListener("blur",cMob);
function cMob(){
    var mob_reg = /\S/;
    var mob_str = pcode.value;
    if(!mob_reg.test(mob_str)){  
        $("#pic").removeClass("hide");
    }else{
        $("#pic").addClass("hide");
        }
}

username.addEventListener("blur",cPhone);
function cPhone(){
    var pho_reg = /^1[34578]\d{9}$/;
    var pho_str = username.value;
    if(!pho_reg.test(pho_str)){
        $("#mp").removeClass("hide");
    }else{
        $("#mp").addClass("hide");
    }
}
code.addEventListener("blur",cOde);
function cOde(){
    var cod_reg = /\S/;
    var cod_str = code.value;
    if(!cod_reg.test(cod_str)){
        $("#yc").removeClass("hide");
    }else{
        $("#yc").addClass("hide");
    }
}
password.addEventListener("blur",cKey);
function cKey(){
    var k_reg = /^[\d\w]{6,20}$/;
    var k_str = password.value;
    if(!k_reg.test(k_str)){
        $("#mm").removeClass("hide");
    }else{
        $("#mm").addClass("hide");
    }
}
skey.addEventListener("blur",cSkey);
function cSkey(){
    var k = password.value;
    var sk = skey.value;
    if(k === sk){
        $("#qm").addClass("hide");
    }else{
        $("#qm").removeClass("hide");
    }
}
icode.addEventListener("blur",icOde);
function icOde(){
    var cod_reg = /\S/;
    var cod_str = icode.value;
    if(!cod_reg.test(cod_str)){
        $("#qc").removeClass("hide");
    }else{
        $("#qc").addClass("hide");
    }
}
check.addEventListener("click",cHeck);
function cHeck(){
    if(check.checked == true){
        $("#ty").addClass("hide");
    }else{
        $("#ty").removeClass("hide");
    }
}
submit.addEventListener("click",submitForm)
            function submitForm(evt){
                  var e = evt || window.event;                
                  var bs = document.querySelectorAll("#list b");
                  bs = Array.from(bs);
                  var res = bs.every(function(item){
                        return item.className === "hide";
                        
                  })

                  if(res === false){
                        e.preventDefault();
                        bs.forEach(function(item){
                            item.className = "";
                        })
                  }else{
                    item.className = "error";
                    
                }
            }    
            submit.addEventListener("click",register);
             function register(){
                 if($("#pic").className="hide"){
                    var usr_value = username.value;
                    var pwd_value = password.value;
                    var url = "http://localhost/yiguoshengxian/interface/register.php";
                    url += `?username=${usr_value}&password=${pwd_value}`;
                    ajaxGet(url)
                    .then(function(res){
                          console.log(res);
                    })
               }
               function ajaxGet(url){
                  
                    return new Promise(function(resolve,reject){
                          var xhr = new XMLHttpRequest();
                          xhr.open("GET",url);
                          xhr.send(null);
                          xhr.onreadystatechange = function(){
                                if(xhr.readyState === 4 && xhr.status === 200){
                                      resolve(xhr.response);
                                      if(JSON.parse(xhr.response).stateCode == "1" ){
                                          // alert("注册成功")
                                          location.href="login.html"
                                      }
                                }
                                
      
                          }
                    })
               }
  
                 
                }