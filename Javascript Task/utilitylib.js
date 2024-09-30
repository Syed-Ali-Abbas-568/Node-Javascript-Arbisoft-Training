// My javascript utility library using es6

export const arrayUtils = {
    max: (arr) => Math.max(...arr),
  
    min: (arr) => Math.min(...arr),
  
    sum: (arr) => arr.reduce((total, num) => total + num, 0),
  
    average: (arr) => arrayUtils.sum(arr) / arr.length,
  
    unique: (arr) => [...new Set(arr)],
  
    flatten: (arr) => arr.reduce((flat, item) => 
      flat.concat(Array.isArray(item) ? arrayUtils.flatten(item) : item), []),
  
  
  };
  
  // Date Utilities
  export const dateUtils = {
    formatDate: (date, format = 'YYYY-MM-DD') => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day);
    },
  
    addDays: (date, days) => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    },
  
    dateDiff: (date1, date2) => {
      const diffTime = Math.abs(date2 - date1);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },

  };
  
  // Validation Utilities
  export const validationUtils = {
    isEmail: (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
  
    isURL: (url) => {
      const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      return urlRegex.test(url);
    },

    isNumeric: (str) => !isNaN(parseFloat(str)) && isFinite(str)
  };

