export const currencyToFloat = (value: string) => {
    const stringNoSymbols = value.replaceAll('R$ ', '').replaceAll(',', '.').replaceAll('.', ''); 
    const size = stringNoSymbols.length;
    const numberString = stringNoSymbols.substring(0,size - 2) + '.' + stringNoSymbols.substring(size - 2, size);    
    return parseFloat(numberString);
};