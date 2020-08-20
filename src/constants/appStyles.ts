import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import config from '@config';

type CONTAINER_TYPE = {
    container: ViewStyle,
    rowContainer: ViewStyle,
}

const CONTAINER: CONTAINER_TYPE = {
    container: {
        flex: 1,
        padding: 15,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
};

const TYPOGRAPHY_COLOR = {
    HEADING: "#242424",
    TITLE: "#444",
    SUB_TITLE: "#666",
    BODY_TEXT: "#333",
    PLACEHOLDER: "#C7C7C6"
};

type TYPOGRAPHY_TYPE = {
    heading_1: TextStyle,
    heading_2: TextStyle,
    heading_3: TextStyle,
    title: TextStyle,
    subTitle: TextStyle,
    bodyText: TextStyle,
    description: TextStyle,
}

const TYPOGRAPHY: TYPOGRAPHY_TYPE = {
    heading_1: {
        fontFamily: 'kanit-extrabold',
        // fontWeight: '700',
        fontSize: 24,
        color: TYPOGRAPHY_COLOR.HEADING,
        letterSpacing: 4,
        textTransform: 'uppercase'
    },
    heading_2: {
        fontFamily: 'kanit-bold',
        // fontWeight: '600',
        fontSize: 18,
        color: TYPOGRAPHY_COLOR.HEADING,
        letterSpacing: 3,
        textTransform: 'uppercase'
    },
    heading_3: {
        fontFamily: 'kanit-semibold',
        // fontWeight: '500',
        fontSize: 16,
        color: TYPOGRAPHY_COLOR.HEADING,
        letterSpacing: 2,
        textTransform: 'uppercase'
    },
    title: {
        fontFamily: 'kanit-medium',
        // fontWeight: '500',
        fontSize: 15,
        color: TYPOGRAPHY_COLOR.TITLE,
    },
    subTitle: {
        fontFamily: 'kanit-light',
        // fontWeight: '300',
        fontSize: 12,
        color: TYPOGRAPHY_COLOR.SUB_TITLE
    },
    bodyText: {
        fontFamily: 'kanit-light',
        // fontWeight: '400',
        fontSize: 13,
        color: TYPOGRAPHY_COLOR.BODY_TEXT
    },
    description: {
        fontFamily: 'kanit-thin',
        // fontWeight: '300',
        fontSize: 10,
        color: TYPOGRAPHY_COLOR.SUB_TITLE
    }
};

const LOADING = {
    loading: {
        color: TYPOGRAPHY_COLOR.HEADING
    }
}

const APP_STYLES = StyleSheet.create({
    ...CONTAINER,
    ...TYPOGRAPHY,
    ...LOADING
})

export default APP_STYLES;