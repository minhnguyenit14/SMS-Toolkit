import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Easing,
    StyleSheet,
    Platform,
    Picker as PickerRN,
    ScrollView,
    LayoutChangeEvent,
} from 'react-native';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import config from '@config';
import { PickerItem, PickerProps, PickerItemValue } from '.';
import Button, { ButtonType } from '../../Button';
import { BodyText, SubTitle, Heading3 } from '../../Typography';
import { APP_STYLES } from '@constants';

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        overflow: 'hidden',
        height: undefined
    },
    languagePickerHeaderContainer: {
        zIndex: 1,
        width: '100%',
        paddingVertical: 10,
        backgroundColor: '#fafafa',
        borderBottomColor: '#eee',
        borderBottomWidth: 0.8
    },
    languagePickerHeader: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    pickerCancel: {
        position: 'absolute',
        left: 15
    },
    pickerCancelText: {
        // fontSize: 16,
        color: '#666',
        // fontWeight: 'bold'
    },
    languagePickerTitle: {
        color: '#2a2a2a',
        // fontWeight: '600',
        textAlign: 'center',
        // fontSize: 24,
        alignSelf: 'center'
    },
    pickerSubTitle: {
        letterSpacing: 1.15,
        color: '#999',
        alignSelf: 'center',
        marginTop: Platform.select({
            ios: 5,
            android: 2
        })
    },
    pickerSelect: {
        position: 'absolute',
        right: 15
    },
    pickerSelectText: {
        // fontSize: 16,
        color: config.colors.primary,
        // fontWeight: 'bold'
    },
    pickerSelectTextDisabled: {
        color: '#bababa'
    },
    languagePickerItem: {
        color: '#333'
    },
    pickerMask: {
        zIndex: 1,
        height: 30,
        width: '100%',
        position: 'absolute'
    },
    picker: {
        width: '100%',
        ...Platform.select({
            ios: {
                paddingVertical: 0
            },
            android: {
                maxHeight: 220
            }
        })
    },
    androidPicker: {
        flexGrow: 1,
        paddingVertical: 15
    },
    androidDataRow: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    androidDataRowSelected: {
        backgroundColor: '#f5f5f5',
    },
    androidDataText: {
        // fontSize: 18,
        textAlign: 'center'
    },
    androidDataTextSelected: {
        // fontWeight: 'bold',
        ...APP_STYLES.title,
        color: '#333'
    },
    checkIcon: {
        fontSize: 22,
        color: config.colors.primary,
        position: 'absolute',
        right: 15
    },
    btn: {
        backgroundColor: 'transparent',
        padding: 0
    }
});

const Picker: React.SFC<PickerProps> = ({
    multiple = false,
    visible = true,
    selectedLabel = "",
    selectedValue: propsSelectedValue = "",
    data,
    title = "",
    cancelTitle = "Cancel",
    selectTitle = "Select",
    onSelect = () => { },
    onCancelPress = () => { },
    onClosed = () => { },
}) => {
    const [headerHeight, setHeaderHeight] = useState(0);
    const [selectedValue, setSelectedValue] = useState(propsSelectedValue);
    const [confirmDisabled, setConfirmDisabled] = useState(false);
    const refModal = useRef();

    useEffect(() => {
        if (Array.isArray(propsSelectedValue)) {

        } else {
            setConfirmDisabled(selectedValue === propsSelectedValue);
        }
    }, [selectedValue])

    function onHeaderLayout(e: LayoutChangeEvent) {
        setHeaderHeight(e.nativeEvent.layout.height);
    };

    function renderPicker() {
        switch (Platform.OS) {
            case 'ios':
                return (
                    <View>
                        <PickerRN
                            selectedValue={selectedValue}
                            style={styles.picker}
                            itemStyle={styles.languagePickerItem}
                            onValueChange={onValueChange}
                        >
                            {renderItem()}
                        </PickerRN>
                    </View>
                );
            case 'android':
                return (
                    <ScrollView
                        style={styles.picker}
                        scrollEventThrottle={16}
                        contentContainerStyle={styles.androidPicker}
                    >
                        {data.map((item: PickerItem, index: number) =>
                            renderAndroidData(item, index)
                        )}
                    </ScrollView>
                );
            default:
                return null;
        }
    }

    function renderAndroidData(item: PickerItem, index: number) {
        let isSelected = false;
        if (multiple) {
            if (Array.isArray(selectedValue)) {
                isSelected = selectedValue.some(value => {
                    return value === item.value
                });
            }
        } else {
            isSelected = item.value === selectedValue;
        }

        return (
            <Button
                key={index}
                onPress={() => onValueChange(item.value, index)}
                underlayColor={'rgba(0,0,0,.02)'}
                containerStyle={styles.btn}
            >
                <View
                    style={[
                        styles.androidDataRow,
                        isSelected && styles.androidDataRowSelected
                    ]}
                >
                    <BodyText
                        style={[
                            styles.androidDataText,
                            isSelected && styles.androidDataTextSelected
                        ]}
                    >
                        {item.label}
                    </BodyText>
                    {isSelected && multiple && <Icon name="check" style={styles.checkIcon} />}
                </View>
            </Button>
        );
    }

    function renderItem() {
        return data.map((item: PickerItem) => (
            <PickerRN.Item label={item.label} value={item.value} />
        ));
    }

    function onValueChange(itemValue: PickerItemValue, indexValue: number) {
        if (multiple && Array.isArray(selectedValue)) {
            const tempSelectedValue = [...selectedValue];
            const isExistedIndex = selectedValue.findIndex(value => itemValue === value);
            if (isExistedIndex !== -1) {
                tempSelectedValue.splice(isExistedIndex, 1);
            } else {
                tempSelectedValue.push(itemValue);
            }
            setSelectedValue(tempSelectedValue);
        } else {
            setSelectedValue(itemValue);
        }
    };

    function handleCancelPress() {
        if (refModal.current) {
            //@ts-ignore
            refModal.current.close();
        } else {
        }
        onCancelPress();
    };

    function handleClosed() {
        onClosed();
    };

    function onSelectPress() {
        onSelect(selectedValue);
    };

    return (
        <Modal
            ref={refModal}
            isOpen={visible}
            position="bottom"
            onClosed={handleClosed}
            animationDuration={200}
            useNativeDriver
            swipeToClose={true}
            style={[styles.modal]}
            easing={Easing.bezier(0.54, 0.96, 0.74, 1.01)}
        >
            <View
                onLayout={onHeaderLayout}
                style={styles.languagePickerHeaderContainer}
            >
                <View style={styles.languagePickerHeader}>
                    <Button
                        touchableOpacity
                        onPress={handleCancelPress}
                        containerStyle={[styles.pickerCancel, styles.btn]}
                    >
                        <BodyText style={styles.pickerCancelText}>
                            {cancelTitle}
                        </BodyText>
                    </Button>

                    <Heading3 style={styles.languagePickerTitle}>{title}</Heading3>

                    <Button
                        touchableOpacity
                        onPress={onSelectPress}
                        containerStyle={[styles.pickerSelect, styles.btn]}
                        disabled={confirmDisabled}
                        type={confirmDisabled ? ButtonType.disabled : ButtonType.primary}
                    >
                        <BodyText
                            style={[
                                styles.pickerSelectText,
                                confirmDisabled && styles.pickerSelectTextDisabled
                            ]}
                        >
                            {selectTitle}
                        </BodyText>
                    </Button>
                </View>
                <SubTitle style={styles.pickerSubTitle}>
                    {selectedLabel}
                </SubTitle>
            </View>
            {renderPicker()}
        </Modal>
    );
}

export default Picker;
