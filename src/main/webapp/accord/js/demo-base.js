

let mainJsHref = null;

let $workPanel;

let showAux = true;
let $hideAuxButton;
let $selectorText;

let currentFunc = null;

//элементы песочницы
let $btn1, $btn2, $inp1, $inp2, $inp3, $inp4, $testBtn1, $testBtn2;
let formDiv1, formDiv2;
let form1, form2;

let $panel1, $panel2;

let $sel1, $sel2, $sel3, $sel4;


//выполняются до и после выполнения currentFunc
let beforeExecDemoFunc = null;
let afterExecDemoFunc = null;


let greenSpan = '<span class="green"></span>';


//возвращает ссылку на главный js-файл этой демки
function findMainJs() {

  const scripts = document.querySelectorAll('script[src]');


  const jsFiles = Array.from(scripts).forEach(script => {
    let src = script.src;
    if (!src.endsWith("-demo.js")) {
      return;
    }
    mainJsHref = src;
  });

  console.log("mainJs=" + mainJsHref);
  return mainJsHref;
}

//прописывает ссылку на главный js-файл в ссылке в заголовке
function fixSrcRef() {

  let src = findMainJs();
  if (!src) {
    console.log("mainJs not found!");
    return;
  }

  $(".titlePanel a").attr("href", src);

}

//добавляет в демку доп. элементы
function addTitlePanelButtons() {

  let $tp = $(".titlePanel");

  if (!$tp.children("#hideAuxButton").length) {
    $tp.append('<button id="hideAuxButton" type="button" class="acc-btn">Скрыть описание</button>');
  }

  if (!$tp.children("a").length) {
    $tp.append('<a href="#" target="source">Исходники</a>');
  }



}


function showMainJs() {
  let options = {
    draggable: false,
    contentTextUrl: mainJsHref,
    hideOnDblclick: true,
    fullScreen: true,
    cssClass: "help-panel",
    panelExtraClasses: "acc-popup"
  }
  let p1 = new AccPopup(options);
  p1.show();
}





//убирает лишние отступы в коде
function removeOddIndent(code) {

  let lines = code.split("\n")
  if (lines.length == 1) {
    return code.trim();
  }

  lines = lines.map(line => line.replaceAll("\t", "  "));

  //убираем пустые строки в начале	
  while (lines.length > 0 && lines[0].trim().length == 0) {
    lines.shift();
  }

  //убираем пустые строки в конце	
  while (lines.length > 0 && lines[lines.length - 1].trim().length == 0) {
    lines.pop();
  }


  let minIndent = 0;
  for (let i = 0;i < lines.length;i++) {
    let line = lines[i];

    //		line = line.replaceAll("\t","  ");
    //		lines[i] = line;

    if (line.trim().length == 0) {
      continue;
    }

    let r = line.match(/^ +/i);
    if (r) {

      let indent = r[0].length;
      if (!minIndent) {
        minIndent = indent;
        continue;
      }
      if (indent < minIndent) {
        minIndent = indent;
      }
    }
  }

  if (minIndent) {
    lines = lines.map(line => line.substring(minIndent));
  }

  return lines.join("\n");

}

//возвращает код заданной функции.
//убирает её объявление, убирает лишние отступы
function trimFuncCode(func) {
  let code = String(func);

  let ind1 = code.indexOf("{");
  let ind2 = code.lastIndexOf("}");
  code = code.substring(ind1 + 1, ind2);
  code = removeOddIndent(code);
  return code;
}


function highlightLogComments1() {
  highlightLogComments($log1);
}
function highlightLogComments2() {
  highlightLogComments($log2);
}
function highlightLogComments($log) {

  const text = $log.html();
  const lines = text.split('\n');

  const processedLines = lines.map(line => {
    let ind = line.indexOf('//');
    if (ind >= 0) {
      return line.substring(0, ind) + '<span class="gray">' + line.substring(ind) + '</span>';
    } else {
      return line;
    }
  });

  let newText = processedLines.join('\n');

  $log.html(newText);
}


function initDemoCodeSelect(selector, data) {

  let $sel = $(selector);
  $sel.change(e => {
    clearLog();

    let v = $sel.val();


    if (Array.isArray(data)) {
      //		reloadSandbox();
      let v = $sel.children("option:selected").text();
      $selectorText.val(v);
      currentFunc = null;
      log(v);
    } else {
      $selectorText.val(v);
      currentFunc = data[v];

      if (typeof currentFunc == "string") {
        currentFunc = removeOddIndent(currentFunc);
        log(currentFunc);

      } else {
        let code = trimFuncCode(currentFunc);
        log(code);
      }

    }

  });


  let opts = {
    data: data,
    withNullOption: true,
    selectedValue: null,
    contentIsValue: true,
    valueIsIndex: false
  };

  if (Array.isArray(data)) {
    opts.valueIsIndex = true;
    opts.contentIsValue = false;
  }

  accordUtils.fillSelect($sel, opts);

}


function execDemoFunc(func) {
  if (!func) {
    return;
  }

  $(".workPanel *").removeClass("red-border");


  clearLog();

  if (typeof func == "string") {

    log(func);
    le2(func);

  } else {

    let code = trimFuncCode(func);
    log(code);

    let result = null;
    try {
      result = func();

      let logMess = '\nexecuted. ';
      if (result && result.jquery) {
        result.addClass("red-border");
        logMess += "elements found: " + result.length;
      }
      log(logMess);

    } catch (error) {
      log("Error:", error.message);
      console.error(error.stack);
    }

  }


  highlightLogComments1();
  highlightLogComments2();

}


let reloadSandboxVars = function() {

}

function reloadSandbox() {

  $workPanel.empty();

  let $sandboxPanels = accordUtils.cloneTemplate("#template1");
  $sandboxPanels.appendTo($workPanel);


  $btn1 = $("#btn1");
  $btn2 = $("#btn2");
  $inp1 = $("#inp1");
  $inp2 = $("#inp2");
  $inp3 = $("#inp3");
  $inp4 = $("#inp4");

  $testBtn1 = $("#testBtn1");
  $testBtn2 = $("#testBtn2");

  $formDiv1 = $("#formDiv1");
  $formDiv2 = $("#formDiv2");

  $form1 = $("#form1");
  $form2 = $("#form2");

  $panel1 = $("#formDiv1");
  $panel2 = $("#formDiv2");


  if (reloadSandboxVars) {
    reloadSandboxVars();
  }


}


//let emptyDiv = $("<div></div>");
//let defaultStyles = window.getComputedStyle(emptyDiv.get(0));

let showCssStylesDefaultOptions = {
  showInContent: false,
  showInPrevSibling: false
}


function showCssStylesForElements(selector, opt) {

  let options = $.extend({}, showCssStylesDefaultOptions, opt);


  $(selector).each((index, el) => {
    let $el = $(el);
    let styleText = $(el).attr("style");
    if (!styleText) {
      return;
    }
    let infoPanelSelector = $el.data("show-style-in");
    if (infoPanelSelector) {
      $("#" + infoPanelSelector).text(styleText);
    }
    if (options.showInContent) {
      $el.text(styleText);
    }
    if (options.showInPrevSibling) {
      $el.prevAll(":header:first").text(styleText);
    }
  });

}

function showStyleTagText() {


  $(":header[data-style-element]").each((index, el) => {
    let $el = $(el);
    let styleElement = $(el).data("style-element");

    let styleText = $("#" + styleElement).text();

    $el.text(styleText)
  });


  //	$("#style1").text()

}




let beforeHighlight = null;


//выделяет объекты с заданным селектором красной рамкой
//выводит в лог значение выражения (или число найденных элементов)
function highlight(val) {
  reloadSandbox();
  if (!val) {
    return;
  }

  if (beforeHighlight) {
    beforeHighlight();
  }


  clearLog();
  log(val);
  if (val.indexOf("$") >= 0 && val.indexOf("$=") < 0) {

    val = eval(val);
    if (!val.jquery) {
      log(val);
      return;
      //			throw new Error('Выражение должно возвращать jquery-объект!');
    }

  } else {
    val = $(val);
  }

  val.addClass("red-border");

  logVal("elements found", val.length);

}




function formatDateTime(date) {
  let r = formatDate(date);
  let t = formatTime(date);
  if (t != "00:00:00") {
    r = r + " " + t;
  }
  return r;
  //	return formatDate(date)+" "+formatTime(date);
}

function formatTime(date) {
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  return (h <= 9 ? '0' + h : h) + ':' + (m <= 9 ? '0' + m : m) + ':' + (s <= 9 ? '0' + s : s);
}

function formatDate(date) {
  let d = date.getDate();
  let m = date.getMonth() + 1;
  let y = date.getFullYear();
  return (d <= 9 ? '0' + d : d) + '.' + (m <= 9 ? '0' + m : m) + '.' + y;
}


$(function() {


  $sel1 = $("#selectors1");
  $sel2 = $("#selectors2");
  $sel3 = $("#selectors3");
  $sel4 = $("#selectors4");


  $workPanel = $(".workPanel");
  $selectorText = $("#selectorText");


  addTitlePanelButtons();
  fixSrcRef();

  $hideAuxButton = $("#hideAuxButton");


  if ($log1.parents(".auxPanel").children().length >= 2) {
    new AccSplitter({
      panelSelector: ".auxPanel",
      startLeftPanelWidth: 600
    });
  }



  //показывать исходники при нажатии на ссылку
  $(".titlePanel a").click(e => {
    e.preventDefault();
    showMainJs();
  });

  $hideAuxButton.click(e => {

    showAux = !showAux;
    if (showAux) {
      $("div.auxPanel").css("display", "flex");
      $hideAuxButton.text("скрыть описание");
    } else {
      $("div.auxPanel").css("display", "none");
      $hideAuxButton.text("показать описание");
    }


  });


  let tp = new TabbedPanel("#tabbedPanel1");
  new TabbedPanel("#tabbedPanel2");




  $("#bExecute").click(e => {
    if (!currentFunc) {
      let v = $selectorText.val();
      highlight(v);
      return;
    }
		
		if (beforeExecDemoFunc){
			beforeExecDemoFunc();
		}
		
    execDemoFunc(currentFunc);
		
		if (afterExecDemoFunc){
			afterExecDemoFunc();
		}
		
  });

  $("#bClearLog").click(e => {
    clearLog();
  });

  $("#bReload").click(e => {
    reloadSandbox();
  });



});



