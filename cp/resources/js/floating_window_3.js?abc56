window.addEventListener("load", function() {
	var floating_window_parent = false;
	var obj_parent_pos = false;
	var auto_reset_content_when_closed = false;
	var extra_winid = "";
	extraheight = 75;

	function register_floating_window(winid)
	{
		extra_winid = winid;
	}
	window.register_floating_window = register_floating_window;

	function open_floating_window(set_title,set_content,set_parent,setwidth,setheight,framename,setcolor,call_when_built)
	{
		if(!setcolor) setcolor = "#ddddee";
		if(!setwidth) setwidth = 480;
		if(!setheight) setheight = 320;

		var fwt = ersDE("floating_window_table");
		if (fwt)
		{
			fwt.style.backgroundColor = setcolor;
			fwt.style.minHeight = setheight + "px";
		}

		//document.getElementById("floating_window").style.width = setwidth + "px";
		//document.getElementById("floating_window").style.height = setheight + "px";
		//document.getElementById("floating_window").style.maxWidth = "80vw";
		//document.getElementById("floating_window").style.top = "50%";
		//document.getElementById("floating_window").style.left = "50%";
		var winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		//if(winWidth > setwidth) document.getElementById("floating_window").style.marginLeft = -1 * (winWidth / 2) + "px";
		if((setheight + extraheight) * 1 >= winHeight * 1)
		if(setwidth * 1 >= winWidth * 1.2 || (setheight + extraheight) * 1 >= winHeight * 1)
		{
			//document.getElementById("floating_window").style.position = "absolute";
		}
		else
		{
			document.getElementById("floating_window").style.position = "fixed";
		}

		//document.getElementById("floating_window").style.marginLeft = -1 * (setwidth / 2) + "px";
		//if(winHeight > setheight) document.getElementById("floating_window").style.marginTop = -1 * (winHeight / 2) + "px";
//document.getElementById("floating_window").style.marginTop = -1 * ((setheight * 1 + extraheight * 1) / 2) + "px";

		if(set_parent=="body")
		{
			floating_window_parent = document.body;
		}
		else if(element_exists(set_parent))
		{
			floating_window_parent = document.getElementById(set_parent);
		}
		else if(element_exists("main_area"))
		{
			floating_window_parent = document.getElementById("main_area");
		}
		else
		{
			floating_window_parent = document.body;
		}
		set_info_location("init");
		set_info_location("followup");

		document.getElementById("floating_window_title").innerHTML = set_title;
		var fwc = ersDE("floating_window_content");
		if (fwc)
		{
			fwc.style.minHeight = (setheight - 38) + "px";
			fwc.innerHTML = unescape_decode(set_content);
		}
		//document.getElementById("main_inner_area").style.display = "block";
		document.getElementById("floating_window").style.visibility = "visible";

		obj_parent = get_parent_element("floating_window");
		obj_parent_pos = getObjPosition(obj_parent);
		obj_pos = getElementPosition("floating_window");

		width_diff = obj_parent_pos['width'] - obj_pos['width'];
		set_x = width_diff / 2;

		//document.getElementById("floating_window").style.left = set_x + "px";

		if(framename)
		{
			set_info_location("followup");
			iframe = document.getElementById(framename);
			if (iframe.attachEvent){
				iframe.attachEvent("onload", function(){
					sizeresult = frame_autosize(iframe);
					set_info_location("init");
				});
			} else {
				iframe.onload = function(){
					sizeresult = frame_autosize(iframe);
					set_info_location("init");
				};
			}
		}
		else set_info_location("init");
		//iwinpos = getElementPosition(floating_window_parent.id);
		/*if(opener)
		{
			opener_pos = getObjPosition(opener);
			set_y = (opener_pos['top'] - obj_parent_pos['top']) - obj_pos['height'] / 4;
			document.getElementById("floating_window").style.top = set_y + "px";
		}*/

		if (call_when_built && {}.toString.call(call_when_built) === '[object Function]')
		{
			call_when_built();
		}
	}
	window.open_floating_window = open_floating_window;

	function frame_autosize(iframe)
	{
		iframe.width = null;
		iframe.height = null;
		newwidth=iframe.contentWindow.document.body.scrollWidth;
		newheight=iframe.contentWindow.document.body.scrollHeight;
		if(newheight > 400) newheight = 400;
		iframe.width = (newwidth * 1 + 60) + "px";
		iframe.height = (newheight * 1 + 30) + "px";
		return new Array(iframe.width,iframe.height);
	}
	window.frame_autosize = frame_autosize;

	function open_floating_frame(set_title,set_frame,set_parent,setwidth,setheight,setcolor,call_when_built)
	{
		if(/dev-test/.test(location.toString())) 
		{
			http_root = "https://ourers.com/";
		} else http_root = "";

		if(!setcolor) setcolor = "#ddddee";
		if(!setwidth) setwidth = 480;
		if(!setheight) setheight = 320;
		set_frame = set_frame.replace(/\?/ig,"&");
		set_content = "<iframe name='floating_frame' id='floating_frame' style='width:" + setwidth + "px; height:" + setheight + "px; max-width:100%' frameborder='0' src='" + http_root  + "/cp/index.php?render_frame=" + set_frame + "&rfsep=1'></iframe>";
		open_floating_window(set_title,set_content,set_parent,setwidth,setheight,"floating_frame",setcolor,call_when_built);
	}
	window.open_floating_frame = open_floating_frame;

	function open_floating_iframe(set_title,set_frame,set_parent,setwidth,setheight,setcolor)
	{
		if(/dev-test/.test(location.toString())) 
		{
			http_root = "https://ourers.com/";
		} else http_root = "";

		if(!setcolor) setcolor = "#ddddee";
		if(!setwidth) setwidth = 480;
		if(!setheight) setheight = 320;
		set_frame = set_frame.replace(/\?/ig,"&");
		set_content = "<iframe name='floating_frame' id='floating_frame' style='width:" + setwidth + "px; height:" + setheight + "px; max-width:100%' frameborder='0' src='" + http_root + "/cp/index.php?render_iframe=" + set_frame + "&rfsep=1'></iframe>";
		open_floating_window(set_title,set_content,set_parent,setwidth,setheight,"floating_frame",setcolor);
	}
	window.open_floating_iframe = open_floating_iframe;

	function open_floating_src(set_title,set_frame,set_parent,setwidth,setheight,setcolor)
	{
		if(!setcolor) setcolor = "#ddddee";
		if(!setwidth) setwidth = 480;
		if(!setheight) setheight = 320;
		//set_frame = set_frame.replace(/\?/ig,"&"); // commented out because it interferes with get vars JML 2023-04-06
		set_content = "<iframe name='floating_frame' id='floating_frame' style='width:" + setwidth + "px; height:" + setheight + "px; max-width:100%' frameborder='0' src='" + set_frame + "'></iframe>";
		open_floating_window(set_title,set_content,set_parent,setwidth,setheight,"floating_frame",setcolor);
	}
	window.open_floating_src = open_floating_src;

	function open_floating_ajax_link(set_title,set_container,set_ajax_link,set_parent,setwidth,setheight)
	{
		var set_content = "<div id='" + set_container + "'>&nbsp;</div>";
		open_floating_window(set_title,set_content,set_parent,setwidth,setheight);
		ajax_register_flexible_container("floating_window_content");
		//ajax_register_flexible_container(set_container);
		//ajax_link(set_container,set_ajax_link);
		ajax_link(set_container,set_ajax_link,false, false, "set_info_location");
		set_info_location("init");
	}
	window.open_floating_ajax_link = open_floating_ajax_link;

	function close_floating_window()
	{
		window.dispatchEvent(new CustomEvent("closefloatingwindow"));
		document.getElementById("floating_window").style.visibility = "hidden";

		//document.getElementById("floating_window_table").style.width = "20px";
		//document.getElementById("floating_window_table").style.height = "20px";
		//document.getElementById("main_inner_area").style.visibility = "hidden";
		if(auto_reset_content_when_closed) document.getElementById("floating_window_content").innerHTML = " ";
	}
	window.close_floating_window = close_floating_window;

	//winabsplaced = new Array();
	function set_info_location(set_loc_mode)
	{
		fwobj_pos = getElementPosition("floating_window");
		setwidth = fwobj_pos['width'];
		setheight = fwobj_pos['height'];
		var winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

		if(setwidth * 1 >= winWidth * 1.2 || (setheight * 1 + extraheight * 1) * 1 >= winHeight * 1)
		{
			//wabsindex = setwidth + "-" + winWidth + "-" + setheight + "-" + winHeight;
			//if(typeof winabsplaced[wabsindex] == "undefined" || document.getElementById("floating_window").style.position!="absolute")
			var wintop = document.body.scrollTop;
			var winleft = document.body.scrollLeft;
			if(!wintop) wintop = document.documentElement.scrollTop;
			if(!winleft) winleft = document.documentElement.scrollLeft;

			if(document.getElementById("floating_window").style.position!="absolute" || set_loc_mode=="init")
			{
				//document.getElementById("floating_window").style.top = "50%";
				//document.getElementById("floating_window").style.left = "50%";
				gotopx = wintop - fwobj_pos['offtop'];
				//document.getElementById("floating_window").style.top = gotopx + "px";
				//document.getElementById("floating_window").style.marginTop = 0;
				//document.getElementById("floating_window").style.position = "absolute";
			}
			else
			{
				//document.getElementById("floating_window").style.top = "50%";
				//document.getElementById("floating_window").style.left = "50%";
				gotopx = wintop - fwobj_pos['offtop'];
				topn = (document.getElementById("floating_window").style.top).replace(/px/ig,'') * 1;
				if(gotopx * 1 < topn * 1)
				{
					//document.getElementById("floating_window").style.top = gotopx + "px";
					//document.getElementById("floating_window").style.marginTop = 0;
					//document.getElementById("floating_window").style.position = "absolute";
				}
			}
		}
		else
		{
			//document.getElementById("floating_window").style.top = "50%";
			//document.getElementById("floating_window").style.left = "50%";
			document.getElementById("floating_window").style.position = "fixed";

			//document.getElementById("floating_window").style.marginLeft = -1 * (setwidth / 2) + "px";
			//document.getElementById("floating_window").style.marginTop = -1 * (setheight / 2) + "px";
			// + extraheight) / 2) + "px";
		}
		//document.getElementById("floating_window").style.marginLeft = -1 * (setwidth / 2) + "px";
		//document.getElementById("floating_window").style.marginTop = -1 * ((setheight + extraheight) / 2) + "px";

		if(element_exists("start_container") && extra_winid=="") extra_winid = "start_container";
		if(extra_winid!="")
		{
			if(!floating_window_parent)
			{
				floating_window_parent = document.getElementById(extra_winid).parentNode;//document.getElementById("main_area");
				if(!floating_window_parent.id) floating_window_parent.id = "floating_window_parent_placeholder";
			}
			iwinpos = getElementPosition(floating_window_parent.id);

			var top = document.body.scrollTop;
			var left = document.body.scrollLeft;
			if(!top) top = document.documentElement.scrollTop;
			if(!left) left = document.documentElement.scrollLeft;

			elem = document.getElementById(extra_winid);
			obj_pos = getElementPosition(extra_winid);
			var rel_pos = document.getElementById(extra_winid).style.top.replace(/px/ig,'');
			var rel_offset = (top - (obj_pos['top'] - rel_pos) + 20);
			if(rel_offset < 0) rel_offset = 0;

			elem.style.top = rel_offset + "px";
		}

		return;
	}
	window.set_info_location = set_info_location;
	floating_window_exists = true;
	window.onscroll = set_info_location;
	window.onresize = set_info_location;
});
