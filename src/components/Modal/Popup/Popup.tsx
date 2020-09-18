import React from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Modal as ModalRN,
    ScrollView
} from 'react-native';
import { PopupProps } from '.';
import Button, { ButtonType } from '../../Button';
import { Heading2, BodyText } from '../../Typography';

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
    },
    background: {
        backgroundColor: 'rgba(0,0,0,.6)'
    },
    fullCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        justifyContent: 'center',
        width: '90%',
        maxHeight: '80%',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        overflow: 'hidden'
    },
    container: {
        alignItems: 'center',
    },
    textContainer: {
        width: '100%',
        height: '80%'
    },
    title: {
        fontSize: 22,
        // fontWeight: 'bold',
        marginVertical: 15,
        color: '#404040'
    },
    content: {
        fontSize: 18
    },
    footer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 40,
    },
    btn: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginLeft: 15
    },
    cancelText: {
    },
    okText: {

    }
});

const defaultListener = () => { };

const Popup = ({
    visible = true,
    title = "",
    content = "",
    okText = "OK",
    cancelText = "",
    pressToHide = true,
    onCancel = defaultListener,
    onRequestClose = defaultListener,
    onOk = defaultListener,
    titleStyle,
    contentStyle,
    renderContent
}: PopupProps) => {

    return (
        <ModalRN
            animationType="fade"
            transparent
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <TouchableWithoutFeedback
                disabled={!pressToHide}
                style={styles.wrapper}
                onPress={onRequestClose}
            >
                <View style={[styles.wrapper, styles.fullCenter, styles.background]}>
                    <View style={styles.modal}>
                        <View style={[styles.container]}>
                            <View style={styles.textContainer}>
                                <Heading2 style={[styles.title, titleStyle]}>
                                    {title}
                                </Heading2>
                                <ScrollView persistentScrollbar>
                                    {renderContent || <BodyText style={[styles.content, contentStyle]}>
                                        {content}
                                    </BodyText>}
                                </ScrollView>
                            </View>

                            <View style={styles.footer}>
                                {!!cancelText && (
                                    <Button
                                        touchableOpacity
                                        style={[styles.btn]}
                                        onPress={onCancel}
                                        labelStyle={styles.cancelText}
                                        type={ButtonType.cancel}
                                    >
                                        {cancelText}
                                    </Button>
                                )}
                                <Button
                                    touchableOpacity
                                    style={[styles.btn]}
                                    onPress={onOk}
                                    labelStyle={styles.okText}
                                >
                                    {okText}
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ModalRN>
    );
}

export default Popup;
