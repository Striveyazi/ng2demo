export class FieldBase<T>{
  value: T; // 取值，泛型
  key: string; // 名称，唯一识别一个表单控件，字符串
  label: string; // 标签，与 key 对应，字符串
  required: boolean; // 是否必填，布尔值
  pattern: string; // 检验规则，字符串
  order: number; // 排序，数值
  controlType: string; // 控件类型，字符串
  constructor(options:any) {
    // ...
  }
}