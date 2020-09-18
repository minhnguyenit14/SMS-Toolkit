import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import SmsListener, { ReceivedSmsMessage } from 'react-native-android-sms-listener';

import { callAPIFilteredByKeyword, callAPIFilteredByRegex } from '@helper/sms';
import { handleSmsPermissionAndroid, showFlashMessage } from '@helper';
import { getCrawlConfig, setCrawlConfig, clearAsyncStorage } from '@helper/asyncStorage';
import message from './home.json';
import { modalStackRoutes } from '@navigation/appRoutes';
import { HomeComponent, HelperContent } from './components';
import { WEB_PROTOCOLS } from '@constants';
import { FilterType, HELPER_NOTES, HELPER_CONTENT, PROTOCOL_PICKER_DATA, REGEX_FLAGS_PICKER_DATA, regexFlagType } from './constants';
import { ScreenOptions } from '@navigation';
import { RegexFlagType } from './components/RegexFlagsBtn.js';
import { ExecutingNotiType } from './components/ExecutingNoti';

const Home = ({ navigation, route }: ScreenOptions) => {
    const [smsListener, setSmsListener] = useState();
    const [canceler, setCanceler] = useState<Array<Function>>([]);

    const [postedMessage, setPostedMessage] = useState("");

    const [isRunning, setRunning] = useState(false);
    const [isExecutingMessage, setExecutingMessage] = useState(false);
    const [executingMessageType, setExecutingMessageType] = useState<ExecutingNotiType>("");

    const [isSmsPremissionGranted, setSmsPremissionGranted] = useState(false);
    const [config, setConfig] = useState({
        api: "",
        keyword: "",
        secretKey: "",
        minDate: 0,
        filterType: FilterType.keyword,
        regexFlags: [regexFlagType.global],
        protocol: WEB_PROTOCOLS.HTTPS
    });

    useEffect(() => {
        // getSms();
        // clearAsyncStorage();
        init();
        return () => {
            smsListener && smsListener.remove();
        }
    }, []);

    async function init() {
        await getAsyncConfig();
        await checkPermissions();
    }


    async function checkPermissions() {
        const isGrantedSmsPermissionAndroid = await handleSmsPermissionAndroid();
        setSmsPremissionGranted(isGrantedSmsPermissionAndroid);

        return isGrantedSmsPermissionAndroid;
    }

    function formatAPI(api: string) {
        if (api) {
            const prefix = api.slice(0, config.protocol.length).toLowerCase();
            if (prefix === config.protocol) {
                api = api.split(prefix)[1];
            } else {
                const otherProtocol =
                    PROTOCOL_PICKER_DATA
                        .find(protocol => protocol.value === api.slice(0, protocol.value.length).toLowerCase());
                if (otherProtocol) {
                    api = api.split(prefix)[1];
                    handleChangeProtocol(otherProtocol.value);
                }
            }
        }
        return api;
    }

    function getAPI() {
        return config.protocol + config.api;
    }

    function startSmsListener() {
        smsListener && smsListener.remove();
        const listener = SmsListener.addListener(async (message: ReceivedSmsMessage) => {
            setPostedMessage("");
            switch (config.filterType) {
                case FilterType.keyword:
                    callAPIFilteredByKeyword(
                        getAPI(),
                        config.keyword,
                        message,
                        config.secretKey,
                        handleCancelable,
                        handlePreExecuteAPI,
                        handleSuccessExecutingMessage,
                        handleFailExecutingMessage,
                        handleFinallyExecutingMessage
                    );
                    break;
                case FilterType.regex:
                    callAPIFilteredByRegex(
                        getAPI(),
                        config.keyword,
                        config.regexFlags.join(""),
                        message,
                        config.secretKey,
                        handleCancelable,
                        handlePreExecuteAPI,
                        handleSuccessExecutingMessage,
                        handleFailExecutingMessage,
                        handleFinallyExecutingMessage
                    );
                    break;
            }
            console.log(message);
        });
        setSmsListener(listener);
    }

    function handleCancelable(cancel: Function) {
        const tempCanceler = [...canceler]
        tempCanceler.push(cancel);
        setCanceler(tempCanceler);
    }

    function stopAllCancelable() {
        canceler.forEach(cancel => cancel());
        setCanceler([]);
    }

    function handlePreExecuteAPI() {
        setExecutingMessageType("loading");
        setExecutingMessage(true);
    }

    function handleSuccessExecutingMessage(mess: string) {
        setPostedMessage(mess);
        setExecutingMessageType("success");
    }

    function handleFailExecutingMessage(mess: string) {
        setPostedMessage(mess);
        setExecutingMessageType("error");
    }

    function handleFinallyExecutingMessage() {
        setTimeout(() => {
            setExecutingMessage(false);
        }, 3000);
    }

    function handleChangeAPI(api: string) {
        const formattedAPI = formatAPI(api);
        setConfig({
            ...config,
            api: formattedAPI
        });
    }

    function handleChangeKeyword(keyword: string) {
        setConfig({
            ...config,
            keyword
        });
    }

    function handleChangeSecretKey(secretKey: string) {
        setConfig({
            ...config,
            secretKey
        });
    }

    async function getAsyncConfig() {
        const crawlConfigs = await getCrawlConfig();
        const crawlConfig = crawlConfigs[crawlConfigs.length - 1];
        if (crawlConfig) {
            setConfig(crawlConfig);
            console.log(crawlConfigs);
        }
        return crawlConfig;
    }


    // async function getSms() {
    //     const crawlConfig = await getAsyncConfig();
    //     const isGrantedSmsPermissionAndroid = await handleSmsPermissionAndroid();
    //     const filter = {
    //         minDate: crawlConfig
    //             ? crawlConfig.minDate || 0
    //             : 0
    //     };

    //     if (isGrantedSmsPermissionAndroid) {
    //         getSMSAndroid(filter, handleSms);
    //     }
    // }

    // function handleSms(count: number, smsList: SmsFilter) {
    //     logger("Home")(count, smsList);
    // }

    function openHelper() {
        navigation.push(modalStackRoutes.popup, {
            pressToHide: false,
            onRequestClose: closeModal,
            title: message.help.title,
            renderContent: <HelperContent
                notes={HELPER_NOTES}
                content={HELPER_CONTENT}
            />,
            onOk: closeModal,
        })
    }

    function openProtocolSelector() {
        navigation.push(modalStackRoutes.picker, {
            selectedLabel: config.protocol,
            selectedValue: config.protocol,
            data: PROTOCOL_PICKER_DATA,
            title: message.modal.protocols.title,
            onSelect: handleChangeProtocol,
            onClosed: closeModal
        });
    }

    function openRegexFlagSelector() {
        navigation.push(modalStackRoutes.picker, {
            multiple: true,
            selectedLabel: config.regexFlags.join(""),
            selectedValue: config.regexFlags,
            data: REGEX_FLAGS_PICKER_DATA,
            title: message.modal.regexFlags.title,
            onSelect: handleChangeRegexFlags,
            onClosed: closeModal
        });
    }

    function handleChangeProtocol(protocol: string) {
        closeModal();
        setConfig({
            ...config,
            protocol
        })
    }

    function handleChangeRegexFlags(flags: Array<RegexFlagType>) {
        closeModal();
        const flagNoneSelectedIndex = flags.findIndex(flag => flag === regexFlagType.none);
        if (flagNoneSelectedIndex !== -1) {
            let tempRegexFlagData = [...flags];
            if (flags.length - 1 !== flagNoneSelectedIndex) {
                tempRegexFlagData.splice(flagNoneSelectedIndex, 1);
            } else {
                tempRegexFlagData = [regexFlagType.none]
            }

            setConfig({
                ...config,
                regexFlags: tempRegexFlagData
            });
        } else {
            setConfig({
                ...config,
                regexFlags: flags
            });
        }
    }

    function openFilterTypeSelector(filterType: FilterType) {
        setConfig({
            ...config,
            filterType
        })
    }

    function closeModal() {
        navigation.goBack();
    }

    function handleSubmit() {
        if (isSmsPremissionGranted === null) {
            Linking.openSettings();
            return;
        }
        if (isSmsPremissionGranted) {
            if (!isRunning) {
                handleSaveConfig();
                startSmsListener();
            } else {
                smsListener && smsListener.remove();
                stopAllCancelable();
            }
            setRunning(!isRunning);
        } else {
            const isGranted = checkPermissions();
            if (isGranted) {
                handleSubmit();
            }
        }
    }

    function handleSaveConfig() {
        setCrawlConfig(config).then(() => {
            showFlashMessage({
                type: 'success',
                message: 'Config saved!'
            });
        }).catch(err => {
            showFlashMessage({
                type: 'danger',
                message: err
            });
        })
    }

    return (
        <HomeComponent
            onChangeTextAPI={handleChangeAPI}
            onChangeTextKeyword={handleChangeKeyword}
            onChangeTextSecretKey={handleChangeSecretKey}
            onPressProtocol={openProtocolSelector}
            onPressRegexFlag={openRegexFlagSelector}
            onPressFilterType={openFilterTypeSelector}
            onHelp={openHelper}
            onSave={handleSaveConfig}
            onSubmit={handleSubmit}
            api={config.api}
            keyword={config.keyword}
            secretKey={config.secretKey}
            protocol={config.protocol}
            filterType={config.filterType}
            regexFlags={config.regexFlags}
            isRunning={isRunning}
            postedMesssage={postedMessage}
            isExecutingMessage={isExecutingMessage}
            executingMessageType={executingMessageType}
        />
    )
}

export default Home;