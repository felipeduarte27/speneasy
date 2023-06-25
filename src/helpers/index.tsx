export const currencyToFloat = (value: string) => {
    const stringNoSymbols = value.replaceAll('R$ ', '').replaceAll(',', '.').replaceAll('.', ''); 
    const size = stringNoSymbols.length;
    const numberString = stringNoSymbols.substring(0,size - 2) + '.' + stringNoSymbols.substring(size - 2, size);    
    return parseFloat(numberString);
};

export const getMonthName = (monthNumber) => {

    let monthName = '';
    switch(monthNumber){
    case 1: monthName = 'Janeiro'; break;
    case 2: monthName = 'Fevereiro';  break;
    case 3: monthName = 'Março';  break;
    case 4: monthName = 'Abril';  break;
    case 5: monthName = 'Maio';  break;
    case 6: monthName = 'Junho';  break;
    case 7: monthName = 'Julho';  break;
    case 8: monthName = 'Agosto';  break;
    case 9: monthName = 'Setembro';  break;
    case 10: monthName = 'Outubro'; break;
    case 11: monthName = 'Novembro'; break;
    case 12: monthName = 'Dezembro'; break;
    }

    return monthName;
};

export const formatCurrencyLabel = (value) => {
    return value.toFixed(2).toString().replace('.', ',');
};

export const formatLongName = (value) => {
    const text = value.length > 7 ? value.substring(0, 5)+'.': value;
    return text;
};

export const getMonthNumberTwoDigit = (value) => {

    const number = value < 12 ? `0${value}` : value;
    return number;
};