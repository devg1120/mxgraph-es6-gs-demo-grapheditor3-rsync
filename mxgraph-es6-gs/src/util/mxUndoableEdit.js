import { mxEvent } from "@mxgraph/util/mxEvent";
import { mxEventObject } from "@mxgraph/util/mxEventObject";


/*  Change Classes 
 *
$ find .  -name "*Change\.js"  
./model/changes/mxVisibleChange.js
./model/changes/mxGeometryChange.js
./model/changes/mxCollapseChange.js
./model/changes/mxTerminalChange.js
./model/changes/mxCellAttributeChange.js
./model/changes/mxRootChange.js
./model/changes/mxChildChange.js
./model/changes/mxStyleChange.js
./model/changes/mxValueChange.js
./view/mxCurrentRootChange.js
./view/mxSelectionChange.js
*/


import { mxChildChange } from "@mxgraph/model/changes/mxChildChange";
import { mxRootChange } from "@mxgraph/model/changes/mxRootChange";
import { mxGeometryChange } from "@mxgraph/model/changes/mxGeometryChange";
import { mxCellAttributeChange } from "@mxgraph/model/changes/mxCellAttributeChange";
import { mxTerminalChange } from "@mxgraph/model/changes/mxTerminalChange";
import { mxValueChange } from "@mxgraph/model/changes/mxValueChange";
import { mxCollapseChange } from "@mxgraph/model/changes/mxCollapseChange";
import { mxStyleChange } from "@mxgraph/model/changes/mxStyleChange";
import { mxVisibleChange } from "@mxgraph/model/changes/mxVisibleChange";

import { mxSelectionChange } from "@mxgraph/view/mxSelectionChange";
import { mxCurrentRootChange } from "@mxgraph/view/mxCurrentRootChange";

export class mxUndoableEdit {
  undone = false;
  redone = false;

  constructor(source, significant) {
    this.source = source;
    this.changes = [];
    this.significant = significant != null ? significant : true;
  }

  isEmpty() {
    return this.changes.length == 0;
  }

  isSignificant() {
    return this.significant;
  }

  add(change) {
	  //console.log("change:", typeof change);
	  if ( change.constructor == mxChildChange ) {
               console.log( "-- mxChildChange");
	  } else if ( change.constructor == mxRootChange ) {
               console.log( "-- mxRootChange");
	  } else if ( change.constructor == mxGeometryChange ) {
               console.log( "-- mxGeometryChange");
	  } else if ( change.constructor == mxCellAttributeChange ) {
               console.log( "-- mxCellAttributeChange");
	  } else if ( change.constructor == mxTerminalChange ) {
               console.log( "-- mxTerminalChange");
	  } else if ( change.constructor == mxValueChange ) {
               console.log( "-- mxValueChange");
	  } else if ( change.constructor == mxCollapseChange ) {
               console.log( "-- mxCollapseChange");
	  } else if ( change.constructor == mxStyleChange ) {
               console.log( "-- mxStyleChange");
	  } else if ( change.constructor == mxVisibleChange ) {
               console.log( "-- mxVisivleChange");


	  } else if ( change.constructor == mxSelectionChange ) {
               console.log( "-- mxSelectionChange");
	  } else if ( change.constructor == mxCurrentRootChange ) {
               console.log( "-- mxCurrentRootChange");
	  } else {
	       console.log("change:", change.constructor);
	       alert(`unknown change:${change.constructor}`);
	  }
    this.changes.push(change);
  }

  notify() {}

  die() {}

  undo() {
    if (!this.undone) {
      this.source.fireEvent(new mxEventObject(mxEvent.START_EDIT));
      var count = this.changes.length;

      for (var i = count - 1; i >= 0; i--) {
        var change = this.changes[i];

        if (change.execute != null) {
          change.execute();
        } else if (change.undo != null) {
          change.undo();
        }

        this.source.fireEvent(
          new mxEventObject(mxEvent.EXECUTED, "change", change),
        );
      }

      this.undone = true;
      this.redone = false;
      this.source.fireEvent(new mxEventObject(mxEvent.END_EDIT));
    }

    this.notify();
  }

  redo() {
    if (!this.redone) {
      this.source.fireEvent(new mxEventObject(mxEvent.START_EDIT));
      var count = this.changes.length;

      for (var i = 0; i < count; i++) {
        var change = this.changes[i];

        if (change.execute != null) {
          change.execute();
        } else if (change.redo != null) {
          change.redo();
        }

        this.source.fireEvent(
          new mxEventObject(mxEvent.EXECUTED, "change", change),
        );
      }

      this.undone = false;
      this.redone = true;
      this.source.fireEvent(new mxEventObject(mxEvent.END_EDIT));
    }

    this.notify();
  }
}
