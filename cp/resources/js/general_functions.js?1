// JavaScript Document

//TRIM POLYFILL FOR OLDER BROWSERS//
//	...eyes on you, IE...	 //
if( ! "trim" in String.prototype )
	String.prototype.trim = function() { this.replace(/^\s*/, '').replace(/\s*$/, ''); };

String.prototype.ersPaddingLeft = function(paddingValue)
{
	return String(paddingValue + this).slice(-paddingValue.length);
}

loader_script_arr = new Array();
function add_loader_script(str)
{
	loader_script_arr[loader_script_arr.length] = str;
}

function run_loader_scripts()
{
	for(n=0; n<loader_script_arr.length; n++)
	{
		var script_str = loader_script_arr[n];
		eval(script_str);
	}
}

window.onload = run_loader_scripts;

function sort_js_array_by_key(jsarr,jskey) {
	// note that keys must be unique and must exist in all rows for this function to work properly
	var klist = new Array();
	var arr_by_keys = new Array();
	for(var k in jsarr) {
		var keyval = jsarr[k][jskey];
		arr_by_keys['K' + keyval] = jsarr[k];
		klist.push(keyval);
	}
	klist.sort();
	var newarr = new Array();
	for(var k=0; k<klist.length; k++) {
		var keyval = klist[k];
		newarr.push(arr_by_keys['K' + keyval]);
	}
	return newarr;
}

function is_dev_site()
{
	var wnlc = "" + window.location + "";
	if(wnlc.indexOf('_dev') > 1 || wnlc.indexOf('-dev') > 1)
	{
		return true;
	}
	else return false;
}

function append_html_to_id(areaid, newhtml, element_container)
{
	if(!element_container)
		element_container = 'div';
	newhtml = decode_escaped_string(newhtml);
	var t = document.createElement(element_container);
	t.innerHTML = newhtml;
	document.getElementById(areaid).appendChild(t);
	//document.getElementById(areaid).innerHTML += newhtml;
	return t;
}

function decode_escaped_string(str)
{
	str = str.replace(/\[_quot_\]/ig,"\"");
	str = str.replace(/\[_squot_\]/ig,"'");
	str = str.replace(/\[_lt_\]/ig,"<");
	str = str.replace(/\[_gt_\]/ig,">");
	str = str.replace(/\[_ls_\]/ig,"\\");
	str = str.replace(/\[_fs_\]/ig,"/");
	str = str.replace(/\[_nl_\]/ig,"\n");
	str = str.replace(/\[_qu_\]/ig,"?");
	return str;
}

function getObjPosition(obj,type,check_scroll)
{
	if (!obj)
	{
		return [];
	}

	if(!check_scroll) check_scroll = false;
	if(!type) type = "all";
	var curwidth = obj.offsetWidth;
	var curheight = obj.offsetHeight;
	var curleft = obj.offsetLeft;
	var curtop = obj.offsetTop;
	var offleft = 0;
	var offtop = 0;
		if(check_scroll) {
			if(obj.offsetParent != obj.parentNode) {
				offleft -= obj.parentNode.scrollLeft;
				offtop -= obj.parentNode.scrollTop;
				//console.log(obj.parentNode.className + ":" + obj.parentNode.scrollTop);
			}
		}


	while(obj.offsetParent)
	{
		obj = obj.offsetParent;
		curleft += obj.offsetLeft;
		curtop += obj.offsetTop;
		offleft += obj.offsetLeft;
		offtop += obj.offsetTop;
		if(check_scroll) {
			offleft -= obj.scrollLeft;
			offtop -= obj.scrollTop;
		}
	}
	var retval = new Array();
	retval[0] = curleft;
	retval[1] = curtop;
	retval[2] = curwidth;
	retval[3] = curheight;
	retval['left'] = curleft;
	retval['top'] = curtop;
	retval['width'] = curwidth;
	retval['height'] = curheight;
	retval['offleft'] = offleft;
	retval['offtop'] = offtop;
	if(type=="left" || type=="top" || type=="width" || type=="height") return retval[type];
	return retval;
}

function getElementByIdOrNode(node) {
	if( node instanceof HTMLElement ) return node;
	if( typeof node === "string" ) return document.getElementById(node);
	return null;
}

/***
 * elementDescendedFrom(element_id: string|Node, descendent_id: string|Node) -> success: bool
 * @returns success: bool
 *
 * Returns whether or not element_id is an ancestor of descendent_id in the
 * DOM tree.
 * */
function elementDescendedFrom(element_id,descendent_id)
{
	//JL: 2017.07.30
	//Added if statement to allow DOM nodes as parameters.
	//The old functionality is within the first `if`:
	if( typeof element_id === "string" ) {

		//begin old function//
		var str = "searching for: " + descendent_id;
		var obj = document.getElementById(element_id);
		str += "\n" + obj.id;
		if(obj.id==descendent_id) return true;
		while(obj.offsetParent)
		{
			obj = obj.offsetParent;
			str += "\n" + obj.id;
			if(obj.id==descendent_id) return true;
		}
		return false;
		//end old function//
	}

	if( element_id instanceof HTMLElement ) {

		var descendent = getElementByIdOrNode(descendent_id);
		if( obj === descendent ) return true;
		while( obj.parentNode && obj.parentNode.tagName !== "BODY" ) {
			obj = obj.parentNode;
			if( obj === descendent ) return true;
		}
	}
	return false;
}

function getElementPosition(element_id)
{
	var obj = document.getElementById(element_id);
	return getObjPosition(obj);
}

function getViewPortSize()
{
	var viewportwidth;
	var viewportheight;
	// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
	if (typeof window.innerWidth != 'undefined')
	{
		viewportwidth = window.innerWidth,
		viewportheight = window.innerHeight
	}
	// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
	else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0)
	{
		viewportwidth = document.documentElement.clientWidth,
		viewportheight = document.documentElement.clientHeight
	}
	// older versions of IE
	else
	{
		viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
		viewportheight = document.getElementsByTagName('body')[0].clientHeight
	}
	return new Array(viewportwidth, viewportheight);
}

function get_parent_element(parent_id)
{
	obj = document.getElementById("floating_window").parentNode;
	while(obj.id.substring(0,14)=="container_area")
		obj = obj.parentNode;
	return obj;
}

function add_value_to_select(selectbox,setval_id,setval_name) // add value to select box but don't select it
{
	for ( var i = 0; i < selectbox.options.length; i++ )
	{
		if ( selectbox.options[i].value == setval_id )
		{
			//selectbox.options[i].selected = true;
			return;
		}
	}
	selectbox.options[selectbox.options.length] = new Option(setval_name, setval_id, false, false); // last arg is selected (t/f)
}

function set_select_value(selectbox,setval_id,setval_name) // add value to select box if doesn't exist and select it
{
	for ( var i = 0; i < selectbox.options.length; i++ )
	{
		if ( selectbox.options[i].value == setval_id )
		{
			selectbox.options[i].selected = true;
			return;
		}
	}
	selectbox.options[selectbox.options.length] = new Option(setval_name, setval_id, false, true); // last arg is selected (t/f)
	//alert("value " + setval + " is not in the dropdown list yet");
}

function open_help_video(containerid,videoid)
{
	var setstr = "";
	if(videoid.indexOf(',') > 0)
	{
		setstr += "<table cellspacing=8 cellpadding=2>";
		videoid_list = videoid.split(',');
		for(var vh=0; vh<videoid_list.length; vh++)
		{
			var videoid_parts = videoid_list[vh].split(':');
			var current_videoid = videoid_parts[0];
			var video_title = "Video #" + (vh + 1);
			if(videoid_parts.length > 1)
			{
				video_title = videoid_parts[1];
			}
			setstr += "<tr>";
			setstr += "<td style='border:solid 1px #777777; width:240px; cursor:pointer; font-size:14px; color:#004400' align='left' bgcolor='#ccccdd' onmouseover='this.bgColor = \"#eeeef8\"' onmouseout='this.bgColor = \"#ccccdd\"' onclick='open_help_video(\"" + containerid + "\",\"" + current_videoid + "\")'>";
			//setstr += (vh + 1) + ")";
			setstr += "<table><tr><td valign='middle'><img src='/cp/images/video_camera.png' border='0' /></td>";
			setstr += "<td valign='middle' style='font-size:14px; color:#004400'>";
			setstr += "&nbsp;&nbsp;Watch \"" + video_title + "\"";
			setstr += "</td></tr></table>";

			setstr += "</td>";
			setstr += "</tr>";
		}
		setstr += "</table>";
	}
	else
	{
		setstr += "<table width='100%'><tr><td width='100%' align='center'><iframe allowfullscreen=\"\" frameborder=\"0\" height=\"315\" src=\"//www.youtube.com/embed/" + videoid + "\" width=\"560\"></iframe></td></tr></table>";
	}
	auto_reset_content_when_closed = true;
	open_floating_window(" ",setstr,"main_area");
	//document.getElementById(containerid).innerHTML = setstr;
}


/******* Help Stuff */

function cp_page_help_edit(action)
{
	// Action can be:
	// enable	- The edit button has been clicked, so display the edit controls and set up variables
	// save		- submit the new cp-page-help string to the server for save
	// cancel	- cancel

	if (action=='init')
	{
		window.cp_page_help_edit_mode = false;
	} else
	if (action=='enable')
	{
		window.cp_page_help_edit_mode = true;
		window.cp_page_help_edit_data = undefined;
	} else
	if (action=='save' && typeof window.page_area !== 'undefined')
	{
		new_data = cp_page_help_array_to_str(window.cp_page_help_edit_data);

		var ajax_data = {
			cmd:	"cp_page_help_update",
			data:	new_data,
			area:	window.page_area
		};

		$.ajax({
			type: 'POST',
			async: false,
			url: '/ajax_query/',
			data: ajax_data
		})
		.done(function(response)
		{
			// console.log("done");
		})
		.fail(function(error)
		{
			console.log('Failed: ' + error);
		})
		.always(function(message)
		{
		});

	} else
	if (action=='cancel')
	{
		window.cp_page_help_edit_mode = false;
		window.cp_page_help_edit_data = [];
	}
}

function cp_page_help_str_to_array(data)
{
	if (data == "")
		return [];

	var array_data	= [];
	var item_count	= 0;
	var split_items	= [];

	if (data.indexOf(',') === -1)
		split_items[0] = data;
	else
		split_items = data.split(',');


	split_items.forEach(function(item){
		item_parts = [];

		if (item.indexOf(":") === -1)
			item_parts[0] = item;
		else
			item_parts	= item.split(':');

		item_data	 = item_parts[0];
		item_data_raw = item_data;
		if (item_parts.length > 1)
			item_title = item_parts[1];
		else
			item_title = 'Item ' + ((item_count*1)+1);

		if (item_data.match(/(kb_search_)/))
		{
			item_type = 'kb_search';
			item_data = item_data.replace(/kb_search_/,"");
		} else
		if (item_data.match(/(kb_id_)/))
		{
			item_type = 'kb_id';
			item_data = item_data.replace(/kb_id_/,"");
		} else
		if (item_data.match(/zendesk/))
		{
			item_type = "zendesk";
			item_data = "https://dumpsterrentalsystems.zendesk.com/hc/en-us/";
		} else
		{
			item_type = 'youtube';
		}

		array_data[item_count] = {title: item_title, data: item_data, data_raw: item_data_raw, type:item_type};
		item_count++;
	});

	return array_data;
}

function cp_page_help_array_to_str(data)
{
	var str_data = "";
	var total_count = data.length;
	var count = 0;

	data.forEach(function(data_item){
		if (!data_item['data_raw'].match(/zendesk/))
		{
			str_data += `${data_item['data_raw']}:${data_item['title']}`;
			if (count < (total_count-1))
				str_data += ",";
		}
		count++;
	});

	return str_data;
}

function cp_page_help_row_action(action, id, args)
{
	// console.log(id+": "+action);

	if (action=="up" && id > 0)
	{
		temp = window.cp_page_help_edit_data[id-1];
		window.cp_page_help_edit_data[id-1] = window.cp_page_help_edit_data[id];
		window.cp_page_help_edit_data[id] = temp;
	} else
	if (action=="down" && id < (window.cp_page_help_edit_data.length-1))
	{
		temp = window.cp_page_help_edit_data[id+1];
		window.cp_page_help_edit_data[id+1] = window.cp_page_help_edit_data[id];
		window.cp_page_help_edit_data[id] = temp;
	} else
	if (action=="trash")
	{
		if(confirm(`Are you sure you want to delete this item?\n"${window.cp_page_help_edit_data[id]['title']}?"\n(This won't be final until you click save)`))
			window.cp_page_help_edit_data.splice(id,1);
	} else
	if (action=="add")
	{
		row_type		= $(`#new_row_type`).val();
		row_title		= $(`#new_row_title`).val();
		row_data		= $(`#new_row_data`).val();
		row_industries	= $(`#new_row_industries`).val();

		if (row_industries != '')
		{
			row_industries = row_industries.toLowerCase();
			row_title += " (product " + row_industries.replace(',',' ') + ")";
			console.log('present');
		} else
		{
			console.log('empty');
		}

		if (row_type == 'kb_search')
			raw_pre = "kb_search_";
		else if (row_type == 'kb_id')
			raw_pre = "kb_id_";
		else
			raw_pre = '';

		row_data_raw = raw_pre+row_data;

		window.cp_page_help_edit_data[(window.cp_page_help_edit_data.length)] = {
			type:		row_type,
			title:		row_title,
			data:		row_data,
			data_raw:	row_data_raw
		};
	} else
	{
		// console.log ('limit');
		return;
	}
	// console.log("args:");
	// console.log(args);
	open_cp_page_help_content(args['containerid'],args['content_data'],args['header'],args['back'],args['show_edit']);
}

function open_cp_page_help_content(containerid,content_data,header,back="", show_edit="")
{
	header_display = header;

	// console.log(content_data);

	if (typeof window.cp_page_help_edit_mode === 'undefined')
	{
		cp_page_help_edit('init');
		var cp_help_data = cp_page_help_str_to_array(content_data);
	} else
	if (window.cp_page_help_edit_mode === true)
	{
		if (typeof window.cp_page_help_edit_data === 'undefined' || window.cp_page_help_edit_data.length === 'init')
			window.cp_page_help_edit_data = cp_page_help_str_to_array(content_data);

		var cp_help_data = window.cp_page_help_edit_data;
	} else
	{
		var cp_help_data = cp_page_help_str_to_array(content_data);
	}

	// console.log('cp_help_data:', cp_help_data);

	var output = "";

	if (cp_help_data.length > 1 || cp_help_data.length == 0 || window.cp_page_help_edit_mode === true || content_data.match(/zendesk/))
	{
		// Multiple Items Listing
		if (window.cp_page_help_edit_mode === true)
		{
			var cp_page_help_row_template = `<tr><td>ICON&nbsp;&nbsp;&nbsp;TITLE</td><td class='text-right'>UP DOWN TRASH</td></tr>`;
			var cp_page_help_row_template_zendesk = cp_page_help_row_template;
		} else
		{
				var cp_page_help_row_template_zendesk = `<tr><td class='zendesk_link'>ICON&nbsp;&nbsp;&nbsp;<a href='LINK' target='_blank'>TITLE</a></td><td>&nbsp;</td></tr>`;
				var cp_page_help_row_template		 = `<tr><td LINK>ICON&nbsp;&nbsp;&nbsp;TITLE</td><td class='text-right'>UP DOWN TRASH</td></tr>`;
				// var cp_page_help_row_template		= `<tr><td LINK>ICON&nbsp;&nbsp;&nbsp;TITLE</td></tr>`;
		}
		output += `<table class='table table-striped table-hover cp_page_help_table'>`;

		cp_help_data.forEach(function(data_item, key){

			if (!window.lv)
				display_title = data_item['title'].replace(/\(products?\s*?([^\)]*)\)/,"");
			else
				display_title = data_item['title'];

			// Don't display row if it's not the right industry (unless it's a level 12)
			if (data_item['title'].match(/\(product/) && !window.lv)
			{
				row_industries = data_item['title'].match(/\(products?\s*?([^\)]*)\)/);
				if (!row_industries[1].match(window.my_industry))
					return;
			}

			if (data_item['type'].match(/kb/))
				data_icon = `<i class='fal fa-fw fa-file-alt' style='font-size: 20px;'></i>`;
			else
			if (data_item['type'].match(/zendesk/))
				data_icon = `<i class="fas fa-fw fa-globe-americas" style='font-size: 20px;'></i>`;
			else
				data_icon = `<i class='fal fa-fw fa-video' style='font-size: 20px;'></i>`;

			if (window.cp_page_help_edit_mode === true && !data_item['type'].match(/zendesk/))
			{
				args			= `{containerid: "${containerid}", content_data: "${content_data}", header: "${header}", back: "${back}", show_edit: "${show_edit}"}`;
				data_link		= "";
				button_up		= `<button class='btn btn-xs btn-default cp_page_help_row_button' type='button' onclick='cp_page_help_row_action("up",${key}, ${args});'><i class="far fa-arrow-alt-up fa-fw"></i></button>`;
				button_down		= `<button class='btn btn-xs btn-default cp_page_help_row_button' type='button' onclick='cp_page_help_row_action("down",${key}, ${args});'><i class="far fa-arrow-alt-down fa-fw"></i></button>`;
				button_trash	= `<button class='btn btn-xs btn-default cp_page_help_row_button' type='button' onclick='cp_page_help_row_action("trash",${key}, ${args});'><i class="fal fa-trash-alt fa-fw"></i></button>`;
				row_template	= cp_page_help_row_template;
			} else
			if (data_item['type'].match(/zendesk/))
			{
				data_link		= data_item['data'];
				button_up		= "";
				button_down		= "";
				button_trash	= "";
				row_template	= cp_page_help_row_template_zendesk;
			} else
			{
				data_link		= `onclick='open_cp_page_help_content("${containerid}", "${data_item['data_raw']}:${display_title}", "${header}", "${content_data}", "${show_edit}")'`;
				button_up		= "";
				button_down		= "";
				button_trash	= "";
				row_template	= cp_page_help_row_template;
			}

			if (window.cp_page_help_edit_mode === false || (window.cp_page_help_edit_mode === true && !data_item['type'].match(/zendesk/)))
				output += row_template.replace(/LINK/g,data_link).replace(/ICON/g,data_icon).replace(/TITLE/g,display_title).replace(/UP/g,button_up).replace(/DOWN/g,button_down).replace(/TRASH/g,button_trash);

		});

		if (window.cp_page_help_edit_mode === true)
		{
			args = `{containerid: "${containerid}", content_data: "${content_data}", header: "${header}", back: "${back}", show_edit: "${show_edit}"}`;
			output += `<tr><td class='bg-info'>
			<div class='form-group col-xs-12 col-md-3'>
				<label for='type'>Content Type</label>
				<select class='form-control' id="new_row_type" name="type">
					<option value="video" selected>Youtube Video</option>
					<option value="kb_search">Knowledge Base Search</option>
					<option value="kb_id">Knowledge Base ID</option>
				</select>
			</div>
			<div class='form-group col-xs-12 col-md-3'>
				<label for='title'>Title</label>
				<input class='form-control' type='text' id='new_row_title' name='title'>
			</div>
			<div class='form-group col-xs-12 col-md-3'>
				<label for='data'>Data</label>
				<input class='form-control' type='text' id='new_row_data' name='data'>
			</div>
			<div class='form-group col-xs-12 col-md-3'>
				<label for='data'>Industries <button tabindex="-1" type="button" class="btn btn-default btn-xs" data-toggle="tooltip" data-placement="top" title="List one or more industries separated with spaces, or leave blank to be visible for all industries.">?</button></label>
				<input class='form-control' type='text' id='new_row_industries' name='industries' placeholder='eg: "bounce dumpster fec"'>
			</div>
			</td><td class='text-right bg-info' style='vertical-align: middle;'><button style='margin-right: 5px;' class='btn btn-success' type='button' onclick='cp_page_help_row_action("add",0, ${args});'>Add</button></td>`;
			window.setTimeout(function () {$('[data-toggle="tooltip"]').tooltip();});
		}
		output += `</table>`;
	} else
	{
		// Single Content Item
		if (back.indexOf(',') > 0)
			back_button = `<h4><a href='#' onclick='open_cp_page_help_content("${containerid}","${back}","${header}","","${show_edit}");'><i class="far fa-backward"></i> Back</a></h4>`;
		else
			back_button = '';

		if (cp_help_data[0]['type'].match(/(kb_(search|id))/))
		{
			var ajax_data = {
				cmd:	"ers_help",
				mode:	"search",
				search:	cp_help_data[0]['data_raw'].replace(/kb_search_/,"").replace(/^kb_id_/,"id:")
			};

			$.ajax({
				type: 'POST',
				async: false,
				url: '/ajax_query/',
				data: ajax_data
			})
			.done(function(response)
			{
				adj_response = decodeQueryString(response);
				output += back_button + "<div class='eh_sections_container'>" + adj_response['content'] + "</div>";
			})
			.fail(function(error)
			{
				console.log('Failed: ' + error);
			})
			.always(function(message)
			{
			});
		} else
		{
			if (cp_help_data[0]['data'].match(/\?/))
				d = "&";
			else
				d = "?";

			data_link = "//www.youtube.com/embed/" + cp_help_data[0]['data'] + d + 'autoplay=1';
			// data_link = "http://youtu.be/" + cp_help_data[0]['data'];

			output += back_button + `<div class='cp_page_help_video_wrapper'><iframe allowfullscreen="" allow='autoplay' frameborder="0" class="cp_page_help_video_iframe" src="${data_link}"></iframe></div>`;
		}

		if (!window.lv)
			display_title = cp_help_data[0]['title'].replace(/\(products?\s*?([^\)]*)\)/,"");
		else
			display_title = cp_help_data[0]['title'];

		header_display = header + " - " + display_title;
	}

	edit_button = "";
	if (show_edit == "yes" && back=="")
	{
		if (window.cp_page_help_edit_mode === true)
		{
			edit_button += `<button id='button_cp_help_Save' class='btn btn-sm btn-success' style='margin-left: 15px;' type='button' onclick='cp_page_help_edit("save"); location.reload();'>Save</button> `;
			edit_button += `<button id='button_cp_help_Cancel' class='btn btn-sm btn-danger' style='margin-left: 15px;' type='button' onclick='cp_page_help_edit("cancel"); open_cp_page_help_content("${containerid}","${content_data}","${header}","","yes");'>Cancel</button>`;
			edit_button += `<a target='_blank' class='btn btn-sm btn-default' style='margin-left:15px; type='button' href='${window.appConfig.filesURL}/cp/upload/default_dev/HelpHelp.mp4'>Help Help</a>`;
		} else
		{
			edit_button = `<button id='button_cp_help_Edit' class='btn btn-sm btn-warning' style='margin-left: 15px;' type='button' onclick='cp_page_help_edit("enable"); open_cp_page_help_content("${containerid}","${content_data}","${header}","","yes");'>Edit</button>`;
		}
	}

	auto_reset_content_when_closed = true;
	open_floating_window("<h3>Control Panel Help: " + header_display + edit_button + "</h3>",output,"main_area",'90vw');
}

/******* End Help Stuff */

function advance_time(t,add)
{
	var t_mins = t % 100;
	var t_hours = t - t_mins;
	var add_mins = add % 100;
	var add_hours = add - add_mins;

	var set_hours = t_hours + add_hours;
	var set_mins = t_mins + add_mins;
	if(set_mins >= 60)
	{
		set_hours += 100;
		set_mins -= 60;
	}

	return (set_hours * 1 + set_mins * 1);
}
function display_time(t)
{
	if(typeof(t)=="String" && t.indexOf(':') > 0) {
		t = t.replace(/\:/ig,'');
	}

	var t_mins = t % 100;
	var t_hours = (t - t_mins) / 100;

	if(t_mins < 10) t_mins = "0" + (t_mins * 1);
	if(t_hours==0) { t_hours = 12; t_ampm = "am"; }
	else if(t_hours==24) { t_hours = 12; t_ampm = "am"; }
	else if(t_hours > 24) { t_hours -= 24; t_ampm = "am"; }
	else if(t_hours==12) { t_ampm = "pm"; }
	else if(t_hours > 12) { t_hours -= 12; t_ampm = "pm"; }
	else { t_ampm = "am"; }

	return t_hours + ":" + t_mins + t_ampm;
}
function unescape_decode(dstr)
{
	return unescape(dstr.replace(/\+/ig,' '));
}
function ersCurrentUnixTimestamp()
{
	return Math.floor(Date.now() / 1000);
}
function ersCurrentDateTime(joined)
{
	var d = new Date();

	var year	= d.getFullYear();
	var month	= (d.getMonth() + 1);
	var day		= d.getDate();
	var hour	= d.getHours();
	var minute	= d.getMinutes();
	var second	= d.getSeconds();

	month	= month.toString().ersPaddingLeft("00");
	day		= day.toString().ersPaddingLeft("00");
	hour	= hour.toString().ersPaddingLeft("00");
	minute	= minute.toString().ersPaddingLeft("00");
	second	= second.toString().ersPaddingLeft("00");

	if (joined)
	{
		return year + "" + month + "" + day + "" + hour + "" + minute + "" + second;
	}
	else
	{
		return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
	}
}
function ersDateStringFromDate(d)
{
	var year	= d.getFullYear();
	var month	= (d.getMonth() + 1);
	var day		= d.getDate();

	month	= month.toString().ersPaddingLeft("00");
	day		= day.toString().ersPaddingLeft("00");

	return year + "-" + month + "-" + day;
}
function ersIsValidDate(date_str, boolean)
{
	var dashed	= ersVS(date_str).split("-");
	var slashed	= ersVS(date_str).split("/");
	var dparts	= [];
	var sep		= "";

	if (dashed.length >= 3)
	{
		sep = "-";
		dparts = dashed;
	}
	else if (slashed.length >= 3)
	{
		sep = "/";
		dparts = slashed;
	}

	if (dparts.length < 3)
	{
		return false;
	}

	var d0 = dparts[0];
	var d1 = dparts[1];
	var d2 = dparts[2];

	if (isNaN(d0) || d0*1<1 || isNaN(d1) || d1*1<1 || isNaN(d2) || d2*1<1)
	{
		return false;
	}

	var l0 = d0.length;
	var l1 = d1.length;
	var l2 = d2.length;

	var is_valid = false;

	switch (sep)
	{
		case "-":

			is_valid = (l0!=4 || l1!=2 || l1!=2)?false:true;
			break;

		case "/":

			is_valid = (l0<1 || l0>2 || l1<1 || l1>2 || l2!=4)?false:true;
			break;

		default:
			break;
	}

	if (boolean)
	{
		return is_valid;
	}

	return {
		'parts':		dparts,
		'seperator':	sep,
		'valid':		is_valid
	}
}
function ersTSFromDate(date_str)
{
	var is_valid = ersIsValidDate(date_str);

	if (!is_valid || !is_valid.valid)
	{
		return 0;
	}

	var dparts = is_valid.parts;

	var d = new Date();
	d.setHours(0);
	d.setMinutes(0);
	d.setSeconds(0);
	d.setMilliseconds(0);

	switch (is_valid.seperator)
	{
		case "-":

			d.setYear(dparts[0] * 1);
			d.setMonth((dparts[1] * 1) - 1);
			d.setDate(dparts[2] * 1);
			break;

		case "/":

			d.setYear(dparts[2] * 1);
			d.setMonth((dparts[0] * 1) - 1);
			d.setDate((dparts[1] * 1));
			break;

		default:

			return 0;
	}

	return d.valueOf();
}

function ersDurationFromSeconds(seconds, simplified)
{
	var sec				= ersVI(seconds);
	var seconds_ts		= (sec % 60);
	var total_mins_ts	= ((sec - seconds_ts) / 60);
	var mins_ts			= (total_mins_ts % 60);
	var hours_ts		= ((total_mins_ts - mins_ts) / 60);

	var time_str = "";
	if (hours_ts >= 1)
	{
		if (simplified)
		{
			if ((mins_ts >= 20) && (mins_ts <= 40))
			{
				hours_ts += 0.5;
			}
			else if (mins_ts > 40)
			{
				hours_ts += 1;
			}
		}

		if (hours_ts > 1)
		{
			time_str += hours_ts + " hrs ";
		}
		else if (hours_ts == 1)
		{
			time_str += hours_ts + " hr ";
		}

		if (simplified)
		{
			return time_str.trim();
		}
	}

	if (mins_ts >= 1)
	{
		if (simplified)
		{
			if ((seconds_ts >= 20) && (seconds_ts <= 40))
			{
				mins_ts += 0.5;
			}
			else if (seconds_ts > 40)
			{
				mins_ts += 1;
			}
		}

		if (mins_ts > 1)
		{
			time_str += mins_ts + " mins ";
		}
		else if (mins_ts == 1)
		{
			time_str += mins_ts + " min ";
		}

		if (simplified)
		{
			return time_str.trim();
		}
	}

	if (seconds_ts > 1)
	{
		time_str += seconds_ts + " secs";
	}
	else if (seconds_ts == 1)
	{
		time_str += seconds_ts + " sec";
	}

	return time_str;
}

function display_date(d)
{
	var d_parts = d.split("-");
	if(d_parts.length > 2)
	{
		return d_parts[1] + "/" + d_parts[2] + "/" + d_parts[0];
	}
	else return d;
}

function change_date_by_days(dt,mod)
{
	var dt_parts = dt.split("-");
	var actualDate = new Date(dt_parts[1] + "/" + dt_parts[2] + "/" + dt_parts[0]); // convert to actual date
	var newDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate()+mod); // create new increased date
	var newYear = newDate.getFullYear();
	var newMonth = (newDate.getMonth() + 1);
	var newDate = newDate.getDate();
	var datestr = newYear + "-";
	if(newMonth < 10) datestr += "0" + newMonth; else datestr += newMonth;
	datestr += "-";
	if(newDate < 10) datestr += "0" + newDate; else datestr += newDate;

	return datestr;
}

function advance_date_by_day(dt)
{
	return change_date_by_days(dt,1);
}

function reverse_date_by_day(dt)
{
	return change_date_by_days(dt,-1);
}

function enableSelection(element)
{
	element.onselectstart=null;
	element.onmousedown=null;
}

function disableSelection(element)
{
	element.onselectstart=function(){return false};
	element.onmousedown=function(){return false};
}

function element_exists(elementid)
{
	var element = document.getElementById(elementid);
	return typeof element !== "undefined" && element !== null;
}

function noenter(e)
{
		var key;
		if(window.event)
			key = window.event.keyCode; //IE
		else
			key = e.which; //firefox
		if(key == 13)
			return false;
		else
			return true;
}

function trim_string(str)
{
	if( String.prototype.trim ) return str.trim();
	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

//****** blurOnEnter *****************************************
// This function blurs a field on hitting enter.
//
// element -- is the element that needs to be blurred
// e -- is the event (sometimes e = element).
//
// Added by AMC October 7, 2014
//************************************************************
function blurOnEnter(element, e)
{
		var key;
		if(window.event)
			key = window.event.keyCode; //IE
		else
			key = e.which; //firefox
		if(key == 13)
		{
			element.blur();
		}
}

//****** updateNumber ****************************************
// This function is used with a dropdown box that displays
//	a list of numbers for item quantity selection.
//	if "other" is chosen, it will convert the dropdown box to
//	a basic text input box.
//
// element -- typically "this"
// length -- how long the dropdown can be (e.g. 100)
// avail -- the maximum number of items available
//			(could be greater or less than length).
// selection -- sets the pre-selected value
// can_overbook -- a boolean, whether or not they have permission to overbook.
//
// Added by AMC October 2, 2014
//************************************************************
function updateNumber(element, length, avail, selection, can_overbook, update_onchange, qty_onchange)
{
	if (element.value=='other')
	{
		var newElement = document.createElement('input');
		newElement.name = element.name;
		newElement.id = element.id;
		newElement.type='number';
		newElement.value='';
		newElement.size='8';
		newElement.style.width='60px';
		newElement.min='0';
		newElement.style.display='block';
		newElement.placeholder= avail + ' avail'; //This will only work in HTML 5
		newElement.onblur = function(event){ updateSelect(this, length, avail, selection, can_overbook, update_onchange, qty_onchange); };
		newElement.onkeyup = function(event) { blurOnEnter(newElement, event); };
		newElement.onkeypress = function(event){ return noenter(event); };

		//alert(element.parentNode.name);
		element.parentNode.replaceChild(newElement, element);

		//Handle iOS differently.
		var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);
		if (deviceIsIOS && targetElement.setSelectionRange)	//Turns out there is an error (or feature) in how mobile safari
		{													// handles on focus events, and basically they can't be triggered
			length = newElement.value.length;				// programattically. So this kind of gets around that.
			newElement.setSelectionRange(length, length);	// It won't "lose" focus and revert to a list, but it doesn't get focus
		}
		else
		{
			newElement.parentNode.focus(); //This is only needed for firefox, which is dopey. AMC December 2, 2014.
			newElement.focus();
		}

		//Create an "update" link (this a dummy, to encourage them to click).
		if (update_onchange)
		{
			var b = document.createElement('button');
			var t = document.createTextNode('update qty');
			b.appendChild(t);
			newElement.parentNode.appendChild(b);
		}
	}
	else
	{
		if (update_onchange)
			qty_onchange(element);
	}
}

//****** updateSelect ****************************************
// This function is a complement to updateNumber. It will
//	revert an input text box back to a dropdown selection,
//	if the text box is empty and the focus shifts.
//
// element -- typically "this"
// length -- how long the dropdown can be (e.g. 100)
// avail -- the maximum number of items available
//			(could be greater or less than length).
// selection -- sets the pre-selected value
// can_overbook -- a boolean, whether or not they have permission to overbook.
//
// Added by AMC October 2, 2014
//************************************************************
function updateSelect(element, length, avail, selection, can_overbook, update_onchange, qty_onchange)
{
	//Here we do some validation:
	if (element.value != '')
	{
		v = element.value;
		if (v > avail)
		{
			if (can_overbook)
			{
				if(!confirm("This will cause an overbooking (max avail: "+avail+")\n Are you sure you wish to overbook?"))
					element.value = "";
			}
			else
			{
				alert ("Maximum quantity available is " + avail);
				element.value = "";
			}
		}
		if (update_onchange)
			qty_onchange(element);
	}


	if (element.value=='' && element.type=='number')
	{
		if (update_onchange)
			qty_onchange(element);
		var newElement = document.createElement('select');
		newElement.name = element.name;
		newElement.id = element.id;
		//newElement.type='select';
		newElement.onchange = function(event){ updateNumber(this, length, avail, selection, can_overbook, update_onchange, qty_onchange); };

		for (var i=0; i<=length; i++)
		{
			var opt = document.createElement('option');
			opt.value = i;
			opt.text = i;
			if (i == selection)
				opt.selected = true;
			newElement.options.add(opt);
		}

		var opt = document.createElement('option');
		opt.value = 'other';
		opt.text = '>'+length;
		newElement.options.add(opt);


		element.parentNode.replaceChild(newElement, element);
	}
}

function decround(val, p)
{
	if(typeof p === 'undefined' || +p === 0) return Math.round(val);
	val = +val;
	p = +p;
	if (isNaN(val) || !(typeof p === 'number' && p % 1 === 0)) return NaN;
	val = val.toString().split('e');
	val = Math.round(+(val[0] + 'e' + (val[1] ? (+val[1] + p) : p)));
	val = val.toString().split('e');
	return +(val[0] + 'e' + (val[1] ? (+val[1] - p) : -p));
}

function formatDollar(num) {
	var p = parseFloat(num).toFixed(2).split(".");
	return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
		return num + (i && !(i % 3) ? "," : "") + acc;
	}, "") + "." + p[1];
}

blue_editor_button_arr = new Array();

(function() {
	"use strict";

	//UTILITIES//

	window._UTIL = {};

	function base64_encode_safe(input) {
		/* Encodes input as base64 string in a URL-safe manner, e.g. void of "/", "+", and "=". */
		/* Decode with base64_decode_safe($str). */
		/* NOTE: since '=' padding is removed, it is not safe to append
		 * multiple encoded strings generated by this method (you won't be able
		 * to decode them). */
		return btoa(input)
			.replace(/=/g, '')
			.replace(/\+/g, '-')
			.replace(/\//g, '_');
	}
	_UTIL.base64_encode_safe = base64_encode_safe;

	function base64_decode_safe(input) {
		/* Decodes input generated by "base64_encode_safe()". */
		return atob(input
			.replace(/=/g, '')
			.replace(/-/g, '+')
			.replace(/_/g, '/'));
	}
	_UTIL.base64_decode_safe = base64_decode_safe;

	function object_to_query(object) {
		return "?"+Object.keys(object).map(function(key) {
			var safeKey = encodeURIComponent(key);
			var safeVal = encodeURIComponent(object[key]);
			return safeKey+"="+safeVal;
		}).join("&");
	}
	_UTIL.object_to_query = object_to_query;

	function query_to_object(query) {
		if( query.startsWith("?") )
			query = query.slice(1);
		return query.split("&")
			.map(function(keyVal) {
				return keyVal.split("="); })
			.reduce(function(acc, element, index) {
				var key = decodeURIComponent(element.shift());
				var val = decodeURIComponent(element.shift());
				acc[key] = val;
				return acc; }, {});
	}
	_UTIL.query_to_object = query_to_object;

	window.ERSPromise = (function() {
		//do done, fail, always
		function P() {
			this.doDone = function(){};
			this.doFail = function(){};
			this.doAlways = function(){};
		};
		P.prototype = {
			done : function(callback) {
				if( typeof callback !== "function" )
					throw new TypeError("ERSPromise.prototype.done expects function as 1st parameter, found \""+typeof callback+"\"");
				this.doDone = callback;
				this.runIfDone();
				return this;
			},
			fail : function(callback) {
				if( typeof callback !== "function" )
					throw new TypeError("ERSPromise.prototype.fail expects function as 1st parameter, found \""+typeof callback+"\"");
				this.doFail = callback;
				this.runIfDone();
				return this;
			},
			always : function(callback) {
				if( typeof callback !== "function" )
					throw new TypeError("ERSPromise.prototype.always expects function as 1st parameter, found \""+typeof callback+"\"");
				this.doAlways = callback;
				this.runIfDone();
				return this;
			},
			setResponse: function(data, success) {
				this.response = data;
				this.isDone = true;
				this.error = !success;
				this.runIfDone();
			},
			runIfDone: function() {
				if( this.isDone ) {
					this.doAlways(this.response);
					if( this.error ) {
						this.doFail(this.response);
					} else {
						this.doDone(this.response);
					}
				}
			}

		};
		return P;
	})();

	function safe_decode(input) {
		if( input )
			return JSON.parse(_UTIL.base64_decode_safe(input));
		return "";
	}
	_UTIL.safe_decode = safe_decode;

	function safe_encode(input) {
		if( input )
			return _UTIL.base64_encode_safe(JSON.stringify(input));
		return "";
	}
	_UTIL.safe_encode = safe_encode;

})();

function decodeQueryString(str) {
	str = str.trim();
	return str.split("&").map(function(keyvalString) {
		if( keyvalString.trim() )
			return keyvalString.split("=");
		return false;
	}).filter(function(keyvalArray) {
		return keyvalArray !== false;
	}).reduce(function(acc,keyvalArray) {
		acc[unescape(keyvalArray[0])] = unescape(keyvalArray[1]);
		return acc;
	}, {});
}

window.E = (function() {

	"use strict";

	function appendChildren(element, children) {
		(children||[]).forEach(function(child) {
			if( child ) element.appendChild(child);
		});
		return element;
	}

	function setAttributes(element, obj) {
		for( var key in obj )
			if( typeof key === "string" && key !== "children" )
				element[key] = obj[key];
		return element;
	}

	function newElement(tagname, attributes) {
		var elem = document.createElement(tagname);
		if( elem ) {
			setAttributes(elem, attributes);
			appendChildren(elem, attributes.children);
			return elem;
		}
		return null;
	};

	return function validator(tagname, attributes) {
		if( typeof tagname !== "string" )
			throw new TypeError("newElement: 1st arg \"tagname\" should be \"string\", found \""+typeof tagname+"\".");
		if( ! attributes instanceof Object )
			throw new TypeError("newElement: 1st arg \"tagname\" should be instance of \"array\", found \""+typeof tagname+"\".");
		return newElement(tagname, attributes);
	}

})();

window.in_appcp = function(callback)
{
	var result = location.pathname.startsWith("/cp");
	if( callback instanceof Function ) callback( result );
	return result;
};

function err(msg) { throw msg; }

window.do_ajax_query = (function()
{
	function paramsToString(params)
	{
		return Object.keys(params).map(function(key) {
			return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
		}).join("&");
	}

	return function(params, callback, end_point)
	{
	    if (!end_point) end_point = "/ajax_query/";

		var requestStr = paramsToString(params);
		var xhr = new XMLHttpRequest();
		xhr.open("POST", end_point, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.onload = function() {
			var response = decodeQueryString(xhr.responseText);
			callback(response);
		};
		xhr.send(requestStr);
	};

}());

(function() {
	var modal_container = null;

	function closeModal()
	{
		if( modal_container && modal_container.parentNode )
			modal_container.parentNode.removeChild(modal_container);
	}
	window.closeModal = closeModal;

	function createModal(contents, styles, can_clickout) {
		closeModal();
		can_clickout = can_clickout !== false;
		styles = styles || {};

		var modal_content = document.createElement("span");
		modal_content.style.borderRadius = "5px";
		modal_content.style.backgroundColor = "#ddd";
		modal_content.style.verticalAlign = "middle";
		modal_content.style.display = "inline-block";
		modal_content.style.padding = "1em";
		modal_content.style.overflowX = "hidden";
		modal_content.style.overflowY = "hidden";
		modal_content.onclick = function(event) {
			event.stopPropagation();
		};

		if( contents instanceof HTMLElement )
			modal_content.appendChild(contents);
		if( typeof contents === "string" )
			modal_content.appendChild(document.createTextNode(contents));

		var modal_centerizer = document.createElement("span");
		modal_centerizer.style.verticalAlign = "middle";
		modal_centerizer.style.display = "inline-block";
		modal_centerizer.style.height = "100%";
		modal_centerizer.style.width = 0;

		modal_container = document.createElement("div");
		modal_container.appendChild(modal_centerizer);
		modal_container.appendChild(modal_content);
		modal_container.style.backgroundColor = "rgba(0,0,0,0.9)";
		modal_container.style.textAlign = "center";
		modal_container.style.position = "fixed";
		modal_container.style.height = "100%";
		modal_container.style.zIndex = 12000;
		modal_container.style.width = "100%";
		modal_container.style.left = 0;
		modal_container.style.top = 0;
		modal_container.style.overflow = "scroll";
		modal_container.addEventListener("click", function(event) {
			event.stopPropagation();
			if( can_clickout ) {
				modal_container.parentNode.removeChild(modal_container);
			}
		});
		Object.keys(styles).forEach(function(style) {
			modal_content.style[style] = styles[style];
		});
		document.body.appendChild(modal_container);
		return modal_container;
	}
	window.createModal = createModal;

	function modalPrompt(question, callback) {
		callback = callback instanceof Function ? callback : function(){};

		var container_node = document.createElement("div");

		var question_node = document.createElement("h4");
		question_node.innerHTML = question;
		container_node.appendChild(question_node);

		var input_node = document.createElement("input");
		input_node.style.borderRadius = "5px";
		input_node.style.textIndent = "2em";
		input_node.style.border = "#ccc solid 1px";
		input_node.style.height = "3em";
		input_node.style.width = "90%";
		input_node.type = "text";

		container_node.appendChild(document.createElement("br"));
		container_node.appendChild(input_node);
		container_node.appendChild(document.createElement("br"));
		container_node.appendChild(document.createElement("br"));

		var button_no = document.createElement("button");
		button_no.className = "btn btn-info";
		button_no.innerHTML = "cancel";
		container_node.appendChild(button_no);
		button_no.onclick = function() {
			closeModal();
			callback(false);
		};

		var button_ok = document.createElement("button");
		button_ok.className = "btn btn-success";
		button_ok.innerHTML = "OK";
		container_node.appendChild(button_ok);
		button_ok.onclick = function() {
			closeModal();
			callback(input_node.value);
		};

		var modal_container = createModal(container_node, {'minWidth':'60%'}, true);
		modal_container.addEventListener('click', function(event) {
			event.stopPropagation();
			closeModal();
			callback(false);
		});
	}
	window.modalPrompt = modalPrompt;

	function modalAlert(msg, callback) {
		callback = callback instanceof Function ? callback : function(){};

		var container_node = document.createElement("div");

		var msg_node = document.createElement("div");
		msg_node.innerHTML = msg;
		container_node.appendChild(msg_node);

		var button_ok = document.createElement("button");
		button_ok.className = "btn btn-md";
		button_ok.innerHTML = "done";
		container_node.appendChild(button_ok);
		button_ok.onclick = function() {
			closeModal();
			callback();
		};

		createModal(container_node, {'minWidth':'60%'}, true);
	}
	window.modalAlert = modalAlert;

})();

/**
 * For accordian icon toggling
 * @author	Vincent Cheng <vince@eventrentalsystems.com>
 * @date	2016.04.28
 */
function toggleChevron(e)
{
	$(e.target)
		.prev('.panel-heading')
		.find("i.indicator")
		.toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
}

(function()
{
	var get_cache = null;
	var cookie_cache = null;

	if ( ! ( "_GET" in window ) )
	{
		Object.defineProperties( window, {
			"_GET": {
				get : function() {
					if (get_cache === null) {

						return ( get_cache = location.search
							.slice(1)
							.split("&")
							.map(function(e) {
								return e.split("=");
							})
							.reduce(function(acc,el) {
								acc[el[0]] = typeof el[1] !== "undefined" ? el[1] : null;
								return acc;
							}, {}));

					}
					return get_cache;

				}
			},
			"_COOKIE": {

				get : function() {
					if (cookie_cache === null) {

						return ( cookie_cache = document.cookie
							.slice(1)
							.split("; ")
							.map(function(e) {
								return e.split("=");
							})
							.reduce(function(acc,el) {
								acc[el[0]] = typeof el[1] !== "undefined" ? el[1] : null;
								return acc;
							}, {}));
					}
					return cookie_cache;
				}
			}
		});
	}
})();


function getvar( key, def )
{
	var val = _GET[key];
	if (typeof val === "undefined" || val === null)
	{
		return def;
	}
	return val;
}


function cookievar( key, def )
{
	var val = _COOKIE[key];
	if (typeof val === "undefined" || val === null)
	{
		return def;
	}
	return val;
}

function ersCBC(eid) // checkbox checked
{
	var el = ersDE(eid);
	if (el && "checked" in el)
    {
        return el.checked;
    }

	return false;
}

function ersDE(eid) // document element
{
	return document.getElementById(eid);
}

function ersEP(eid) // element parent
{
	var el = ersDE(eid);
	if (el)
	{
		return el.parentElement;
	}

	return null;
}

function ersDEBN(name, full_list) // document element(s) by name
{
	var els = document.getElementsByName(name);

	if (NodeList.prototype.isPrototypeOf(els) && (els.length > 0))
	{
		if (full_list)
		{
			return els;
		}

		return els[0];
	}

	return null;
}

function ersDEBC(cls) // document elements by class name
{
	return document.getElementsByClassName(cls);
}

function ersElDisplay(el, display)
{
	if (el)
	{
		el.style.display = display;
	}
}

function ersElHTML(el, html)
{
	if (el)
	{
		el.innerHTML = ersVS(html);
	}
}
function ersElOHTML(el, html)
{
	if (el)
	{
		el.outerHTML = ersVS(html);
	}
}

function ersElOpac(el, opacity)
{
	if (el)
	{
		el.style.opacity = opacity;
	}
}

function ersElPointerEvents(el, po)
{
	if (el)
	{
		el.style.pointerEvents = po;
	}
}

function ersElValue(el, value)
{
	if (el)
	{
		el.value = value;
	}
}

function ersElVisibility(el, vis)
{
	if (el)
	{
		el.style.visibility = vis;
	}
}

function ersElsByClass(cl)
{
	return document.getElementsByClassName(cl);
}

function ersEV(eid) // element value
{
	var el = ersDE(eid);
	if (el)
	{
		if ("value" in el)
		{
			return ersVS(el.value);
		}

		if (el.dataset && el.dataset.value)
		{
			return ersVS(el.dataset.value);
		}
	}

	return "";
}

function ersFDE(iframe, eid) // iframe document element
{
	if (iframe && "contentWindow" in iframe)
	{
		return iframe.contentWindow.document.getElementById(eid);
	}

	return null;
}

function ersJSON(str)
{
	try
	{
		var o = JSON.parse(str);
		if (o && typeof o === "object" && o !== null)
		{
			return o;
		}
	}
	catch (e)
	{
		//console.log(e);
	}

	return false;
}

function ersObjectKeys(obj)
{
	var keys = [];
	if ((obj !== null) && (obj instanceof Object))
	{
		for (var k in obj)
		{
			keys.push(k);
		}
	}

	return keys;
}

function ersQSFO(obj) // query string from object
{
	var string = "";

	if (obj instanceof Object)
	{
		arr = [];
		for (var k in obj)
		{
			arr.push( encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]) );
		}

		string = arr.join("&");
	}

	return string;
}

function ersSetSessvar(key, value)
{
	if (ersVS(key).length == 0)
	{
		return;
	}

	var params = {
		cmd:	"set_sessvar",
		key:	key,
		value:	value
	};

	do_ajax_query(params, function(response){});
}

function ersVA(arr) // valid array
{
	if (arr === null) return [];
	if (typeof arr === "undefined") return [];
	if (arr.constructor !== Array) return [];
	return arr;
}

function ersVAFA(arr, index) // valid array from array
{
	var array = ersVA(arr);
	if ((arr.length - 1) < ersVI(index)) return [];
	return ersVA(arr[index]);
}

function ersVAFO(obj, key) // valid array from object
{
	if (typeof key !== "string") return [];
	var object = ersVO(obj);
	return ersVA(object[key]);
}

function ersVI(integer, def) // valid integer
{
	if (!def)
	{
		def = 0;
	}

	return parseInt(integer) || def;
}

function ersVIFA(arr, index, def) // valid integer from array
{
	if (!def) def = 0;
	var array = ersVA(arr);
	if ((arr.length - 1) < ersVI(index)) return def;
	return ersVI(arr[index], def);
}

function ersVIFO(obj, key, def) // valid integer from object
{
	if (!def) def = 0;
	if (typeof key !== "string") return def;
	var object = ersVO(obj);
	return ersVI(object[key], def);
}

function ersVO(obj) // valid object
{
	if (obj === null) return {};
	if (typeof obj === "undefined") return {};
	if (obj.constructor !== Object) return {};
	return obj;
}

function ersVOFA(arr, index) // valid object from array
{
	var array = ersVA(arr);
	if ((arr.length - 1) < ersVI(index)) return {};
	return ersVO(arr[index]);
}

function ersVOFO(obj, key) // valid object from object
{
	if (typeof key !== "string") return {};
	var object = ersVO(obj);
	return ersVO(object[key]);
}

function ersVS(str, def, convert) // valid string
{
	if (!def) def = "";
	if (str === null) return def;
	if (typeof str === "undefined") return def;
	if (convert) return str.toString();
	if (typeof str !== "string") return def;
	return str;
}

function ersVSFA(arr, index, def) // valid string from array
{
	if (!def) def = "";
	var array = ersVA(arr);
	if ((arr.length - 1) < ersVI(index)) return def;
	return ersVS(arr[index]);
}

function ersVSFO(obj, key, def) // valid string from object
{
	if (!def) def = "";
	if (typeof key !== "string") return def;
	var object = ersVO(obj);
	return ersVS(object[key], def, true);
}

function fake_sleep(ms)
{
	var date = new Date();
	var curDate = null;
	do { curDate = new Date(); }
	while(curDate-date < ms);
}

function ers_real_sleep(ms)
{
	return new Promise(resolve => setTimeout(resolve, ms));
}

function ersAddClass(el, class_name, if_has_class) // if_has_class is optional
{
	if (!el)
	{
		return;
	}

	var cl_na = ersVS(class_name);
	if (cl_na.length == 0)
	{
		return;
	}

	var ihc = ersVS(if_has_class);
	if (ihc.length > 0)
	{
		if (!el.classList.contains(ihc))
		{
			return;
		}
	}

	if (!el.classList.contains(cl_na))
	{
		el.classList.add(cl_na);
	}
}

function ersRemoveClass(el, class_name)
{
	if (!el)
	{
		return;
	}

	var cl_na = ersVS(class_name);
	if (cl_na.length == 0)
	{
		return;
	}

	el.classList.remove(cl_na);
}

function ersRemoveElement(el)
{
	if (!el)
	{
		return;
	}

	var pn = el.parentNode;
	if (pn)
	{
		pn.removeChild(el);
	}
}

function ersHasClass(el, cls)
{
	if (!el)
	{
		return false;
	}

	return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
}

function ersIsElement(obj)
{
	try
	{
		return obj instanceof HTMLElement;
	}
	catch(e)
	{
		return (typeof obj==="object")
		&& (obj.nodeType===1)
		&& (typeof obj.style === "object")
		&& (typeof obj.ownerDocument === "object");
	}
}

function ersIsFunction(f)
{
	return (f && {}.toString.call(f) === "[object Function]");
}

function ersRandom()
{
	return Math.floor((Math.random() * 1000000) + 1);
}

var ersScheduledActions = [];
var ersScheduledActionTimer = null;
var ersRunningScheduledAction = false;

function ersScheduleAction(action, delay)
{
	if (!delay)
	{
		delay = 0;
	}

	if (delay == 0)
	{
		ersScheduledActions.push(action);
	}
	else
	{
		window.setTimeout(function(){ ersScheduledActions.push(action) }, delay);
	}

	if (ersScheduledActionTimer == null)
	{
		ersScheduledActionTimer = setInterval(function() { ersRunNextScheduledAction() }, 99);
	}
}

function ersRunNextScheduledAction()
{
	if (ersScheduledActions.length == 0)
	{
		return;
	}

	if (ersRunningScheduledAction)
	{
		return;
	}

	ersRunningScheduledAction = true;

	var this_action = ersScheduledActions[0];

	ersScheduledActions.splice(0, 1);

	this_action();

	ersRunningScheduledAction = false;

	if (ersScheduledActions.length == 0)
	{
		clearInterval(ersScheduledActionTimer);
		ersScheduledActionTimer = null;
	}
}

var ERSPreloadedImages = {};

function ersPreloadImages(preload_list)
{
	if (preload_list == null)
	{
		return;
	}

	if (preload_list instanceof Array)
	{
		for (p = 0; p < preload_list.length; p++)
		{
			ersPreloadImage(preload_list[p]);
		}
	}
}

function ersPreloadImage(image_path)
{
	var check_path = ersVS(image_path);
	if (check_path.length == 0)
	{
		return;
	}

	if (ERSPreloadedImages.hasOwnProperty(check_path))
	{
		return;
	}

	var image = new Image();
	image.onload = function(){ ERSPreloadedImages[check_path] = this; };
	image.src = check_path;
}

function ERSClickOrTouch()
{
	return CM_use_touch?"ontouchstart":"onclick";
}

function html_to_dom(str) {
	const whole_doc = "<html><head></head><body>" + str + "</body></html>";
	parser = new DOMParser();
	doc = parser.parseFromString(whole_doc, "text/html");
	return doc.body.children[0];
}

/*
function add_class(node, className) {
	const new_cnames = className.split(" ").filter(c=>c.trim()).filter(Boolean);
	const old_cnames = node.className.split(" ").filter(c=>c.trim()).filter(Boolean);
	for (const cname of new_cnames) {
		if (old_cnames.includes(cname)) {
			continue;
		}
		old_cnames.push(cname);
	}
	node.className = old_cnames.join(" ");
}

function rm_class(node, className) {
	const new_cnames = className.split(" ").filter(c=>c.trim()).filter(Boolean);
	const old_cnames = node.className.split(" ").filter(c=>c.trim()).filter(Boolean);
	node.className = old_cnames.filter(cname => new_cnames.includes(cname) === false).join(" ");
}

(function() {

	function diff_dom(root, newstr) {
		const frag = html_to_dom(newstr);
		diff(root, frag);
	}

	function diff(rootDOM, newDOM) {
		if (newDOM instanceof HTMLElement && rootDOM instanceof HTMLElement ||
			newDOM instanceof Text && rootDOM instanceof Text) {

			// if same types, we can diff
			if (newDOM instanceof HTMLElement) {
				if (newDOM.tagName === rootDOM.tagName) {
					diff_html_node(rootDOM, newDOM);
				} else {
					rootDOM.parentNode.replaceChild(newDOM, rootDOM);
				}
			} else if (newDOM instanceof Text) {
				diff_text(rootDOM, newDOM);
			} else {
				throw new TypeError("No way to diff element: ", newDOM);
			}
		} else {
			// if they're different types, just replace whole branch
			rootDOM.parentNode.replaceChild(newDOM, rootDOM);
		}
	}

	function diff_text(rootDOM, newDOM) {
		rootDOM.textContent = newDOM.textContent;
	}

	function diff_html_node(rootDOM, newDOM) {
		diff_attributes(rootDOM, newDOM);
		diff_children(rootDOM, newDOM);
	}

	function diff_attributes(rootDOM, newDOM) {
		// delete old attrs //
		for (const attr_name of rootDOM.getAttributeNames()) {
			if (!newDOM.hasAttribute(attr_name)) {
				rootDOM.removeAttribute(attr_name);
			}
		}

		// add/set other attrs //
		for (const attr_name of newDOM.getAttributeNames()) {
			if (rootDOM[attr_name] !== newDOM[attr_name]) {
				if (attr_name.slice(0, 2) === "on") {
					rootDOM[attr_name] = new Function(newDOM.getAttribute(attr_name));
				} else {
					rootDOM[attr_name] = newDOM.getAttribute(attr_name);
				}
			}
		}
	}

	function diff_children(rootDOM, newDOM) {
		const old_length = rootDOM.childNodes.length;
		const new_length = newDOM.childNodes.length;
		const least_length = Math.min(old_length, new_length);
		const greatest_length = Math.max(old_length, new_length);
		const deletables = [];
		const appendables = [];

		for (let i = greatest_length-1; i >= 0; i--) {
			if (i < least_length) {
				// diff existing child
				const curr_child = rootDOM.childNodes[i];
				const next_child = newDOM.childNodes[i];
				diff(curr_child, next_child);
				//diff(rootDOM.childNodes[i], newDOM.childNodes[i]);
			} else {
				// remove / add excess child
				if (old_length > new_length) {
					deletables.push(rootDOM.childNodes[i]);
				} else {
					appendables.push(newDOM.childNodes[i]);
				}
			}
		}

		// delete
		for (const node of deletables) {
			node.parentNode.removeChild(node);
		}
		// add
		for (const node of appendables) {
			rootDOM.appendChild(node);
		}
	}

	window.diff_dom = diff_dom;
})();*/

function strip_html_from(text)
{
	return text.replace(/(<([^>]+)>)/gi, "");
}

function ampersand_decode(text)
{
	var ta = document.createElement("textarea");
	ta.innerHTML = text;
	return ta.value;
}

function encode_notes_text(text)
{
	return strip_html_from(text);
}

function decoded_notes_text(el)
{
	var html = ampersand_decode(el.innerHTML).replace("<br>", "");

	if (strip_html_from(html).trim() == "")
	{
		return "";
	}

	var regexp1 = new RegExp("</div><div>", "ig");
	var regexp2 = new RegExp("<div>", "ig");

	html = html.replace(regexp1, "\r\n");
	if (html.substring(0, 5) == "<div>")
	{
		html = html.substring(5);
	}
	html = html.replace(regexp2, "\r\n");

	return strip_html_from(html).trim();
}

function ersDisplayMoreBelow(el)
{
	window.setTimeout(function()
	{
		ersElDisplay(el, "none");
		ersElDisplay(el.nextElementSibling, "block");
	}, 100);
}

function ersDisplayLessBelow(el)
{
	window.setTimeout(function()
	{
		var hide_div = el.parentElement;
		if (hide_div)
		{
			ersElDisplay(hide_div, "none");
			ersElDisplay(hide_div.previousElementSibling, "inline-block");
		}
	}, 100);
}

function ersValueTrue(val)
{
	var str = ((ersVS(val, "", true).toLowerCase()).trim()).substr(0, 1);

	return (val===true || str=="y" || str=="t" || str=="1");
}

function ersInlinePropStop()
{
	var event = arguments[0] || window.event;
	if (event)
	{
		if (event.stopPropagation)
		{
			event.stopPropagation();
		}
		else
		{
			event.cancelBubble = true;
		}
	}
}

function ersTSVDownload(filename, tsv_text)
{
	var edll = ersDE("ERSExportDownloadLink");
	if (!edll)
	{
		// create on the fly?
	}
	if (edll)
	{
		edll.href = "data:text/tab-separated-values;charset=utf-8," + encodeURIComponent(tsv_text);
        // 2023-02-06 JML - changed encodeURI to encodeURIComponent to fix partial tsv export problem.
		edll.download = filename + ".tsv";
		edll.click();
	}
}

function wm_title_to_id(tit)
{
	var replaces = { ' ': "_", '/': "-", ':': "_", "'": "", ',': "" };

	return tit.replace(/ |\/|:|'|,/gi, function(matched) { return replaces[matched]; }).toLowerCase();
}

function ersPostRequestToScript(req_obj, script, new_window)
{
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", script);
	if (new_window)
	{
		form.setAttribute("target", "_blank");
	}

	for (var key in req_obj)
	{
		if (req_obj.hasOwnProperty(key))
		{
			var value = req_obj[key];
			var value_string = "";

			if ((value.constructor === Array) || (value.constructor === Object))
			{
				value_string = JSON.stringify(value);
			}
			else
			{
				value_string = value.toString();
			}

			var hiddenField = document.createElement("input");
			hiddenField.setAttribute("type", "hidden");
			hiddenField.setAttribute("name", key);
			hiddenField.setAttribute("value", value_string);

			form.appendChild(hiddenField);
		}
	}

	document.body.appendChild(form);
	form.submit();

	return form;
}

function capitalizeWords(str) {
    return str
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function documentReady(callback) {
	if (document.readyState !== "loading") {
		callback();
	} else {
		document.addEventListener("DOMContentLoaded", callback);
	}
}