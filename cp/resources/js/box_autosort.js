use_box_classname = "bc";
function box_classname() {
  return use_box_classname;
}

function find_highest_position_available(boxes_across) {
  var dstr = "";
  var prefbox = new Array();
  prefbox["id"] = 0;
  prefbox["top"] = 0;
  prefbox["left"] = 0;
  for (var c = 1; c <= boxes_across; c++) {
    setelem = false;
    var elempos = getElementPosition("cn" + c);
    var elem_top = elempos["top"] * 1 + elempos["height"] * 1;
    var elem_left = elempos["left"] * 1;
    dstr += c + ") " + elem_top + "\n";
    if (prefbox["id"] == 0) setelem = true;
    else {
      if (elem_top < prefbox["top"] * 1) setelem = true;
      else if (
        elem_top == prefbox["top"] * 1 &&
        elem_left < prefbox["left"] * 1
      )
        setelem = true;
    }
    if (setelem) {
      prefbox["id"] = c;
      prefbox["top"] = elem_top;
      prefbox["left"] = elem_left;
    }
  }
  return prefbox["id"];
}

function reset_box_positions() {
  var box_counts = get_box_counts();
  boxes_across = box_counts["across"];
  total_boxes = box_counts["total"];

  for (var b = 1; b <= total_boxes; b++) {
    tobj = document.getElementById("bx" + b);
    var append_to = document.getElementById("cn" + b);
    if (tobj && append_to) {
      append_to.appendChild(tobj);
    }
  }
}

function arrange_boxes(set_box_classname) {
  if (set_box_classname) use_box_classname = set_box_classname;
  reset_box_positions();

  var box_counts = get_box_counts();
  boxes_across = box_counts["across"];
  total_boxes = box_counts["total"];

  for (var b = boxes_across + 1; b <= total_boxes; b++) {
    arrange_box(b, boxes_across);
  }
}

function arrange_box(boxn, boxes_across) {
  var highest_box = find_highest_position_available(boxes_across);
  tobj = document.getElementById("bx" + boxn);
  var append_to = document.getElementById("cn" + highest_box);
  if (tobj && append_to) {
    append_to.appendChild(tobj);
  }
}

function start_arrange_boxes() {
  setTimeout("arrange_boxes()", 100);
}

//window.onload = start_arrange_boxes();
function test_two_col() {
  if (document.getElementById("box_container").style.width == "500px")
    setwidth = "800px";
  else setwidth = "500px";
  document.getElementById("box_container").style.width = setwidth;
  reset_box_positions();
  //arrange_boxes();
}

function get_box_counts() {
  var box_counts = new Array();
  var bcelems;
  if (element_exists("main_section_editor_container")) {
    bcelems = document
      .getElementById("main_section_editor_container")
      .getElementsByClassName(box_classname());
  } else {
    bcelems = document.getElementsByClassName(box_classname());
  }
  box_counts["total"] = bcelems.length;
  highest_top = 0;
  highest_count = 0;
  dstr = "";
  for (var b = 1; b <= bcelems.length; b++) {
    var celem = bcelems[b - 1];
    if (!celem.hasAttribute("id")) {
      celem.id = "cn" + b;
      innerelem = celem.firstElementChild;
      innerelem.id = "bx" + b;
      dstr += celem.id + "-" + innerelem.id + ") " + elem_top + "\n";
    }

    var elempos = getObjPosition(celem);
    var elem_top = elempos["top"] * 1;
    var use_elem = false;

    if (elempos["height"] * 1 > 10) {
      if (highest_count == 0) {
        highest_top = elem_top;
        highest_count = 1;
      } else if (highest_top * 1 == elem_top * 1) {
        highest_count++;
      } else if (elem_top * 1 < highest_top * 1) {
        highest_top = elem_top;
        highest_count = 1;
      }
    }
  }
  //if(dstr!='') alert(dstr);
  box_counts["across"] = highest_count;
  return box_counts;
}

function exec_enable_auto_box_sort(set_box_classname) {
  use_box_classname = set_box_classname;
  start_arrange_boxes();
  //window.addEventListener("resize", start_arrange_boxes);
}

function string_contained_in_path(str_in_path) {
  var pathstr = "" + window.location + "";
  if (pathstr.indexOf(str_in_path) == -1) return false;
  else return true;
}

function enable_auto_box_sort(set_box_classname) {
  // Global variable to disable auto box sort
  if (window.disable_auto_box_sort) {
    return;
  }

  exec_enable_auto_box_sort(set_box_classname);

  if (string_contained_in_path("/checkout/")) {
    if (set_box_classname == "col-md-6") {
      exec_enable_auto_box_sort("col-md-4");
    }
    setTimeout('exec_enable_auto_box_sort("' + set_box_classname + '")', 180);
  }
}
