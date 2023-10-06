import find from 'lodash/find';
import flatMap from 'lodash/flatMap';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import sortBy from 'lodash/sortBy';

const useOrderBillingManagement = ({ order, setOrder }) => {
  const handleChangeTotalPayed = (rowIdx, contentIdx) => (event) => {
    const newValue =
      event?.target?.value != '' ? parseFloat(event?.target?.value) : 0;

    const { customer, customerBilling, customerPayment, content } =
      order[rowIdx];
    const newContent = [...content];

    newContent[contentIdx].totalPayed = newValue;
    newContent[contentIdx].totalRestFinal =
      newContent[contentIdx].totalRestResult - newValue;

    content?.forEach((_, idx) => {
      if (idx > contentIdx) {
        const newTotalRestAccumulative = newContent[idx - 1].totalRestFinal;
        const newTotalRestResult =
          newContent[idx - 1].totalRestFinal + newContent[idx].totalInvoiced;
        const newtotalRestFinal =
          newTotalRestResult - newContent[idx].totalPayed;

        newContent[idx].totalRestAccumulative = newTotalRestAccumulative;
        newContent[idx].totalRestResult = newTotalRestResult;
        newContent[idx].totalRestFinal = newtotalRestFinal;
      }
    });

    const newOrder = [...order];
    newOrder[rowIdx].customer = customer;
    newOrder[rowIdx].customerBilling = customerBilling;
    newOrder[rowIdx].customerPayment = customerPayment;
    newOrder[rowIdx].content = newContent;

    setOrder(newOrder);
  };

  const formatData = (data) => {
    const groupedData = groupBy(
      data,
      (obj) => `${obj.customer.id}_${obj.customerBilling.id}`
    );

    const result = map(groupedData, (group) => {
      const content = map(group, (item) =>
        omit(item, ['customer', 'customerBilling', 'customerPayment'])
      );

      return {
        customer: pick(group[0].customer, ['id', 'name', 'code']),
        customerBilling: pick(group[0].customerBilling, ['id', 'name']),
        content: sortBy(content, 'issueAtPeriod')
      };
    });

    const groupdResult = groupBy(result, 'customer.id');

    const rearrangedArray = flatMap(groupdResult, (group) => group);

    return rearrangedArray;
  };

  const reformatData = (data) => {
    return flatMap(data, (item) =>
      map(item.content, (contentItem) => ({
        customer: pick(item.customer, ['id', 'code', 'name']),
        customerBilling: pick(item.customerBilling, ['id', 'name']),
        customerPayment: null,
        issueAtPeriod: contentItem.issueAtPeriod,
        totalInvoiced: contentItem.totalInvoiced,
        totalPayed: contentItem.totalPayed,
        totalRestFinal: contentItem.totalRestFinal,
        totalRestAccumulative: contentItem.totalRestAccumulative,
        totalRestResult: contentItem.totalRestResult
      }))
    );
  };

  // Fungsi untuk memeriksa perbedaan pada atribut totalPayed
  function isDifferentTotalPayed(obj1, obj2) {
    return obj1.totalPayed !== obj2.totalPayed;
  }

  // Fungsi untuk membandingkan objek berdasarkan atribut yang diberikan
  function compareObjects(obj1, obj2) {
    return (
      obj1.customer.id === obj2.customer.id &&
      obj1.customerBilling.id === obj2.customerBilling.id &&
      obj1.issueAtPeriod === obj2.issueAtPeriod
    );
  }

  // Fungsi untuk mencari perbedaan pada atribut totalPayed dan menghasilkan array baru
  function findTotalPayedDifferences(array1, array2) {
    return flatMap(array1, (obj1) => {
      const matchedObj2 = find(array2, (obj2) => compareObjects(obj1, obj2));
      if (matchedObj2 && isDifferentTotalPayed(obj1, matchedObj2)) {
        return { ...obj1, totalPayed: matchedObj2.totalPayed };
      }

      return [];
    });
  }

  return {
    handleChangeTotalPayed,
    formatData,
    reformatData,
    findTotalPayedDifferences
  };
};

export default useOrderBillingManagement;
