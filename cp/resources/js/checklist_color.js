//**** uncheck_box ***************************************
// Performs ajax call to remove a reminder from an order
// checklist.  Also creates spinner.
//********************************************************
function uncheck_box(order_id, check_id)
{
	//alert('uncheck: ' + order_id + " - " + check_id);
	var cb_id = "cb_" + order_id + "_" + check_id;		
	var cb = document.getElementById(cb_id);
	cb.innerHTML = "<i class='fas fa-spinner fa-pulse'></i>";

	make_ajax_call("/ajax_query/","cmd=uncheck_checklist&order=" + encodeURIComponent(order_id) 
													+ "&check=" + encodeURIComponent(check_id), 
																	"uncheck_callback");
}

//**** check_box *****************************************
// Performs ajax call to add a reminder to an order
// checklist.  Also creates spinner.
//********************************************************
function check_box(order_id, check_id)
{
	//alert('check: ' + order_id + " - " + check_id);
	var cb_id = "cb_" + order_id + "_" + check_id;		
	var cb = document.getElementById(cb_id);
	cb.innerHTML = "<i class='fas fa-spinner fa-pulse'></i>";

	make_ajax_call("/ajax_query/","cmd=check_checklist&order=" + encodeURIComponent(order_id) 
													+ "&check=" + encodeURIComponent(check_id), 
																	"check_callback");
}

//**** check_callback ************************************
// If successful, it checks the checkbox, and updates the
// color.  If fail, it returns the checkbox to the 
// unchecked state.
//********************************************************
function check_callback(rsp)
{
	var order_id = decodeURIComponent(rsp['order']);
	var check_id = decodeURIComponent(rsp['check']);

	var cb_id = "cb_" + order_id + "_" + check_id;
	var cb = document.getElementById(cb_id);

	if (rsp['success']==1)
	{
		var str = "";
		for (var prop in rsp)
		{
			str += prop + ": " + decodeURIComponent(rsp[prop]) +"\n";
		}
		//alert(str);
		
		//update the two fields:
		var dbox_id = "d_" + order_id + "_" + check_id;
		var dbox = document.getElementById(dbox_id);

		cb.innerHTML = "<i class='fas fa-check-square'></i>";

		cb.onclick = function() {
			uncheck_box(order_id, check_id); 
		}

		var color = dbox.style.color;
		dbox.style.color = dbox.style.backgroundColor;
		dbox.style.backgroundColor = color;
		dbox.style.border = "";

	}
	else
	{
		cb.innerHTML = "<i class='far fa-square'></i>";
		var str = "";
		for (var prop in rsp)
		{
			str += prop + ": " + decodeURIComponent(rsp[prop]) +"\n";
		}
		alert ("Unable to update checklist.\n" + str);
	}		
}

//**** uncheck_callback **********************************
// If successful, it unchecks the checkbox, and updates the
// color.  If fail, it returns the checkbox to the 
// checked state.
//********************************************************
function uncheck_callback(rsp)
{
	var order_id = decodeURIComponent(rsp['order']);
	var check_id = decodeURIComponent(rsp['check']);

	var cb_id = "cb_" + order_id + "_" + check_id;
	var cb = document.getElementById(cb_id);

	if (rsp['success']==1)
	{
		var str = "";
		for (var prop in rsp)
		{
			str += prop + ": " + decodeURIComponent(rsp[prop]) +"\n";
		}
		//alert(str);
		
		//update the two fields:
		var dbox_id = "d_" + order_id + "_" + check_id;
		var dbox = document.getElementById(dbox_id);

		cb.innerHTML = "<i class='far fa-square'></i>";
		
		cb.onclick = function() {
			check_box(order_id, check_id); 
		}

		var color = dbox.style.color;
		dbox.style.color = dbox.style.backgroundColor;
		dbox.style.backgroundColor = color;
		dbox.style.border = "1px solid #777777";
	}
	else
	{
		cb.innerHTML = "<i class='fas fa-check-square'></i>";
		var str = "";
		for (var prop in rsp)
		{
			str += prop + ": " + decodeURIComponent(rsp[prop]) +"\n";
		}
		alert ("Unable to update checklist.\n" + str);
	}		
}

//**** toggle_checkboxes *********************************
// Hides and shows checkboxes
//********************************************************
function toggle_checkboxes(id) 
{
    var div = document.getElementById(id);
    div.style.display = div.style.display == "none" ? "block" : "none";
}