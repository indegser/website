import { dateFns } from 'utils/dateUtils'

const ChosehEdition = ({ modifiedAt, edition }) => {
  let text: string

  const ordinal_suffix_of = (i: number) => {
    var j = i % 10,
      k = i % 100
    if (j == 1 && k != 11) {
      return i + 'st'
    }
    if (j == 2 && k != 12) {
      return i + 'nd'
    }
    if (j == 3 && k != 13) {
      return i + 'rd'
    }
    return i + 'th'
  }

  if (!edition) {
    text = 'Initial Edition'
  } else {
    text = [
      dateFns.formatBasic(modifiedAt),
      `${ordinal_suffix_of(edition)} Edition`,
    ].join(' · ')
  }

  return <div>{text}</div>
}

export default ChosehEdition
