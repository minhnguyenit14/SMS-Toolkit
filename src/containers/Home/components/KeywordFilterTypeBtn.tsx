import React from 'react';
import { StyleSheet, GestureResponderEvent, StyleProp, View, ViewStyle } from 'react-native';
import { Button, BodyText } from '@components';
import { ButtonType } from '@components/Button/constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FilterType } from '../constants';
import { APP_STYLES } from '@constants';

export interface KeywordFilterTypeBtnProps {
    onPress: (filterType: FilterType) => void,
    filterType: FilterType,
    containerStyle?: StyleProp<ViewStyle>
};

const styles = StyleSheet.create({
    container: {
        ...APP_STYLES.rowContainer,
        alignSelf: 'center',
        marginBottom: 7
    },
    btn: {
        borderRadius: 0,
        padding: 5,
        marginLeft: 10
    },
    icon: {
        fontSize: 16,
        color: '#fff'
    }
});

const KeywordFilterTypeBtn: React.SFC<KeywordFilterTypeBtnProps> = ({
    onPress,
    filterType,
    containerStyle
}) => {

    return (
        <View style={[styles.container, containerStyle]}>
            <Button
                containerStyle={styles.btn}
                type={filterType === FilterType.keyword
                    ? ButtonType.danger
                    : ButtonType.cancel}
                onPress={() => onPress(FilterType.keyword)}
            >
                <Icon name="alphabet-latin" style={styles.icon} />
            </Button>
            <Button
                containerStyle={styles.btn}
                type={filterType === FilterType.regex
                    ? ButtonType.danger
                    : ButtonType.cancel}
                onPress={() => onPress(FilterType.regex)}
            >
                <Icon name="regex" style={styles.icon} />
            </Button>
        </View>
    );
}

export default KeywordFilterTypeBtn;