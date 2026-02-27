  'use strict';

  // --- フィールド型定義 ---
  type TextField = { value: string };
  type NumberField = { value: string | number | null };
  type DateField = { value: string };

  interface AppRecord {
    アセット名: TextField;
    単価: NumberField;
    税込み価格: NumberField;
    ステータス: TextField;
    販売開始日: DateField;
  }

  kintone.events.on([
    'app.record.edit.change.アセット名',
    'app.record.create.change.アセット名'
  ], (event) => {
    const record = event.record;
    debugger;

    const assetName = record.アセット名.value ?? '';

    const isEmpty = assetName.trim() === '';

    if (!isEmpty) return event;

    // 初期化処理
    record.単価.value = '';
    record.税込み価格.value = '';
    record.ステータス.value = '----';

    const today = new Date();
    const formatted =
      today.getFullYear() +
      '-' +
      ('0' + (today.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + today.getDate()).slice(-2);

    record.販売開始日.value = formatted;

    return event;
  });
export{};