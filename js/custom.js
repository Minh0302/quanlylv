var custom = {
  Init: function () {
    $(".date-picker").datepicker({ dateFormat: 'dd-M-yy' });
    //xét giá trị lớn nhất cho Create date
    $('.dtFrom').datepicker({
      dateFormat: 'dd-M-yy',
      onClose: function (selectedDate) {
        $(".dtTo").datepicker("option", "minDate", selectedDate);
      }
    });

    $(".accordion").accordion();
    $(".numeric").numeric();
    //xóa ký tự nếu di chuyển hoặc copy ký tự vào kiểu số
    $(".numeric").on("input propertychange", function () {
      if (this.value != "") {
        return this.value = $(this).val().replace(/[^0-9\.]/g, '');
      }
    });

    $(".readonly").attr('readonly', true);
  }  
};

function IsEmpty(obj) {
  //return (typeof obj === "undefined" || obj == null || obj.length == 0);
	var retVal = ($(obj).val().length == 0);
	return retVal;
}

function DisplayMessageByID(divID,boldMessage,message,type){
	if(message.length==0)
		$('#'+divID).html('');
	else
		$('#'+divID).html(AlertMesage(boldMessage,message,type));
}

function DisplayMessage(boldMessage,message,type){
	$('#divModalProcessInfo').html(AlertMesage(boldMessage,message,type));
}

function AddNewRow(table, rowcontent) {
	if ($(table).length > 0) {
		if ($(table + ' > tbody').length == 0) $(table).append('<tbody />');
		($(table + ' > tr').length > 0) ? $(table).children('tbody:last').children('tr:last').append(rowcontent) : $(table).children('tbody:last').append(rowcontent);
	}
}

function RemoveRow(element) {
	  var tr = $(element).closest('tr');
	  tr.remove();
}

function TableRemoveRow(element) {
	var tableId = $(element).closest('table').attr('id'); 
	var otable = $('#'+tableId).DataTable(); 
	var tr = $(element).closest('tr'); 
	otable.row(tr).remove().draw();
}

function isNumber(evt) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
};

//1-Info; 2-Warning;3-Error;4-Success
function AlertMesage(BoldMessage, Message, MesageType){
	var html="";
	if(MesageType==1)	//Infor
		html+="<div class=\"alert alert-info\"> \r\n";
	else if(MesageType==2)	
		html+="<div class=\"alert alert-warning\"> \r\n";
	else if(MesageType==3)	
		html+="<div class=\"alert alert-error\"> \r\n";
	else if(MesageType==4)	
		html+="<div class=\"alert alert-success\"> \r\n";
		
	html+="	<button data-dismiss=\"alert\" class=\"close\" type=\"button\"> \r\n";
	html+="		<i class=\"icon-remove\"></i> \r\n";
	html+="	</button> \r\n";
	html+="	<strong>" + BoldMessage + "</strong> \r\n";
	html+=Message;
	html+="	<br> \r\n";
	html+="</div> \r\n";
	return html;
}

function SetDefaultValueByDiv(divID){
	$('#' + divID).find('input[type=text]').val('');
	$('#' + divID).find('select').val('');
}

jQuery.fn.highlight = function(pat) {
 function innerHighlight(node, pat) {
  var skip = 0;
  if (node.nodeType == 3) {
   var pos = node.data.toUpperCase().indexOf(pat);
   pos -= (node.data.substr(0, pos).toUpperCase().length - node.data.substr(0, pos).length);
   if (pos >= 0) {
    var spannode = document.createElement('span');
    spannode.className = 'highlight';
    var middlebit = node.splitText(pos);
    var endbit = middlebit.splitText(pat.length);
    var middleclone = middlebit.cloneNode(true);
    spannode.appendChild(middleclone);
    middlebit.parentNode.replaceChild(spannode, middlebit);
    skip = 1;
   }
  }
  else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
   for (var i = 0; i < node.childNodes.length; ++i) {
    i += innerHighlight(node.childNodes[i], pat);
   }
  }
  return skip;
 }
 return this.length && pat && pat.length ? this.each(function() {
  innerHighlight(this, pat.toUpperCase());
 }) : this;
};

jQuery.fn.removeHighlight = function() {
 return this.find("span.highlight").each(function() {
  this.parentNode.firstChild.nodeName;
  with (this.parentNode) {
   replaceChild(this.firstChild, this);
   normalize();
  }
 }).end();
};
