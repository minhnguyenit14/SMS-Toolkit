import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { Heading1, Loading, Input, Button, Heading3, Title, SubTitle } from '@components';
import Icon from 'react-native-vector-icons/FontAwesome';
import config from '@config';
import { APP_STYLES } from '@constants';
import message from '../home.json';
import { FilterType } from '../constants';
import { ButtonType } from '@components/Button/constants';
import ProtocolsBtn from './ProtocolsBtn';
import RegexDash from './RegexDash';
import RegexFlagsBtn, { RegexFlagType } from './RegexFlagsBtn';
import KeywordFilterTypeBtn from './KeywordFilterTypeBtn';
import ExecutingNoti, { ExecutingNotiType } from './ExecutingNoti';

const { width: appWidth, height: appHeight } = Dimensions.get('screen');

export interface HomeComponentProps {
    onChangeTextAPI: (api: string) => void,
    onChangeTextKeyword: (keyword: string) => void,
    onChangeTextSecretKey: (secretKey: string) => void,
    onPressProtocol: () => void,
    onPressRegexFlag: () => void,
    onPressFilterType: (filterType: FilterType) => void,
    onHelp: () => void,
    onSubmit: () => void,
    onSave: () => void,
    postedMesssage: string,
    api: string,
    keyword: string,
    protocol: string,
    secretKey: string,
    filterType: FilterType,
    regexFlags: Array<RegexFlagType>,
    isRunning?: boolean,
    isExecutingMessage?: boolean,
    executingMessageType?: ExecutingNotiType
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: config.colors.background
    },
    content: {
        flexGrow: 1,
        marginBottom: 15
    },
    copyrightContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    copyrightTxt: {
        backgroundColor: '#eaeaea',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 2,
        marginLeft: -15,
        color: '#bbb',
        fontSize: 14,
        letterSpacing: .5
    },
    headingContainer: {
        marginTop: '5%',
        marginBottom: '5%',
        alignItems: 'center'
    },
    version: {
        marginTop: 5,
        color: '#999',
        letterSpacing: 1
    },
    heading: {
        textAlign: 'center',
    },
    heading_s1: {
        color: config.colors.logo.sub1
    },
    heading_m: {
        color: config.colors.logo.sub2
    },
    heading_s2: {
        color: config.colors.logo.sub3
    },
    input: {
        marginBottom: 30
    },
    inputKeywords: {
        paddingLeft: 10
    },
    inputKeywordsLabelContainer: {
        justifyContent: 'space-between',
        paddingRight: 8
    },
    btn: {
        flex: 1,
        borderRadius: 0,
    },
    helpContainer: {
        backgroundColor: 'transparent',
        padding: 0,
    },
    helpIcon: {
        fontSize: 26,
        color: config.colors.status.primary
    },
    saveContainer: {
        height: '100%',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        marginLeft: 5
    },
    saveIcon: {
        fontSize: 24,
        color: '#fff'
    },
    loadingContainer: {
        ...APP_STYLES.rowContainer,
        alignItems: 'center',
    },
    loading: {
        position: 'absolute'
    },
    submitBtn: {
        backgroundColor: config.colors.background,
        margin: -15,
        elevation: 5
    },
    submitLabel: {
        fontSize: 24,
        textAlign: 'center',
        color: config.colors.logo.background
    },
    loadingLabel: {
        flex: 1,
    },
    runningMask: {
        backgroundColor: 'rgba(0,0,0,.4)',
        position: 'absolute',
        width: appWidth,
        height: appHeight
    }
});

const Home = ({
    onChangeTextAPI,
    onChangeTextKeyword,
    onChangeTextSecretKey,
    onPressProtocol,
    onPressRegexFlag,
    onPressFilterType,
    onHelp,
    onSave,
    onSubmit,
    postedMesssage,
    api,
    keyword,
    secretKey,
    protocol,
    filterType,
    regexFlags,
    isRunning = false,
    isExecutingMessage = false,
    executingMessageType = ""
}: HomeComponentProps) => {

    function getInputKeywordProps() {
        switch (filterType) {
            case FilterType.regex:
                return (
                    {
                        leftInput: (<RegexDash />),
                        rightInput: (
                            <>
                                <RegexDash />
                                <RegexFlagsBtn
                                    onPress={onPressRegexFlag}
                                    flags={regexFlags}
                                />
                            </>
                        )
                    }
                );
            default:
                return {};
        }
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.copyrightContainer}>
                    <SubTitle style={styles.copyrightTxt}>Powered by ABAHA.vn</SubTitle>
                    <Button
                        touchableOpacity
                        containerStyle={styles.helpContainer}
                        onPress={onHelp}
                    >
                        <Icon name="question-circle" style={styles.helpIcon} />
                    </Button>
                </View>

                <View style={styles.headingContainer}>
                    <Heading1
                        style={styles.heading}
                    >
                        <Heading1 style={styles.heading_s1}>S</Heading1>
                        <Heading1 style={styles.heading_m}>M</Heading1>
                        <Heading1 style={styles.heading_s2}>S</Heading1> TOOLKIT
                        </Heading1>
                    <Title style={styles.version}>{config.version}</Title>
                </View>

                <ScrollView
                    contentContainerStyle={[styles.content]}
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="handled"
                >
                    <Input
                        autoCapitalize='none'
                        label={message.input.apiTitle}
                        inputContainerStyle={styles.input}
                        onChangeText={onChangeTextAPI}
                        value={api}
                        leftInput={
                            <ProtocolsBtn
                                protocol={protocol}
                                onPress={onPressProtocol}
                            />
                        }
                    />
                    <Input
                        autoCapitalize='none'
                        {...getInputKeywordProps()}
                        extraLabel={<KeywordFilterTypeBtn
                            onPress={onPressFilterType}
                            filterType={filterType}
                        />}
                        label={message.input.keywordTitle}
                        labelContainerStyle={styles.inputKeywordsLabelContainer}
                        inputContainerStyle={[styles.input, styles.inputKeywords]}
                        onChangeText={onChangeTextKeyword}
                        value={keyword}
                    />
                    <Input
                        autoCapitalize='none'
                        secureTextEntry
                        label={message.input.secretKeyTitle}
                        labelContainerStyle={styles.inputKeywordsLabelContainer}
                        inputContainerStyle={[styles.input, styles.inputKeywords]}
                        onChangeText={onChangeTextSecretKey}
                        value={secretKey}
                    />
                </ScrollView>

                {isRunning && <View style={styles.runningMask} />}
                <View style={[APP_STYLES.rowContainer, styles.submitBtn]}>
                    <Button
                        containerStyle={styles.btn}
                        onPress={onSubmit}
                        label={message.submitTitle}
                    >
                        {isRunning
                            ? <View style={styles.loadingContainer}>
                                <Loading containerStyle={styles.loading} />
                                <Heading3 style={[styles.submitLabel, styles.loadingLabel]}>STOP</Heading3>
                            </View>
                            : <Heading3 style={styles.submitLabel}>{message.submitTitle}</Heading3>}
                    </Button>
                    {/* <Button
                        type={ButtonType.info}
                        containerStyle={styles.saveContainer}
                        onPress={onSave}
                    >
                        <Icon name="save" style={styles.saveIcon} />
                    </Button> */}
                </View>
            </View>

            <ExecutingNoti
                type={executingMessageType}
                visible={isExecutingMessage}
                message={postedMesssage}
            />
        </>
    );
}

export default Home;