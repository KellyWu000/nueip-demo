

//重新填寫 新增    
$(".refreshVal").on("click",function(e){

  $("#addform")[0].reset();
})
//重新填寫 搜尋    
$(".refreshVal").on("click",function(e){
    console.log(e.target);
    $("#searchform")[0].reset();
})
// 重新填寫  修改
$(".refreshVal").on("click",function(e){
    console.log(e.target);
    $("#modifyform")[0].reset();
})



$(document).ready(function () {
    // alert('abc');
    var url = "ajax/ajaxCard";
    var ajaxobj = new AjaxObject(url, 'json');
    ajaxobj.getall();

    // 新增按鈕
    $("#addbutton").click(function (e) {
        e.preventDefault(); // avoid to execute the actual submit of the form.
        var url = "ajax/ajaxCard";
        var cnname = $("#addcnname").val();
        var enname = $("#addenname").val();
        var email =$("#email").val();
        var mobile=$("#mobile").val();
        var sex = $('input:radio:checked[name="addsex"]').val();
        var ajaxobj = new AjaxObject(url, 'json');
        ajaxobj.cnname = cnname;
        ajaxobj.enname = enname;
        ajaxobj.email = email;
        ajaxobj.mobile = mobile;
        ajaxobj.sex = sex;
//驗證手機號碼

    if($('#mobile').val()==""){
         $('#mobile_info').html('此欄位不得為空').css('color','red');
       

         
      }
       if($('#email').val()==""){
        $('#email_info').html('此欄位不得為空').css('color','red');
        return false;
     }

 
      if (!$("#mobile").val().match(/^09\d{8}$/)) {
        $('#mobile_info').html("手機號碼格式不正確").css('color','red');
        return false;
     }
    

     

 if (!$("#email").val().match(/^([\w\.\-]){1,64}\@([\w\.\-]){1,64}$/)) {
    $('#email_info').html("郵箱格式不正確").css('color','red');
    return false;
 }

        ajaxobj.add();
    })
 
  
    // 修改鈕
    $("#cardtable").on('click', '.modifybutton', function () {
        var ajaxobj = new AjaxObject(url, 'json');
        ajaxobj.modify_get();
    })
 

 
});
//刪除鈕
  $('#delBtn').on('click',function(){
    var deleteid = $(this).attr('id').substring(12);
    var url = "ajax/ajaxCard";
    var ajaxobj = new AjaxObject(url, 'json');
    ajaxobj.id = deleteid;
    ajaxobj.delete();
  })
    
   


function refreshTable(data) {
    // var HTML = '';
    $("#cardtable tbody > tr").remove();
    $.each(data, function (key, item) {
        var strsex = '';
        if (item.sex == 0)
            strsex = '男';
        else
            strsex = '女';
        var row = $("<tr></tr>");
        
        row.append($("<td></td>").html(`<a href="#" class="tooltip-test text-dark text-decoration-none"  data-toggle="tooltip" data-placement="top" title="${item.cnname}${item.enname}-${strsex}">${item.cnname}
       </a>`));
        row.append($("<td></td>").html(item.enname));
        row.append($("<td></td>").html(item.mobile));
        row.append($("<td></td>").html(item.email));
        row.append($("<td></td>").html(strsex));
        row.append($("<td></td>").html('<button id="modifybutton' + item.s_sn + '"type="button" class="modifybutton btn btn-info"  data-toggle="modal"  data-target="#adjustModal" style="font-size:16px;font-weight:bold; ;outline:"none";>修改 <span class="glyphicon glyphicon-list-alt"></span></button>'));
        row.append($("<td></td>").html('<button id="deletebutton' + item.s_sn + '" type="button" class="deletebutton  btn btn-outline-danger"  data-toggle="modal"  data-target="#confirmModal" ;style="font-size:16px;font-weight:bold; ">刪除 <span class="glyphicon glyphicon-trash"></span></button>'));
        $("#cardtable").append(row);
    });
}




function initEdit(response) {
  var modifyid = $("#cardtable").attr('id').substring(12);
  $.each(response,function(key,item){

  })
  $("#mocnname").val(response[0].cnname);
  $("#moenname").val(response[0].enname);
  if (response[0].sex == 0) {
      $("#modifyman").prop("checked", true);
      $("#modifywoman").prop("checked", false);
  }
  else {
      $("#modifyman").prop("checked", false);
      $("#modifywoman").prop("checked", true);
  }
  $("#modifysid").val(modifyid);
 

}

/**
 * 
 * @param string
 *          url 呼叫controller的url
 * @param string
 *          datatype 資料傳回格式
 * @uses refreshTable 利用ajax傳回資料更新Table
 */
function AjaxObject(url, datatype) {
    this.url = url;
    this.datatype = datatype;
}
AjaxObject.prototype.cnname = '';
AjaxObject.prototype.mobile = '';
AjaxObject.prototype.email = '';
AjaxObject.prototype.enname= '';
AjaxObject.prototype.sex = '';
AjaxObject.prototype.id = 0;
AjaxObject.prototype.alertt = function () {
    alert("Alert:");
}

AjaxObject.prototype.getall = function () {
  response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","mobile":"0978907345","email":"123@gmail.com","sex":"0"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","mobile":"0978907345","email":"123@gmail.com","sex":"0"},{"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","mobile":"0978907345","email":"123@gmail.com","sex":"0"},{"s_sn":"51","cnname":"賴佳蓉","enname":"Yoki","mobile":"0978907345","email":"123@gmail.com","sex":"1"}]';
    refreshTable(JSON.parse(response));
  }
  AjaxObject.prototype.add = function () {
    response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","mobile":"0978907345","email":"123@gmail.com","sex":"0"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","mobile":"0978907345","email":"123@gmail.com","sex":"0"},{"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","mobile":"0978907345","email":"123@gmail.com","sex":"0"},{"s_sn":"51","cnname":"賴佳蓉","enname":"Yoki","mobile":"0978907345","email":"123@gmail.com","sex":"1"},{"s_sn":"52","cnname":"新增帳號","enname":"NewAccount","mobile":"0978907345","email":"123@gmail.com","sex":"1"}]';
  
    refreshTable(JSON.parse(response));
    $("#dialog-addconfirm").dialog("close");
  }
  AjaxObject.prototype.modify = function () {
    response = '[{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0"}]';
    refreshTable(JSON.parse(response));
    $("#dialog-modifyconfirm").dialog("close");
  }
  AjaxObject.prototype.modify_get = function () {
    response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","mobile":"0978907345","email":"123@gmail.com","sex":"0"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","mobile":"0978907345","email":"123@gmail.com","sex":"0"},{"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","mobile":"0978907345","email":"123@gmail.com","sex":"0"},{"s_sn":"51","cnname":"賴佳蓉","enname":"Yoki","mobile":"0978907345","email":"123@gmail.com","sex":"1"}]';
  }
  AjaxObject.prototype.search = function () {
    response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0"}]';
    refreshTable(JSON.parse(response));
    $("#dialog-searchconfirm").dialog("close");
  }
  AjaxObject.prototype.delete = function () {
    response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0"},{"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","sex":"0"}]';
    refreshTable(JSON.parse(response));
  }
  



