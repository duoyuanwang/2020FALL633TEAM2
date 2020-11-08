
window.addEventListener("DOMContentLoaded", event => {
    document.getElementById("addlist").addEventListener("click", event => {
        addnewlist();
   });
   
});

function addnewlist() {
    text = '<div class="onlist" style="width:100%; height:50px;"><input type="text" class="newlist"></div><br>';
    document.getElementById("list").innerHTML = text;
}
