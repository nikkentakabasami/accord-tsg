
import { AccModalDialog } from '../../js/accord-bundle.js';



let dialog1;


$(document).ready(function() {


  dialog1 = new AccModalDialog({
    title: "Диалог по умолчанию",
    contentUrl: accordUtils.accordPath + "demos/misc/contentFragment.html",
    fragmentLoadMode: AccModalDialog.LoadModes.FETCH,
    autosize: true,
    onOk: () => {
      log("dialog1 сохранён.");
    },
    onCancel: () => {
      log("dialog1 закрытие без сохранения.");
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





