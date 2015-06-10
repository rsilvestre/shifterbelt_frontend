/**
 * Created by michaelsilvestre on 2/03/15.
 */
'use strict';

define(['jquery'], function ($) {
    $(function () {
        'use strict';

        $('.article-action-delete').submit(function () {
            return confirm('Do you really want to delete the post?');
        });
    });
});
//# sourceMappingURL=check_submit.js.map