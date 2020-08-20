import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, BodyText, Title } from '@components';
import { APP_STYLES } from '@constants';

export interface RegexDashProps {
    label?: string
};

const styles = StyleSheet.create({
    dash: {
        // fontWeight: 'bold',
        color: APP_STYLES.description.color
    }
});

const RegexDash: React.SFC<RegexDashProps> = ({
    label = "/"
}) => {
    return (
        <View>
            <Title style={styles.dash}>{label}</Title>
        </View>
    );
}

export default RegexDash;