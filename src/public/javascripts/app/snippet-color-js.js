/**
 * Created by michaelsilvestre on 31/05/15.
 */
define(['jquery', 'jquery_snippet'], function($, snippet) {
  "use strict";

  $(function(){
    "use strict";

    $('pre.js').snippet('javascript', { style: "ide-eclipse", transparent: true, showNum: false });
  });
});
