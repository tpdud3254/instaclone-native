import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { ActivityIndicator } from "react-native";
const Button = styled.TouchableOpacity`
    background-color: ${(props) => props.theme.accent};
    padding: 15px 10px;
    border-radius: 3px;
    width: 100%;
    opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const ButtonText = styled.Text`
    color: white;
    font-weight: 600;
    text-align: center;
`;

export default function AuthButton({ onPress, disabled, text, loading }) {
    return (
        <Button disabled={disabled} onPress={onPress}>
            {loading ? (
                <ActivityIndicator color="white" />
            ) : (
                <ButtonText>{text}</ButtonText>
            )}
        </Button>
    );
}

AuthButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
};
