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
 kintone.events.on(
  [
   'app.record.create.submit',
   'app.record.edit.submit'
  ], async function (event) {

   const record = event.record;

   const rows = record[FLD_CardName].value;

   // 合計枚数管理
   const totalMap = {};

   for (const row of rows) {

    const cardName = row.value[FLD_CardName].value;
    const cardCount = Number(row.value[FLD_Count].value);

    // 空行はスキップ
    if (!cardName || !cardCount) {
     continue;
    }

    //カードマスタ検索
    const resp = await kintone.api(
     kintone.api.url('/k/v1/records.json', true),
     'GET',
     {
      app: 8,
      query: `カード名 = ${cardName}`
     }
    );

    if (resp.records.length === 0) {
     continue;
    }

    // 制限区分取得
    const limitType = resp.records[0]['制限区分'].value;

    // 最大枚数
    const maxCount = LIMIT_MAP[limitType] || 3;

    // 集計
    if (!totalMap[cardName]) {
     totalMap[cardName] = 0;
    }

    totalMap[cardName] += cardCount;

    // 制限枚数超過
    if (totalMap[cardName] > maxCount) {

     event.error = 
     `${cardName} は `
     + `${limitType}カードのため`
     + `${maxCount}枚までです`;

     return event;
    }
   }

   return event;
 });
})();