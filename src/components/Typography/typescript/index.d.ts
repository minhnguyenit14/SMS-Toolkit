import { ReactNode } from 'react';
import { TextInputProps } from 'react-native';

export interface TypographyProps extends TextInputProps {
    children?: ReactNode
}

export interface Heading1Props extends TypographyProps {

}

export interface Heading2Props extends TypographyProps {

}

export interface Heading3Props extends TypographyProps {

}

export interface TitleProps extends TypographyProps {

}

export interface SubTitleProps extends TypographyProps {

}

export interface BodyTextProps extends TypographyProps {

}

export interface DescriptionProps extends TypographyProps {

}