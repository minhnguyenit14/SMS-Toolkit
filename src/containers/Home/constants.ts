import { Content } from "./components/HelperContent";
import message from './home.json';
import { WEB_PROTOCOLS } from "@constants";
import { PickerItem } from "@components/Modal/Picker";
import { RegexFlagType } from "./components/RegexFlagsBtn";

export enum FilterType {
    "keyword",
    "regex"
}
type regexFlagsType = {
    none: RegexFlagType,
    global: RegexFlagType,
    caseIntensitive: RegexFlagType,
    multiline: RegexFlagType,
    singleLine: RegexFlagType,
    unicode: RegexFlagType,
    sticky: RegexFlagType,
}

export const regexFlagType: regexFlagsType = {
    none: "",
    global: "g",
    caseIntensitive: "i",
    multiline: "m",
    singleLine: "s",
    unicode: "u",
    sticky: "y"
};

export const HELPER_NOTES: Array<string> = [message.help.note1, message.help.note2];
export const HELPER_CONTENT: Array<Content> = [{ title: message.help.contentTitle, body: [message.help.content1, message.help.content2, message.help.content3, message.help.content4] }];
export const PROTOCOL_PICKER_DATA: Array<PickerItem> = [
    { label: WEB_PROTOCOLS.HTTPS, value: WEB_PROTOCOLS.HTTPS },
    { label: WEB_PROTOCOLS.HTTP, value: WEB_PROTOCOLS.HTTP }
];

export const REGEX_FLAGS_PICKER_DATA = [
    {
        label: "none",
        value: regexFlagType.none
    },
    {
        label: "[g]lobal",
        value: regexFlagType.global
    },
    {
        label: "case [i]nsensitive",
        value: regexFlagType.caseIntensitive
    },
    {
        label: "[m]ultiline",
        value: regexFlagType.multiline
    },
    {
        label: "[s]ingle line (dotall)",
        value: regexFlagType.singleLine
    },
    {
        label: "[u]nicode",
        value: regexFlagType.unicode
    },
    {
        label: "stick[y]",
        value: regexFlagType.sticky
    }
]