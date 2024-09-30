import { arrayUtils, validationUtils, dateUtils } from './utilitylib.js'

// Test function to run all tests
const runTests = () => {
  console.log('Running tests for JavaScript Utility Library')

  console.log('\nTesting Array Utilities:')

  const testArray = [1, 5, 3, 2, 4, 3]
  console.log('Test array:', testArray)

  console.log('max:', arrayUtils.max(testArray))
  console.log('min:', arrayUtils.min(testArray))
  console.log('sum:', arrayUtils.sum(testArray))
  console.log('average:', arrayUtils.average(testArray))
  console.log('unique:', arrayUtils.unique(testArray))

  const nestedArray = [1, [2, [3, 4], 5], 6]
  console.log('Nested array:', nestedArray)
  console.log('flatten:', arrayUtils.flatten(nestedArray))

  console.log('\nTesting Date Utilities:')

  const today = new Date()
  console.log('Today:', today)

  console.log('formatDate (default):', dateUtils.formatDate(today))
  console.log('formatDate (custom):', dateUtils.formatDate(today, 'DD/MM/YYYY'))

  const futureDate = dateUtils.addDays(today, 7)
  console.log('addDays (7 days from today):', futureDate)

  console.log(
    'dateDiff (between today and 7 days later):',
    dateUtils.dateDiff(today, futureDate)
  )

  console.log('\nTesting Validation Utilities:')

  const emails = ['test@example.com', 'invalid-email', 'another@test.co.uk']
  emails.forEach(email => {
    console.log(`isEmail ('${email}'):`, validationUtils.isEmail(email))
  })

  const urls = ['https://www.example.com', 'invalid-url', 'http://test.co/path']
  urls.forEach(url => {
    console.log(`isURL ('${url}'):`, validationUtils.isURL(url))
  })

  const numbers = ['123', '12.34', 'not-a-number', '1e5']
  numbers.forEach(num => {
    console.log(`isNumeric ('${num}'):`, validationUtils.isNumeric(num))
  })
}

runTests()
