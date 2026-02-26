/**
 * 1.Kintoneアプリで、フィールドコード「単価」を対象に、
 *   税区分＋単価を入力し、フォーカスアウトしたタイミングで、 税率を加算する機能。
 * 2.ラジオボタンで税率を切り替え、表示できるように修正。
 * 
 * 税率は8%と10%を切り替え可能
 */

(function () {
  'use strict';

  kintone.events.on(
    [
      // 単価が変わった時のイベント
      'app.record.create.change.単価',
      'app.record.edit.change.単価',

      // 税率が変わった時のイベント
      'app.record.create.change.税区分',
      'app.record.edit.change.税区分'
    ],
    function (event) {
      const record = event.record;

      const basePrice = Number(record.単価.value);
      // 未入力・0・NaN対策
      if (isNaN(basePrice)) return event;
      if (!record.税区分.value) return event;

      // 税率取得
      const TAXRATE = record.税区分.value === '8%' ? 0.08 : 0.10;

      // 税込み価格を再計算
      record.税込み価格.value = Math.round(
        basePrice * (1 + TAXRATE)
      );
      // 税込み価格フィールドは編集不可とし表示専用とする。
      event.record['税込み価格'].disabled = true;

      return event;
    }
  );
})();
