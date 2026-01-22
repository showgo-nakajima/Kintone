/**
 * Kintoneアプリで、フィールドコード「単価」を対象に、
 * 数値を入力し、フォーカスアウトしたタイミングで、 税率を加算する機能。
 * 
 * 税率は10%
 */

kintone.kintone.events.on(
 [
 'app.record.create.change.単価',
 'app.record.edit.change.単価'
 ],
 function (event) {
 // on change
 const record = event.record;
 const taxRate = 0.1;

 const price = record.単価.value;

 // 未入力・0・NaN対策
 if (!price) {
  return event;
 }

 // 税込み計算
 const taxtedPrice = Math.round(price * taxRate);

 record.単価.value = taxtedPrice;

 return event;
  }
);
