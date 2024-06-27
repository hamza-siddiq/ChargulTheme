

function formatMoney(cents, format) {
    if (typeof cents === 'string') {
      cents = cents.replace('.', '');
    }
    let value = '';
    const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    const formatString = format || moneyFormat;
  
    function formatWithDelimiters(
      number,
      precision = 2,
      thousands = ',',
      decimal = '.'
    ) {
      if (isNaN(number) || number == null) {
        return 0;
      }
  
      number = (number / 100.0).toFixed(precision);
  
      const parts = number.split('.');
      const dollarsAmount = parts[0].replace(
        /(\d)(?=(\d\d\d)+(?!\d))/g,
        `$1${thousands}`
      );
      const centsAmount = parts[1] ? decimal + parts[1] : '';
  
      return dollarsAmount + centsAmount;
    }
  
    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
          case "amount_with_apostrophe_separator":
        value = formatWithDelimiters(cents, 2, "'", ".");
        break;
    }
  
    return formatString.replace(placeholderRegex, value);
  }
  
  var Cell = Flickity.Cell;
  
  Cell.prototype.create = function () {
    this.element.style.position = 'absolute';
    this.x = 0;
    this.shift = 0;
    this.element.style[this.parent.originSide] = 0;
  };
  
  Cell.prototype.unselect = function () {
    this.element.classList.remove('is-selected');
  };