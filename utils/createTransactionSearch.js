'use strict';

import axios from 'axios';
import { URL } from '../constants.js';
import { getPayload, getCybersourceHeaders } from './index.js';

const createTransactionSearch = async () => {
  let newOffset = 0;

  const transactions = [];
  const headers = [];

  const getTransactions = async () => {
    try {
      const newBody = getPayload({ offset: newOffset });

      const config = getCybersourceHeaders(newBody);

      let { data } = await axios.post(URL, newBody, config);

      const {
        searchId,
        save,
        name,
        query,
        count,
        totalCount,
        limit,
        offset,
        sort,
        timezone,
        submitTimeUtc,
      } = data;

      const dataHeaders = {
        searchId,
        save,
        name,
        query,
        count,
        totalCount,
        limit,
        offset,
        sort,
        timezone,
        submitTimeUtc,
      };

      newOffset += limit;

      headers.push(dataHeaders);

      const transactionSummaries = data['_embedded'].transactionSummaries;

      const newTransactions = transactionSummaries.map((transaction) => {
        const {
          id,
          submitTimeUtc,
          merchantId,
          applicationInformation: { applications },
          clientReferenceInformation: {
            code: clientReferenceInformationCode,
            applicationName: clientReferenceInformationApplicationName,
          },
          deviceInformation: { ipAddress: deviceInformationIpAddress },
          consumerAuthenticationInformation: {
            xid: consumerAuthenticationInformationXid,
            transactionId: consumerAuthenticationInformationTransactionId,
            eciRaw: consumerAuthenticationInformationEciRaw,
          },
          orderInformation: {
            billTo: {
              address1: billToAddress1,
              state: billToState,
              city: billToCity,
              country: billToCountry,
              postalCode: billToPostalCode,
              email: billToEmail,
              phoneNumber: billToPhoneNumber,
              firstName: billToFirstName,
              lastName: billToLastName,
            },
            amountDetails: {
              totalAmount: amountDetailsTotalAmount,
              currency: currencyAmountDetails,
            },
          },
          paymentInformation: {
            paymentType: { type: paymentType, method: paymentMethod },
          },
          processingInformation: {
            commerceIndicator: processingInformationCommerceIndicator,
          },
          processorInformation: {
            processor: { name: processorInformationName },
            approvalCode: processorInformationApprovalCode,
            retrievalReferenceNumber:
              processorInformationRetrievalReferenceNumber,
          },
        } = transaction;

        const cardSuffix = transaction?.paymentInformation?.card?.suffix || '';
        const cardPrefix = transaction?.paymentInformation?.card?.prefix || '';
        const cardType = transaction?.paymentInformation?.card?.type || '';

        const mappedTransaction = {
          id,
          submitTimeUtc,
          merchantId,
          consumerAuthenticationInformationXid,
          consumerAuthenticationInformationTransactionId,
          consumerAuthenticationInformationEciRaw,
          billToAddress1,
          billToState,
          billToCity,
          billToCountry,
          billToPostalCode,
          billToEmail,
          billToPhoneNumber,
          billToFirstName,
          billToLastName,
          amountDetailsTotalAmount,
          currencyAmountDetails,
          paymentType,
          paymentMethod,
          cardSuffix,
          cardPrefix,
          cardType,
          processingInformationCommerceIndicator,
          processorInformationName,
          processorInformationApprovalCode,
          processorInformationRetrievalReferenceNumber,
          clientReferenceInformationCode,
          clientReferenceInformationApplicationName,
          deviceInformationIpAddress,
        };

        const merchantDefinedInformation =
          transaction?.merchantDefinedInformation;

        if (merchantDefinedInformation) {
          merchantDefinedInformation.map((singleMerchantDefinedInformation) => {
            const { key, value } = singleMerchantDefinedInformation;

            switch (key.toString()) {
              case '1':
                mappedTransaction.MDD1 = value;
                break;
              case '2':
                mappedTransaction.MDD2 = value;
                break;
              case '3':
                mappedTransaction.MDD3 = value;
                break;
              case '4':
                mappedTransaction.MDD4 = value;
                break;
              case '27':
                mappedTransaction.MDD27 = value;
                break;
              case '29':
                mappedTransaction.MDD29 = value;
                break;
              case '30':
                mappedTransaction.MDD30 = value;
                break;
            }
          });
        }

        applications.map((application, index) => {
          const {
            reasonCode: applicationInformationReasonCode,
            name: applicationInformationName,
            rCode: applicationInformationRCode,
            rFlag: applicationInformationRFlag,
            reconciliationId: applicationInformationRCodeReconciliationId,
            rMessage: applicationInformationRCodeRMessage,
            returnCode: applicationInformationReturnCode,
          } = application;

          switch (index) {
            case 0:
              mappedTransaction.applicationInformationReasonCode1 =
                applicationInformationReasonCode || null;
              mappedTransaction.applicationInformationName1 =
                applicationInformationName;
              mappedTransaction.applicationInformationRCode1 =
                applicationInformationRCode;
              mappedTransaction.applicationInformationRFlag1 =
                applicationInformationRFlag;
              mappedTransaction.applicationInformationRCodeReconciliationId1 =
                applicationInformationRCodeReconciliationId;
              mappedTransaction.applicationInformationRCodeRMessage1 =
                applicationInformationRCodeRMessage;
              mappedTransaction.applicationInformationReturnCode1 =
                applicationInformationReturnCode;
              break;
            case 1:
              mappedTransaction.applicationInformationReasonCode2 =
                applicationInformationReasonCode;
              mappedTransaction.applicationInformationName2 =
                applicationInformationName;
              mappedTransaction.applicationInformationRCode2 =
                applicationInformationRCode;
              mappedTransaction.applicationInformationRFlag2 =
                applicationInformationRFlag;
              mappedTransaction.applicationInformationRCodeReconciliationId2 =
                applicationInformationRCodeReconciliationId;
              mappedTransaction.applicationInformationRCodeRMessage2 =
                applicationInformationRCodeRMessage;
              mappedTransaction.applicationInformationReturnCode2 =
                applicationInformationReturnCode;
              break;
            case 2:
              mappedTransaction.applicationInformationReasonCode3 =
                applicationInformationReasonCode;
              mappedTransaction.applicationInformationName3 =
                applicationInformationName;
              mappedTransaction.applicationInformationRCode3 =
                applicationInformationRCode;
              mappedTransaction.applicationInformationRFlag3 =
                applicationInformationRFlag;
              mappedTransaction.applicationInformationRCodeReconciliationId3 =
                applicationInformationRCodeReconciliationId;
              mappedTransaction.applicationInformationRCodeRMessage3 =
                applicationInformationRCodeRMessage;
              mappedTransaction.applicationInformationReturnCode3 =
                applicationInformationReturnCode;
              break;
            case 3:
              mappedTransaction.applicationInformationReasonCode4 =
                applicationInformationReasonCode;
              mappedTransaction.applicationInformationName4 =
                applicationInformationName;
              mappedTransaction.applicationInformationRCode4 =
                applicationInformationRCode;
              mappedTransaction.applicationInformationRFlag4 =
                applicationInformationRFlag;
              mappedTransaction.applicationInformationRCodeReconciliationId4 =
                applicationInformationRCodeReconciliationId;
              mappedTransaction.applicationInformationRCodeRMessage4 =
                applicationInformationRCodeRMessage;
              mappedTransaction.applicationInformationReturnCode4 =
                applicationInformationReturnCode;
              break;
            case 4:
              mappedTransaction.applicationInformationReasonCode5 =
                applicationInformationReasonCode;
              mappedTransaction.applicationInformationName5 =
                applicationInformationName;
              mappedTransaction.applicationInformationRCode5 =
                applicationInformationRCode;
              mappedTransaction.applicationInformationRFlag5 =
                applicationInformationRFlag;
              mappedTransaction.applicationInformationRCodeReconciliationId5 =
                applicationInformationRCodeReconciliationId;
              mappedTransaction.applicationInformationRCodeRMessage5 =
                applicationInformationRCodeRMessage;
              mappedTransaction.applicationInformationReturnCode5 =
                applicationInformationReturnCode;
              break;
          }
        });

        return mappedTransaction;
      });

      transactions.push(newTransactions);

      if (newOffset < totalCount) {
        await getTransactions();
      }
    } catch (error) {
      console.log(error);
    }
  };

  await getTransactions();

  const allTransactions = [].concat.apply([], transactions);

  return [allTransactions, headers];
};

export { createTransactionSearch };
