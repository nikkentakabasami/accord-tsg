
import { AccModalDialog } from '../../js/accord-bundle.js';



let dialog1;


function logMessage(mess) {
  $('#log1').val(function(i, oldVal) {
    return oldVal + "\n" + mess;
  });

}


$(document).ready(function() {




  dialog1 = new AccModalDialog({
    title: "Диалог по умолчанию",
    contentUrl: accordUtils.accordPath + "demos/misc/contentFragment.html",
    fragmentLoadMode: AccModalDialog.LoadModes.FETCH,
    autosize: true,
    onOk: () => {
      logMessage("dialog1 сохранён.");
    },
    onCancel: () => {
      logMessage("dialog1 закрытие без сохранения.");
    },
    onInitiated: () => {
      dialog1.show();
    },
  });

  dialog1.addEventListener(AccModalDialog.AccModalDialogEvents.onClose, e => {
    console.log("dialog1 закрыт.");
  });



  $("#b1").click(e => {
    dialog1.show();
  });


});





