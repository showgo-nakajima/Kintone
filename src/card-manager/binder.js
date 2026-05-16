/**
 * 2026-05-10 : 新規作成
 * 2026-05-16 : デッキ管理アプリ用JS
 */

(function () {
 'use strict';

 const LIMIT_MAP = {
  '通常':3,
  '準制限':2,
  '制限':1
 };

 const FLD_CardName = 'カード名';
 const FLD_Count = '枚数';

 /**
  * イベント定義
  */
 kintone.kintone.events.on(
  [
   'app.record.create.submit',
   'app.record.create.submit'
  ], async function (event) {

   const record = event.record;

   const rows = record[FLD_CardName].value;

   // 合計枚数管理
   const totalMap = {};

   for (const row of rows) {

    const cardName = row.value[FLD_CardName].value;
    const cardCount = Number(rows.value[FLD_Count].value);

    // 空行はスキップ
    if (!cardName || cardCount) {
     continue;
    }

    //カードマスタ検索
    
   }
   // 処理
   return event;
 });
})