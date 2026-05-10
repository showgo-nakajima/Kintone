(function () {
    'use strict';
    kintone.events.on([
        'app.record.edit.change.アセット名',
        'app.record.create.change.アセット名'
    ], (event) => {
        var _a;
        const record = event.record;
        const assetName = (_a = record.アセット名.value) !== null && _a !== void 0 ? _a : '';
        const isEmpty = assetName.trim() === '';
        if (!isEmpty)
            return event;
        record.単価.value = '';
        record.税込み価格.value = '';
        record.ステータス1.value = '';
        const today = new Date();
        const formatted = today.getFullYear() +
            '-' +
            ('0' + (today.getMonth() + 1)).slice(-2) +
            '-' +
            ('0' + today.getDate()).slice(-2);
        record.販売開始日.value = formatted;
        return event;
    });
})();
