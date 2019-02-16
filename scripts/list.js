var $container = $(".list")
$.ajax("./data/yiguo.json",{
    type:"get"
})
.then(render)
function render(res){
    console.log(res.list);
    list = res.list;
    var html = template("list-item",{list:list})
    $container.html(html);
}