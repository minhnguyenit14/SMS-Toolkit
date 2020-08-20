
export type PickerItemLabel = string;
export type PickerItemValue = string;

export interface PickerItem {
    label: PickerItemLabel,
    value: PickerItemValue
}

export interface PickerProps {
    multiple?: boolean,
    visible?: boolean,
    selectedValue?: string | Array<string>,
    data: Array<PickerItem>,
    title?: string,
    cancelTitle?: string,
    selectTitle?: string,
    selectedLabel?: string, // works only if `multiple={false}`
    onSelect?: Function,
    onCancelPress?: Function,
    onClosed?: Function
}

export { default } from './Picker';