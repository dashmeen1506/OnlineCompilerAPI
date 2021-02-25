function compile()
{
    var code=document.getElementById("textcode").value;
    var langid=document.getElementById("langid").value;
    
    if(code !="")
    {
        fetchData(code,langid);
    }
    else
    {
        alert("Please type your code");
    }
}
function fetchData(code,langid)
{
    var request=new XMLHttpRequest();
    request.open("POST","https://codequotient.com/api/executeCode");
    var obj=JSON.stringify({code,"langId": langid});
    request.setRequestHeader("Content-Type","application/json");
    request.send(obj);
    
    request.addEventListener("load",function(event){
        var response = JSON.parse(event.currentTarget.responseText);
        if(response.codeId != null)
            print(response.codeId);
    });
}

function print(codeId)
{
    var text=document.getElementById("output");
    var request=new XMLHttpRequest();
    request.open("GET","https://codequotient.com/api/codeResult/"+codeId);
    request.send();
    request.addEventListener("load",function(event){
    var out=JSON.parse(JSON.parse(request.responseText).data);
            //out=JSON.parse(out);
    var status=out.status;
    if(status=="Pending")
        print(codeId);
    else if(out.output!="")
        text.innerHTML=out.output;
    else
        text.innerHTML=out.errors;
    });
}
