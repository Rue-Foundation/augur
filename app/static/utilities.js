var BigNumber = require('bignumber.js');
var web3 = require('ethereum.js');

module.exports = {
  blockToDate: function(block, currentBlock) {

    // calculate date from block number
    var seconds = (block - currentBlock) * 12;
    var date = new Date();
    date.setSeconds(date.getSeconds() + seconds);

    return date;
  },

  formatBalance: function(value) {  // value must be a big number

    var x = new BigNumber(2);
    var y = x.toPower(64);

    return value.dividedBy(y).toString('10');
  },

  formatDate: function(d) {

    if (!d) return '-';

    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Oct','Sep','Nov','Dec'];

    var hour = d.getHours() > 11  ? d.getHours() - 12 : d.getHours();
    hour = hour === 0 ? 12 : hour;
    var apm = d.getHours() > 10 || d.getHours() == 23 && d.getHours() !== 0 ? 'pm' : 'am';
    var minutes = d.getMinutes() < 10 ? '0'+ d.getMinutes() : d.getMinutes();

    return months[d.getMonth()]+' '+d.getDate()+', '+hour+':'+minutes+' '+apm;
  },

  formatGas: function(wei) {

    // detect format and convert
    if (typeof(wei) === 'string' && wei.match(/^0x\w+/)) {
      wei = web3.toWei(wei, 'wei');
    } else {
      wei = wei.toNumber();
    }

    if (wei >= 1000000000000 && wei < 1000000000000000) {
      return wei / 1000000000000 + ' szabo';
    } else if (wei >= 1000000000000000 && wei < 1000000000000000000) {
      return wei / 1000000000000000 + ' finney';
    } else if (wei >= 1000000000000000000 && wei < 1000000000000000000000) {
      return wei / 1000000000000000000 + ' ether';
    } else {
      return wei + ' wei';
    }
  }
};
