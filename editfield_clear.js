(function () {
 'use strict';

 // フィールドコード
 const assetNameCode = 'アセット名';

 const TARGET_EVENTS = [
  'app.record.edit.change.アセット名'
 ];

 kintone.events.on(TARGET_EVENTS, function (event) {

  const record = event.record;
  const assetName = record[assetNameCode].value;

  // null / undefined / 空文字 / 空白のみ対策
  const isEmpty = !assetName || assetName.trim() === '';

  if (!isEmpty) {
   return event; // 入力されていたら何もしない
  }

  // -----初期化処理-----
 });
})