var list = document.getElementById("list-a");
var username = document.getElementById("username");
var password = document.getElementById("password");
var submit = document.getElementById("submit");
list.addEventListener("submit",submitdefault);
function submitdefault(evt){
    var e=evt || window.event;
    e.preventDefault();
}
username.addEventListener("blur",cPhone);
function cPhone(){
    var pho_reg = /^1[34578]\d{9}$/;
    var pho_str = username.value;
    if(!pho_reg.test(pho_str)){
        alert("输入错误")
    }else{
        
    }
}
password.addEventListener("blur",cKey);
function cKey(){
    var k_reg = /^[\d\w]{6,20}$/;
    var k_str = password.value;
    if(!k_reg.test(k_str)){
        alert("密码输入错误")
    }else{
        
    }
}
submit.addEventListener("click",login);
function login(){
     var usr_str = username.value;
     var pwd_str = password.value;
     var data = {
           username : usr_str,
           password : pwd_str
     }
     ajaxPost("http://localhost/yiguoshengxian/interface/login.php",data)
     .then(function(res){  
           console.log(res);
     })
}
function ajaxPost(url,data){
     return new Promise(function(resolve,reject){
           var xhr = new XMLHttpRequest();
           xhr.open("POST",url);
           xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
           var data_str = "";
           for(var attr in data){
                 if(data_str.length !== 0){
                     data_str += "&";
                 }
                 data_str += attr + "=" + data[attr];
           }
           xhr.send(data_str);

           xhr.onreadystatechange = function(){
                 if(xhr.readyState === 4 && xhr.status === 200){
                       resolve(xhr.response);
                 }
           }

     })
}