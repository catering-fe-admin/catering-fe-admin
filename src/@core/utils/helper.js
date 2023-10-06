import dayjs from 'dayjs';

export const statusList = ['PUBLIC', 'PRIVATE', 'DELETED'];

export const statusLocale = {
  PUBLIC: '公開',
  PRIVATE: '非公開',
  DELETED: '削除'
};

export const closingTypeDictionary = {
  END_FOLLOWING_MONTH: '30日(月末)',
  DATE_10_FOLLOWING_MONTH: '10日',
  DATE_15_FOLLOWING_MONTH: '15日',
  DATE_20_FOLLOWING_MONTH: '20日'
};

export const paymentTypeDictionary = {
  END_NEXT_MONTH: '翌月末',
  DATE_25_NEXT_MONTH: '翌月25日',
  DATE_20_NEXT_MONTH: '翌月20日',
  DATE_15_NEXT_MONTH: '翌月15日',
  DATE_10_NEXT_MONTH: '翌月10日',
  DATE_5_SECOND_MONTH: '翌々月5日',
  DATE_10_SECOND_MONTH: '翌々月10日'
};

export const formattedDate = (d) => {
  const date = d.split('-');

  return `${parseInt(date[0])}年${parseInt(date[1])}月${parseInt(date[2])}日`;
};

export const loadMoreValidator = (target, threshold, callback) => {
  threshold = parseInt(threshold);
  if (
    target.scrollTop + target.clientHeight >=
    target.scrollHeight - threshold
  ) {
    callback();
  }
};

export const getListFacilityNames = (content) => {
  // Create an array of objects with facility name and id
  const facilityData = content?.map((item) => ({
    id: item.customerFacility.id,
    name: item.customerFacility.name
  }));

  const facilityMap = new Map();
  facilityData?.forEach((facility) => {
    if (!facilityMap.has(facility.name)) {
      facilityMap.set(facility.name, facility);
    }
  });

  // Convert the Map values (unique facility objects) to an array
  const uniqueFacilities = Array.from(facilityMap.values());

  // Sort facility objects by name in ascending alphabetical order (Japanese locale)
  return uniqueFacilities.sort((a, b) => a.name.localeCompare(b.name, 'ja'));
};

var date = new Date();
export const firstDateCurrentMonth = new Date(
  date.getFullYear(),
  date.getMonth(),
  1
);

export const lastDateCurrentMonth = new Date(
  date.getFullYear(),
  date.getMonth() + 1,
  0
);

export const getLastDateOfMonth = (dateString) => {
  const givenDate = new Date(dateString);

  givenDate.setMonth(givenDate.getMonth() + 1);
  givenDate.setDate(0);

  return givenDate;
};

export const getFormattedParamsDate = (date) => {
  return date ? dayjs(date).format('YYYY-MM-DD') : null;
};

export const formattedThousand = (value) => {
  const formatter = Intl.NumberFormat('en-US');
  const formatted = formatter.format(Math.floor(parseInt(value)));

  return formatted;
};
