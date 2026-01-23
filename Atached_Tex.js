/**
 * Kintoneアプリで、フィールドコード「単価」を対象に、
 * 数値を入力し、フォーカスアウトしたタイミングで、 税率を加算する機能。
 * 
 * 税率は10%
 */

(function () {
  'use strict';

  kintone.events.on(
    [
      'app.record.create.change.単価',
      'app.record.edit.change.単価'
    ],
    function (event) {
      const record = event.record;

      const basePrice = Number(record.単価.value);
      // 未入力・0・NaN対策
      if (isNaN(basePrice)) return event;
      if (!record.税区分.value) return event;

      // 税率取得
      const TAXRATE = record.税区分.value === '8%' ? 0.08 : 0.10;

      // 税込み計算（1回だけ）
      record.税込み価格.value = Math.round(
        basePrice * (1 + TAXRATE)
      );

      return event;
    }
  );
})();
