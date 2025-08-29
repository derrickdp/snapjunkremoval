ajax_callback_function		= "ajax_callback";
extra_callback_function		= "";
ajax_render_id				= "";
override_ajax_response_url	= "";
is_dev						= false;
ajax_carry_value			= "";

var eac_retry_info = {};
var ERSHTTPRequests = {};

function xmlhttpPost(strURL, querystr)
{
	var xmlHttpReq = false;
	var self = this;
	// Mozilla/Safari
	if (window.XMLHttpRequest)
	{
		self.xmlHttpReq = new XMLHttpRequest();
	}
	// IE
	else if (window.ActiveXObject)
	{
		self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
	}
	self.xmlHttpReq.open('POST', strURL, true);
	self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    const r = ajax_link_resolver;
	self.xmlHttpReq.onreadystatechange = function()
	{
		if (self.xmlHttpReq.readyState == 4)
		{
			process_ajax_callback(self.xmlHttpReq.responseText, strURL, querystr);
            if (typeof r === "function") {
                r(); // resolve the promise
            }
		}
	};
	self.xmlHttpReq.send(querystr);
}

retry_info = new Array();

window.query_ajax_query = (function () {

	window.callbacks = {};

	function queryFunction(datastring, callback) {
		if( callbacks[datastring] instanceof Array )
			callbacks[datastring].push(callback);
		else
			callbacks[datastring] = [callback];
		make_ajax_call("/ajax_query/", datastring, function(response) {
			if( response.success === "1" ) {
				while( current_cb = (callbacks[datastring]||[]).pop() )
					current_cb(response);
			} else {
				throw new Error("XHR Request was unable to complete successfully.");
			}
		});
	}

	function getFunctionFromWindow(fname) {
		if( fname in window && typeof window[fname] === "function" ) {
			return window[fname];
		} else {
			throw new TypeError("query_ajax_query: 2nd parameter, \""+fname+"\", does not reference any function that exists in the global scope.");
		}

	}

	return function entrypoint(request, callback) {
		//initial function does validation and type-checking on the parameters.//
		if( request instanceof Object ) {
			var datastring = Object.keys(request).map(function(key) {
				return key + "=" + request[key];
			}).join("&");
		} else if( typeof request === "string" ) {
			var datastring = request;
		} else {
			throw new TypeError("query_ajax_query: 1st parameter, \"request\", must be string or object. Found \""+typeof request+"\".");
		}

		if( typeof callback === "string" )
			callback = getFunctionFromWindow(callback);

		if( typeof callback !== "function" )
			throw new TypeError("query_ajax_query: 2nd parameter, \"callback\", must be string or function. Found \""+typeof callback+"\".");

		return queryFunction(datastring, callback);
	};

})();

function update_setting(settingName, settingValue, callback) {
	callback = callback || "console.log";
	var query = "cmd=update_setting&name="+settingName+"&value="+settingValue;
	//make_ajax_call("/ajax_query/", query, callback);
	query_ajax_query(query, callback);
}

function update_general_image(imageName, imageValue, callback) {
	callback = callback || "console.log";
	var query = "cmd=update_general_image&name="+imageName+"&value="+imageValue;
	//make_ajax_call("/ajax_query/", query, callback);
	query_ajax_query(query, callback);
}


function get_current_foldername(cb) {
	query_ajax_query("cmd=get_current_foldername", function(data) {
		if( typeof cb === "string" ) {
			eval(cb)(data.foldername);
		} else {
			cb(data.foldername);
		}
	});
}

function make_ajax_call(strURL, querystr, callback, retry_times, retry_delay, retry_handle, override_content_type)
{
	var xmlHttpReq = false;
	var self = this;

	if (!retry_times) retry_times = 0;
	if (!retry_delay) retry_delay = 2;
	if (!retry_handle) retry_handle = "generic";
	if (!override_content_type) override_content_type = "standard";

	if (retry_times > 0)
	{
		//alert("fc for " + retry_handle + "\n" + strURL + "\n" + querystr + "\n" + callback + "\n" + retry_times + "\n" + retry_delay + "\n" + retry_handle);
	}

	retry_info[retry_handle] = new Array(1, strURL, querystr, callback, retry_times, retry_delay, retry_handle); // active, try count
	if (retry_times > 0)
	{
		var call_retry_func = "verify_ajax_call('" + retry_handle + "')";
		setTimeout(call_retry_func, retry_delay * 800);
	}

	// Mozilla/Safari
	if (window.XMLHttpRequest)
	{
		xmlHttpReq = new XMLHttpRequest();
	}
	// IE
	else if (window.ActiveXObject)
	{
		xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlHttpReq.open('POST', strURL, true);
	if (override_content_type == "multipart")
	{
		xmlHttpReq.setRequestHeader('Mime-Type', "multipart/form-data");
		set_content_type = "false";
	}
	else
	{
		set_content_type = "application/x-www-form-urlencoded";
	}
	xmlHttpReq.setRequestHeader('Content-Type', set_content_type);
	xmlHttpReq.onreadystatechange = function()
	{
		if(xmlHttpReq.readyState == 4)
		{
			retry_info[retry_handle] = new Array(0, "", "", "", 0, 0);
			if (typeof callback === "function" )
			{
				callback(parse_ajax_response(xmlHttpReq.responseText));
			}
			else if (typeof callback === "string")
			{
				eval(callback + "(parse_ajax_response(xmlHttpReq.responseText))");
			}
			else
			{
				//console.log("callback is unknown");
			}
		}
	};
	xmlHttpReq.send(querystr);
}

function old_self_make_ajax_call(strURL, querystr, callback, retry_times, retry_delay, retry_handle, override_content_type)
{
	var xmlHttpReq = false;
	var self = this;

	if (!retry_times) retry_times = 0;
	if (!retry_delay) retry_delay = 2;
	if (!retry_handle) retry_handle = "generic";
	if (!override_content_type) override_content_type = "standard";

	if (retry_times > 0)
	{
		//alert("fc for " + retry_handle + "\n" + strURL + "\n" + querystr + "\n" + callback + "\n" + retry_times + "\n" + retry_delay + "\n" + retry_handle);
	}

	retry_info[retry_handle] = new Array(1, strURL, querystr, callback, retry_times, retry_delay, retry_handle); // active, try count
	if (retry_times > 0)
	{
		var call_retry_func = "verify_ajax_call('" + retry_handle + "')";
		setTimeout(call_retry_func, retry_delay * 800);
	}

	// Mozilla/Safari
	if (window.XMLHttpRequest)
	{
		self.xmlHttpReq = new XMLHttpRequest();
	}
	// IE
	else if (window.ActiveXObject)
	{
		self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
	}
	self.xmlHttpReq.open('POST', strURL, true);
	if (override_content_type == "multipart")
	{
		self.xmlHttpReq.setRequestHeader('Mime-Type', "multipart/form-data");
		set_content_type = "false";
	}
	else
	{
		set_content_type = "application/x-www-form-urlencoded";
	}
	self.xmlHttpReq.setRequestHeader('Content-Type', set_content_type);
	self.xmlHttpReq.onreadystatechange = function()
	{
		if(self.xmlHttpReq.readyState == 4)
		{
			retry_info[retry_handle] = new Array(0, "", "", "", 0, 0);
			if (typeof callback === "function" )
			{
				callback(parse_ajax_response(self.xmlHttpReq.responseText));
			}
			else if (typeof callback === "string")
			{
				eval(callback + "(parse_ajax_response(self.xmlHttpReq.responseText))");
			}
			else
			{
				//console.log("callback is unknown");
			}
		}
	};
	self.xmlHttpReq.send(querystr);
}

function verify_ajax_call(retry_handle)
{
	rih = retry_info[retry_handle];
	rih_on = rih[0];
	rih_strURL = rih[1];
	rih_querystr = rih[2];
	rih_callback = rih[3];
	rih_retry_times = rih[4];
	rih_retry_delay = rih[5];
	rih_retry_handle = rih[6];

	if (rih_on == 1)
	{
		rih_retry_times -= 1;
		make_ajax_call(rih_strURL + "?rn=" + (Math.random() * 10000), rih_querystr, rih_callback, rih_retry_times, rih_retry_delay, rih_retry_handle);
	}
}

function ers_ajax_call(strURL, querystr, callback, retry_times, retry_delay, retry_handle, override_content_type)
{
	var req_key = Date.now() + "-" + ersRandom();

	if (!retry_times) retry_times = 0;
	if (!retry_delay) retry_delay = 2;
	if (!retry_handle) retry_handle = "generic_" + req_key;
	if (!override_content_type) override_content_type = "standard";

	eac_retry_info[retry_handle] = [ 1, strURL, querystr, callback, retry_times, retry_delay, retry_handle ];
	if (retry_times > 0)
	{
		setTimeout("verify_ers_ajax_call('" + retry_handle + "', '" + req_key + "')", (retry_delay * 800));
	}

	var req = false;

	// Mozilla/Safari
	if (window.XMLHttpRequest)
	{
		req = new XMLHttpRequest();
	}
	// IE
	else if (window.ActiveXObject)
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
	}

	if (!req)
	{
		return "";
	}

	req.open('POST', strURL, true);
	if (override_content_type == "multipart")
	{
		req.setRequestHeader('Mime-Type', "multipart/form-data");
		set_content_type = "false";
	}
	else
	{
		set_content_type = "application/x-www-form-urlencoded";
	}

	req.setRequestHeader('Content-Type', set_content_type);
	req.onreadystatechange = function()
	{
		var this_req = ERSHTTPRequests[req_key];
		if (!this_req)
		{
			delete ERSHTTPRequests[req_key];
			return;
		}

		if (this_req.readyState == 4)
		{
			delete eac_retry_info[retry_handle];
			if (typeof callback === "function")
			{
				callback(parse_ajax_response(this_req.responseText));
			}
			else if (typeof callback === "string")
			{
				eval(callback + "(parse_ajax_response(ERSHTTPRequests['" + req_key + "'].responseText))");
			}
			delete ERSHTTPRequests[req_key];
		}
	};
	req.send(querystr);

	ERSHTTPRequests[req_key] = req;

	return req_key;
}

function verify_ers_ajax_call(retry_handle, req_key)
{
	var rih = eac_retry_info[retry_handle];
	if (!rih)
	{
		return;
	}
	rih_on = rih[0];
	rih_strURL = rih[1];
	rih_querystr = rih[2];
	rih_callback = rih[3];
	rih_retry_times = rih[4];
	rih_retry_delay = rih[5];
	rih_retry_handle = rih[6];

	if (rih_on == 1)
	{
		var this_req = ERSHTTPRequests[req_key];
		if (this_req)
		{
			if (this_req.readyState >= 2)
			{
				return;
			}

			this_req.abort();
		}

		delete ERSHTTPRequests[req_key];

		rih_retry_times -= 1;
		ers_ajax_call(rih_strURL + "?rn=" + (Math.random() * 10000), rih_querystr, rih_callback, rih_retry_times, rih_retry_delay, rih_retry_handle);
	}
}

aj_flexible_containers = new Array();

function ajax_register_flexible_container(container_id)
{
	aj_flexible_containers[container_id] = container_id;
}

function parse_ajax_response(str)
{
	str = str.trim();

	if (str.substring(0, 1) == '{')
	{
		var jrsp = JSON.parse(str);
		if ("status" in jrsp)
			return jrsp;
	}

	var rsp = new Array();
	rsp['success'] = "0";

	var str_parts = str.split("&");
	for (var i = 0; i < str_parts.length; i++)
	{
		var var_parts = str_parts[i].split("=");
		if (var_parts.length > 1)
			rsp[var_parts[0]] = var_parts[1];
	}

	return rsp;
}

function process_ajax_callback(str, strURL, querystr)
{
	var sep = "<!--" + "AJAX" + " " + "RESPONSE" + "-->";
	if (str.indexOf(sep) >= 0)
		start_pos = str.indexOf(sep) + sep.length;
	else
		start_pos = 0;
	eval(ajax_callback_function + "(str.substring(start_pos))");
	if (extra_callback_function != "")
	{
		eval(extra_callback_function + "()");
	}
	window.dispatchEvent(new CustomEvent("ajax_callback_processed", {
		detail: {
			strURL: strURL,
			querystr: querystr,
		},
	}));
}

function get_ajax_response(render_area, post_info)
{
	var winlocstr = "" + window.location + "";
	var postrootstr = "";
	if (winlocstr.indexOf("/view/ersadmin") > 0) {
		postrootstr = "/cp/";
	}
	else if (winlocstr.indexOf("/view/") > 0) postrootstr = "/";
	if(override_ajax_response_url && override_ajax_response_url.length > 5)
		postrootstr = override_ajax_response_url;

	// For WP Plugins
	if(postrootstr.indexOf("ers-wp-plugin.php") > 0) {
			winlocparts = winlocstr.split("?");
			winlocvars = "";
			if(winlocparts.length > 0) winlocvars = winlocparts[1];
			postrootstr = winlocparts[0];
	}

	xmlhttpPost(postrootstr + "?render_frame=" + render_area.replace(/\?/ig, "&") + "&rnd=" + Math.random() + "&ajtype=inner", post_info);
}

window.find_and_eval_script_tags = function find_and_eval_script_tags(estr, script_start, script_end, special_script_type)
{
	if(!special_script_type)
		special_script_type = "";

	var rpcfnc	= new Array('set_txt_val','add_txt_select','get_moved_input_txt_coords');
	var xhtml	= estr.split(script_start);

	for (var n = 1; n < xhtml.length; n++)
	{
		var xhtml2 = xhtml[n].split(script_end);
		if (xhtml2.length > 1)
		{
			run_xhtml = xhtml2[0];
			if(special_script_type=="babel") {
				eval(Babel.transform(run_xhtml,{presets: ['react']}).code);
			} else {
				for(var r=0; r<rpcfnc.length; r++) {
					var rpcfncname = rpcfnc[r];
					var reg = new RegExp("function " + rpcfncname + "\\(","g");
					run_xhtml = run_xhtml.replace(reg, rpcfncname + " = function(");
				}
				var wlocstr = "" + window.location + "";
				//if(wlocstr.indexOf('battlegr') > -1) {
				//	console.log(run_xhtml);
				//}
				eval(run_xhtml);
			}
		}
	}
}

render_ajax_template = "";

function render_ajax_response(str)
{
	ersRemoveElement(ersDE("loading_spinner_div"));

	var renderElem = ersDE(ajax_render_id);
	if(renderElem) {
		renderElem.className = "ajax_overlay";
	}
	if(str.indexOf("<wpers>") > 0) // Wordpress responses may include the wordpress template, and we only want what's in between the wpers tag
	{
		var strparts = str.split("<wp"+"ers>");
		if(strparts.length > 1) {
			strparts = strparts[1].split("</wp"+"ers>");
			str = strparts[0];
		}
	}

	var should_eval_script_tags = true;
	var render_el = ersDE(ajax_render_id);
	if (render_el)
	{
		if (render_ajax_template != "")
		{
			render_el.innerHTML = render_ajax_template.replace(/\[str\]/ig, str);
		}
		else
		{
			render_el.innerHTML = str;
		}
		window.setTimeout(function() { render_el.scrollTo(0, 0); }, 50);
	}

	if (ajax_render_id && ajax_render_id=="crm_billing_content")
	{
		if (typeof crm_2nd_billing_load !== "undefined" && crm_2nd_billing_load)
		{
			if (add_loaded_scripts_to_head(render_el))
			{
				should_eval_script_tags = false;
			}
		}
		crm_2nd_billing_load = false;
	}

	//-------------- For fli
	// What is fli?
	// Yeah, what's fli??
	// Who's asking? - JML 2020-10-06
	var str2 = "";
	for (var flc in aj_flexible_containers)
	{
		if (elementDescendedFrom(ajax_render_id, flc))
		{
			elem_desc = document.getElementById(flc);
			for (var n = 0; n < elem_desc.childNodes.length; n++)
			{
				elem_ch = elem_desc.childNodes[n];
				str2 += "descendent found (" + n + "/" + elem_desc.childNodes.length + ")\nparent:" + elem_desc.id + "\nchild:" + elem_ch.id + "\nwidth:" + elem_ch.offsetWidth + "\nheight:" + elem_ch.offsetHeight + "\n";
			}
		}
	}

	if (should_eval_script_tags)
	{
		eval_script_tags(str);
	}
}

var ajax_link_resolver = () => {};
function ajax_link(render_id, render_area, post_info, render_template, set_extra_callback_function, dev=false)
{
  return new Promise((resolve) => {
    ajax_link_resolver = resolve;

    window.dispatchEvent(new CustomEvent("ajax_link_start", {
      detail: {
        "render_id": render_id,
        "render_area": render_area,
        "post_info": post_info,
        "render_template": render_template,
        "set_extra_callback_function": set_extra_callback_function,
      },
    }));
    is_dev = dev;
    if (!post_info)
      post_info = "";

    if (!render_template)
      render_template = "";

    if (!set_extra_callback_function)
      set_extra_callback_function = "";

    render_ajax_template	= render_template;
    ajax_callback_function	= "render_ajax_response";
    extra_callback_function	= set_extra_callback_function;
    ajax_render_id			= render_id;

    ersRemoveElement(ersDE("loading_spinner_div"));

    var elem = ersDE(render_id);
	  if (elem) {
		  elem.parentNode.appendChild(ers_spinner_div());
		  elem.className = "ajax_overlay_greyed_out";
	  }

    get_ajax_response(render_area, post_info);
  });
}

function ers_spinner_div(extra_class)
{
	if (!extra_class) extra_class = "";

	var t = document.createElement("div");
	t.id = "loading_spinner_div";
	t.innerHTML = "<div class='ERS_loader_wrapper " + extra_class + "'><div class='ERS_loader'></div></div>";

	return t;
}

function ajax_post(render_id, render_area, form_name, force_vals)
{
	var post_str = "";
	var elem = document.forms[form_name].elements;
	for (var i = 0; i < elem.length; i++)
	{
		var p_key = elem[i].name;
		var p_val = elem[i].value;

		if (typeof force_vals=="object" && p_key in force_vals)
		{
			p_val = force_vals[p_key];
		}

		if (post_str != "") post_str += "&";
		post_str += p_key + "=" + encodeURIComponent(p_val);
	}
	if (render_id == "return_post_str")
		return post_str;
	return ajax_link(render_id, render_area, post_str);
}

function explain_price_received(rsp)
{
	if (rsp['success'] == '1')
	{
		var output = rsp['output'];
		alert(unescape_decode(output));
	}
	else alert("Error Encountered");
}

function explain_price(server_host, for_order_id, for_item_id)
{
	make_ajax_call("//" + server_host + "/ajax_query/", "cmd=explain_price&order_id=" + for_order_id + "&explain_id=" + for_item_id, "explain_price_received");
}

window.addEventListener('popstate', function(e) {
	if(e.state && e.state.type=='ajax_link' && e.state.render_target && e.state.render_area) {
		if(e.state.btnid) {
			if(element_exists(e.state.btnid)) {
				var btnclickstr = '' + document.getElementById(e.state.btnid).onclick + '';
				btnclickstr_parts = btnclickstr.split('set_subnav(');
				if(btnclickstr_parts.length > 1) {
					btninner_parts = btnclickstr_parts[1].split(')');
					if(btninner_parts.length > 1) {
						btninner_str = btninner_parts[0];
						btnprop_parts = btninner_str.split(',');
						if(btnprop_parts.length==3) {
							var btnprop1 = btnprop_parts[0].replace(/['"]+/g, '');
							var btnprop2 = btnprop_parts[1].replace(/['"]+/g, '');
							var btnprop3 = btnprop_parts[2].replace(/['"]+/g, '');
							set_subnav(btnprop1,btnprop2,btnprop3);
						}
					}
				}
			}
		}
		ajax_link(e.state.render_target,e.state.render_area,'','',e.state.callback_str);
	}
	// e.state is equal to the data-attribute of the last image we clicked
});

function extract_html_source(str) {
	str = extract_ajax_response(str);
	str = extract_wp_template_contents(str);
	return str;
}

window.eval_script_tags = function eval_script_tags(str) {
	find_and_eval_script_tags(str, "<" + "script language=\"javascript\"" + ">", "<" + "/script>");
	find_and_eval_script_tags(str, "<" + "script language='javascript'" + ">", "<" + "/script>");
	find_and_eval_script_tags(str, "<" + "script type=\"text/javascript\"" + ">", "<" + "/script>");
	find_and_eval_script_tags(str, "<" + "script type='text/javascript'" + ">", "<" + "/script>");
	find_and_eval_script_tags(str, "<" + "script type=\"text/babel\"" + ">", "<" + "/script>","babel");
	find_and_eval_script_tags(str, "<" + "script type='text/babel'" + ">", "<" + "/script>","babel");
	find_and_eval_script_tags(str, "<" + "script" + ">", "<" + "/script>");
};

function extract_wp_template_contents(str) {
	if (str.indexOf("<wpers>") >= 0) {
		// Wordpress responses may include the wordpress template, and we only want what's in between the wpers tag
		let strparts = str.split("<wpers>");
		if (strparts.length > 1) {
			strparts = strparts[1].split("</wpers>");
			str = strparts[0];
		}
	}
	return str;
}

function extract_ajax_response(str) {
	const sep = "<!--AJAX RESPONSE-->";
	const parts = str.split(sep);
	if (parts.length > 1) {
		return parts.slice(1).join(sep);
	}
	return str;
}

function get_post_prefix() {
	const winlocstr = window.location.toString();
	let post_prefix = "";
	if (winlocstr.indexOf("/view/ersadmin") > 0) {
		post_prefix = "/cp/";
	} else if (winlocstr.indexOf("/view/") > 0) {
		post_prefix = "/";
	}
	if (typeof window.override_ajax_response_url === "string" && override_ajax_response_url.length > 5) {
		post_prefix = override_ajax_response_url;
	}
	if (post_prefix.indexOf("ers-wp-plugin.php") > 0) {
		window.winlocparts = winlocstr.split("?");
		window.winlocvars = "";
		if (window.winlocparts.length > 0) {
			window.winlocvars = window.winlocparts[1];
		}
		post_prefix = window.winlocparts[0];
	}
	return post_prefix;
}

function add_loaded_scripts_to_head(el)
{
	if (!ersIsElement(el))
	{
		return false;
	}

	var scriptEls = el.getElementsByTagName("SCRIPT");

	for (var i = 0; i < scriptEls.length; i++)
	{
		var scriptEl = document.createElement("SCRIPT");
		scriptEl.type = "text/javascript";
		if (!scriptEls[i].src)
		{
			scriptEl.innerHTML = scriptEls[i].innerHTML;
		}
		else
		{
			scriptEl.src = scriptEls[i].src;
		}
		document.head.appendChild(scriptEl);
	}

	return true;
}
