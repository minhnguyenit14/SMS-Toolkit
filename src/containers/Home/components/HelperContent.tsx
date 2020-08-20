import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SubTitle, BodyText, Title } from '@components';
import Description from '@components/Typography/Description';

export interface Content {
    title: string,
    body: Array<string>
}

export interface HelperContentProps {
    notes?: Array<string>,
    content?: Array<Content>
}

const styles = StyleSheet.create({
    helpNote: {
        fontStyle: 'italic',
        color: '#999'
    },
    helpSectionTitle: {
        marginTop: 15,
        marginBottom: 7,
        padding: 7,
        backgroundColor: '#eee',
    },
    helpContent: {

    }
});

const HelperContent: React.SFC<HelperContentProps> = ({
    notes = [],
    content = []
}) => {
    function renderNotes() {
        return notes.map((note: string, index: number) => (
            <Description key={index} style={styles.helpNote}>{note}</Description>
        ))
    }

    function renderContent() {
        return content.map((content: Content, index: number) => (
            <View key={index}>
                <Title style={styles.helpSectionTitle}>{content.title}</Title>
                {renderBodyContent(content.body)}
            </View>
        ))
    }

    function renderBodyContent(contentBody: Array<string>) {
        return contentBody.map((body: string, index: number) => (
            <BodyText key={index} style={styles.helpContent}>{body}</BodyText>
        ))
    }

    return (
        <View>
            {renderNotes()}
            {renderContent()}
        </View>
    );
}

export default HelperContent;