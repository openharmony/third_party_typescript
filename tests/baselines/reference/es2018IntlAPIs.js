//// [es2018IntlAPIs.ts]
// Sample from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/supportedLocalesOf
const locales = ['ban', 'id-u-co-pinyin', 'de-ID'];
const options = { localeMatcher: 'lookup' } as const;
console.log(Intl.PluralRules.supportedLocalesOf(locales, options).join(', '));

const nf = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
console.log(nf.formatRange(3, 5)); // "$3 – $5"
console.log(nf.formatRange(2.9, 3.1)); // "~$3"
const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  });
const startRange = 3500;
const endRange = 9500;
console.log(formatter.formatRangeToParts(startRange, endRange));

//// [es2018IntlAPIs.js]
// Sample from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/supportedLocalesOf
const locales = ['ban', 'id-u-co-pinyin', 'de-ID'];
const options = { localeMatcher: 'lookup' };
console.log(Intl.PluralRules.supportedLocalesOf(locales, options).join(', '));
const nf = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
});
console.log(nf.formatRange(3, 5)); // "$3 – $5"
console.log(nf.formatRange(2.9, 3.1)); // "~$3"
const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
});
const startRange = 3500;
const endRange = 9500;
console.log(formatter.formatRangeToParts(startRange, endRange));
