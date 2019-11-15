var tbody;//table body: tbody = $("#todo").find("tbody");
var content = new Array(), oldIndex;//content in the table
var trs;//table rows
function ascend()
/*sort the table in ascending order*/
{
    content.sort();
    for (var i = 0; i < 3; i++){
        for (var j = 0; j < 3; j++){
            var tbcell = $(trs[j]).find("td");
            if ($(tbcell[oldIndex]).html() == content[i]) {
                tbody.append(trs[j]);
            }
        }
    }
}

function descend()
/*sort the table in descending order*/
{
    content.sort();
    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 3; j++) {
            var tbcell = $(trs[j]).find("td");
            if ($(tbcell[oldIndex]).html() == content[i]) {
                tbody.append(trs[j]);
            }
        }
    }
}
window.onload = function(){
    $("table th").click(Sorting);
}

/*sort the table when td is clicked*/
function Sorting(){
    initializing(this);
    /*clear the content*/
    content.splice(0,content.length); 
    oldIndex = $(this).index();
    $(trs).find("td").each(ContentCopy);
    TypeSwichingAndSorting(this);
}
/*initializing the trs and tbody */
function initializing(tag){
    if ($(tag).parents("table").attr('id') == "todo"){
        trs = $("#todo").find("tbody tr");
        tbody = $("#todo").find("tbody");
    } 
    if($(tag).parents("table").attr('id') == "staff"){
        trs = $("#staff").find("tbody tr");
        tbody = $("#staff").find("tbody");
    }
}
/*copy the content of trs to content*/
function ContentCopy(){
    if ($(this).index() == oldIndex){
        content.push($(this).text());
    } 
}
/*change the style and sort the table*/
function TypeSwichingAndSorting(tag){
    if ($(tag).hasClass("ascend")){
        /*change*/
        $("th").removeClass();
        $(tag).addClass("descend");
        /*sort*/
        descend();
    } 
    else{
        /*change*/
        $("th").removeClass();
        $(tag).addClass("ascend");
        /*sort*/
        ascend();
        
    }
}



