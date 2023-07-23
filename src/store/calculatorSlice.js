import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentValue: '0',
    previousValue: null,
    operator: null,
};

const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        updateValue(state, action) {
            state.currentValue = action.payload;
        },
        setOperator(state, action) {
            state.operator = action.payload;
            state.previousValue = state.currentValue;
            state.currentValue = '0';
        },
        calculateResult(state) {
            const { currentValue, previousValue, operator } = state;
            let result;

            switch (operator) {
                case '+':
                    result = parseFloat(previousValue) + parseFloat(currentValue);
                    break;
                case '-':
                    result = parseFloat(previousValue) - parseFloat(currentValue);
                    break;
                case '*':
                    result = parseFloat(previousValue) * parseFloat(currentValue);
                    break;
                case '/':
                    result = parseFloat(previousValue) / parseFloat(currentValue);
                    break;
                case '%':
                    result = (parseFloat(previousValue) * parseFloat(currentValue)) / 100;
                    break;
                default:
                    return;
            }

            if (Number.isNaN(result)) {
                state.currentValue = 'Error';
            } else if (!Number.isInteger(result)) {
                state.currentValue = result.toFixed(2);
            } else {
                state.currentValue = result.toString();
            }

            state.previousValue = null;
            state.operator = null;
        },
        clear(state) {
            state.currentValue = '0';
            state.previousValue = null;
            state.operator = null;
        },
    },
});

export const {
    updateValue,
    setOperator,
    calculateResult,
    clear,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
